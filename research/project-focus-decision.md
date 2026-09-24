# ML Civilization — project-focus decision

**Updated:** 2026-09-22
**Decision status:** provisional recommendation; student decision pending

## Decision

The current leading candidate is:

> **Hybrid equation-aware world models for physical systems under regime shift.**

In practical terms, the project will test whether adding explicit physical constraints and a compact symbolic residual to a learned dynamics/operator model improves transfer to unseen parameters, resolution, and rollout horizons without hiding regressions in ordinary accuracy, stability, uncertainty calibration, or compute.

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
| **AI for Physics — hybrid equation-aware model** | 4 | 5 | 4 | 5 | 5 | 5 | 4 | **32** | **Selected** |
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

> Under controlled regime shift, when do physics constraints and compact symbolic residuals improve a learned dynamical model's transfer, stability, and uncertainty calibration compared with a matched data-driven model?

## Minimum experiment

Use one open PDE or dynamical-system benchmark with controllable parameters, such as reaction–diffusion, shallow water, or 2D Navier–Stokes. Compare three matched models:

1. a data-driven neural operator or latent dynamics model;
2. the same model with explicit conservation/physics constraints; and
3. the same model with a compact symbolic residual correction discovered from training residuals.

Hold architecture family, training trajectories, parameter budget, and optimization budget as constant as feasible. Test:

- unseen physical parameters;
- unseen spatial resolution or geometry;
- longer rollout horizons;
- invariant/conservation error;
- uncertainty calibration and coverage;
- in-distribution accuracy;
- total training plus inference compute; and
- failure detection or abstention outside the training support.

## Success criterion

The hybrid is a success only if it improves a predeclared out-of-distribution criterion—such as long-horizon error, invariant violation, or calibrated coverage—without a material regression in in-distribution accuracy, stability, compute, or uncertainty reliability. A result that improves only training-distribution error is not sufficient.

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

### Week 3 — symbolic residual

- fit a compact symbolic correction to residual dynamics;
- compare sparse/library choices and prevent test leakage;
- inspect whether the expression is stable across seeds and training regimes.

### Week 4 — stress test and atlas integration

- evaluate hidden parameter/resolution/horizon shifts;
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

Deferral is not rejection. World models, bounded RSI, verifiable reasoning, continual learning, causal/neuro-symbolic learning, and efficient/physical computing remain atlas branches and may provide methods, evaluation designs, or future projects. The current research project has exactly one focus so that the meeting can present a falsifiable plan rather than a list of interests.

## Meeting explanation

“I compared seven frontier candidates using the same seven criteria. AI for Physics currently leads at 32 out of 35, ahead of world models at 28 and bounded recursive self-improvement at 27, with four additional frontiers retained as comparators. I am treating that as a recommendation while I check my own interests, course constraints, and compute. The candidate project asks when physical constraints improve a learned model under regime shift; its first version can compare a data-only operator with a constrained version. If they do not improve, that negative result is still informative.”
