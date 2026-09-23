import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, 'research', 'data')
const START_YEAR = 1950
const END_YEAR = 2025

// These are deliberately title-anchored labels. They measure the visibility of a
// research identity, not every paper that silently uses one of its mechanisms.
const branches = [
  ['expert-systems', 'Expert systems', 'expert system', '"expert system*"'],
  ['symbolic-ai', 'Symbolic AI', 'symbolic artificial intelligence', '"symbolic artificial intelligence"'],
  ['case-based-reasoning', 'Case-based reasoning', 'case based reasoning', '"case-based reasoning"|"case based reasoning"'],
  ['inductive-logic-programming', 'Inductive logic programming', 'inductive logic programming', '"inductive logic programming"'],
  ['learning-classifier-systems', 'Learning classifier systems', 'learning classifier system', '"learning classifier system*"'],
  ['fuzzy-logic', 'Fuzzy logic', 'fuzzy logic', '"fuzzy logic"'],
  ['genetic-programming', 'Genetic programming', 'genetic programming', '"genetic programming"'],
  ['artificial-life', 'Artificial life', 'artificial life', '"artificial life"'],
  ['self-organizing-maps', 'Self-organizing maps', 'self organizing map', '"self-organizing map*"|"self organizing map*"'],
  ['hopfield-networks', 'Hopfield networks', 'hopfield network', '"hopfield network*"'],
  ['boltzmann-machines', 'Boltzmann machines', 'boltzmann machine', '"boltzmann machine*"'],
  ['reservoir-computing', 'Reservoir computing', 'reservoir computing', '"reservoir computing"'],
  ['neuroevolution', 'Neuroevolution', 'neuroevolution', 'neuroevolution'],
  ['symbolic-regression', 'Symbolic regression', 'symbolic regression', '"symbolic regression"'],
  ['support-vector-machines', 'Support vector machines (control)', 'support vector machine', '"support vector machine*"'],
  ['bayesian-networks', 'Bayesian networks (control)', 'bayesian network', '"bayesian network*"'],
]

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

let lastRequestAt = 0

async function openAlex(url, attempt = 0) {
  const spacing = 1_100 - (Date.now() - lastRequestAt)
  if (spacing > 0) await sleep(spacing)
  lastRequestAt = Date.now()
  const response = await fetch(url, {
    headers: { 'User-Agent': 'ML-Civilization-branch-analysis/1.0 (mailto:research@example.com)' },
  })
  if ((response.status === 429 || response.status >= 500) && attempt < 8) {
    const delay = response.status === 429
      ? Math.max(10_000, Number(response.headers.get('retry-after') ?? 0) * 1_000)
      : 1_000 * 2 ** attempt
    await sleep(delay)
    return openAlex(url, attempt + 1)
  }
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`)
  return response.json()
}

function worksUrl(query = null, extras = {}, exact = true) {
  const params = new URLSearchParams()
  const filters = [
    `from_publication_date:${START_YEAR}-01-01`,
    `to_publication_date:${END_YEAR}-12-31`,
  ]
  if (query) filters.push(`title.search${exact ? '.exact' : ''}:${query}`)
  params.set('filter', filters.join(','))
  for (const [key, value] of Object.entries(extras)) params.set(key, String(value))
  return `https://api.openalex.org/works?${params.toString()}`
}

function mean(values) {
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0
}

function rollingFive(yearRows, valueKey) {
  const result = []
  for (let year = START_YEAR + 4; year <= END_YEAR; year += 1) {
    const window = yearRows.filter((row) => row.year >= year - 4 && row.year <= year)
    result.push({ endYear: year, value: mean(window.map((row) => row[valueKey])) })
  }
  return result
}

function classify(survivalRatio, recentTrend) {
  if (survivalRatio < 0.10) return 'contracted / label largely died'
  if (survivalRatio < 0.35) return 'legacy niche'
  if (survivalRatio < 0.80) return recentTrend >= 1.20 ? 'reviving' : 'surviving niche'
  return recentTrend >= 1.20 ? 'growing / revived' : 'active'
}

function csvEscape(value) {
  const string = String(value ?? '')
  return /[",\n]/.test(string) ? `"${string.replaceAll('"', '""')}"` : string
}

await mkdir(OUT_DIR, { recursive: true })

const baselineJson = await openAlex(worksUrl(null, { group_by: 'publication_year', per_page: 200 }))
const baseline = new Map(baselineJson.group_by.map((row) => [Number(row.key), row.count]))
const allSeries = []
const summaries = []
const topPapers = []
const sensitivity = []

for (const [id, label, broadQuery, exactQuery] of branches) {
  const grouped = await openAlex(worksUrl(exactQuery, { group_by: 'publication_year', per_page: 200 }))
  const counts = new Map(grouped.group_by.map((row) => [Number(row.key), row.count]))
  const series = []
  for (let year = START_YEAR; year <= END_YEAR; year += 1) {
    const works = counts.get(year) ?? 0
    const totalWorks = baseline.get(year) ?? 0
    const sharePer100k = totalWorks ? (works / totalWorks) * 100_000 : 0
    const row = { branch_id: id, branch: label, query: exactQuery, year, works, total_works: totalWorks, share_per_100k: sharePer100k }
    series.push(row)
    allSeries.push(row)
  }

  const rolling = rollingFive(series, 'share_per_100k')
  const eligibleRolling = rolling.filter((row) => row.endYear >= 1960)
  const peak = eligibleRolling.reduce((best, row) => row.value > best.value ? row : best, eligibleRolling[0])
  const recentRows = series.filter((row) => row.year >= 2021)
  const previousRows = series.filter((row) => row.year >= 2016 && row.year <= 2020)
  const recentShare = mean(recentRows.map((row) => row.share_per_100k))
  const previousShare = mean(previousRows.map((row) => row.share_per_100k))
  const survivalRatio = peak.value ? recentShare / peak.value : 0
  const recentTrend = previousShare ? recentShare / previousShare : null
  const total = series.reduce((sum, row) => sum + row.works, 0)

  summaries.push({
    branch_id: id,
    branch: label,
    title_query: exactQuery,
    works_1950_2025: total,
    peak_window: `${peak.endYear - 4}-${peak.endYear}`,
    peak_share_per_100k: peak.value,
    recent_share_per_100k: recentShare,
    survival_ratio: survivalRatio,
    recent_trend_ratio: recentTrend,
    trajectory: classify(survivalRatio, recentTrend ?? 0),
  })

  const broadGrouped = await openAlex(worksUrl(broadQuery, { group_by: 'publication_year', per_page: 200 }, false))
  const broadCounts = new Map(broadGrouped.group_by.map((row) => [Number(row.key), row.count]))
  const broadSeries = series.map((row) => ({
    year: row.year,
    share_per_100k: row.total_works ? ((broadCounts.get(row.year) ?? 0) / row.total_works) * 100_000 : 0,
  }))
  const broadPeak = rollingFive(broadSeries, 'share_per_100k')
    .filter((row) => row.endYear >= 1960)
    .reduce((best, row) => row.value > best.value ? row : best)
  const broadRecent = mean(broadSeries.filter((row) => row.year >= 2021).map((row) => row.share_per_100k))
  sensitivity.push({
    branch_id: id,
    branch: label,
    broad_query: broadQuery,
    exact_query: exactQuery,
    broad_works: broadGrouped.meta.count,
    exact_works: grouped.meta.count,
    exact_to_broad_count_ratio: broadGrouped.meta.count ? grouped.meta.count / broadGrouped.meta.count : null,
    broad_survival_ratio: broadPeak.value ? broadRecent / broadPeak.value : null,
    exact_survival_ratio: survivalRatio,
    survival_ratio_delta: broadPeak.value ? survivalRatio - (broadRecent / broadPeak.value) : null,
  })

  const papers = await openAlex(worksUrl(exactQuery, { sort: 'cited_by_count:desc', per_page: 5 }))
  for (const work of papers.results) {
    topPapers.push({
      branch_id: id,
      branch: label,
      openalex_id: work.id,
      title: work.display_name,
      year: work.publication_year,
      cited_by_count: work.cited_by_count,
      doi: work.doi,
      primary_url: work.primary_location?.landing_page_url ?? work.id,
    })
  }
}

const round = (value, digits = 4) => typeof value === 'number' && Number.isFinite(value)
  ? Number(value.toFixed(digits))
  : value

const seriesHeaders = ['branch_id', 'branch', 'query', 'year', 'works', 'total_works', 'share_per_100k']
const summaryHeaders = ['branch_id', 'branch', 'title_query', 'works_1950_2025', 'peak_window', 'peak_share_per_100k', 'recent_share_per_100k', 'survival_ratio', 'recent_trend_ratio', 'trajectory']
const paperHeaders = ['branch_id', 'branch', 'openalex_id', 'title', 'year', 'cited_by_count', 'doi', 'primary_url']
const sensitivityHeaders = ['branch_id', 'branch', 'broad_query', 'exact_query', 'broad_works', 'exact_works', 'exact_to_broad_count_ratio', 'broad_survival_ratio', 'exact_survival_ratio', 'survival_ratio_delta']

function toCsv(rows, headers) {
  return [headers.join(','), ...rows.map((row) => headers.map((header) => csvEscape(round(row[header]))).join(','))].join('\n') + '\n'
}

await writeFile(path.join(OUT_DIR, 'branch-yearly-counts.csv'), toCsv(allSeries, seriesHeaders))
await writeFile(path.join(OUT_DIR, 'branch-trajectory-summary.csv'), toCsv(summaries, summaryHeaders))
await writeFile(path.join(OUT_DIR, 'branch-top-cited-papers.csv'), toCsv(topPapers, paperHeaders))
await writeFile(path.join(OUT_DIR, 'branch-query-sensitivity.csv'), toCsv(sensitivity, sensitivityHeaders))
await writeFile(path.join(OUT_DIR, 'branch-analysis-metadata.json'), JSON.stringify({
  generated_at: new Date().toISOString(),
  source: 'OpenAlex API',
  date_range: [START_YEAR, END_YEAR],
  retrieval: 'OpenAlex title.search.exact with quoted phrases, plural wildcards, and explicit orthographic aliases; counts normalized by all indexed works per publication year',
  limitations: [
    'Search is exact-phrase and title-anchored, so it measures explicit label visibility rather than complete method use.',
    'A separate sensitivity table compares exact phrases with broader stemmed title queries.',
    'OpenAlex coverage and concept assignment vary by year and venue.',
    'The 2021-2025 window is used because 2026 is incomplete and subject to indexing lag.',
    'Trajectory labels are descriptive thresholds, not causal proof.',
  ],
  thresholds: {
    contracted: 'survival_ratio < 0.10',
    legacy_niche: '0.10 <= survival_ratio < 0.35',
    surviving_niche: '0.35 <= survival_ratio < 0.80',
    active: 'survival_ratio >= 0.80',
    revival_modifier: 'recent_trend_ratio >= 1.20',
  },
  branches: branches.map(([id, label, broadQuery, exactQuery]) => ({ id, label, broad_query: broadQuery, exact_query: exactQuery })),
}, null, 2) + '\n')

console.table(summaries.map((row) => ({
  branch: row.branch,
  works: row.works_1950_2025,
  peak: row.peak_window,
  survival: round(row.survival_ratio, 3),
  trend: round(row.recent_trend_ratio, 3),
  trajectory: row.trajectory,
})))
