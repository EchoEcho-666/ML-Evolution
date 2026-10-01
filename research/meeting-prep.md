# Mentor meeting prep — Thursday 2026-10-01, 3:00 pm

**Topics (Fall 2026, Week 3):** my research idea, the ML Civilization website as a phylogeny of AI, world models, and recursive self-improvement (RSI).
**Priority:** own the research idea. Everything else supports it.
**Run the website:** `npm run dev` in the project folder → open the printed URL (usually `http://127.0.0.1:5173/`) → **Go to map**.

## Contents

1. [Today's timeline](#1-todays-timeline-1240--300)
2. [The research idea, from zero](#2-the-research-idea-from-zero)
3. [The 90-second pitch](#3-the-90-second-pitch)
4. [Talk track for the meeting](#4-talk-track-for-the-meeting)
5. [Questions to ask, and questions I might get](#5-questions-to-ask-and-questions-i-might-get)
6. [After the meeting](#6-after-the-meeting)
7. [Reference documents](#7-reference-documents)

---

## 1. Today's timeline (12:40 → 3:00)

### 12:40–1:20 · Understand the research idea (most important)
- [ ] Read section 2.1–2.4 below slowly.
- [ ] Open [`viscosity-shift.svg`](../experiments/burgers-pilot/viscosity-shift.svg) in a browser. Find the shock. Find the roundest curve (ν = 0.08) and say why it is roundest.
- [ ] Run the pilot: `python3 experiments/burgers-pilot/burgers_pilot.py`. Find the train / test / extrapolation blocks and note that all checks pass.
- [ ] Answer self-checks 1–4 out loud **before** reading the answers (section 2.9).
- [ ] Without looking, write the four models on paper and what each adds.

### 1:20–1:45 · Defend it
- [ ] Read section 2.5–2.8 and answer self-checks 5–7.
- [ ] Practise the three hardest questions out loud (section 5.2): "already done?", "why a world model?", "what if nothing works?"
- [ ] Write one sentence: *would I still want this project if the formula loses?*

### 1:45–2:00 · Pitch
- [ ] Say the 90-second pitch (section 3) twice from the page, then once in your own words. Time it.

### 2:00–2:25 · Website, world models, RSI
- [ ] Run the website and walk the demo path in section 4.2 once.
- [ ] Open **Hopfield Networks** → *Connections and evidence* to show the judgment and citation badges.
- [ ] Memorize: hand-coded MYCIN/XCON took **100–180** person-years; learned GASOIL/BMT took **1–9** (Muggleton 1991).
- [ ] Skim sections 4.3 and 4.4: one line each for Ha, LeCun, DeepMind, NVIDIA, World Labs Atlas; RSI's five fields and STOP → Gödel Agent → AlphaEvolve → DGM.

### 2:25–2:45 · Questions
- [ ] Pick your top 3 from section 5.1. Recommended: **GPU access**, **scope**, **physics vs world models vs RSI**. Write them down.

### 2:45–3:00 · Buffer
- [ ] Website and shift plot open in tabs. Water. Stop studying at 2:55.

---

## 2. The research idea, from zero

### 2.1 The question in one sentence

> When a learned model of a physical system has to predict a condition it never saw in training, does adding a short **formula** (symbolic correction) help it more than adding an equally small **neural network** correction?

Everything else is setup that makes that comparison fair.

*Self-check 1:* Why do we need the "equally small neural network" at all?

### 2.2 The physics: the Burgers equation

`u_t + u·u_x = ν·u_xx`

- `u(x, t)` is the velocity of a 1D fluid along a ring, so the right edge wraps to the left edge.
- `u·u_x` (**advection**): fast parts catch up with slow parts, so a smooth wave **steepens into a near-vertical front (a shock)**.
- `ν·u_xx` (**viscosity**): smooths sharp features. Large ν gives a soft, rounded front; small ν gives a sharp one.

In [`viscosity-shift.svg`](../experiments/burgers-pilot/viscosity-shift.svg) every curve starts from the same grey wave. By t = 2 all of them have formed a shock near the middle. **ν = 0.08 is visibly rounder**, and ν = 0.005 is the sharpest.

Burgers is the standard test bed because it is the simplest equation with both shocks and dissipation, has one clear knob (ν), and has an exact numerical reference.

*Self-check 2:* If you double ν, does the shock get sharper or smoother? Why?

### 2.3 The shift: interpolation vs extrapolation

| Split | Viscosities | What it tests |
| --- | --- | --- |
| Train | 0.01, 0.02, 0.04 | What the model learns from |
| Interpolation test | 0.015, 0.03 | Unseen, but **between** training values. Usually easy. |
| Extrapolation test | 0.005, 0.08 | Unseen and **outside** the training range. The real question. |

Neural networks usually interpolate well and extrapolate badly. A formula can extrapolate if it captures *how* the answer depends on ν. That gap is the whole bet.

Why the end time is t = 2: before the shock forms, viscosity barely changes the solution (1–3%), so a model could ignore ν and still look good. After the shock the difference is 5–18%.

*Self-check 3:* Why is a test at ν = 0.03 not enough to claim the model generalizes?

### 2.4 The four models

Same backbone, data, and training budget; only the added piece changes.

| # | Model | What it adds | Role |
| --- | --- | --- | --- |
| 1 | **FNO** (Fourier Neural Operator) | Nothing. Learns *initial wave → wave at time t* from data. Works in frequency space, so it handles smooth waves well and doesn't depend on grid resolution. | Data-only baseline |
| 2 | **FNO + PDE loss** (PINO-style) | During training, also penalize how badly the prediction violates the Burgers equation. | Physics baseline; **replication** of a 2026 thesis |
| 3 | **FNO + symbolic correction** | Fit a short formula to model 1's errors on *training* data (sparse regression, e.g., SINDy or PySR) and add it to the prediction. | **The new idea** |
| 4 | **FNO + learned correction** | Same as 3, but the correction is a small neural net of similar size. | **The control** |

**Reading the result:**
- 3 beats 4 on extrapolation → **structure matters**, not just capacity. The interesting result.
- 3 ≈ 4 → any gain is just "an extra module." Still useful.
- Neither beats 1 → corrections fitted on training errors don't transfer. A useful negative result.
- 3 helps interpolation but not extrapolation → the formula overfit. Report it.

Design choice to ask about: which terms the formula may use (e.g., `ν·u_xx`, `u·u_x`, `u²`, with ν as input). Giving it the exact Burgers terms makes it too easy to claim "discovery."

*Self-check 4:* Why must the symbolic correction be fitted only on training data?

### 2.5 What gets measured

- **Prediction error** on train, interpolation, and extrapolation, reported separately.
- **Physics consistency:** total mass stays constant, and energy only decreases. The reference solver passes both with zero violations.
- **Cost:** training and inference compute, so a gain isn't just "spent more."
- **Worst seed**, not only the average, over at least 3 seeds.

*Self-check 5:* Why report the worst seed?

### 2.6 What's new, honestly

- Models 1 vs 2 under a viscosity shift were compared in a [2026 TU Delft thesis](https://repository.tudelft.nl/record/uuid:bc293c72-0833-4df2-bd42-0aa63914ee23). So **1 and 2 are a replication** that checks my setup.
- Fitting formulas to residuals and combining operators with sparse regression also exist (e.g., the 2026 [Late Fusion Operator](https://openreview.net/pdf?id=k05FaSEb8p) workshop paper).
- **New:** the controlled comparison of symbolic vs equal-size learned correction, on a pre-declared extrapolation split, with physics checks and cost. Most papers skip the control (model 4), so they can't separate structure from capacity.
- Realistic target: a short workshop paper (AI for Science / AI & PDE). Details: [publication feasibility](ai-physics-publication-feasibility.md).

*Self-check 6:* What's the one-line answer to "hasn't this been done?"

### 2.7 How it connects to world models and RSI

- **World models:** this is a tiny world model. It predicts how a physical state evolves, tested where world models fail: outside training conditions. Unlike video world models (Genie, Cosmos, World Labs Atlas), the right answer is known exactly.
- **RSI (Phase B, later):** freeze the extrapolation tests as a *hidden* suite. Let a coding agent improve the model using only visible tests. Do its gains survive the hidden physics tests? That is the RSI evaluator problem, measured with real ground truth.
- **Phylogeny:** symbolic regression descends from genetic programming (1990s), and its citations now come mostly from physics (33%). The project is a modern descendant of a branch the website shows reviving.

*Self-check 7:* In one sentence, why is physics a better testbed for the evaluation problem than video?

### 2.8 Status and next step

- **Done:** reference solver, frozen splits, physics checks; all 21 trajectories pass. Two fixes this week: added a true extrapolation split (the old test values were inside the training range), and moved the horizon to t = 2 so the shift is visible.
- **Next:** train model 1 (FNO) with 3 seeds. **If it extrapolates fine, the shift is too easy and must be widened first.** That is the first go/no-go.
- **Needs:** GPU access, PyTorch, and the `neuraloperator` library.

### 2.9 Self-check answers

1. Without it, a symbolic win can't be separated from "any extra module helps."
2. Smoother. ν multiplies the diffusion term, which spreads out sharp gradients.
3. 0.03 is between training values (interpolation); extrapolation needs values outside 0.01–0.04.
4. Fitting on test data leaks the answer, so the extrapolation test stops being a test.
5. A method that is good on average but sometimes breaks is not reliable, and averages hide that.
6. "The two-model comparison is done, and I replicate it. The new part is symbolic vs equally sized learned correction under extrapolation, which separates structure from capacity."
7. In physics the true answer and conservation laws are known exactly, so you can measure whether a model is right, not just whether it looks right.

---

## 3. The 90-second pitch

> "I want to know whether learned physics models can be trusted outside the conditions they were trained on. I use the Burgers equation, where viscosity is the knob: I train on some viscosities and test on values outside that range. I compare four models: a data-only neural operator, the same with a physics loss (a replication of a 2026 thesis), the same with a short fitted formula as a correction, and the same with an equally small neural-net correction as the control. If the formula beats the equal-size net on extrapolation, structure matters, not just capacity. The reference solver and frozen splits are done; next is training the baseline, for which I need GPU access."

**The bigger story (if asked why this topic):**

> "I built a phylogeny of AI that shows ideas rarely die. They migrate, merge, and come back when a bottleneck lifts. Two frontiers sit at the end of those lines: world models and recursive self-improvement. Both fail in the same place: they look good on what they were tested on and break under a shift nobody checked. I study that gap where the ground truth is known, in physics."

---

## 4. Talk track for the meeting

### 4.0 Week 3 agenda → where it's covered

| Week 3 item | Section |
| --- | --- |
| Identity; under-explored field; why it came to be; why it died out; frontier | 4.1–4.2 |
| AI for Physics survey paper | 2 and [AI for Physics survey](ai-for-physics-survey.md) |
| World model survey paper; NVIDIA; David Ha; LeCun; Atlas | 4.3 (Atlas = World Labs' Atlas; if it meant my atlas, 4.1) |
| RSI | 4.4 |
| Optional: emotions in AI | 4.5 |

### 4.1 ML Civilization — a phylogeny of AI (~4 min)

**Identity.** An interactive **causal atlas** of ML history. A timeline answers *what came when*; a phylogeny answers *what descended from what, and why*. Every branch gets four questions: why it came to be, why it stalled or died, where its ideas went (survival, merger, migration, extinction), and how it connects to the frontier.

**Measuring "death."** For 16 branches I counted exact-phrase paper titles in OpenAlex (1950–2025), normalized by all papers per year, and compared recent share with each branch's peak. **A label can die while its ideas survive:** expert systems fell to 6% of peak, yet rules, knowledge bases, and verification are everywhere in today's agents.

**New this week: citations.** For 13 branches I tracked citations to each founding paper, not just title labels:
- *Genetic programming:* the name is at 53% of its peak, but Koza's founding paper is cited at its all-time high. The idea outlived the label.
- *Symbolic regression:* now cited mostly by **physics (33%)**, a measurable migration into AI for Physics.
- *Expert systems:* both the label (6%) and MYCIN citations (4%) collapsed. Most ideas survive by reinvention, not citation.
- **One migration is documented in the original paper.** Muggleton's 1991 ILP paper opens with a table: hand-coded MYCIN and XCON took 100 and 180 person-years to build, while GASOIL and BMT, built by learning rules from examples, took 1 and 9. That table *is* the knowledge-acquisition bottleneck.
- Five of ten featured website links are confirmed by direct citations; a sixth (expert systems → ILP) by reading the paper. **Lesson:** citation data can raise confidence in a link, but only reading the source can rule one out.
- Every website link now shows a human **judgment** (documented, inferred, or proposed) and, separately, a **citation check**.

Caveat to say out loud: title counts measure *label visibility*, not every use of an idea, and they cannot prove why a field declined.

**The four ways an idea moves (the website's colored edges):**

| Flow | Meaning | Example |
| --- | --- | --- |
| **Extinction** | Hits a wall it can't pass | Expert systems → knowledge-acquisition bottleneck; seq2seq → fixed-vector bottleneck (attention fixed it) |
| **Migration** | Moves to a new field or substrate | Knowledge bottleneck → ILP; reservoir computing → physical hardware |
| **Survival** | Core mechanism continues in a new form | Hopfield → modern Hopfield; RNN → S4 → Mamba; genetic programming → symbolic regression |
| **Merger** | Two lines combine | Genetic programming + LLMs → AlphaEvolve; modern Hopfield ↔ attention; Mamba-2 merges SSMs and attention |

**Why branches died:** knowledge cost (expert systems, ILP), search cost (genetic programming until LLM proposals), weak evaluation (artificial life), hand-designed representations, and hardware mismatch (reservoirs, Hopfield). **Branches come back when their bottleneck lifts:** from 2016–20 to 2021–25, symbolic regression grew 3.4×, reservoir computing 3.2×, Hopfield networks 2.3×, neuroevolution 1.8×.

**Bridge to the frontier:**
- Genetic programming → **RSI**. LLMs lifted the search-cost bottleneck; the bottleneck now is the evaluator.
- RNNs, Hopfield memory, reservoirs → **world models**. The bottleneck now is reliability under shift.
- Symbolic regression + neural operators → **AI for Physics**, where equations give an independent evaluator.

### 4.2 Demo path (~2 min)

1. `npm run dev` → open the URL → **Go to map**.
2. **Legend:** click each color to show or hide survival, merger, migration, and extinction links.
3. **Timeline:** the 16 measured branches in order of emergence.
4. **Expert Systems** → **What followed:** extinction into the knowledge bottleneck, then migration into rule induction.
5. **Genetic Programming:** survival into symbolic regression, merger into AlphaEvolve. That is the bridge to RSI.
6. **Hopfield Networks** → *Connections and evidence:* judgment and citation badges.
7. Search **Hybrid Equation-Aware World Model** → **Focus:** my proposed project and its ancestors.

If saved positions clutter the map: Timeline off → **Restore nodes**.

### 4.3 World models (~3 min)

A learned model that holds the state of an environment and predicts what happens next, ideally *if I act*. It is a functional category, not one architecture.

| Step | Work | Idea added |
| --- | --- | --- |
| Compact latent dynamics | Ha & Schmidhuber (2018), PlaNet, Dreamer → DreamerV3 | Compress, predict in latent space, train a policy in "imagined" rollouts |
| Predict only what planning needs | MuZero (2019) | Predict reward, value, and policy; good decisions ≠ faithful simulator |
| Predict representations, not pixels | LeCun's JEPA (2022), I-JEPA, V-JEPA 2 | More semantic, but may drop details an action needs |
| Scale on video | Genie / Genie 3, NVIDIA Cosmos | Interactive worlds from video; consistency lasts minutes |

- **David Ha:** the starting loop. Compress, predict, train inside the "dream." Small environments.
- **Yann LeCun:** predictive representation plus memory and planning; V-JEPA 2 adds action-conditioned robot planning.
- **Google DeepMind:** several branches: Dreamer, MuZero, Genie.
- **NVIDIA Cosmos:** mainly a platform for physical AI (video world models, data curation, post-training). Treat "general-purpose" as positioning unless a task result backs it.
- **World Labs Atlas (2026-09-01):** Fei-Fei Li's company. One model over text, images, video, and 3D, with every frame tied to an explicit 3D camera pose. It produces camera-controlled 1-minute 1440p video and 3D reconstruction from a few photos. **Say:** a real step for the *spatial* branch, but all benchmarks are its own, the baselines got text instead of camera geometry, and nothing shows it predicts the physical consequences of actions. That is my evaluation gap. ([announcement](https://www.worldlabs.ai/blog/atlas), [critical review](https://kingy.ai/blog/world-labs-atlas-world-model-deep-dive/))

**Established:** latent models help planning on bounded tasks; video models can generate controllable worlds. **Not established:** that realism means physical correctness, or that passive video teaches the consequences of actions. **My gap:** evaluation. A model can look right and be wrong about what an action does.

### 4.4 Recursive self-improvement (~3 min)

**Definition:** a system proposes a change to something that drives its own operation, tests it with an evaluator it doesn't control, keeps it only if it passes, and the kept change improves the *next* round. Five fields: **proposer, target, evaluator, acceptance rule, loop closure**.

| Year | System | What actually improves |
| --- | --- | --- |
| 2023 | STOP | A scaffold program rewrites itself; the LLM is unchanged |
| 2024 | Gödel Agent | An agent edits its own logic; benchmark-bound |
| 2025 | AlphaEvolve | LLM-proposed programs evolve under automatic evaluators; improves code, not itself |
| 2025 | Darwin Gödel Machine | A coding agent edits its own codebase and keeps an archive; SWE-bench 20% → 50% |

Root: **genetic programming**. LLMs replaced random mutation with better proposals, an "extinct" branch that came back. **Established:** a fixed model can improve a scaffold on a measurable benchmark. **Not established:** that gains are general rather than evaluator-specific, or that improvement compounds safely. **My gap:** every RSI result is only as good as its tests.

### 4.5 Optional: emotion concepts in language models (~1 min)

Anthropic's interpretability team ([summary, April 2026](https://www.anthropic.com/research/emotion-concepts-function); [paper](https://transformer-circuits.pub/2026/emotions/index.html)) found internal "emotion vectors" in Claude Sonnet 4.5 that **causally affect behavior**. Steering toward "desperation" increased reward hacking in test scenarios; "calm" reduced it. The authors call these *functional* representations, not evidence of feelings. **Link to my theme:** an internal state invisible in outputs can predict when an agent games its evaluator. A possible later bridge to RSI, not a semester project.

---

## 5. Questions to ask, and questions I might get

### 5.1 To ask (pick 3)

1. **Compute:** can I get GPU access (lab, cluster, or credits)? 3 seeds × 4 models adds up.
2. **Scope:** are four models right for one semester, or should I cut?
3. **Direction:** would you push me toward world models or RSI instead of physics? Which builds better long-term skills and fits your group?
4. **Physics depth:** is Burgers the right first PDE, or is there a system you know well enough to sanity-check?
5. **Target:** is a 2027 AI-for-Science or AI & PDE workshop reasonable, and would you advise or co-author?
6. **Website:** is the phylogeny worth a paper of its own (a dataset of how ML branches survive, merge, migrate, and die), or should it stay a tool?

### 5.2 Might get

- **"Isn't physics-informed ML already done?"** Adding a physics loss is done; I replicate it. The open question is whether *symbolic* structure transfers better than an equally sized *learned* correction under extrapolation. That needs the control, which most papers skip.
- **"Why call it a world model? It's a PDE surrogate."** Fair. It is a dynamics model of a physical system. I only call it a world model where it predicts step by step, and I don't claim long-horizon planning.
- **"What if nothing works?"** Then the result is where and why the correction fails under shift. That is publishable as a negative result if the comparison is fair and the code is released.
- **"Isn't Phase B just AutoML?"** It is RSI only if a kept change improves the *next* round of improvement; otherwise I call it iterative optimization.
- **"Why trust your history atlas?"** Its statistics count title labels, which is why I added citation checks. Documented links are shown separately from inferred ones, and one link was confirmed only by reading the original paper.

---

## 6. After the meeting

- [ ] Write the mentor's answers into [`project-focus-decision.md`](project-focus-decision.md) and change its status from provisional to confirmed or revised.
- [ ] Update **Next active work** in [`project_control.md`](../project_control.md).

---

## 7. Reference documents

| Document | Use it for |
| --- | --- |
| [`project_control.md`](../project_control.md) | Overall plan, checklist, and work log |
| [`project-focus-decision.md`](project-focus-decision.md) | Why AI for Physics scored 32/35, the comparison table, the four-week plan |
| [`ai-physics-publication-feasibility.md`](ai-physics-publication-feasibility.md) | Minimum publishable result, go/no-go gates, Phase A → B sequencing |
| [`ai-for-physics-survey.md`](ai-for-physics-survey.md) | AI for Physics survey: 29-paper chronology and open questions |
| [`world-model-survey.md`](world-model-survey.md) | World-model survey: taxonomy, lineages (Ha, LeCun, DeepMind, NVIDIA, World Labs Atlas) |
| [`recursive-self-improvement.md`](recursive-self-improvement.md) | RSI definition, claim/evidence matrix, proposed experiment |
| [`branch-mortality-analysis.md`](branch-mortality-analysis.md) | The phylogeny evidence: label counts, citation flow, keywords, edge checks |
| [`present-frontier-census.md`](present-frontier-census.md) | 12 frontier areas compared before choosing |
| [`paper-relationship-list.md`](paper-relationship-list.md) | Papers and typed relationships for the atlas |
| [`phd-in-ai-2028.md`](phd-in-ai-2028.md) | Separate note on the 2028 PhD decision |
| [`experiments/burgers-pilot/README.md`](../experiments/burgers-pilot/README.md) | How to run the solver and plot |
