import { BookOpen, BrainCircuit, CircleHelp, FlaskConical, Lightbulb, TriangleAlert } from 'lucide-react'
import type { IdeaFlow } from '../types'

const flows: { id: IdeaFlow; label: string }[] = [
  { id: 'survival', label: 'Survival' },
  { id: 'merger', label: 'Merger' },
  { id: 'migration', label: 'Migration' },
  { id: 'extinction', label: 'Extinction / stagnation' },
]

export function Legend({ visibleFlows, onToggleFlow }: { visibleFlows: IdeaFlow[]; onToggleFlow: (flow: IdeaFlow) => void }) {
  return (
    <div className="legend-panel">
      <div className="legend-title">MAP KEY</div>
      <div className="legend-items">
        <span><BookOpen />Paper</span><span><BrainCircuit />Concept</span><span><FlaskConical />Mechanism</span>
        <span><TriangleAlert />Problem</span><span><CircleHelp />Question</span><span><Lightbulb />Research idea</span>
        <i className="legend-divider" />
        {flows.map((flow) => <button key={flow.id} type="button" className={`flow-key ${flow.id}`} aria-pressed={visibleFlows.includes(flow.id)} onClick={() => onToggleFlow(flow.id)}>{flow.label}</button>)}
      </div>
    </div>
  )
}
