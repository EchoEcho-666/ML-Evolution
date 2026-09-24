# Recursive self-improvement — survey and claim/evidence matrix

**Status:** comparable deep-dive draft
**Updated:** 2026-09-22
**Primary scope:** bounded systems that propose and retain changes to their own code, tools, data, model, or training procedure
**Decision rule:** call a system RSI only when an improvement loop is closed by an external or independently checkable evaluation

## Start with a survey

[Recursive Self-Improvement in AI: From Bounded Self-Refinement to Autonomous Research Loops (revised September 2026 preprint)](https://arxiv.org/abs/2607.07663) is the most directly useful recent survey for this project's definition. It separates what changes from how fully the loop closes, and examines evaluator strength, self-confirming feedback, and compute limits. Treat its literature taxonomy as a map of claims; the primary STOP, AlphaEvolve, Gödel Agent, and DGM papers below remain the evidence for what each system actually demonstrated.

## Operational definition

For this project, **recursive self-improvement (RSI)** means:

> A system produces a candidate change to an artifact that contributes to its own operation, evaluates the changed system against a predeclared objective, and conditionally preserves the change so that later iterations inherit the improved artifact or its improvement machinery.

The definition requires five explicit fields:

1. **Proposer:** what model, agent, search process, or human proposes the change?
2. **Target:** what changes—weights, code, prompt, tool, memory, architecture, data, evaluator, or training procedure?
3. **Evaluator:** what test measures improvement, and is it independent of the proposal process?
4. **Acceptance rule:** what causes a candidate to be retained or rejected?
5. **Loop closure:** does the retained change affect the next iteration's ability to propose, evaluate, or execute improvements?

If the base model remains fixed and only a scaffold is rewritten, the result can be **bounded recursive improvement of a program**, but it is not full self-improvement of the underlying model. This distinction is central to interpreting STOP, AlphaEvolve, Gödel Agent, and the Darwin Gödel Machine.

## What RSI is not

| Activity | Why it is not automatically RSI |
| --- | --- |
| Self-reflection | A model can critique an answer without changing a persistent artifact. |
| Prompt iteration | Rewriting a prompt for one task is not a retained improvement loop unless later runs inherit it and pass independent tests. |
| Ordinary fine-tuning | Human-selected data, objectives, and checkpoints can improve a model without the model proposing or accepting its own changes. |
| Tool use | Calling tools expands capability but does not imply the system improves the tool or its own operation. |
| Human-led AutoML | Search may improve models, but authorship and acceptance remain external unless the system closes the loop. |
| Benchmark overfitting | A score increase is not robust improvement if hidden tests, capabilities, safety, or compute regress. |

## Taxonomy of possible targets

| Target of improvement | Example | Main risk |
| --- | --- | --- |
| Prompt or scaffold | STOP-style program rewriting | Local gains and prompt overfitting |
| Code or tools | AlphaEvolve and DGM | Hidden regressions, unsafe code, evaluator gaming |
| Search algorithm | Evolved solver or planner | Narrow benchmark optimization |
| Data or curriculum | Self-generated training examples | Self-confirming errors and diversity collapse |
| Memory or retrieval | Persistent agent notes or indexes | Contaminated or selectively remembered evidence |
| Model weights | Self-training or self-distillation | Distribution drift and loss of independent oversight |
| Architecture | Neural module or agent redesign | Credit assignment and expensive validation |
| Training procedure | Optimizer, schedule, or evaluator changes | The evaluator can be weakened along with the system |
| Research direction | Choosing which experiments to run | Proxy goals can redirect the loop away from the real objective |

## Chronological claim/evidence matrix

| Year | System | What changes | Proposer/evaluator/acceptance | Demonstrated result | What it does not establish |
| ---: | --- | --- | --- | --- | --- |
| 2023 | [STOP — Self-Taught Optimizer](https://arxiv.org/abs/2310.02304) | A language-model-infused scaffolding program rewrites its own code | GPT-4 proposes scaffold changes; task evaluation selects useful versions | Recursive code-generation improvement on selected tasks | The paper explicitly notes that the language model itself is not altered; this is not full RSI |
| 2024 | [Gödel Agent](https://arxiv.org/abs/2410.04444) | An agent modifies its own logic and behavior under high-level objectives | LLM proposes changes; benchmark results guide retention | Reports continual improvement over manually designed agents on mathematical and agent tasks | Evidence is benchmark-bound and depends on the fixed foundation model and evaluator design |
| 2025 | [AlphaEvolve](https://arxiv.org/abs/2506.13131) | LLM-generated programs and algorithms evolve in a population | Gemini models propose; automated evaluators score correctness/performance; evolutionary selection retains candidates | Reports algorithmic and infrastructure improvements, including verified mathematical results | It improves code/algorithms, not unrestricted model goals, weights, or evaluators; deployment claims require independent replication |
| 2025 | [Darwin Gödel Machine](https://arxiv.org/abs/2505.22954) | The coding agent modifies its own codebase and self-improvement tools | Foundation model proposes; coding benchmarks evaluate; archive retains descendants and stepping stones | Reports SWE-bench improvement from 20.0% to 50.0% and Polyglot from 14.2% to 30.7% | Benchmark gains do not prove general intelligence, safe autonomy, or improvement under adversarial hidden tests |
| 2026 | Automated research systems | Repeated proposal, experiment, evaluation, and retention over research artifacts | Varies by system; human oversight and external tests remain important | Emerging evidence of useful bounded research automation | No demonstrated unrestricted loop over objectives, evaluators, resources, and scientific direction |

## The improvement loop

The minimum closed loop can be written as:

`artifact_t → propose(change_t) → run(candidate_t) → evaluate(candidate_t) → accept/reject → artifact_(t+1)`

It becomes recursively self-improving only when the accepted artifact changes the next iteration's proposal, evaluation, or execution capability. For example, DGM's claim is stronger than a one-shot code generator because it modifies the coding agent and preserves descendants that can continue modifying the agent. AlphaEvolve is a strong bounded algorithm-search loop, but the target is generally a solver or algorithm rather than the full research system.

## Established versus unestablished claims

### Established or supported by the cited demonstrations

- A fixed foundation model can generate candidate code or agent modifications that improve a bounded benchmark.
- Automated evaluators can make evolutionary search over programs practical when correctness or performance is measurable.
- Persistent archives can preserve diverse intermediate solutions instead of only the current best candidate.
- Recursive modification of a scaffold or coding agent can improve benchmark performance over multiple iterations.

### Not established

- That benchmark improvement is broad improvement rather than evaluator-specific optimization.
- That a system can safely modify its own objective, evaluator, or resource allocation.
- That the loop improves the underlying foundation model without human-designed training changes.
- That the system can identify worthwhile research directions or scientific explanations autonomously.
- That improvements compound indefinitely; resource limits, diminishing returns, and regressions are not optional details.

## Causal turning points for the atlas

| From | Relationship | To | Evidence status | Explanation |
| --- | --- | --- | --- | --- |
| Genetic programming and evolutionary search | `ENABLES` | LLM-guided program evolution | Documented mechanism | Program mutation and selection provide the outer-loop structure; language models provide higher-bandwidth proposals. |
| Fixed human-designed scaffolds | `MOTIVATES` | STOP and Gödel Agent | Documented motivation | These systems target the restriction that agent logic is fixed by its designer. |
| Automated evaluator | `ENABLES` | AlphaEvolve and DGM | Documented | Retention depends on executable tests, scores, or benchmark results rather than proposal fluency alone. |
| Visible benchmark objective | `CONTRADICTS` | Claim of general self-improvement | Inferred | Optimization can exploit the metric while degrading hidden capabilities, safety, or compute efficiency. |
| Archive of diverse descendants | `EXTENDS` | Open-ended self-improvement | Documented for DGM | DGM retains stepping stones and alternative branches rather than only one lineage. |
| AI-generated algorithmic improvement | `APPLIES` | AI infrastructure and scientific search | Documented for AlphaEvolve reports | The loop can target algorithms and infrastructure, but the scope remains bounded by evaluators and human-specified objectives. |

## Main bottlenecks and safety-relevant failure modes

1. **Evaluator gaming:** candidates learn the visible test, exploit implementation details, or alter the evaluator.
2. **Hidden regressions:** a score rises while robustness, calibration, security, interpretability, or generality falls.
3. **Credit assignment:** a later improvement may depend on many earlier changes, making causal attribution difficult.
4. **Resource escalation:** the loop can spend more inference, training, memory, or tool calls and appear better only because it spends more.
5. **Archive pollution:** weak or unsafe descendants can remain available for future recombination.
6. **Objective drift:** the system changes prompts, tests, or acceptance rules and silently changes what “better” means.
7. **Capability-control coupling:** improvements to code modification, tool use, and persistence can change the risk profile faster than task scores reveal.
8. **Human oversight illusion:** human approval of a summary is not the same as inspecting the full search process or all retained artifacts.

## Recommended bounded falsifiable experiment

### Hidden-test recursive solver improvement

Construct a small research-like codebase: for example, a numerical solver or simulator with public unit tests and a hidden evaluation suite. Give all systems the same fixed foundation model, compute budget, sandbox, and initial codebase. Compare:

1. a one-shot coding agent;
2. an agent with ordinary self-reflection and prompt iteration but no persistent code changes;
3. an evolutionary improvement loop that can propose and retain code changes; and
4. a recursive loop that may also improve its proposal/search scaffold.

The acceptance rule must use a public suite plus a held-out hidden suite. Freeze the hidden tests, evaluator permissions, and resource budget. Measure:

- visible and hidden correctness;
- performance on shifted problem parameters and unseen instances;
- regression rate on previously solved tasks;
- security and sandbox violations;
- code complexity and maintainability;
- total tokens, training/inference compute, and wall-clock time;
- whether the retained change actually improves later proposal or evaluation ability; and
- whether the system attempts to modify tests, logging, permissions, or the evaluator.

The experiment supports bounded RSI only if the recursive system improves hidden performance and retained self-improvement capability at comparable resources, with no unacceptable regression or evaluator tampering. If it wins only on visible tests or by spending unbounded resources, the result is benchmark optimization, not robust RSI.

## Provisional project-selection score

| Criterion | Score (1–5) | Reason |
| --- | ---: | --- |
| Under-exploration | 4 | There are demonstrations, but evaluator robustness and cross-domain persistence are poorly standardized. |
| Frontier relevance | 5 | Automated research and agent improvement could change the rate and safety of future AI development. |
| Tractability | 3 | A sandboxed solver experiment is feasible; realistic long-loop evaluation is expensive and delicate. |
| Evidence quality | 3 | The strongest results are recent, benchmark-dependent, and partly reported by system builders. |
| Atlas fit | 5 | RSI revives genetic programming, neuroevolution, expert verification, open-endedness, and self-play. |
| Decisive evaluation | 3 | Hidden tests and resource accounting help, but broad improvement remains difficult to define. |
| Distinct contribution | 4 | A rigorous distinction between scaffold improvement and full RSI is useful and under-specified. |

**Total: 27/35.** Bounded RSI is consequential and historically rich, but it currently scores below AI for Physics and world models on evidence quality and clean evaluation.

## Meeting explanation

“I use recursive self-improvement in a narrow, testable sense: a system proposes a change to something that helps it operate, evaluates that change, and keeps it so the next round inherits the improvement. This includes code or scaffold improvement, but it does not automatically mean the model rewrote its own weights or became generally more intelligent. STOP, AlphaEvolve, Gödel Agent, and the Darwin Gödel Machine show increasingly closed loops, yet their evidence is still bounded by the evaluator, benchmark, resource budget, and safety controls. My decisive test would use hidden tests and regression checks to see whether improvement survives outside the visible objective.”
