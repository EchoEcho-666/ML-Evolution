# ML Civilization — project-focus decision

**Updated:** 2026-09-24
**Decision status:** provisional recommendation; student decision pending

## Decision

The current leading candidate is:

> **Hybrid equation-aware world models for physical systems under regime shift.**

In practical terms, the first milestone reproduces a matched data-only versus physics-constrained comparison under a held-out parameter. A distinct semester contribution then needs to explain or improve transfer beyond that established comparison; the compact symbolic residual is the current candidate for that step.

This is a deliberately narrow candidate inside **AI for Physics**, not a final commitment or a claim that AI for Physics as a whole is solved. The student will confirm or replace it after checking personal interest, course constraints, compute, and benchmark feasibility on 2026-09-25.

## Why this wins

AI for Physics is the best fit for the meeting and the next research phase because it combines:

- a clear historical atlas: symbolic regression, energy-based models, reservoirs, graph simulators, neural operators, and scientific foundation models;
- a consequential frontier problem: reliable scientific prediction outside the training distribution;
- mature baselines and known equations that make causal claims more defensible;
- a small-scale experiment that can succeed or fail using measurable diagnostics; and
- a negative-result path: if physics constraints do not improve regime transfer, that is still a useful finding.

World models remain the strongest conceptual comparator. They connect directly to embodied intelligence and predictive representations, but their decisive evaluation—causal usefulness of long-horizon latent rollouts—is harder to isolate with limited compute and data. Bounded RSI is highly consequential, but its result depends heavily on evaluator design, hidden regressions, and resource accounting. The four additional comparators remain in the decision matrix so the selection is not biased toward the three initial interests.

## Common scoring rubric

Each criterion is scored from 1 to 5. Scores are evidence-backed research judgments, not measurements of field importance.

| Criterion | Meaning | Baseline weight |
| --- | --- | ---: |
| Under-exploration | Is an important synthesis or evaluation gap still open? | 1 |
| Frontier relevance | Does it connect to a consequential active problem? | 1 |
| Tractability | Can this project be completed with available resources? | 1 |
| Evidence quality | Are primary sources and reliable baselines available? | 1 |
| Atlas fit | Does it expose emergence, decline, survival, or revival? | 1 |
| Decisive evaluation | Can success/failure be measured without subjective demos? | 1 |
| Distinct contribution | Can the result be more than another general survey or benchmark? | 1 |

## Candidate comparison

| Candidate | Under | Frontier | Tractability | Evidence | Atlas | Evaluation | Distinct | Total | Decision |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| **AI for Physics — hybrid equation-aware model** | 4 | 5 | 4 | 5 | 5 | 5 | 4 | **32** | **Leading recommendation** |
| World models — intervention-aware evaluation | 4 | 5 | 3 | 4 | 5 | 3 | 4 | 28 | Defer, retain as close comparator |
| Bounded RSI / automated research | 4 | 5 | 3 | 3 | 5 | 3 | 4 | 27 | Defer |
| Verifiable reasoning and inference-time search | 3 | 5 | 4 | 5 | 4 | 5 | 3 | 29 | Retain as comparator |
| Continual and memory-augmented learning | 4 | 5 | 4 | 4 | 5 | 4 | 3 | 29 | Retain as comparator |
| Causal and neuro-symbolic learning | 4 | 4 | 4 | 4 | 5 | 4 | 4 | 29 | Retain as comparator |
| Efficient/physical computing | 4 | 5 | 2 | 4 | 5 | 5 | 3 | 28 | Retain as comparator |

### Interpreting the scores

- **AI for Physics scores high on evaluation and evidence** because equations, invariants, numerical solvers, and controlled distribution shifts provide independent checks.
- **World models lose points on evaluation and tractability**, not on importance. Visual, latent, and action-level performance can disagree, and long-horizon causal testing is expensive.
- **RSI loses points on evidence and evaluation** because the loop can optimize its evaluator, and recent demonstrations are tightly benchmarked.
- **Verifiable reasoning** is a serious alternative with strong evaluation, but its cleanest gains occur in verifier-rich domains; it is less directly connected to the historical mechanism-survival question.
- **Continual learning** has strong atlas fit but too many competing definitions of memory, adaptation, and forgetting for a single first project.
- **Causal/neuro-symbolic learning** is close to the selected topic and may supply methods or baselines, but is broader and risks recreating the knowledge-engineering bottleneck.
- **Efficient/physical computing** has excellent atlas fit but hardware access and end-to-end energy measurement lower tractability.

## Sensitivity analysis

The winner should not depend on one arbitrary equal-weight choice. I tested three reasonable weighting regimes, keeping each score unchanged:

| Weighting regime | Most emphasized criteria | AI for Physics | Next best | Result |
| --- | --- | ---: | --- | --- |
| Equal baseline | All seven equal | 32 | Verifiable reasoning / continual / causal-neuro-symbolic at 29 | AI for Physics wins |
| Evaluation-heavy | Decisive evaluation ×2; evidence ×1.5 | 32.5 normalized | Verifiable reasoning, 30.1 | AI for Physics wins |
| Frontier-heavy | Frontier relevance ×2; tractability ×0.75 | 32.5 normalized | Verifiable reasoning / continual learning, 29.8 | AI for Physics wins |
| Atlas-heavy | Atlas fit ×2; under-exploration ×1.5 | 32.1 normalized | Continual / causal-neuro-symbolic, 29.6 | AI for Physics wins |

The “normalized” totals divide the weighted sum by the sum of weights and multiply by seven, so they remain comparable to the 35-point baseline. These perturbations are not a formal probabilistic model; they are a guard against selecting the winner because of one hidden preference. AI for Physics remains first because it is never weak on evidence, atlas fit, or decisive evaluation simultaneously.

## Research question

> Under a controlled physical parameter shift, can a compact symbolic residual correction improve a learned dynamical model's transfer and physical consistency beyond both a data-only model and the same model with a physics-residual loss, at comparable compute?

## Minimum experiment

The likely pilot is 1D viscous Burgers, which has a clear viscosity parameter and an official FNO baseline. First reproduce two matched models:

1. a data-driven neural operator or latent dynamics model;
2. the same model with one explicit conservation or equation constraint.

Hold architecture family, training trajectories, parameter budget, and optimization budget as constant as feasible. The primary test holds out one viscosity value. Measure held-out prediction error, physical consistency, in-distribution error, and total training plus inference compute. If the pilot works, add a compact symbolic correction fitted only on training residuals and test whether it improves the held-out regime. Long autoregressive rollouts require a separate time-stepping design; do not claim them from a model that predicts a fixed full trajectory.

The official PDEBench dataset and code provide a credible reference, but each full 1D Burgers HDF5 file is listed at about 7.7 GB. Downloading several complete files is a material setup cost. The official NeuralOperator library includes a 16-point mini Burgers dataset that can check the training pipeline, but it does not by itself establish viscosity-shift performance. Before confirming this benchmark, inspect the data-generation settings and establish a small reproducible subset or small generated dataset with a trusted numerical reference. [PDEBench dataset record](https://darus.uni-stuttgart.de/dataset.xhtml?persistentId=doi:10.18419/darus-2986&version=7.0), [PDEBench Burgers baseline commands](https://github.com/pdebench/PDEBench/blob/main/pdebench/models/run_forward_1D.sh), [NeuralOperator Burgers dataset documentation](https://neuraloperator.github.io/dev/_modules/neuralop/data/datasets/burgers.html).

### Novelty audit before commitment

A 2026 TU Delft thesis already compared the same FNO backbone with and without a PDE-residual loss on PDEBench Burgers and Darcy, including a held-out Burgers viscosity. It found that gains in ordinary accuracy did not guarantee gains under shift. This directly overlaps the two-model pilot, which should be described as replication and learning, not the novel semester result. Its released implementation used a CUDA cluster and three seeds. A separate 2026 study examined PINO training choices across several operators and PDEs. [TU Delft thesis](https://repository.tudelft.nl/record/uuid:bc293c72-0833-4df2-bd42-0aa63914ee23), [released code and limitations](https://github.com/samuekisde/fno-pino-data-efficiency), [PINO training study](https://arxiv.org/abs/2606.06164).

The original 32/35 score applies to the broader hybrid project, including the symbolic correction and controlled failure analysis. It does **not** establish that the two-model pilot alone is distinct. Confirm this focus only if a small benchmark and the third comparison fit the semester's compute and schedule; otherwise choose another focus or explicitly frame the course project as a replication study if that meets course expectations.

The later, expanded experiment may test new resolution or geometry, uncertainty calibration, and genuinely autoregressive rollouts.

## Success criterion

The pilot succeeds when both models run reproducibly on a predeclared split. The semester claim succeeds only if the symbolic correction improves a predeclared held-out-parameter metric beyond both pilot models without a material regression in ordinary accuracy, physical consistency, or compute. A negative result is useful if it identifies a repeatable failure mode and the implementation is independently checkable.

## Four-week milestone

### Week 1 — benchmark and baselines

- choose one PDE with public data and a trusted numerical reference;
- define train/test parameter splits before training;
- implement or reproduce the unconstrained baseline;
- freeze metrics, compute accounting, and failure criteria.

### Week 2 — physics-constrained model

- add one explicit conservation or residual constraint;
- run matched seeds and ablations;
- measure whether the constraint helps interpolation, extrapolation, or only optimization.

### Week 3 — symbolic correction and robustness

- repeat the primary comparison with matched seeds and fixed data splits;
- fit one compact correction to training residuals and freeze its complexity limit;
- inspect whether it changes held-out error, physical consistency, or compute.

### Week 4 — stress test and atlas integration

- evaluate the predeclared parameter and horizon shifts;
- report negative results and compute costs;
- connect the experiment to historical symbolic-regression, neural-operator, and hybrid-solver nodes;
- write a short reproducible report and decide whether the result merits a larger study.

## Risks and safeguards

| Risk | Safeguard |
| --- | --- |
| Physics term improves only the training distribution | Pre-register parameter, resolution, and horizon shifts |
| Symbolic residual overfits noise | Complexity penalty, held-out regimes, multiple seeds, and expression stability checks |
| Baseline is unfairly weak | Reproduce a standard implementation and tune all variants under the same budget |
| Improved accuracy hides instability | Report invariant error, rollout failure rate, and worst-case trajectories |
| Uncertainty claims are cosmetic | Use coverage/calibration metrics on held-out regimes and require abstention tests |
| Project becomes a generic benchmark | Keep the historical mechanism question explicit: when does inherited symbolic/physical structure survive under modern scale? |

## Deferred alternatives

World models, bounded RSI, verifiable reasoning, continual learning, causal/neuro-symbolic learning, and efficient/physical computing remain atlas branches and possible later projects. This comparison recommends one focus for a falsifiable semester plan; the student will confirm it against course constraints and personal interest.

## Meeting explanation

“I compared seven frontier candidates using the same seven criteria. AI for Physics currently leads at 32 out of 35, but that score belongs to the full hybrid project, not a simple two-model test. A recent thesis already compared a data-only operator with a physics-constrained one under a viscosity shift. I would use that comparison as my starting point, then test whether a compact symbolic correction adds reliable transfer without hiding error or compute costs. I am confirming that this fits my course requirements and available resources before I commit.”
