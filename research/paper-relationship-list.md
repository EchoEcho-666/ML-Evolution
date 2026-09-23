# ML Civilization — paper and relationship import list

**Updated:** 2026-09-23
**Scope:** selected AI-for-Physics lineage plus world-model and bounded-RSI comparators
**Evidence rule:** documented edges include a source URL and a short evidence note; inferred edges are labelled explicitly.

## Node list

| ID | Title | Year | Type | Evidence status | Primary source |
| --- | --- | ---: | --- | --- | --- |
| genetic-programming | Genetic Programming | 1992 | concept | documented mechanism family | https://doi.org/10.7551/mitpress/3201.001.0001 |
| symbolic-regression | Symbolic Regression | 2009 | concept | documented | https://doi.org/10.1126/science.1165893 |
| neural-operators | Neural Operators | 2020 | concept | documented | https://arxiv.org/abs/2010.08895 |
| ai-for-physics | AI for Physics | 2023 | concept | synthesis node | https://doi.org/10.1126/science.adi2336 |
| world-models | World Models | 2018 | concept | documented | https://arxiv.org/abs/1803.10122 |
| intervention-aware-evaluation | Intervention and Regime Shift | 2026 | problem | proposed evaluation problem | https://arxiv.org/abs/2301.04104 |
| hybrid-equation-aware-world-model | Hybrid Equation-Aware World Model | 2026 | research-idea | selected project | https://arxiv.org/abs/2010.08895 |
| bounded-rsi | Bounded Recursive Self-Improvement | 2025 | concept | synthesis node | https://arxiv.org/abs/2505.22954 |
| stop | Self-Taught Optimizer | 2023 | paper | documented | https://arxiv.org/abs/2310.02304 |
| alphaevolve | AlphaEvolve | 2025 | paper | documented claim; builder-reported | https://arxiv.org/abs/2506.13131 |
| darwin-godel-machine | Darwin Gödel Machine | 2025 | paper | documented claim; benchmark-bound | https://arxiv.org/abs/2505.22954 |
| v-jepa-2 | V-JEPA 2 | 2025 | paper | documented claim; narrow deployment | https://ai.meta.com/research/publications/v-jepa-2-self-supervised-video-models-enable-understanding-prediction-and-planning/ |

## Typed relationships

The canonical predicates are: `MOTIVATES`, `EXTENDS`, `REPLACES`, `REVIVES`, `CONTRADICTS`, `ENABLES`, `APPLIES`, and `EVALUATES`.

| ID | Source node | Predicate | Target node | Evidence class | Source | Evidence note |
| --- | --- | --- | --- | --- | --- | --- |
| rel-001 | genetic-programming | ENABLES | symbolic-regression | documented mechanism | https://doi.org/10.1126/science.1165893 | Symbolic regression searches executable/structured expressions, inheriting program-search ideas from evolutionary computation. |
| rel-002 | symbolic-regression | ENABLES | ai-for-physics | documented | https://doi.org/10.1126/science.1165893 | Equation discovery supplies interpretable candidate laws for physical systems. |
| rel-003 | neural-operators | APPLIES | ai-for-physics | documented | https://arxiv.org/abs/2010.08895 | Fourier Neural Operator applies learned function-space mappings to parameterized PDE problems. |
| rel-004 | ai-for-physics | MOTIVATES | hybrid-equation-aware-world-model | inferred project synthesis | https://arxiv.org/abs/2010.08895 | The selected project tests whether physical structure improves regime-shift transfer rather than only interpolation. |
| rel-005 | world-models | MOTIVATES | intervention-aware-evaluation | documented problem synthesis | https://arxiv.org/abs/1803.10122 | Latent predictive control creates the need to test action consequences, not only observation prediction. |
| rel-006 | intervention-aware-evaluation | EVALUATES | world-models | proposed experiment | https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/ | Held-out actions, changed dynamics, and long horizons test limitations that visual consistency alone cannot establish. |
| rel-007 | hybrid-equation-aware-world-model | EXTENDS | world-models | project design | https://arxiv.org/abs/1803.10122 | The selected model adds equation-aware constraints and symbolic residuals to a predictive dynamics framework. |
| rel-008 | stop | EXTENDS | bounded-rsi | documented scope | https://arxiv.org/abs/2310.02304 | STOP demonstrates recursive improvement of a scaffolding program while explicitly not modifying the base language model. |
| rel-009 | alphaevolve | EXTENDS | bounded-rsi | documented claim | https://arxiv.org/abs/2506.13131 | AlphaEvolve combines model-generated programs, automated evaluators, and evolutionary retention. |
| rel-010 | darwin-godel-machine | EXTENDS | bounded-rsi | documented claim | https://arxiv.org/abs/2505.22954 | DGM modifies its coding-agent codebase and retains empirically successful descendants in an archive. |
| rel-011 | v-jepa-2 | EXTENDS | world-models | documented claim | https://ai.meta.com/research/publications/v-jepa-2-self-supervised-video-models-enable-understanding-prediction-and-planning/ | V-JEPA 2 adds action-conditioned latent planning to large-scale predictive video representations. |
| rel-012 | bounded-rsi | CONTRADICTS | intervention-aware-evaluation | inferred caution | https://arxiv.org/abs/2505.22954 | Self-improvement claims require hidden-regression and evaluator-tampering tests, not only visible benchmark gains. |

## Evidence-status semantics

- **Documented:** the source directly reports the relationship or method mechanism.
- **Documented claim; builder-reported:** the result is reported by the system authors or organization and should not be treated as independent replication.
- **Inferred project synthesis:** a research-design relationship derived from the surveys, not a historical claim that a paper explicitly made.
- **Proposed experiment:** an evaluation edge created by this project.

Negative evidence is retained in the source surveys: visual consistency does not establish causal accuracy; bounded code improvement does not establish unrestricted RSI; and in-distribution physical accuracy does not establish regime-shift reliability.

