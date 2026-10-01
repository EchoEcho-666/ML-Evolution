import { useMemo, useState } from 'react'
import { BookMarked, ChevronDown, CircleDotDashed, ExternalLink, FileText, GitFork, Network, PanelRightClose, Route, Save, SearchCheck, UsersRound } from 'lucide-react'
import type { ExplorationStatus, ResearchEdge, ResearchNode } from '../types'
import { citationLabels, confidenceLabels, nodeTypeLabels, statusLabels } from '../data/researchGraph'

interface DetailPanelProps {
  node: ResearchNode
  note: string
  status: ExplorationStatus
  onClose: () => void
  onStatus: (status: ExplorationStatus) => void
  onNote: (note: string) => void
  onTrace: (mode: 'all' | 'ancestors' | 'descendants' | 'unresolved') => void
  connections: { edge: ResearchEdge; outgoing: boolean; otherTitle: string }[]
}

const availableStatuses: ExplorationStatus[] = ['unread', 'reading', 'understood', 'mastered', 'current-research']

function Section({ title, children, open = false }: { title: string; children?: React.ReactNode; open?: boolean }) {
  const [expanded, setExpanded] = useState(open)
  if (!children) return null
  return (
    <section className={`detail-section ${expanded ? 'open' : ''}`}>
      <button onClick={() => setExpanded(!expanded)}><span>{title}</span><ChevronDown size={15} /></button>
      {expanded && <div className="section-content">{children}</div>}
    </section>
  )
}

function List({ values }: { values?: string[] }) {
  if (!values?.length) return null
  return <ul>{values.map((value) => <li key={value}>{value}</li>)}</ul>
}

export function DetailPanel({ node, note, status, onClose, onStatus, onNote, onTrace, connections }: DetailPanelProps) {
  const [draftNote, setDraftNote] = useState(note)
  const authorLine = useMemo(() => node.authors?.join(', '), [node.authors])

  return (
    <aside className="detail-panel">
      <div className="detail-scroll">
        <div className="detail-actions"><span>{nodeTypeLabels[node.type]}</span><button onClick={onClose} aria-label="Close details"><PanelRightClose size={18} /></button></div>
        <div className="detail-hero">
          <div className="detail-era"><span>{node.year ?? 'ONGOING'}</span><i /><span>{node.venue ?? nodeTypeLabels[node.type]}</span></div>
          <h1>{node.title}</h1>
          <p>{node.subtitle}</p>
          {authorLine && <div className="authors"><UsersRound size={14} /><div>{authorLine}</div></div>}
        </div>

        <div className="status-control">
          <label>Exploration state</label>
          <div className="select-wrap"><CircleDotDashed size={14} /><select value={status} onChange={(event) => onStatus(event.target.value as ExplorationStatus)}>
            {[...new Set([status, ...availableStatuses])].map((value) => <option key={value} value={value}>{statusLabels[value]}</option>)}
          </select><ChevronDown size={14} /></div>
        </div>

        <div className="trace-actions">
          <button onClick={() => onTrace('ancestors')}><Route size={15} /><span>Why it exists<small>Trace prerequisites</small></span></button>
          <button onClick={() => onTrace('descendants')}><GitFork size={15} /><span>What followed<small>Show descendants</small></span></button>
          <button onClick={() => onTrace('unresolved')}><SearchCheck size={15} /><span>Open questions<small>Find the frontier</small></span></button>
        </div>

        <div className="detail-summary"><span>IN BRIEF</span><p>{node.summary}</p></div>

        {(node.doi || node.sourceUrl || node.pdfUrl) && <div className="source-links">
          <span>PRIMARY SOURCES</span>
          <div>
            {node.doi && <a href={`https://doi.org/${node.doi}`} target="_blank" rel="noreferrer"><ExternalLink size={12} /> DOI</a>}
            {node.sourceUrl && <a href={node.sourceUrl} target="_blank" rel="noreferrer"><ExternalLink size={12} /> Publisher</a>}
            {node.pdfUrl && <a href={node.pdfUrl} target="_blank" rel="noreferrer"><FileText size={12} /> Open PDF</a>}
          </div>
          {node.dataSource && node.dataSource !== 'seed' && <small>Metadata imported from {node.dataSource}. Relationship interpretation remains yours.</small>}
        </div>}

        <div className="sections">
          <Section title="Why this existed" open>{node.motivation && <p>{node.motivation}</p>}</Section>
          <Section title="Previous limitation">{node.previousLimitation && <p>{node.previousLimitation}</p>}</Section>
          <Section title="Core mechanism">{node.mechanism && <p>{node.mechanism}</p>}</Section>
          <Section title="Contribution">{node.contribution && <p>{node.contribution}</p>}</Section>
          <Section title="What it improved"><List values={node.improvements} /></Section>
          <Section title="New limitations"><List values={node.limitations} /></Section>
          <Section title="Assumptions"><List values={node.assumptions} /></Section>
          <Section title="Evidence"><List values={node.evidence} /></Section>
          <Section title="Missing evidence"><List values={node.missingEvidence} /></Section>
          <Section title="Later consequences"><List values={node.laterConsequences} /></Section>
          <Section title="Open questions" open><List values={node.openQuestions} /></Section>
          <Section title="Connections and evidence">{connections.length > 0 && <ul className="connection-list">
            {connections.map(({ edge, outgoing, otherTitle }) => <li key={edge.id}>
              <div><span>{outgoing ? '→' : '←'}</span> <strong>{otherTitle}</strong> <em>{edge.ideaFlow ? `${edge.ideaFlow} · ` : ''}{edge.type.replaceAll('_', ' ').toLowerCase()}</em></div>
              <div className="connection-evidence">
                <span className={`badge conf-${edge.confidence ?? 'unreviewed'}`}>{edge.confidence ? confidenceLabels[edge.confidence] : 'Unreviewed'}</span>
                {edge.citation && <span className={`badge cite-${edge.citation.status}`}>{citationLabels[edge.citation.status]}{edge.citation.coCitedBy ? ` · ${edge.citation.coCitedBy}` : ''}</span>}
              </div>
            </li>)}
          </ul>}</Section>
        </div>

        <div className="notes-editor">
          <div className="notes-title"><span><BookMarked size={14} /> MY NOTES</span>{draftNote !== note && <em>Unsaved</em>}</div>
          <textarea value={draftNote} onChange={(event) => setDraftNote(event.target.value)} placeholder="Record an interpretation, caveat, or connection…" />
          <button onClick={() => onNote(draftNote)}><Save size={13} /> Save note</button>
        </div>

        <button className="trace-lineage" onClick={() => onTrace('all')}><Network size={15} /> Trace full research lineage</button>
      </div>
    </aside>
  )
}
