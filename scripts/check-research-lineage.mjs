import assert from 'node:assert/strict'
import { readFile, access, readdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'

const root = fileURLToPath(new URL('..', import.meta.url))
const compiled = await build({
  entryPoints: [resolve(root, 'src/data/researchGraph.ts')],
  bundle: true, platform: 'node', format: 'esm', write: false,
})
const { researchNodes, researchEdges } = await import(`data:text/javascript;base64,${Buffer.from(compiled.outputFiles[0].text).toString('base64')}`)

// Graph structure
const ids = new Set(researchNodes.map((node) => node.id))
assert.equal(ids.size, researchNodes.length, 'Duplicate node IDs')
assert.equal(new Set(researchEdges.map((edge) => edge.id)).size, researchEdges.length, 'Duplicate edge IDs')
for (const edge of researchEdges) {
  assert(ids.has(edge.source) && ids.has(edge.target), `Dangling edge: ${edge.id}`)
  assert.notEqual(edge.source, edge.target, `Self-loop: ${edge.id}`)
}

// Lineage connectivity: breadth-first search from the operator-learning root
const lineageRoot = 'neural-operators'
const currentStudy = 'scientific-ml-learning'
assert(ids.has(lineageRoot), `Missing lineage root node: ${lineageRoot}`)
assert(ids.has(currentStudy), `Missing current study node: ${currentStudy}`)
const outgoing = new Map()
for (const edge of researchEdges) outgoing.set(edge.source, [...(outgoing.get(edge.source) ?? []), edge.target])
const reachable = new Set([lineageRoot])
const queue = [lineageRoot]
while (queue.length) {
  for (const target of outgoing.get(queue.shift()) ?? []) {
    if (!reachable.has(target)) { reachable.add(target); queue.push(target) }
  }
}
assert(reachable.has(currentStudy), `${currentStudy} is not reachable from ${lineageRoot}`)

// Evidence links: lineage nodes need a source; every local link (any tag) must exist under public/
const hasScheme = (url) => /^[a-z][a-z\d+.-]*:/i.test(url)
for (const node of researchNodes) {
  if (node.tags.includes('research-lineage')) assert(node.sourceUrl, `Missing evidence/source: ${node.id}`)
  if (!node.sourceUrl || hasScheme(node.sourceUrl)) continue
  const localPath = decodeURIComponent(new URL(node.sourceUrl, 'file:///').pathname).replace(/^\/+/, '')
  await access(resolve(root, 'public', localPath)).catch(() => {
    assert.fail(`Local evidence link not found for ${node.id}: ${node.sourceUrl} (expected public/${localPath})`)
  })
}

// Public-release boundary: keep unpublished results out of served assets and graph data.
const files = await readdir(resolve(root, 'public/research'))
assert(!files.includes('evidence.json'), 'The unpublished evidence snapshot must not be publicly served')
const studyPage = await readFile(resolve(root, 'public/research/current-study.html'), 'utf8')
assert(!researchNodes.some((node) => node.tags.includes('project-evidence')), 'Unpublished project evidence must not be bundled into the public graph')
assert(!studyPage.includes('evidence.json'), 'The public page must not link an unpublished evidence snapshot')
assert(studyPage.includes('Learning and Exploration'), 'The public page must describe a developing learning journey')
assert(studyPage.includes('noindex'), 'The public study page should discourage indexing; this is not access control')
console.log(`Research check passed: ${ids.size} nodes, ${researchEdges.length} edges, connected learning map, links and public-release checks.`)
