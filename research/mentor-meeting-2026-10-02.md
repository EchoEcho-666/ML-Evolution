# Mentor meeting brief — 2026-10-02

**Topics:** the ML Civilization website (a phylogeny of AI), world models, recursive self-improvement (RSI), and my research idea
**Goal of the meeting:** get feedback on the research idea and answers to the questions in section 6.

## Week 3 checklist → where each item is covered

| Week 3 item | Section |
| --- | --- |
| Identity | 0 — what ML Civilization is |
| Under-explored field · why it came to be · why it died out · frontier | 0 — the phylogeny (these four questions are the website's structure) |
| AI for Physics survey paper | 3 — research idea, and `ai-for-physics-survey.md` |
| World model survey paper · NVIDIA · David Ha · LeCun | 1 |
| Atlas | 1 (World Labs' Atlas world model); if it meant the atlas itself, section 0 |
| RSI | 2 |
| Optional: emotions in AI | 4 |

## The one-sentence story

> I built a phylogeny of AI that shows ideas rarely die. They migrate, merge, and come back when a bottleneck lifts. Two frontiers sit at the end of those lines: world models and recursive self-improvement. Both fail in the same place: they look good on what they were tested on and break under a shift nobody checked. I want to study that gap where ground truth is known, in physics.

If time is short: say this, show the website for 2 minutes, then go to **section 3**.

---

## 0. ML Civilization — a phylogeny of AI (about 4 minutes, with the website)

### Identity

ML Civilization is an interactive **causal atlas** of machine-learning history. A paper timeline answers *what came when*. A phylogeny answers *what descended from what, and why*. Each research branch gets the same four questions:

1. **Why did it come to be?** What problem or opportunity motivated it.
2. **Why did it stall or die out?** The bottleneck it hit.
3. **Where did its ideas go?** Survival, merger, migration, or extinction.
4. **What does it connect to at the frontier?** Including under-explored branches worth reopening.

### Measuring "death" honestly

For 16 historical branches I counted exact-phrase paper titles in OpenAlex (1950–2025), divided by all papers that year, and compared recent share with each branch's peak. **Key finding: a label can die while its ideas survive.** Expert systems fell to 6% of their peak share, yet explicit rules, knowledge bases, and verification are everywhere in today's agents and verifiers.

**New this week: I tested that claim with citations.** For 13 branches I tracked citations to each founding paper, not just title labels.
- *Genetic programming:* the name is at 53% of its peak, but Koza's founding paper is cited at its all-time high, now heavily from engineering and environmental science. The idea outlived the label.
- *Symbolic regression:* its most-cited modern paper is now cited mostly by **physics (33%)**. This is a measurable migration into AI for Physics.
- *Expert systems:* both the label (6%) and MYCIN citations (4%) collapsed. Its ideas live on by reinvention, not citation, so the atlas should not claim documented inheritance there.
- Five of the website's ten featured successor links are confirmed by direct citations (e.g., Hopfield 1982 → modern Hopfield networks; LSTM → S4). The rest are either untestable in OpenAlex or need hand checks.
Details: section 8 of `branch-mortality-analysis.md`.

Caveat to say out loud: this measures *label visibility*, not every use of an idea, and it cannot prove why a field declined. Broad search made two fields look revived when they weren't (artificial life, learning classifier systems). Exact-phrase search fixed that.

### The four ways an idea moves (the website's colored edges)

| Flow | Meaning | Example on the map |
| --- | --- | --- |
| **Extinction / stagnation** | A technical package hits a wall it can't get past | Expert systems → *knowledge-acquisition bottleneck* (hand-written knowledge was too costly to maintain). Seq2seq → *fixed-vector bottleneck* (squeezing a sentence into one vector stalled; attention fixed it). |
| **Migration** | The idea moves to a new field or substrate | Knowledge-acquisition bottleneck → inductive logic programming (learn rules from examples instead of writing them). Reservoir computing → physical reservoirs (from simulated networks into materials and hardware). |
| **Survival** | The core mechanism continues in a new form | Hopfield networks → modern Hopfield networks (same associative memory, far more capacity). RNN → S4 → Mamba (recurrent state survives, made stable and fast). Genetic programming → symbolic regression. |
| **Merger** | Two lines combine into something new | Genetic programming + LLMs → AlphaEvolve. Modern Hopfield ↔ attention (shown mathematically equivalent in 2020). Mamba-2 merges state-space models and attention into one framework. |

### Why branches died: recurring causes

- **Knowledge cost:** expert systems, ILP, case-based reasoning → replaced by statistical and representation learning.
- **Search cost:** genetic programming, symbolic regression → stalled until stronger priors and **LLM proposals** made search cheap again.
- **Weak evaluation:** artificial life, open-ended evolution → lost to standardized benchmarks.
- **Hand-designed representations** → lost to end-to-end learned representations.
- **Hardware mismatch:** reservoir computing and Hopfield optimization waited for physical/neuromorphic hardware.

**Pattern worth saying:** branches come back when their bottleneck lifts. Comparing 2021–25 with 2016–20, symbolic regression grew 3.4×, reservoir computing 3.2×, Hopfield networks 2.3×, and neuroevolution 1.8×.

### Why this leads to my frontier topics

The dead and dormant branches feed directly into today's frontier:

- **Genetic programming + evolutionary search → RSI** (AlphaEvolve, Darwin Gödel Machine). The old bottleneck was search cost; LLMs lifted it. The bottleneck now is the **evaluator**.
- **RNNs, Hopfield memory, reservoirs → world models** (latent dynamics, memory). The bottleneck now is **reliability under shift**.
- **Symbolic regression + neural operators → AI for Physics.** Equations give an independent evaluator, which links back to both.

### Demo path (2 minutes)

1. `npm run dev`, open the URL Vite prints (usually `http://127.0.0.1:5173/`), click **Go to map**.
2. Point to the **legend**: click each color to show or hide survival, merger, migration, and extinction edges.
3. Turn on **Timeline**: the 16 measured branches line up by year of emergence.
4. Open **Expert Systems** → **What followed**: extinction into the knowledge bottleneck, then migration into rule induction.
5. Open **Genetic Programming**: survival into symbolic regression and merger into AlphaEvolve. That is the bridge to RSI.
6. Search **Hybrid Equation-Aware World Model** → **Focus**: my proposed project, linked from its ancestors.

If saved positions clutter the map, turn Timeline off and click **Restore nodes**.

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

**The four lineages from my notes:**

- **David Ha:** the starting point. Compress what you see, predict in latent space, and train a policy inside the model's "dream." Clean loop, small environments.
- **Yann LeCun (JEPA):** world modeling as *predictive representation*: predict embeddings, not pixels, plus memory and planning. I-JEPA → V-JEPA 2 added action-conditioned robot planning.
- **Google DeepMind:** several different branches, not one: Dreamer (latent control), MuZero (planning-only model), Genie / Genie 3 (generated interactive worlds).
- **NVIDIA (Cosmos):** mainly a *platform* for physical AI: pretrained video world models, data curation, tokenizers, post-training for robots and cars. I treat "general-purpose world model" there as product positioning unless a task-level result backs it.
- **World Labs — Atlas (announced 2026-09-01):** Fei-Fei Li's company. A multimodal world model that takes text, images, video, and 3D in one sequence, with every frame tied to an explicit 3D camera pose. It generates camera-controlled video (up to 1 minute at 1440p), reconstructs 3D scenes from a few photos, and is pitched for VFX and robotics real-to-sim. Architecture: autoregressive diffusion transformer. It will power World Labs' Marble tool. Early access only. **What to say:** it pushes the *spatial* branch of world models (geometry-grounded, not just pixels), which is a real step past Genie-style video. But all benchmarks are World Labs' own, the baselines got text instead of camera geometry, and nothing shows it predicts *physical consequences of actions*. It is the clearest current example of my evaluation gap: great geometry and appearance, untested intervention accuracy. ([announcement summary](https://howaiworks.ai/blog/world-labs-atlas-world-model-2026), [critical review](https://kingy.ai/blog/world-labs-atlas-world-model-deep-dive/))
- *If "Atlas" on the list meant my own atlas (ML Civilization), that is section 0.*

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

## 4. Optional interest: emotion concepts inside language models (1 minute, only if there's time)

Anthropic's interpretability team ([summary, April 2026](https://www.anthropic.com/research/emotion-concepts-function); [technical paper](https://transformer-circuits.pub/2026/emotions/index.html)) found internal "emotion vectors" in Claude Sonnet 4.5. They used 171 emotion words, had the model write stories expressing each one, and extracted the activation patterns. These representations are organized in a way that echoes human psychology, and they **causally affect behavior**: steering toward "desperation" increased unethical actions like reward hacking in test scenarios, while "calm" reduced them. The authors frame these as *functional* representations, not evidence that the model feels anything.

**Why it fits my interests:** it is another case of the evaluation theme. An internal state you can't see from outputs alone changes how a system behaves under pressure. For a self-improving agent, an internal signal like "desperation" under a hard evaluator could predict reward hacking before it shows up in the score. That is a possible later link between interpretability and RSI. It is not a semester project.

## 5. Where things stand (show if asked)

- **ML Civilization atlas** (the web app): an interactive causal map of ML history with 16 measured research branches and their survival, merger, migration, or extinction paths. The world-model and RSI lineages above are in it. Run with `npm run dev`.
- **Surveys:** first-pass deep dives on world models, RSI, and AI for Physics, plus a 12-area frontier comparison. AI for Physics scored 32/35; world models 28; RSI 27.
- **Burgers pilot** (`experiments/burgers-pilot`): a dependency-free reference solver with frozen splits and physics checks. All 21 trajectories pass. Two fixes made before this meeting:
  - the original test viscosities (0.015, 0.03) were *inside* the training range, so they only tested interpolation. I added a true extrapolation set (0.005, 0.08);
  - at the original horizon t = 0.4, viscosity changed the solution by only 1–3%, so the shift was nearly invisible. I moved the horizon to t = 2.0, after the shock forms, where the effect is 5–18%.
- **Not done yet:** no neural model is trained yet. That is the next step and it depends on compute.

## 6. Questions to ask my mentor

1. **Scope:** is a careful replication (models 1–2) plus the symbolic-vs-learned correction (3–4) the right size for this semester, or should I cut to fewer models?
2. **Compute:** can I get GPU access (lab, university cluster, or credits)? A small FNO on 1D Burgers is cheap, but three seeds × four models × sweeps adds up.
3. **Direction:** would you push me toward world models or RSI instead of physics? Physics wins on clean evaluation, but I want your read on which builds better long-term skills and fits your group.
4. **Physics depth:** is Burgers the right first PDE, or is there a system you know better and could sanity-check results on?
5. **Target:** is a 2027 AI-for-Science or AI & PDE workshop a reasonable goal, and would you be willing to co-author or advise on it?
6. **The website:** is the phylogeny itself worth developing into a paper (e.g., a dataset of how ML branches survive, merge, migrate, and die), or should it stay a tool that supports the research project?

## 7. Questions I might get, with short answers

- **"Isn't physics-informed ML already done?"** Adding a physics loss is done; I'm replicating that. The open question is whether *symbolic* structure transfers better than an equally sized *learned* correction under extrapolation. That needs the control model, which most papers skip.
- **"Why call it a world model? It's a PDE surrogate."** Fair. In the survey's terms it is a latent dynamics model of a physical system. I only call it a world model where it predicts step by step; I won't claim long-horizon planning from a fixed-trajectory predictor.
- **"Isn't this just AutoML, not RSI?"** It is RSI only if a kept change improves the *next* round of improvement. Otherwise I'll call it iterative optimization. Strict naming is part of the contribution.
- **"What if nothing works?"** Then the result is where symbolic correction fails under shift. That is publishable as a negative result if the comparison is fair and the code is released.
- **"Why should I believe your history atlas?"** Its branch statistics count title labels, not ideas. A falling curve means a label lost visibility, not that the idea died. Documented links are kept separate from inferred ones.

## After the meeting

Record the mentor's answers to section 6 at the top of `project-focus-decision.md` and change its status from "provisional" to confirmed or revised.
