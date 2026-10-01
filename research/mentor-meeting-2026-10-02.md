# Mentor meeting brief — 2026-10-02

**Topics:** world models, recursive self-improvement (RSI), and my research idea
**Goal of the meeting:** get feedback on the research idea and answers to the five questions at the end.

## The one-sentence story

> World models and self-improving systems both fail in the same place: they can look good on what they were tested on and break under a shift nobody checked. I want to study that gap where the ground truth is known, in physics. I'd start with a small world model of a PDE under a parameter shift, then reuse its hidden tests to evaluate a self-improvement loop.

Everything below supports that sentence. If time is short, say it and go straight to **My research idea**.

---

## 1. World models (about 3 minutes)

**What it is.** A learned model that holds a state of an environment and predicts what happens next, ideally including what happens *if I act*. It is a functional category, not one architecture.

**Lineage, in four steps:**

| Step | Representative work | The idea it added |
| --- | --- | --- |
| Compact latent dynamics | Ha & Schmidhuber *World Models* (2018), PlaNet, Dreamer → DreamerV3 (2023) | Compress observations, predict in latent space, train a policy inside "imagined" rollouts. |
| Predict only what planning needs | MuZero (2019) | No need to reconstruct the world; predict reward, value, and policy. Good decisions ≠ a faithful simulator. |
| Predict representations, not pixels | LeCun's JEPA program (2022), I-JEPA, V-JEPA 2 (2025) | Predicting abstract embeddings is easier and more semantic, but may drop details an action later depends on. |
| Scale on video | Genie / Genie 3, NVIDIA Cosmos (2024–26) | Interactive worlds learned from internet video. Visually rich, but consistency lasts minutes and actions are limited. |

**Established:** latent models help planning and sample efficiency on bounded tasks; large video models can generate controllable environments.

**Not established:** that visual realism means physical or causal correctness; that passive video teaches the consequences of new interventions; that minutes of consistency imply long-horizon reliability.

**The gap I care about:** *evaluation*. Pixel quality is not intervention accuracy. A model can look right and predict the wrong consequence of an action.

## 2. Recursive self-improvement (about 3 minutes)

**Definition I use.** A system proposes a change to something that drives its own operation, tests it with an evaluator it does not control, keeps it only if it passes, and the kept change improves the *next* round of proposing, evaluating, or executing. That gives five fields: **proposer, target, evaluator, acceptance rule, loop closure**.

**Lineage:**

| Year | System | What actually improves |
| --- | --- | --- |
| 2023 | STOP (Self-Taught Optimizer) | A scaffold program rewrites itself. The language model is unchanged. |
| 2024 | Gödel Agent | An agent edits its own logic. Benchmark-bound. |
| 2025 | AlphaEvolve | LLM-proposed programs evolve under automatic evaluators. Real algorithmic results, but it improves *code*, not itself. |
| 2025 | Darwin Gödel Machine | A coding agent edits its own codebase and keeps an archive of descendants. SWE-bench 20% → 50%. |

The historical root is **genetic programming and evolutionary search**. LLMs replaced random mutation with much better proposals. That is a nice example of an "extinct" branch that came back, which the atlas shows.

**Established:** a fixed model can improve a scaffold or codebase on a measurable benchmark across many iterations.

**Not established:** that benchmark gains are general rather than evaluator-specific; that any system safely improves its own objective or evaluator; that gains compound without hitting resource limits.

**The gap I care about:** *the evaluator*. Every current RSI result is only as good as its tests. Visible-score gains can hide regressions.

## 3. My research idea (about 4 minutes)

### Why physics connects the two

Both topics share one bottleneck: **does a model stay reliable under a shift it was not trained or tested on?** In robotics or video you can't measure that cleanly. In physics you can, because the equations give an independent check: conservation laws, energy dissipation, and a trusted numerical solver.

### Phase A: an equation-aware world model under regime shift (semester project)

**System:** 1D viscous Burgers, `u_t + u·u_x = ν·u_xx`. The parameter that shifts is the viscosity ν.

**Compare four matched models** (same backbone, data, and tuning budget):

1. data-only neural operator (FNO);
2. same model with a PDE-residual loss (PINO-style);
3. same model with a **compact symbolic correction** fitted on training residuals only;
4. same model with a **non-symbolic learned correction**. This is the control: without it, any gain could just be the extra module, not the symbolic structure.

**Test on:** viscosities inside the training range (interpolation) and *outside* it (extrapolation). Measure prediction error, conservation and energy error, cost, and worst seed. Use at least three seeds.

**Question:** *does symbolic structure buy transfer beyond what a generic learned correction buys, at equal compute?* A clean "no" is still a result.

**Honest novelty position:** a 2026 TU Delft thesis already compared models 1 and 2 on PDEBench Burgers with a viscosity shift. So models 1 and 2 are my replication. The contribution is models 3 vs 4 under extrapolation.

### Phase B: bounded RSI on the same benchmark (follow-on)

Freeze Phase A's hidden tests. Let a coding agent try to improve the solver or model using only public tests. Compare one-shot, reflection-only, and persistent/evolutionary loops at matched token and compute budgets. **Question:** *do self-improvement gains survive hidden physical tests, or do they overfit visible ones?* This builds on Phase A instead of starting a separate project.

### Realistic output

A short workshop paper (AI for Science or AI & PDE track) after Phase A, then a benchmark-style paper for Phase B. Neither is main-conference material in its first version, and I'm not claiming it is.

## 4. Where things stand (show if asked)

- **ML Civilization atlas** (the web app): an interactive causal map of ML history with 16 measured research branches and their survival, merger, migration, or extinction paths. The world-model and RSI lineages above are in it. Run with `npm run dev`.
- **Surveys:** first-pass deep dives on world models, RSI, and AI for Physics, plus a 12-area frontier comparison. AI for Physics scored 32/35; world models 28; RSI 27.
- **Burgers pilot** (`experiments/burgers-pilot`): a dependency-free reference solver with frozen splits and physics checks. All 21 trajectories pass. Two fixes made before this meeting:
  - the original test viscosities (0.015, 0.03) were *inside* the training range, so they only tested interpolation. I added a true extrapolation set (0.005, 0.08);
  - at the original horizon t = 0.4, viscosity changed the solution by only 1–3%, so the shift was nearly invisible. I moved the horizon to t = 2.0, after the shock forms, where the effect is 5–18%.
- **Not done yet:** no neural model is trained yet. That is the next step and it depends on compute.

## 5. Questions to ask my mentor

1. **Scope:** is a careful replication (models 1–2) plus the symbolic-vs-learned correction (3–4) the right size for this semester, or should I cut to fewer models?
2. **Compute:** can I get GPU access (lab, university cluster, or credits)? A small FNO on 1D Burgers is cheap, but three seeds × four models × sweeps adds up.
3. **Direction:** would you push me toward world models or RSI instead of physics? Physics wins on clean evaluation, but I want your read on which builds better long-term skills and fits your group.
4. **Physics depth:** is Burgers the right first PDE, or is there a system you know better and could sanity-check results on?
5. **Target:** is a 2027 AI-for-Science or AI & PDE workshop a reasonable goal, and would you be willing to co-author or advise on it?

## 6. Questions I might get, with short answers

- **"Isn't physics-informed ML already done?"** Adding a physics loss is done; I'm replicating that. The open question is whether *symbolic* structure transfers better than an equally sized *learned* correction under extrapolation. That needs the control model, which most papers skip.
- **"Why call it a world model? It's a PDE surrogate."** Fair. In the survey's terms it is a latent dynamics model of a physical system. I only call it a world model where it predicts step by step; I won't claim long-horizon planning from a fixed-trajectory predictor.
- **"Isn't this just AutoML, not RSI?"** It is RSI only if a kept change improves the *next* round of improvement. Otherwise I'll call it iterative optimization. Strict naming is part of the contribution.
- **"What if nothing works?"** Then the result is where symbolic correction fails under shift. That is publishable as a negative result if the comparison is fair and the code is released.
- **"Why should I believe your history atlas?"** Its branch statistics count title labels, not ideas. A falling curve means a label lost visibility, not that the idea died. Documented links are kept separate from inferred ones.

## After the meeting

Record the mentor's answers to section 5 at the top of `project-focus-decision.md` and change its status from "provisional" to confirmed or revised.
