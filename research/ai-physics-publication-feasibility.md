# AI for Physics project feasibility and publication path

**Updated:** 2026-09-25  
**Ideas assessed:** (A) a hybrid equation-aware world model and (B) bounded recursive improvement for automated physics research  
**Bottom line:** start with A, then reuse its benchmark for B. Neither broad label is a publishable contribution by itself.

## Decision

| Question | A. Hybrid equation-aware model | B. Automated physics research / bounded RSI |
| --- | --- | --- |
| Technically feasible for one student? | **Yes, if limited to one small PDE and three matched models.** | **Yes, if reframed as an evaluator study over a fixed solver repository.** A general autonomous physicist is not feasible. |
| Minimum honest claim | A symbolic residual helps, fails to help, or helps only in specified parameter shifts under matched compute. | Persistent agent changes survive hidden physics tests better (or no better) than one-shot and reflection baselines. |
| Workshop-paper chance after a clean study | **Moderate.** The area is crowded, so controls and a distinct shift/evaluation are essential. | **Moderate to good.** Evaluation leakage in scientific agents is timely, but sample size and API cost are real risks. |
| Main-conference chance in the first version | **Low.** One PDE and a modest correction are unlikely to clear a main-track novelty bar. | **Low.** A small agent wrapper or a few demonstrations are not enough. |
| Main risk | Prior work already combines neural PDE models, physics residuals, sparse regression, and symbolic discovery. | Calling workflow automation “RSI,” plus evaluator gaming, stochastic cost, and weak statistical power. |
| Recommendation | **Primary project.** | **Second paper built on the first project’s test harness.** |

These are planning judgments, not acceptance probabilities. Venue standards and reviewer pools change each year.

## Idea A — hybrid equation-aware world model

### What is feasible

A semester-scale implementation can use 1D viscous Burgers with a held-out viscosity and compare:

1. a data-only FNO or similarly small neural operator;
2. the same backbone with a PDE-residual loss; and
3. the same backbone with a compact symbolic correction fitted only from training residuals.

The two-model comparison is a replication baseline, not the paper contribution. Physics-informed neural operators already combine supervised operator learning with PDE residuals, and the local novelty space is getting crowded. Prior work includes [PINO](https://arxiv.org/abs/2111.03794), [symbolic discovery of hidden differential operators after neural fitting](https://arxiv.org/abs/2212.04630), [residual-based neural-operator correction](https://arxiv.org/abs/2210.03008), and a 2026 [Late Fusion Operator workshop paper](https://openreview.net/pdf?id=k05FaSEb8p) that combines neural-operator representations with sparse regression for parameterized-PDE extrapolation.

### Minimum publishable unit

For the lowest legitimate research-paper target, predeclare one shift and one primary metric, run at least three seeds, release the exact split and code, and include:

- the same backbone, parameter range, data, tuning budget, and stopping rule for all variants;
- an unseen-viscosity test separated from interpolation validation;
- ordinary prediction error, PDE residual or conservation error, train/inference cost, and worst-seed behavior;
- a non-symbolic learned residual baseline, so gains are not attributed to symbolic structure merely because an extra correction module was added;
- symbolic-complexity and expression-stability measurements across seeds; and
- a negative-result interpretation if the correction helps interpolation but not transfer.

One PDE can support a small workshop or tiny-paper result when the evaluation is unusually clean or exposes a reproducible failure. A stronger archival submission should add a second qualitatively different PDE or a second shift and show that the conclusion is not Burgers-specific.

### What would not be enough

- one seed;
- only in-distribution mean squared error;
- comparing an untuned baseline against a tuned hybrid;
- fitting the symbolic expression on held-out trajectories;
- claiming “physical discovery” when the true library or governing form was supplied; or
- calling a fixed full-trajectory predictor a long-horizon world model without autoregressive intervention tests.

### Publication ladder

1. **Technical report or arXiv preprint:** appropriate after the split, code, seeds, and ablations are complete; arXiv is dissemination, not peer review.
2. **Tiny/short or non-archival workshop paper:** the realistic first reviewed target. ICLR's 2026 workshop guidance explicitly encouraged tiny or short tracks, and the 2026 AI&PDE proposal used a 2–4 page tiny-paper format. The NeurIPS 2025 AI for Science workshop accepted 4–8 page original, benchmark, and work-in-progress submissions and was non-archival. The same ICLR guidance required tiny/short submissions to be primarily human-authored; use AI assistance only within the chosen venue's current policy and personally verify every claim, result, and citation. Future 2027 calls must be checked when released: [ICLR workshop guidance](https://iclr.cc/Conferences/2026/WorkshopGuide), [AI&PDE 2026 workshop format](https://openreview.net/pdf?id=med7qzMIaG), [NeurIPS 2025 AI for Science call](https://ai4sciencecommunity.github.io/neurips25/call).
3. **Full AI-for-science workshop paper:** realistic if the symbolic correction has a defensible ablation and survives a meaningful shift. The [ICML 2026 AI for Science workshop](https://ai4sciencecommunity.github.io/icml26/call) asked for 4–8 page papers on new algorithms, systems, or scientific findings.
4. **Archival main track or journal:** pursue only after broader PDE coverage, stronger theory or error analysis, and comparisons against recent operator-learning baselines. Main-track calls ask for original, rigorous work of broad interest; they are not the minimum target.

## Idea B — bounded RSI for automated physics research

### Feasible reframing

Do not start with “build an autonomous physicist.” Start with:

> Can a persistent code-improvement loop produce solver changes that survive hidden physical-regime, invariant, regression, and compute tests better than one-shot and reflection-only agents?

This is an evaluator/benchmark paper. The foundation model stays fixed. The editable artifact is the solver or agent scaffold. Public tests guide proposals; a frozen hidden suite decides whether improvements generalize. The linked RSI survey itself rates science as strong at strategy selection but only early at autonomous experience acquisition, and says genuine changes to the improvement mechanism remain rare. It also distinguishes improving an external scientific artifact from improving the scientific agent: [The Last AI Built by Humans](https://arxiv.org/abs/2609.11873).

### Minimum publishable unit

- 8–20 small numerical-physics tasks or parameterized variants, not one hand-picked success;
- one fixed model and matched token, tool, wall-clock, and experiment-compute budgets;
- one-shot, reflection-only, persistent archive/evolution, and (if affordable) scaffold-editing conditions;
- public correctness tests plus hidden grids, parameters, invariants, old-task regressions, and compute limits;
- at least three independent runs per condition, with failure rates and total cost rather than only the best trajectory;
- tamper checks for edits to tests, logging, permissions, and evaluation code; and
- a strict naming rule: call it **bounded recursive improvement** only if a retained change affects later proposal, evaluation, or execution capability. Otherwise call it automated iterative optimization.

The fastest credible result is likely a benchmark/failure-analysis paper showing when visible solver gains fail under hidden physical tests. It does not need to beat every baseline if it reveals a robust evaluator weakness.

### Prior-art pressure

[STOP](https://arxiv.org/abs/2310.02304), [AlphaEvolve](https://arxiv.org/abs/2506.13131), and the [Darwin Gödel Machine](https://arxiv.org/abs/2505.22954) already establish bounded code or scaffold improvement under automated evaluators. Scientific-agent work also targets hypothesis and experiment loops. Therefore, “an LLM edits a physics solver and improves a visible score” is not novel. The contribution must be the physics-grounded hidden evaluator, a controlled comparison of persistence mechanisms, or a well-supported negative result.

### Publication ladder

1. **Short benchmark or position paper:** a carefully specified benchmark, threat model, and pilot failures can fit a tiny/short workshop track.
2. **AI-for-science or AI-for-research workshop:** appropriate after multi-task experiments. The 2026 [AI for Scientific Research workshop](https://openreview.net/group?id=AAAI.org%2F2026%2FWorkshop%2FAI4Research) and [ICML AI for Science workshop](https://ai4sciencecommunity.github.io/icml26/call) demonstrate venue fit, but 2027 calls are not yet known.
3. **Full archival paper:** requires enough tasks and repetitions to support general claims, careful model/cost controls, and ideally a reusable benchmark that other agent systems can run.

## Combined plan

The two ideas become stronger when sequenced:

1. Build the Burgers benchmark, split, metrics, baseline models, and hidden-regime tests for Idea A.
2. Publish or submit the controlled hybrid result.
3. Freeze that repository as one domain in the Idea B evaluator.
4. Ask agents to improve solver accuracy, stability, or efficiency without seeing the hidden suite.
5. Measure whether persistent improvement helps or merely overfits visible tests.

This avoids building two unrelated projects. It also gives the RSI study an independently meaningful physics environment instead of a toy coding benchmark.

## Go/no-go gates

| Date from project start | Required evidence | Decision |
| --- | --- | --- |
| Week 2 | Reproducible data-only baseline and frozen parameter split | If absent, reduce the dataset/model before adding methods. |
| Week 4 | Matched physics-loss baseline with three seeds | If compute is unstable or too costly, write a replication/failure report or stop. |
| Week 6 | Symbolic and non-symbolic corrections run without test leakage | If neither is stable, focus the paper on why residual correction fails. |
| Week 8 | Effect survives the predeclared shift or yields a reproducible negative result | Draft the smallest honest workshop paper. |
| After Idea A | Hidden suite and sandbox can be frozen | Only then start the RSI comparison. |

## Final recommendation

Pursue **Idea A now**, aiming first at a short reviewed workshop paper rather than a main-track claim. Treat the current two-model pilot as replication and make the symbolic-versus-non-symbolic correction under shift the contribution. Pursue **Idea B second** as a bounded evaluator study. This is both more feasible and more publishable than attempting a general self-improving AI physicist.
