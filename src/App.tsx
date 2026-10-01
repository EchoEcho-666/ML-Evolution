import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  ReactFlow,
  applyNodeChanges,
  useReactFlow,
  type NodeChange,
  type NodeMouseHandler,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Crosshair, Focus, LocateFixed, RotateCcw } from 'lucide-react'
import { researchEdges, researchNodes } from './data/researchGraph'
import type { EdgeType, ExplorationStatus, IdeaFlow, ResearchEdge, ResearchNode as ResearchNodeModel } from './types'
import { ResearchNode, type ResearchFlowNode } from './components/ResearchNode'
import { CausalEdge, type CausalFlowEdge } from './components/CausalEdge'
import { DetailPanel } from './components/DetailPanel'
import { Legend } from './components/Legend'
import { ProgressPanel } from './components/ProgressPanel'
import { SearchPalette } from './components/SearchPalette'
import { SideRail } from './components/SideRail'
import { TopBar } from './components/TopBar'
import { useResearchState } from './hooks/useResearchState'
import { PaperDiscoveryPanel } from './components/PaperDiscoveryPanel'
import type { ScholarlyPaper } from './services/scholarly'
import { Prologue } from './components/Prologue'

const nodeTypes = { research: ResearchNode }
const edgeTypes = { causal: CausalEdge }
const ideaFlowColors = { survival: '#78a68e', merger: '#9a86c1', migration: '#6fa6b4', extinction: '#c8785f' } as const
const allIdeaFlows: IdeaFlow[] = ['survival', 'merger', 'migration', 'extinction']

type TraceMode = 'all' | 'ancestors' | 'descendants' | 'unresolved'
type Theme = 'dark' | 'light'

function traverse(startId: string, direction: 'ancestors' | 'descendants', edges: ResearchEdge[]) {
  const visited = new Set<string>([startId])
  const queue = [startId]
  while (queue.length) {
    const current = queue.shift()!
    for (const edge of edges) {
      const next = direction === 'ancestors' && edge.target === current
        ? edge.source
        : direction === 'descendants' && edge.source === current
          ? edge.target
          : null
      if (next && !visited.has(next)) { visited.add(next); queue.push(next) }
    }
  }
  return visited
}

function buildTrace(id: string, mode: TraceMode, nodes: ResearchNodeModel[], edges: ResearchEdge[]) {
  if (mode === 'ancestors') return traverse(id, 'ancestors', edges)
  if (mode === 'descendants') return traverse(id, 'descendants', edges)
  const all = new Set([...traverse(id, 'ancestors', edges), ...traverse(id, 'descendants', edges)])
  if (mode === 'unresolved') {
    const unresolved = new Set(nodes.filter((node) => ['unresolved', 'frontier', 'current-research'].includes(node.status)).map((node) => node.id))
    const keep = new Set([id])
    edges.forEach((edge) => {
      if (all.has(edge.source) && unresolved.has(edge.target)) { keep.add(edge.source); keep.add(edge.target) }
    })
    unresolved.forEach((nodeId) => { if (all.has(nodeId)) keep.add(nodeId) })
    return keep
  }
  return all
}

type Chapter = 'branches' | 'lineage' | 'frontier' | 'all'

const chapters: { id: Chapter; label: string; hint: string }[] = [
  { id: 'branches', label: '1 · Branches', hint: 'Why old AI branches rose, declined, and where their ideas went' },
  { id: 'lineage', label: '2 · Deep learning', hint: 'RNN to Transformer to state-space models' },
  { id: 'frontier', label: '3 · Frontier', hint: 'World models, self-improvement, AI for Physics, and my project' },
  { id: 'all', label: 'All', hint: 'The full causal map' },
]

const frontierTags = ['physics', 'world-model', 'rsi', 'scientific-ml', 'evaluation', 'physical-computing', 'program-search']

function inChapter(node: ResearchNodeModel, chapter: Chapter) {
  if (chapter === 'all') return true
  const branch = node.tags.includes('branch-analysis') || node.tags.includes('successor') || (node.tags.includes('history') && !node.tags.includes('sequence'))
  const frontier = node.tags.some((tag) => frontierTags.includes(tag))
  if (chapter === 'branches') return branch
  if (chapter === 'frontier') return frontier
  return !branch && !frontier
}

// Left-to-right phylogeny for the Branches chapter: census hub, then branches by year,
// then each branch's successors in later columns so every edge flows left to right.
function phylogenyLayout(nodes: ResearchNodeModel[], edges: ResearchEdge[]) {
  const COLUMN = 340
  const ROW = 150
  const GAP = 40
  const visible = new Set(nodes.filter((node) => inChapter(node, 'branches')).map((node) => node.id))
  const branches = nodes.filter((node) => node.id !== 'branch-survival-analysis' && node.tags.includes('branch-analysis'))
    .sort((a, b) => (a.year ?? 0) - (b.year ?? 0) || a.title.localeCompare(b.title))
  const isBranch = new Set(branches.map((node) => node.id))
  const owner = new Map<string, { branch: number; column: number }>()
  const blocks = branches.map((branch, index) => {
    const columns: string[][] = [[branch.id]]
    let frontier = [branch.id]
    while (frontier.length) {
      const next: string[] = []
      for (const id of frontier) {
        for (const edge of edges) {
          if (edge.source !== id || !visible.has(edge.target) || isBranch.has(edge.target) || owner.has(edge.target)) continue
          owner.set(edge.target, { branch: index, column: columns.length })
          next.push(edge.target)
        }
      }
      if (next.length) columns.push(next)
      frontier = next
    }
    return columns
  })
  // Wrap the branch blocks into side-by-side era groups so the chapter is wide, not one tall column.
  const GROUPS = 3
  const heights = blocks.map((columns) => Math.max(...columns.map((ids) => ids.length)) * ROW + GAP)
  const groupWidth = Math.max(...blocks.map((columns) => columns.length)) * COLUMN + COLUMN / 2
  const target = heights.reduce((sum, height) => sum + height, 0) / GROUPS
  const positions: Record<string, { x: number; y: number }> = {}
  let group = 0
  let top = 0
  let tallest = 0
  blocks.forEach((columns, index) => {
    if (top > 0 && top + heights[index] / 2 > target && group < GROUPS - 1) {
      group += 1
      top = 0
    }
    const left = COLUMN + group * groupWidth
    columns.forEach((ids, column) => ids.forEach((id, row) => { positions[id] = { x: left + column * COLUMN, y: top + row * ROW } }))
    top += heights[index]
    tallest = Math.max(tallest, top)
  })
  positions['branch-survival-analysis'] = { x: 0, y: (tallest - GAP - ROW) / 2 }
  return positions
}

function branchPosition(node: ResearchNodeModel, nodes: ResearchNodeModel[]) {
  if (node.id === 'branch-survival-analysis' || !node.tags.includes('branch-analysis')) return node.position
  const branches = nodes.filter((item) => item.id !== 'branch-survival-analysis' && item.tags.includes('branch-analysis'))
    .sort((a, b) => (a.year ?? 0) - (b.year ?? 0) || a.title.localeCompare(b.title))
  return { x: 80 + branches.findIndex((item) => item.id === node.id) * 245, y: 1050 }
}

function timelinePosition(node: ResearchNodeModel, index: number, nodes: ResearchNodeModel[]) {
  const year = node.year ?? 2026
  const years = [...new Set(nodes.map((item) => item.year ?? 2026))].sort((a, b) => a - b)
  const x = years.indexOf(year) * 245
  if (node.id === 'branch-survival-analysis') return { x, y: 1360 }
  if (node.tags.includes('branch-analysis')) {
    const sameYearOffset = nodes.filter((item, itemIndex) => itemIndex < index && item.year === year && item.tags.includes('branch-analysis')).length
    return { x, y: 1080 + sameYearOffset * 155 }
  }
  const lanes = { paper: 30, concept: 260, mechanism: 490, problem: 710, 'open-question': 900, contradiction: 900, 'research-idea': 900 }
  const sameYearOffset = nodes.filter((item, itemIndex) => itemIndex < index && item.year === year && item.type === node.type).length
  return { x, y: lanes[node.type] + sameYearOffset * 155 }
}

function App() {
  const { setCenter, fitView } = useReactFlow<ResearchFlowNode, CausalFlowEdge>()
  const { statuses, notes, nodePositions, importedNodes, importedEdges, setStatus, setNote, setNodePosition, resetNodePositions, addImportedPaper } = useResearchState()
  const [selectedId, setSelectedId] = useState<string>('')
  const [chapter, setChapter] = useState<Chapter>('branches')
  const [fog, setFog] = useState(true)
  const [timeline, setTimeline] = useState(false)
  const [traceMode, setTraceMode] = useState<TraceMode | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [progressOpen, setProgressOpen] = useState(false)
  const [discoveryOpen, setDiscoveryOpen] = useState(false)
  const [activeRail, setActiveRail] = useState('atlas')
  const [visibleIdeaFlows, setVisibleIdeaFlows] = useState<IdeaFlow[]>(allIdeaFlows)
  const [introVisible, setIntroVisible] = useState(true)
  const [prologueOpen, setPrologueOpen] = useState(() => sessionStorage.getItem('ml-evolution:prologue-seen') !== 'true')
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('ml-evolution:theme')
    if (saved === 'dark' || saved === 'light') return saved
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  const allNodes = useMemo(() => [...researchNodes, ...importedNodes], [importedNodes])
  const allEdges = useMemo(() => [...researchEdges, ...importedEdges], [importedEdges])
  const hasCustomLayout = Object.keys(nodePositions).length > 0
  const selectedNode = allNodes.find((node) => node.id === selectedId)
  const selectedConnections = useMemo(() => allEdges
    .filter((edge) => edge.source === selectedId || edge.target === selectedId)
    .map((edge) => {
      const outgoing = edge.source === selectedId
      const otherId = outgoing ? edge.target : edge.source
      return { edge, outgoing, otherTitle: allNodes.find((node) => node.id === otherId)?.title ?? otherId }
    }), [allEdges, allNodes, selectedId])
  const tracedIds = useMemo(() => selectedId && traceMode ? buildTrace(selectedId, traceMode, allNodes, allEdges) : null, [allEdges, allNodes, selectedId, traceMode])

  const phylogeny = useMemo(() => phylogenyLayout(allNodes, allEdges), [allEdges, allNodes])

  const statusOf = useCallback((node: ResearchNodeModel): ExplorationStatus => statuses[node.id] ?? node.status, [statuses])

  const flowNodes = useMemo<ResearchFlowNode[]>(() => allNodes.map((record, index) => {
    const status = statusOf(record)
    const obscured = fog && status === 'locked'
    return {
      id: record.id,
      type: 'research',
      position: timeline ? timelinePosition(record, index, allNodes) : chapter === 'branches' && phylogeny[record.id] ? nodePositions[`branches:${record.id}`] ?? phylogeny[record.id] : nodePositions[record.id] ?? branchPosition(record, allNodes),
      hidden: !inChapter(record, chapter),
      data: {
        record,
        displayStatus: status,
        obscured,
        dimmed: Boolean(tracedIds && !tracedIds.has(record.id)),
        selected: record.id === selectedId,
      },
    }
  }), [allNodes, chapter, fog, nodePositions, phylogeny, selectedId, statusOf, timeline, tracedIds])

  // React Flow needs node changes applied locally so a dragged node follows the cursor.
  const [renderedNodes, setRenderedNodes] = useState(flowNodes)
  useEffect(() => setRenderedNodes(flowNodes), [flowNodes])
  const onNodesChange = useCallback((changes: NodeChange<ResearchFlowNode>[]) => setRenderedNodes((nodes) => applyNodeChanges(changes, nodes)), [])

  const flowEdges = useMemo<CausalFlowEdge[]>(() => allEdges.map((edge) => {
    const dimmed = Boolean(tracedIds && (!tracedIds.has(edge.source) || !tracedIds.has(edge.target)))
    const fogged = fog && [edge.source, edge.target].some((id) => {
      const node = allNodes.find((item) => item.id === id)
      return node ? statusOf(node) === 'locked' : false
    })
    return {
      id: edge.id, source: edge.source, target: edge.target, type: 'causal',
      hidden: Boolean(edge.ideaFlow && !visibleIdeaFlows.includes(edge.ideaFlow)),
      markerEnd: { type: MarkerType.ArrowClosed, width: 13, height: 13, color: edge.ideaFlow ? ideaFlowColors[edge.ideaFlow] : '#71827b' },
      data: {
        relation: edge.type,
        explanation: edge.explanation,
        dimmed: dimmed || fogged,
        featured: Boolean(edge.featured),
        ideaFlow: edge.ideaFlow,
        confidence: edge.confidence,
        citation: edge.citation,
      },
    }
  }), [allEdges, allNodes, fog, statusOf, tracedIds, visibleIdeaFlows])

  const travelTo = useCallback((id: string) => {
    const index = allNodes.findIndex((node) => node.id === id)
    const record = allNodes[index]
    if (!record) return
    if (!inChapter(record, chapter)) setChapter('all')
    setSelectedId(id)
    setSearchOpen(false)
    setProgressOpen(false)
    setDiscoveryOpen(false)
    const position = timeline ? timelinePosition(record, index, allNodes) : chapter === 'branches' && phylogeny[record.id] ? nodePositions[`branches:${record.id}`] ?? phylogeny[record.id] : nodePositions[record.id] ?? branchPosition(record, allNodes)
    setCenter(position.x + 110, position.y + 60, { zoom: 1.15, duration: 850 })
  }, [allNodes, chapter, nodePositions, phylogeny, setCenter, timeline])

  const importPaper = useCallback((paper: ScholarlyPaper, relation: EdgeType, explanation: string) => {
    const duplicate = allNodes.find((node) =>
      (paper.doi && node.doi?.toLowerCase() === paper.doi.toLowerCase()) || node.externalId === paper.id,
    )
    if (duplicate) {
      setDiscoveryOpen(false)
      travelTo(duplicate.id)
      return
    }

    const base = selectedNode?.position ?? { x: 1900, y: 680 }
    const id = `${paper.provider}-${paper.id.replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase()}`
    const node: ResearchNodeModel = {
      id,
      type: 'paper',
      title: paper.title,
      subtitle: paper.venue ? `Imported from ${paper.venue}` : 'Imported scholarly work',
      year: paper.year,
      authors: paper.authors,
      venue: paper.venue,
      status: 'unread',
      summary: 'Metadata imported from an open scholarly index. Follow the source link, then write an original analysis of this paper’s role in the field.',
      motivation: 'Not yet analyzed. Identify the limitation that made this paper necessary.',
      openQuestions: ['What limitation made this paper necessary?', 'Which result most clearly supports its central claim?'],
      tags: ['imported', paper.provider],
      position: { x: base.x + 340, y: base.y + ((importedNodes.length % 5) - 2) * 155 },
      doi: paper.doi,
      sourceUrl: paper.sourceUrl,
      pdfUrl: paper.pdfUrl,
      externalId: paper.id,
      dataSource: paper.provider,
      citationCount: paper.citationCount,
    }
    const edge = selectedNode ? {
      id: `import-${selectedNode.id}-${id}`,
      source: selectedNode.id,
      target: id,
      type: relation,
      explanation: explanation.trim() || `Candidate ${relation.toLowerCase().replaceAll('_', ' ')} relationship.`,
      featured: false,
    } satisfies ResearchEdge : undefined

    addImportedPaper(node, edge)
    setDiscoveryOpen(false)
    setSelectedId(id)
    setTraceMode(null)
    window.setTimeout(() => setCenter(node.position.x + 110, node.position.y + 60, { zoom: 1.12, duration: 850 }), 60)
  }, [addImportedPaper, allNodes, importedNodes.length, selectedNode, setCenter, travelTo])

  const onNodeClick: NodeMouseHandler<ResearchFlowNode> = useCallback((_event, node) => {
    if (node.data.obscured) {
      setStatus(node.id, 'discoverable')
      return
    }
    setSelectedId(node.id)
    setProgressOpen(false)
    setDiscoveryOpen(false)
  }, [setStatus])

  const handleTrace = useCallback((mode: TraceMode) => {
    setTraceMode(mode)
    setActiveRail('lineage')
  }, [])

  const handleRail = (value: string) => {
    if (value === 'origins') {
      setPrologueOpen(true)
      setActiveRail('origins')
      return
    }
    setActiveRail(value)
    if (value === 'lineage') setTraceMode('all')
    if (value === 'atlas') setTraceMode(null)
    if (value === 'frontier') {
      setTraceMode('unresolved')
      const frontier = allNodes.find((node) => statusOf(node) === 'current-research')
      if (frontier) travelTo(frontier.id)
    }
    if (value === 'notes') { setProgressOpen(true); setDiscoveryOpen(false) }
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setSearchOpen(true) }
      if (event.key === 'Escape') { setSearchOpen(false); setProgressOpen(false); setDiscoveryOpen(false) }
      if (event.key.toLowerCase() === 'f' && !event.metaKey && !event.ctrlKey && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) setFog((value) => !value)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    window.setTimeout(() => setIntroVisible(false), 5200)
  }, [])

  useEffect(() => {
    window.setTimeout(() => fitView({ padding: 0.18, duration: 800, maxZoom: 0.9 }), 50)
  }, [fitView, timeline])

  useEffect(() => {
    localStorage.setItem('ml-evolution:theme', theme)
    document.documentElement.style.colorScheme = theme
  }, [theme])

  const enterAtlas = () => {
    sessionStorage.setItem('ml-evolution:prologue-seen', 'true')
    setPrologueOpen(false)
    setActiveRail('atlas')
  }

  return (
    <div className="app-shell" data-theme={theme}>
      <TopBar
        fog={fog} lineage={Boolean(traceMode)} timeline={timeline} theme={theme} selectedTitle={selectedNode?.title} selectedYear={selectedNode?.year}
        contextLabel={timeline ? 'TIMELINE VIEW' : traceMode ? `TRACING ${traceMode.toUpperCase()}` : 'CURRENT FOCUS'}
        onToggleFog={() => setFog(!fog)}
        onToggleLineage={() => { setTraceMode(traceMode ? null : 'all'); setActiveRail(traceMode ? 'atlas' : 'lineage') }}
        onToggleTimeline={() => setTimeline(!timeline)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenProgress={() => { setProgressOpen(!progressOpen); setDiscoveryOpen(false) }}
        onOpenDiscovery={() => { setDiscoveryOpen(true); setProgressOpen(false) }}
        onToggleTheme={() => setTheme((value) => value === 'dark' ? 'light' : 'dark')}
        onOpenPrologue={() => { setPrologueOpen(true); setActiveRail('origins') }}
      />
      <SideRail active={activeRail} onSelect={handleRail} />

      <main
        className={`atlas ${selectedNode || discoveryOpen || progressOpen ? 'has-detail' : ''}`}
      >
        <ReactFlow<ResearchFlowNode, CausalFlowEdge>
          nodes={renderedNodes}
          onNodesChange={onNodesChange}
          onlyRenderVisibleElements
          edges={flowEdges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodeClick={onNodeClick}
          onNodeDragStop={(_event, node) => setNodePosition(chapter === 'branches' && phylogeny[node.id] ? `branches:${node.id}` : node.id, node.position)}
          minZoom={0.25}
          maxZoom={1.8}
          defaultViewport={{ x: -80, y: 240, zoom: 0.65 }}
          nodesDraggable={!timeline}
          nodesConnectable={false}
          elementsSelectable
          proOptions={{ hideAttribution: true }}
          fitView
          fitViewOptions={{ padding: 0.18, maxZoom: 0.82 }}
        >
          <Background variant={BackgroundVariant.Dots} gap={28} size={1} color={theme === 'light' ? '#8f9b95' : '#52605b'} />
          <Controls position="bottom-left" showInteractive={false} />
          {timeline && <div className="timeline-banner"><ClockMark /><span>CHRONOLOGY VIEW</span><strong>Causality remains visible across time</strong></div>}
        </ReactFlow>

        <div className="atlas-atmosphere" aria-hidden="true" />
        <div className="canvas-vignette" />
        <div className="atlas-caption"><span><Crosshair size={13} /> {chapters.find((item) => item.id === chapter)?.hint.toUpperCase()}</span><strong>{traceMode ? `TRACING ${traceMode.toUpperCase()}` : 'CAUSAL MAP'}</strong></div>
        <div className="chapter-bar" role="tablist" aria-label="Map chapters">
          {chapters.map((item) => <button key={item.id} type="button" role="tab" aria-selected={chapter === item.id} title={item.hint} onClick={() => { setChapter(item.id); window.setTimeout(() => fitView({ padding: 0.18, duration: 600, maxZoom: 0.9 }), 30) }}>{item.label}</button>)}
        </div>
        <Legend visibleFlows={visibleIdeaFlows} onToggleFlow={(flow) => setVisibleIdeaFlows((current) => current.includes(flow) ? current.filter((item) => item !== flow) : [...current, flow])} />
        <div className="canvas-tools">
          <button onClick={() => fitView({ padding: 0.18, duration: 700, maxZoom: 0.9 })}><Focus size={15} /> Fit map</button>
          <button onClick={() => selectedNode && travelTo(selectedNode.id)}><LocateFixed size={15} /> Focus</button>
          <button onClick={() => { resetNodePositions(); window.setTimeout(() => fitView({ padding: 0.18, duration: 700, maxZoom: 0.9 }), 20) }} disabled={timeline || !hasCustomLayout} title="Restore every moved node to its curated position"><RotateCcw size={14} /> Restore nodes</button>
        </div>
        {introVisible && <div className="intro-toast"><span>THE MAP IS ALIVE</span><p>Drag empty space to travel · drag discoveries to arrange · scroll to zoom</p></div>}
      </main>

      {selectedNode && !progressOpen && !discoveryOpen && <DetailPanel
        key={selectedNode.id}
        node={selectedNode}
        note={notes[selectedNode.id] ?? selectedNode.notes ?? ''}
        status={statusOf(selectedNode)}
        onClose={() => { setSelectedId(''); setTraceMode(null) }}
        onStatus={(status) => setStatus(selectedNode.id, status)}
        onNote={(note) => setNote(selectedNode.id, note)}
        onTrace={handleTrace}
        connections={selectedConnections}
      />}
      {progressOpen && <ProgressPanel nodes={allNodes} statuses={statuses} onClose={() => setProgressOpen(false)} />}
      {discoveryOpen && <PaperDiscoveryPanel selectedNode={selectedNode} onClose={() => setDiscoveryOpen(false)} onImport={importPaper} />}
      {searchOpen && <SearchPalette nodes={allNodes.filter((node) => !fog || statusOf(node) !== 'locked')} onClose={() => setSearchOpen(false)} onSelect={travelTo} />}
      {prologueOpen && <Prologue onEnter={enterAtlas} theme={theme} onToggleTheme={() => setTheme((value) => value === 'dark' ? 'light' : 'dark')} />}
    </div>
  )
}

function ClockMark() {
  return <div className="clock-mark"><i /><i /><i /></div>
}

export default App
