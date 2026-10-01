import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, 'research', 'data')
const END_YEAR = 2025
const RECENT = [2021, 2025]

// One canonical founding work per branch. Citations to it track use of the idea
// even when papers no longer put the branch label in their titles.
const anchors = [
  ['expert-systems', 'Expert systems', 'W1549872659'],
  ['case-based-reasoning', 'Case-based reasoning', 'doi:10.3233/AIC-1994-7104'],
  ['inductive-logic-programming', 'Inductive logic programming', 'doi:10.1007/BF03037089'],
  ['learning-classifier-systems', 'Learning classifier systems', 'doi:10.1162/evco.1995.3.2.149'],
  ['fuzzy-logic', 'Fuzzy logic', 'doi:10.1016/S0019-9958(65)90241-X'],
  ['genetic-programming', 'Genetic programming', 'doi:10.1007/BF00175355'],
  ['self-organizing-maps', 'Self-organizing maps', 'doi:10.1007/BF00337288'],
  ['hopfield-networks', 'Hopfield networks', 'doi:10.1073/pnas.79.8.2554'],
  ['boltzmann-machines', 'Boltzmann machines', 'doi:10.1207/s15516709cog0901_7'],
  ['reservoir-computing', 'Reservoir computing', 'doi:10.1126/science.1091277'],
  ['neuroevolution', 'Neuroevolution', 'doi:10.1162/106365602320169811'],
  ['symbolic-regression', 'Symbolic regression', 'doi:10.1126/science.1165893'],
  ['support-vector-machines', 'Support vector machines (control)', 'doi:10.1007/BF00994018'],
]

// Featured atlas inheritance edges: [edge id, ancestor work, successor work].
// null marks a work OpenAlex does not index (its DOI resolves to an unrelated record).
const edges = [
  ['e30', 'genetic-programming → symbolic-regression', 'doi:10.1007/BF00175355', 'doi:10.1126/science.1165893'],
  ['e59', 'genetic-programming → AlphaEvolve', 'doi:10.1007/BF00175355', 'doi:10.48550/arXiv.2506.13131'],
  ['e55', 'Hopfield networks → modern Hopfield networks', 'doi:10.1073/pnas.79.8.2554', 'doi:10.48550/arXiv.2008.02217'],
  ['e56', 'modern Hopfield networks ↔ attention', 'W2626778328', 'doi:10.48550/arXiv.2008.02217'],
  ['e57', 'reservoir computing → physical reservoirs', 'doi:10.1126/science.1091277', 'doi:10.1016/j.neunet.2019.03.005'],
  ['e54', 'expert systems (knowledge bottleneck) → inductive logic programming', 'W1549872659', 'doi:10.1007/BF03037089'],
  ['e62', 'RNN (LSTM) → S4', 'doi:10.1162/neco.1997.9.8.1735', 'doi:10.48550/arXiv.2111.00396'],
  ['e61', 'WaveNet → S4', 'doi:10.48550/arXiv.1609.03499', 'doi:10.48550/arXiv.2111.00396'],
  ['e63', 'S4 → Mamba', 'doi:10.48550/arXiv.2111.00396', 'doi:10.48550/arXiv.2312.00752'],
  ['e65', 'Mamba → Mamba-2', 'doi:10.48550/arXiv.2312.00752', null],
]

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
let lastRequestAt = 0

async function openAlex(url, attempt = 0) {
  const spacing = 1_100 - (Date.now() - lastRequestAt)
  if (spacing > 0) await sleep(spacing)
  lastRequestAt = Date.now()
  const response = await fetch(url, {
    headers: { 'User-Agent': 'ML-Civilization-citation-flow/1.0 (mailto:research@example.com)' },
  })
  if (response.status === 404) return null
  if ((response.status === 429 || response.status >= 500) && attempt < 8) {
    await sleep(response.status === 429 ? 10_000 : 1_000 * 2 ** attempt)
    return openAlex(url, attempt + 1)
  }
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`)
  return response.json()
}

const shortId = (id) => id.replace('https://openalex.org/', '')
const workCache = new Map()

async function work(ref) {
  if (!ref) return null
  if (!workCache.has(ref)) {
    const select = 'id,display_name,publication_year,cited_by_count,referenced_works,referenced_works_count'
    workCache.set(ref, await openAlex(`https://api.openalex.org/works/${ref}?select=${select}`))
  }
  return workCache.get(ref)
}

async function groupCount(filter, groupBy) {
  const params = new URLSearchParams({ filter, group_by: groupBy })
  const data = await openAlex(`https://api.openalex.org/works?${params}`)
  return data?.group_by ?? []
}

function parseCsv(text) {
  const [header, ...lines] = text.trim().split('\n')
  const columns = header.split(',')
  return lines.map((line) => {
    const cells = line.match(/("(?:[^"]|"")*"|[^,]*)(,|$)/g).map((cell) => cell.replace(/,$/, '').replace(/^"|"$/g, '').replace(/""/g, '"'))
    return Object.fromEntries(columns.map((column, index) => [column, cells[index]]))
  })
}

function toCsv(rows, headers) {
  const escape = (value) => {
    const text = String(value ?? '')
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
  }
  return [headers.join(','), ...rows.map((row) => headers.map((header) => escape(row[header])).join(','))].join('\n') + '\n'
}

const mean = (values) => values.reduce((sum, value) => sum + value, 0) / values.length

const yearly = parseCsv(await readFile(path.join(OUT_DIR, 'branch-yearly-counts.csv'), 'utf8'))
const totalWorks = new Map(yearly.map((row) => [Number(row.year), Number(row.total_works)]))
const labelSummary = new Map(
  parseCsv(await readFile(path.join(OUT_DIR, 'branch-trajectory-summary.csv'), 'utf8')).map((row) => [row.branch_id, row]),
)

function topFields(groups, limit = 3) {
  const total = groups.reduce((sum, group) => sum + group.count, 0)
  return groups
    .filter((group) => group.key_display_name && group.key !== 'unknown')
    .slice(0, limit)
    .map((group) => `${group.key_display_name} ${((100 * group.count) / total).toFixed(0)}%`)
    .join('; ')
}

const branchRows = []
const yearRows = []

for (const [branchId, label, ref] of anchors) {
  const anchor = await work(ref)
  if (!anchor) {
    branchRows.push({ branch_id: branchId, branch: label, anchor_status: `not found: ${ref}` })
    continue
  }
  const id = shortId(anchor.id)
  const byYear = new Map(
    (await groupCount(`cites:${id},to_publication_date:${END_YEAR}-12-31`, 'publication_year')).map((group) => [Number(group.key), group.count]),
  )
  const years = []
  for (let year = anchor.publication_year; year <= END_YEAR; year += 1) {
    const citing = byYear.get(year) ?? 0
    const total = totalWorks.get(year) ?? 0
    const share = total ? (citing / total) * 100_000 : 0
    years.push({ year, share })
    yearRows.push({ branch_id: branchId, anchor_id: id, year, citing_works: citing, total_works: total, citing_share_per_100k: share })
  }

  let peak = { start: anchor.publication_year, value: 0 }
  for (let index = 0; index + 5 <= years.length; index += 1) {
    const value = mean(years.slice(index, index + 5).map((row) => row.share))
    if (value > peak.value) peak = { start: years[index].year, value }
  }
  const recent = mean(years.filter((row) => row.year >= RECENT[0] && row.year <= RECENT[1]).map((row) => row.share))
  const citationSurvival = peak.value ? recent / peak.value : 0
  const labelSurvival = Number(labelSummary.get(branchId)?.survival_ratio ?? NaN)

  const earlyEnd = Math.min(anchor.publication_year + 14, 2010)
  const earlyFields = await groupCount(`cites:${id},from_publication_date:${anchor.publication_year}-01-01,to_publication_date:${earlyEnd}-12-31`, 'primary_topic.field.id')
  const recentFields = await groupCount(`cites:${id},from_publication_date:${RECENT[0]}-01-01,to_publication_date:${RECENT[1]}-12-31`, 'primary_topic.field.id')

  branchRows.push({
    branch_id: branchId,
    branch: label,
    anchor_status: 'resolved',
    anchor_id: id,
    anchor_title: anchor.display_name,
    anchor_year: anchor.publication_year,
    anchor_cited_by: anchor.cited_by_count,
    citation_peak_window: `${peak.start}-${peak.start + 4}`,
    citation_survival: citationSurvival.toFixed(3),
    label_survival: Number.isFinite(labelSurvival) ? labelSurvival.toFixed(3) : '',
    idea_minus_label: Number.isFinite(labelSurvival) ? (citationSurvival - labelSurvival).toFixed(3) : '',
    early_window: `${anchor.publication_year}-${earlyEnd}`,
    early_citing_fields: topFields(earlyFields),
    recent_citing_fields: topFields(recentFields),
  })
  console.log(`${label}: citation survival ${citationSurvival.toFixed(3)} vs label ${labelSurvival}`)
}

const edgeRows = []
for (const [edgeId, description, ancestorRef, successorRef] of edges) {
  const [ancestor, successor] = [await work(ancestorRef), await work(successorRef)]
  let status
  let coCited = ''
  if (!ancestor || !successor) {
    status = `not indexed in OpenAlex: ${!ancestor ? 'ancestor' : 'successor'}`
  } else if (!successor.referenced_works_count) {
    status = 'successor references not indexed'
  } else {
    status = successor.referenced_works.includes(ancestor.id) ? 'direct citation' : 'no direct citation indexed'
  }
  if (ancestor && successor) {
    const params = new URLSearchParams({ filter: `cites:${shortId(ancestor.id)},cites:${shortId(successor.id)}`, per_page: '1' })
    coCited = (await openAlex(`https://api.openalex.org/works?${params}`))?.meta?.count ?? ''
  }
  edgeRows.push({
    edge_id: edgeId,
    relationship: description,
    ancestor_id: ancestor ? shortId(ancestor.id) : '',
    ancestor_title: ancestor?.display_name ?? '',
    successor_id: successor ? shortId(successor.id) : '',
    successor_title: successor?.display_name ?? '',
    successor_reference_count: successor?.referenced_works_count ?? '',
    citation_evidence: status,
    works_citing_both: coCited,
  })
  console.log(`${edgeId} ${description}: ${status}, co-cited by ${coCited}`)
}

await mkdir(OUT_DIR, { recursive: true })
await writeFile(
  path.join(OUT_DIR, 'branch-citation-flow.csv'),
  toCsv(branchRows, ['branch_id', 'branch', 'anchor_status', 'anchor_id', 'anchor_title', 'anchor_year', 'anchor_cited_by', 'citation_peak_window', 'citation_survival', 'label_survival', 'idea_minus_label', 'early_window', 'early_citing_fields', 'recent_citing_fields']),
)
await writeFile(
  path.join(OUT_DIR, 'branch-citation-yearly.csv'),
  toCsv(yearRows, ['branch_id', 'anchor_id', 'year', 'citing_works', 'total_works', 'citing_share_per_100k']),
)
await writeFile(
  path.join(OUT_DIR, 'edge-citation-evidence.csv'),
  toCsv(edgeRows, ['edge_id', 'relationship', 'ancestor_id', 'ancestor_title', 'successor_id', 'successor_title', 'successor_reference_count', 'citation_evidence', 'works_citing_both']),
)
console.log('Wrote branch-citation-flow.csv, branch-citation-yearly.csv, edge-citation-evidence.csv')
