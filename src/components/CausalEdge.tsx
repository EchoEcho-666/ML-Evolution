import { BaseEdge, getBezierPath, type Edge, type EdgeProps } from '@xyflow/react'
import type { CitationCheck, EdgeConfidence, EdgeType, IdeaFlow } from '../types'
import { citationLabels, confidenceLabels } from '../data/researchGraph'

export type CausalEdgeData = {
  relation: EdgeType
  explanation: string
  dimmed: boolean
  featured: boolean
  ideaFlow?: IdeaFlow
  confidence?: EdgeConfidence
  citation?: CitationCheck
}

export type CausalFlowEdge = Edge<CausalEdgeData, 'causal'>

export function CausalEdge({ id, source, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, markerEnd, data }: EdgeProps<CausalFlowEdge>) {
  const [path, labelX, labelY] = getBezierPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, curvature: 0.34 })
  const relation = data?.relation ?? 'EXTENDS'

  return (
    <g className={`causal-edge ${data?.dimmed ? 'is-dimmed' : ''} ${data?.featured ? 'is-featured' : ''} ${data?.ideaFlow ? `flow-${data.ideaFlow}` : ''} ${source === 'branch-survival-analysis' ? 'is-census' : ''} ${data?.confidence ? `conf-${data.confidence}` : ''}`}>
      <BaseEdge id={id} path={path} markerEnd={markerEnd} className="edge-visible" />
      <path d={path} className="edge-hitbox" fill="none" />
      <foreignObject x={labelX - 120} y={labelY - 44} width="240" height="88" className="edge-foreign">
        <div
          className="edge-label nodrag nopan"
        >
          <strong>{data?.ideaFlow ? `${data.ideaFlow} · ` : ''}{relation.replaceAll('_', ' ')}</strong>
          <span>{data?.explanation}</span>
          <span className="edge-evidence">
            <b>Judgment: {data?.confidence ? confidenceLabels[data.confidence] : 'Unreviewed'}</b>
            {data?.citation && <b>Citations: {citationLabels[data.citation.status]}{data.citation.coCitedBy ? ` · ${data.citation.coCitedBy} co-citing works` : ''}</b>}
          </span>
        </div>
      </foreignObject>
    </g>
  )
}
