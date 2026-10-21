import type { ResearchEdge, ResearchNode } from '../types'

// A reading and experiment lineage, not a claim of direct citation or novelty.
export const researchLineagePositions: Record<string, { x: number; y: number }> = {
  'neural-operators': { x: 0, y: 180 },
  'pino': { x: 350, y: 0 },
  'self-improving-pino': { x: 700, y: -100 },
  'pino-training': { x: 1050, y: -100 },
  'mra-fno': { x: 700, y: 150 },
  'fno-discretization': { x: 350, y: 300 },
  'solver-artifact-learning': { x: 700, y: 430 },
  'emulator-superiority': { x: 1050, y: 430 },
  'weak-to-strong-gain': { x: 700, y: 710 },
  'hybrid-neural-world-models': { x: 1050, y: 710 },
  'hybrid-equation-aware-world-model': { x: 1050, y: 1000 },
  'scientific-ml-learning': { x: 1440, y: 300 },
}

const paper = (id: string, title: string, year: number, arxivId: string, summary: string, connection: string): ResearchNode => ({
  id, type: 'paper', title, year, arxivId, status: 'unread',
  subtitle: connection, summary,
  tags: ['physics', 'scientific-ml', 'research-lineage'],
  position: { x: 4400 + researchLineagePositions[id].x, y: researchLineagePositions[id].y },
  sourceUrl: `https://arxiv.org/abs/${arxivId}`, pdfUrl: `https://arxiv.org/pdf/${arxivId}`, dataSource: 'seed',
  limitations: ['The link describes a role in this project’s reading map; it does not establish personal mastery or a direct citation relationship.'],
})

export const researchLineageNodes: ResearchNode[] = [
  paper('pino', 'Physics-Informed Neural Operator', 2021, '2111.03794',
    'Combines operator learning with PDE constraints, including constraints at finer resolution than the training data.',
    'Physics as additional supervision'),
  paper('self-improving-pino', 'Can PINOs Self Improve?', 2023, '2311.13885',
    'Studies physics-guided self-training and pseudo-label schedules for Burgers and Darcy. Reusing predictions needs an independent accuracy check in our setting.',
    'When can pseudo-labels help?'),
  paper('pino-training', 'On the Training of PINOs', 2026, '2606.06164',
    'Examines architecture, optimizer, loss balance and collocation sampling. A poor physics-loss result can have optimization and discretization explanations.',
    'Separate training effects from label effects'),
  {
    id: 'mra-fno', type: 'paper', title: 'Multi-Resolution Active Learning of FNOs', year: 2024, status: 'unread',
    subtitle: 'Cost-aware acquisition is established prior art',
    summary: 'Selects input functions and simulation resolutions with utility-cost acquisition and cost annealing. This is published prior art for simulation-data acquisition.',
    tags: ['physics', 'scientific-ml', 'research-lineage'], position: { x: 5100, y: 150 },
    sourceUrl: 'https://proceedings.mlr.press/v238/li24k.html', pdfUrl: 'https://proceedings.mlr.press/v238/li24k/li24k.pdf', dataSource: 'seed',
  },
  paper('fno-discretization', 'Discretization Error of FNOs', 2024, '2405.02221',
    'Analyzes error from discretizing the neural operator, with convergence linked to input regularity. This is distinct from error already present in solver-generated labels.',
    'Operator-grid error differs from label error'),
  paper('solver-artifact-learning', 'The Illusion of Learning', 2024, '2411.15101',
    'What You See is Not What You Get: Neural Partial Differential Equations and The Illusion of Learning. Demonstrates learned numerical artifacts and extrapolation problems in NeuralPDE settings.',
    'Models can inherit numerical artifacts'),
  paper('emulator-superiority', 'Neural Emulator Superiority', 2025, '2510.23111',
    'Shows neural emulators can outperform their solver training source in specific PDE regimes. This motivates asking when errors are filtered or copied rather than assuming either outcome.',
    'Filtering and copying depend on the setting'),
  paper('weak-to-strong-gain', 'Quantifying Weak-to-Strong Gain', 2024, '2405.15116',
    'Connects weak-to-strong improvement to student–teacher misfit under stated assumptions. Its assumptions matter when considering applications beyond the original setting.',
    'A mechanism to test, with explicit assumptions'),
  paper('hybrid-neural-world-models', 'Hybrid Neural World Models', 2026, '2605.28317',
    'Uses a consistency-derived error map to support solver fallback. Reliability control is related to, but different from, improving the training labels; fallback quality still matters.',
    'A neighboring reliability intervention'),
  {
    id: 'scientific-ml-learning', type: 'concept', title: 'Scientific ML: Learning and Exploration',
    subtitle: 'A developing understanding · published reading map', year: 2026, status: 'reading',
    summary: 'I am building my understanding of scientific machine learning, including training data, physical constraints, numerical methods and reliable evaluation. Solver-error inheritance is one topic within that wider exploration.',
    motivation: 'Learn how to ask useful scientific questions and assess evidence while developing the ability to lead rigorous research with people and AI.',
    contribution: 'This public map records learning interests and connections between published work. It does not represent a complete project statement or a claim of personal mastery.',
    limitations: ['Understanding is still developing.', 'Unpublished methods, results and detailed next experiments are withheld from this public view.'],
    tags: ['physics', 'scientific-ml', 'research-lineage', 'learning-overview'],
    position: { x: 5840, y: 300 }, sourceUrl: 'research/current-study.html', dataSource: 'seed',
  },
]

export const researchLineageEdges: ResearchEdge[] = [
  { id: 'study-fno-pino', source: 'neural-operators', target: 'pino', type: 'EXTENDS', confidence: 'documented', explanation: 'PINO explicitly builds on FNO and adds PDE constraints.' },
  { id: 'study-pino-self', source: 'pino', target: 'self-improving-pino', type: 'EXTENDS', confidence: 'documented', explanation: 'Studies self-training and pseudo-label schedules in physics-informed operator learning.' },
  { id: 'study-pino-training', source: 'pino', target: 'pino-training', type: 'EVALUATES', confidence: 'documented', explanation: 'Studies the PINO training pipeline, not just the accuracy of its input labels.' },
  { id: 'study-fno-mra', source: 'neural-operators', target: 'mra-fno', type: 'EXTENDS', confidence: 'documented', explanation: 'MRA-FNO adds probabilistic multi-resolution acquisition with explicit utility-cost selection.' },
  { id: 'study-fno-grid', source: 'neural-operators', target: 'fno-discretization', type: 'EVALUATES', confidence: 'documented', explanation: 'Analyzes the grid discretization error of the FNO architecture.' },
  { id: 'study-copy-filter', source: 'solver-artifact-learning', target: 'emulator-superiority', type: 'MOTIVATES', confidence: 'inferred', explanation: 'Contrasting settings motivate a conditional question: when are numerical errors copied or filtered? This is a conceptual comparison, not a contradiction or citation check.' },
  ...['mra-fno', 'fno-discretization', 'solver-artifact-learning', 'emulator-superiority', 'weak-to-strong-gain', 'pino-training', 'self-improving-pino', 'hybrid-neural-world-models', 'hybrid-equation-aware-world-model'].map((source): ResearchEdge => ({
    id: `study-input-${source}`, source, target: 'scientific-ml-learning', type: 'INSPIRES', confidence: 'inferred',
    explanation: source === 'hybrid-equation-aware-world-model'
      ? 'Scientific research practice is part of this developing learning journey; no unpublished study details are provided.'
      : 'A learning connection between published material and current interests, not a claim of direct citation or completed personal understanding.',
  })),
]
