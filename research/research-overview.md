# ML Civilization — research overview

**Updated:** 2026-10-01 · **Status:** research direction provisional

**Structure:** Part 1 summarizes the project and the proposed research. Part 2 gives the details and evidence. Part 3 lists every cited paper and project file.

---

# Part 1 — Summary

**The logic in one line:** *ideas in AI rarely die → today's two frontiers share one weakness → I test that weakness where the answer is exact → open questions.*

## 1. Past: ideas in AI rarely die

- I built **ML Civilization**, a family tree of AI. For 16 old research branches it shows why each started, why it declined, and where its ideas went.
- **Finding:** names die, ideas don't. Expert systems fell to 6% of their peak, but its ideas moved into rule learning, verification, and today's agents. Genetic programming's name is at 53% of its peak, but its founding paper is cited more than ever.
- **Proof from the source:** in 1991, hand-coded expert systems took **100–180 person-years** to build; systems that learned rules from examples took **1–9**. That bottleneck is why the field moved.
- **The website** shows this as a left-to-right family tree: each branch, then where its ideas went, colored by survival, merger, migration, or extinction.

## 2. Present: two frontiers, one shared weakness

- **World models** (Ha → Dreamer → JEPA → Genie, Cosmos, World Labs Atlas) predict what happens next. They look realistic, but nobody can check whether they're *right* about new situations.

  **Three families of world model**

  | Family | Example | How it predicts | Weak spot |
  | --- | --- | --- | --- |
  | **1. Latent dynamics** (RNN-based) | [Ha & Schmidhuber 2018](https://arxiv.org/abs/1803.10122), [Dreamer](https://arxiv.org/abs/1912.01603) | Compress each frame into a small latent code; an RNN predicts how the code changes; the agent practises inside this "dream" | The code may drop details an action later depends on |
  | **2. Predict meaning, not pixels** | [LeCun's JEPA](https://openreview.net/pdf/315d43ba26f55357a84cec9a7ed15a6610094f79.pdf), [V-JEPA 2](https://ai.meta.com/research/publications/v-jepa-2-self-supervised-video-models-enable-understanding-prediction-and-planning/) | Predict the *representation* of the next moment, skipping pixels | Hard to check what was thrown away |
  | **3. Generate pixels / video** | [Genie 3](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/), [Cosmos](https://research.nvidia.com/labs/cosmos-lab/cosmos3/), [World Labs Atlas](https://www.worldlabs.ai/blog/atlas) | Generate the next frames, pixel by pixel, often controllable by actions or camera | Looks realistic but may be physically wrong; consistency lasts minutes |

  In all three, the **latent space** (the compressed internal state) decides what the model can and cannot predict.
- **Recursive self-improvement** (STOP → AlphaEvolve → Darwin Gödel Machine): systems improve their own code, but only as well as their tests can check.
- **Shared weakness:** both look good on what they were tested on and can fail under a shift nobody checked.
- On the website's Frontier view, World Models and Bounded RSI both lead to **Intervention and Regime Shift**, which motivates the proposed project.

## 3. Research question: test the weakness where the answer is exact

- **Testbed:** the Burgers equation, a simple fluid model with one knob, viscosity ν. A solver gives the exact answer, so every error is measurable. See the [viscosity-shift plot](../experiments/burgers-pilot/viscosity-shift.svg).
- **Setup:** train on ν = 0.01–0.04; test *outside* that range at 0.005 and 0.08.
- **Four models:** plain FNO · FNO + physics loss (replicates a 2026 thesis) · FNO + **formula correction** · FNO + **equal-size neural correction** (the control).
- **The gap:** Late Fusion Neural Operators (2026) showed a formula correction cuts Burgers extrapolation error by ~72%, but **never tested a same-size neural net in its place**. So we don't know whether the formula's *structure* is what helps. I test that, and also how much it depends on choosing the right formula terms.
- **Status:** solver and frozen test splits done (21 runs pass the physics checks). Next: train the first FNO.

## 4. Open questions for discussion

1. Is **GPU access** available for training?
2. Is the **scope** right: four models, plus the formula-library test?
3. Physics, world models, or RSI: **which direction** would you push me toward?

---

# Part 2 — Details

## B1. The research idea in detail

### The physics: Burgers equation

`u_t + u·u_x = ν·u_xx` describes a 1D fluid on a ring.
- `u·u_x` steepens waves into a **shock**.
- `ν·u_xx` (viscosity, friction between neighbouring fluid) smooths it.
- Larger ν gives a smoother shock.

Plot: [`viscosity-shift.svg`](../experiments/burgers-pilot/viscosity-shift.svg). All runs form a shock by t = 2, and ν = 0.08 is visibly roundest.

### The shift

| Split | Viscosities | Tests |
| --- | --- | --- |
| Train | 0.01, 0.02, 0.04 | What the model learns from |
| Interpolation | 0.015, 0.03 | Unseen but between training values (easy) |
| Extrapolation | 0.005, 0.08 | Outside the training range (the real question) |

The horizon is t = 2 because before the shock forms, viscosity changes the solution by only 1–3%.

### The four models

All four use the same backbone, data, and budget.

| # | Model | Role |
| --- | --- | --- |
| 1 | [FNO](https://arxiv.org/abs/2010.08895), data only | Baseline |
| 2 | FNO + PDE-residual loss ([PINO](https://arxiv.org/abs/2111.03794)) | Close replication of a 2026 thesis |
| 3 | FNO + **symbolic correction** fitted to training errors (sparse regression, e.g. [SINDy](https://doi.org/10.1073/pnas.1517384113)) | The idea |
| 4 | FNO + **equal-size neural correction**, same inputs and data | The control |

**What the two corrections are.** The FNO's prediction leaves an error at each point. A correction learns that error from training data and is added back: *final prediction = FNO output + correction.*

- **Equation-like (formula) correction:** the error is written as a short formula built from physics-style terms, for example (illustrative):
  `error ≈ 0.8 · ν · u_xx − 0.1 · u · u_x`
  Sparse regression tries a list of candidate terms (`u`, `u_x`, `u_xx`, `u·u_x`, `ν·u_xx`, …) and keeps only the few that matter, with fitted coefficients. The result is a formula you can read.
- **Neural-net correction:** a tiny network learns the same error with no formula, just weights. It is flexible but not readable.

**Reading the result:**
- 3 beats 4 on extrapolation → the formula's *structure* helps.
- 3 ≈ 4 → only the extra module helps.
- Neither beats 1 → corrections don't transfer.
- 3 helps only on interpolation → the formula overfit.

### Measurement rules

- **Metrics:**
  - prediction error per split;
  - physics checks (mass conserved, energy only decreasing);
  - compute;
  - worst seed over ≥3 seeds.
- **No leakage:** fit and tune only on training viscosities. Iterate against a *practice* shift inside the training range (e.g., train on 0.01–0.02, validate at 0.04). Open the real extrapolation test once, at the end.

### How it connects

- **World models:** a small world model of a physical system, tested where world models fail, but with an exact answer key.
- **RSI (Phase B):** freeze the extrapolation tests as a hidden suite. Do a coding agent's improvements survive them?
- **Phylogeny:** symbolic regression descends from genetic programming and now migrates into physics.

## B2. Prior work and the research gap

### Directly related

| Paper | What it did | Missing piece |
| --- | --- | --- |
| [Campos Vilar 2026, TU Delft thesis](https://repository.tudelft.nl/record/uuid:bc293c72-0833-4df2-bd42-0aa63914ee23) ([code](https://github.com/samuekisde/fno-pino-data-efficiency)) | FNO vs PINO on PDEBench Burgers (train ν = 0.01, OOD 0.001) and Darcy; 3 seeds, A100. PINO matched full-data FNO with 50% of the labels, but **physics loss did not make OOD reliable**. | Only physics *loss*; no correction modules |
| [Late Fusion Neural Operators 2026](https://arxiv.org/abs/2604.16721) | Sparse-regression formula on FNO features plus parameters; Burgers trained on ν ∈ (0.01, 0.02), tested on ν < 0.01; **~72% lower OOD RMSE than FNO** | Compares only with FNO and CAPE-FNO; **never swaps the formula for a same-size neural net** |
| [HyCOP 2026](https://arxiv.org/abs/2605.00820) | Composes numerical sub-solvers and learned modules into short programs; order-of-magnitude OOD gains. Replacing numerical primitives with learned FNOs raised OOD error ~10× | Structure there means *numerical solvers*, not a fitted correction on a neural operator |
| [PINO training study 2026](https://arxiv.org/abs/2606.06164) | PINO training choices across operators and PDEs | Not about corrections |
| [Residual-based error correction for neural operators](https://arxiv.org/abs/2210.03008), [corrector operator](https://arxiv.org/abs/2306.12047) | Correct operator predictions using PDE residuals | Correction by solving the equation, not symbolic vs learned |
| [Symbolic discovery of hidden operators](https://arxiv.org/abs/2212.04630), [NOMTO](https://arxiv.org/abs/2501.08086) | Discover equations using neural operators | Equation discovery, not extrapolation of a corrected surrogate |

### Evidence that symbolic structure extrapolates better (other settings)

| Paper | Finding |
| --- | --- |
| [Cranmer et al. 2020, NeurIPS](https://arxiv.org/abs/2006.11287) | A formula extracted from a graph network generalized **out of distribution better than the network itself** |
| [Rackauckas et al. 2020, Universal Differential Equations](https://arxiv.org/abs/2001.04385) | Symbolic regression on a learned missing term improves extrapolation over the neural term (ODEs) |
| [Zanna & Bolton, ocean closures](https://repository.library.noaa.gov/view/noaa/32948/noaa_32948_DS1.pdf) | Equation discovery gives interpretable, conservation-respecting eddy closures |
| [Jakhar et al. 2024, JAMES](https://doi.org/10.1029/2023MS003874) | Closed-form closures appear generalizable across flow regimes, but need physics-informed libraries and sparsity to be stable |
| [OrthoReg 2026](https://arxiv.org/abs/2606.19145) | Hybrid symbolic-neural models extrapolate better than neural-only corrections; addresses library mismatch |

### Assessment of the gap

- **Not new:** "formulas extrapolate better than neural nets" has support in ODEs, graph networks, and climate closures.
- **Still open:** for a **neural-operator surrogate under a PDE parameter shift**, does a fitted symbolic correction beat a **matched-size learned correction** on extrapolation? Late Fusion, the closest paper, skips exactly this control.
- **Likely reasons it is skipped:** method papers mainly compare against standard baselines rather than isolate why a method works; reviewers typically ask for strong baselines; and each extra model adds training runs.
- **Stronger angle to discuss:** vary whether the formula's term library contains the right terms (exact / partly wrong / generic). That asks **when** symbolic structure helps, not just whether, and connects to OrthoReg's library-mismatch problem.
- **Scale:** a careful ablation-style contribution, suitable for a short workshop paper, not a main-conference claim.

Feasibility and publication path: [`ai-physics-feasibility.md`](ai-physics-feasibility.md).

## B3. Plan, status, and risks

**Done**
- Reference solver with frozen splits; all 21 trajectories pass the mass and energy checks.
- Persistence baseline (predict "no change") error at t = 2 is 0.49. That is the floor real models must beat.

**Next go/no-go:** train model 1 (FNO) with 3 seeds. If it extrapolates fine, the shift is too easy and must be widened first.

**Four-week plan:** [`project-focus-decision.md`](project-focus-decision.md).
1. Baselines.
2. Physics loss.
3. Symbolic and learned corrections.
4. Stress tests and write-up.

**Needs:** GPU access, PyTorch, the [`neuraloperator`](https://neuraloperator.github.io/dev/_modules/neuralop/data/datasets/burgers.html) library. Optional [PDEBench data](https://darus.uni-stuttgart.de/dataset.xhtml?persistentId=doi:10.18419/darus-2986&version=7.0) (~7.7 GB per viscosity file).

**Risks**

| Risk | Safeguard |
| --- | --- |
| The shift is too easy | Check FNO extrapolation first; widen if needed |
| The formula overfits noise | Complexity penalty, multiple seeds, expression stability |
| Leakage through repeated tuning | Practice shift inside training data; open the real test once |
| Unfair baseline | Same backbone, data, and tuning budget for all four models |

**Publication venues**
- [ICML 2026 AI for Science](https://ai4sciencecommunity.github.io/icml26/call)
- [NeurIPS 2025 AI for Science](https://ai4sciencecommunity.github.io/neurips25/call)
- [AI&PDE format](https://openreview.net/pdf?id=med7qzMIaG)
- [ICLR workshop guide](https://iclr.cc/Conferences/2026/WorkshopGuide)

## B4. The phylogeny: method and evidence

### What it is

An interactive **causal atlas** of machine-learning history. A timeline answers *what came when*; a phylogeny answers *what descended from what, and why*. Every branch gets four questions:

1. **Why did it come to be?** The problem or opportunity that motivated it.
2. **Why did it stall or die out?** The bottleneck it hit.
3. **Where did its ideas go?** Survival, merger, migration, or extinction.
4. **What does it connect to at the frontier?** Including under-explored branches worth reopening.

### How "death" is measured

- **Title-label visibility:** for 16 branches, exact-phrase paper titles in OpenAlex (1950–2025), divided by all papers each year. Recent share (2021–25) is compared with the branch's peak five-year share.
- **Exact phrases, not broad search:** broad search made artificial life and learning classifier systems look revived when they were not.
- **Caveat:** this measures *label visibility*, not every use of an idea, and cannot prove why a field declined.

| Branch | Survival (recent ÷ peak) | Diagnosis |
| --- | ---: | --- |
| Expert systems | 0.06 | Label largely died |
| Inductive logic programming | 0.13 | Legacy niche |
| Learning classifier systems | 0.16 | Legacy niche |
| Artificial life | 0.22 | Legacy niche |
| Case-based reasoning | 0.38 | Surviving niche, declining |
| Hopfield networks | 0.41 (trend 2.3×) | Reviving |
| Self-organizing maps | 0.44 | Surviving niche |
| Genetic programming | 0.53 | Surviving niche |
| Boltzmann machines | 0.64 | Surviving niche |
| Fuzzy logic | 0.96 | Active engineering field |
| Reservoir computing | 1.00 (trend 3.2×) | Growing / revived |
| Neuroevolution | 1.00 (trend 1.8×) | Growing / revived |
| Symbolic regression | 1.00 (trend 3.4×) | Growing / revived |
| SVMs, Bayesian networks | 0.82, 1.00 | Active controls |

Full method and branch-by-branch causes: [`branch-mortality-analysis.md`](branch-mortality-analysis.md).

### Do ideas outlive their labels? Citation evidence

For 13 branches I tracked citations to each **founding paper**:

- **Genetic programming:** label at 53% of peak, but Koza's founding paper is cited at its all-time high. The idea outlived the label.
- **Self-organizing maps** (+0.25) and **ILP** (+0.15) show the same pattern more weakly.
- **Expert systems:** label at 6% and MYCIN citations at 4%. Most ideas survive by reinvention, not citation.
- **Symbolic regression:** its citers are now mostly **physics (33%)**, a measurable migration into AI for Physics.

**Successor keywords** (terms ≥3× more common among recent citers):
- Neuroevolution → **neural architecture search**
- Symbolic regression → **SINDy, PDEs**
- Reservoir computing → **physical reservoir computing**
- ILP → **explainable AI, program synthesis**
- Self-organizing maps → **geoscience**

### The four ways an idea moves (the website's colored edges)

| Flow | Meaning | Examples |
| --- | --- | --- |
| **Extinction** | Hits a wall it can't pass | Expert systems → knowledge-acquisition bottleneck; seq2seq → fixed-vector bottleneck (attention fixed it) |
| **Migration** | Moves to a new field or substrate | Knowledge bottleneck → ILP; reservoir computing → physical hardware |
| **Survival** | Core mechanism continues in a new form | Hopfield → modern Hopfield; RNN → S4 → Mamba; genetic programming → symbolic regression |
| **Merger** | Two lines combine | Genetic programming + LLMs → AlphaEvolve; modern Hopfield ↔ attention; Mamba-2 merges SSMs and attention |

**Why branches died:**
- Knowledge cost (expert systems, ILP)
- Search cost (genetic programming, until LLM proposals made search cheap)
- Weak evaluation (artificial life)
- Hand-designed representations
- Hardware mismatch (reservoirs, Hopfield)

**They come back when the bottleneck lifts.**

### Edge evidence

- **Direct citation** confirms 5 of 10 featured links:
  - Hopfield 1982 → modern Hopfield
  - Attention ↔ modern Hopfield
  - Reservoir computing → physical reservoirs
  - LSTM → S4
  - WaveNet → S4
- **Expert systems → ILP** is confirmed by reading [Muggleton (1991)](https://www.doc.ic.ac.uk/~shm/Papers/ilp.pdf), not by citation data. His Figure 1 shows the effort to build each system:
  - hand-coded MYCIN and XCON: **100 and 180 person-years**;
  - GASOIL and BMT, built by learning rules from examples: **1 and 9**.
- **Lesson:** citation data can raise confidence in a link, but only reading the source can rule one out.
- **On the website:** every link shows a human **judgment** (documented / inferred / proposed) and, separately, a **citation check**. Open a node → *Connections and evidence*.

### Exploring the website

Run `npm run build && npm run preview` and open the printed URL. The map has four views:

1. **Branches:** the 16 measured branches from left to right, each followed by where its ideas went. Legend colors toggle survival, merger, migration, and extinction links.
2. **Deep learning:** RNN → LSTM → attention → Transformer → state-space models.
3. **Frontier:** world models, bounded RSI, AI for Physics, and the proposed project with its ancestors.
4. **All:** the full causal map.

Clicking a node opens its details; *Connections and evidence* lists each link's judgment and citation check.

## B5. World models

**Three families of world model**

| Family | Example | How it predicts | Weak spot |
| --- | --- | --- | --- |
| **1. Latent dynamics** (RNN-based) | [Ha & Schmidhuber 2018](https://arxiv.org/abs/1803.10122), [Dreamer](https://arxiv.org/abs/1912.01603) | Compress each frame into a small latent code; an RNN predicts how the code changes; the agent practises inside this "dream" | The code may drop details an action later depends on |
| **2. Predict meaning, not pixels** | [LeCun's JEPA](https://openreview.net/pdf/315d43ba26f55357a84cec9a7ed15a6610094f79.pdf), [V-JEPA 2](https://ai.meta.com/research/publications/v-jepa-2-self-supervised-video-models-enable-understanding-prediction-and-planning/) | Predict the *representation* of the next moment, skipping pixels | Hard to check what was thrown away |
| **3. Generate pixels / video** | [Genie 3](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/), [Cosmos](https://research.nvidia.com/labs/cosmos-lab/cosmos3/), [World Labs Atlas](https://www.worldlabs.ai/blog/atlas) | Generate the next frames, pixel by pixel, often controllable by actions or camera | Looks realistic but may be physically wrong; consistency lasts minutes |

In all three, the **latent space** (the compressed internal state) decides what the model can and cannot predict.

**Definition:** a learned model that holds the state of an environment and predicts what happens next, ideally *if I act*. It is a functional category, not one architecture. Survey: [A Comprehensive Survey on World Models for Embodied AI](https://arxiv.org/abs/2510.16732).

| Step | Work | Idea added |
| --- | --- | --- |
| Compact latent dynamics | [Ha & Schmidhuber 2018](https://arxiv.org/abs/1803.10122), [PlaNet](https://arxiv.org/abs/1811.04551), [Dreamer](https://arxiv.org/abs/1912.01603) → [DreamerV3](https://arxiv.org/abs/2301.04104) | Compress, predict in latent space, train a policy in imagined rollouts |
| Predict only what planning needs | [MuZero](https://arxiv.org/abs/1911.08265) | Reward, value, and policy; good decisions ≠ faithful simulator |
| Predict representations, not pixels | [LeCun 2022](https://openreview.net/pdf/315d43ba26f55357a84cec9a7ed15a6610094f79.pdf), [I-JEPA](https://arxiv.org/abs/2301.08243), [V-JEPA 2](https://ai.meta.com/research/publications/v-jepa-2-self-supervised-video-models-enable-understanding-prediction-and-planning/) | More semantic; may drop details an action needs |
| Scale on video | [Genie](https://deepmind.google/research/publications/60474/), [Genie 3](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/), [Cosmos](https://research.nvidia.com/publication/2025-01_cosmos-world-foundation-model-platform-physical-ai), [Cosmos 3](https://research.nvidia.com/labs/cosmos-lab/cosmos3/) | Interactive worlds from video; consistency lasts minutes |
| Spatial / 3D-grounded | [World Labs Atlas](https://www.worldlabs.ai/blog/atlas) (2026-09-01) | One model over text, images, video, and 3D, tied to explicit camera poses |

**Lineages:**
- **David Ha:** the starting loop: compress, predict, train inside the "dream."
- **Yann LeCun:** predictive representation plus memory and planning.
- **DeepMind:** several branches (Dreamer, MuZero, Genie).
- **NVIDIA:** a physical-AI platform; treat "general-purpose" claims as positioning.
- **World Labs Atlas:** a real step for the spatial branch, but:
  - all benchmarks are World Labs' own;
  - the baselines got text where Atlas got camera geometry;
  - nothing shows it predicts the physical consequences of actions.

  See the [independent review](https://kingy.ai/blog/world-labs-atlas-world-model-deep-dive/).

**Established vs not:**
- *Established:* latent models help planning on bounded tasks, and video models can generate controllable worlds.
- *Not established:* that realism means physical correctness, or that passive video teaches the consequences of actions.

**The gap:** evaluation. A model can look right and be wrong about what an action does.

Full survey: [`world-model-survey.md`](world-model-survey.md).

## B6. Recursive self-improvement

**Definition:** a system proposes a change to something that drives its own operation, tests it with an evaluator it doesn't control, keeps it only if it passes, and the kept change improves the *next* round. It has five fields: **proposer, target, evaluator, acceptance rule, loop closure**. Survey: [RSI: From Bounded Self-Refinement to Autonomous Research Loops](https://arxiv.org/abs/2607.07663).

| Year | System | What actually improves |
| --- | --- | --- |
| 2023 | [STOP](https://arxiv.org/abs/2310.02304) | A scaffold rewrites itself; the LLM is unchanged |
| 2024 | [Gödel Agent](https://arxiv.org/abs/2410.04444) | An agent edits its own logic; benchmark-bound |
| 2025 | [AlphaEvolve](https://arxiv.org/abs/2506.13131) | LLM-proposed programs evolve under automatic evaluators |
| 2025 | [Darwin Gödel Machine](https://arxiv.org/abs/2505.22954) | A coding agent edits its own codebase and keeps an archive; SWE-bench 20% → 50% |

- **Root:** genetic programming. LLMs replaced random mutation with better proposals.
- **Gap:** every RSI result is only as good as its tests, and visible-score gains can hide regressions.
- **Roadmap paper:** [The Last AI Built by Humans](https://arxiv.org/abs/2609.11873).

Full survey: [`recursive-self-improvement.md`](recursive-self-improvement.md).

## B7. Related interest: emotion concepts in language models

Anthropic found internal "emotion vectors" in Claude Sonnet 4.5 that **causally affect behavior**: steering toward "desperation" increased reward hacking, and "calm" reduced it. These are *functional* representations, not evidence of feelings. Sources: [summary, April 2026](https://www.anthropic.com/research/emotion-concepts-function), [technical paper](https://transformer-circuits.pub/2026/emotions/index.html).

**Link to the theme:** an internal state invisible in outputs could predict when an agent games its evaluator. This is a possible later bridge to RSI.

## B8. Further questions for discussion

1. **Compute:** is GPU access available?
2. **Scope:** four models, or cut to fewer?
3. **Direction:** physics, world models, or RSI?
4. **Physics:** is Burgers the right first PDE?
5. **Venue:** is a 2027 AI-for-Science or AI&PDE workshop a reasonable target?
6. **Prior code:** should I build directly on Late Fusion's setup?
7. **Website:** is the phylogeny worth a paper of its own?
8. **Formula library:** should model 3 test how much the formula's advantage depends on choosing the right terms (exact / partly wrong / generic library)?

---

# Part 3 — References

## R1. Paper library

Every paper and source cited across the project, grouped by topic.

### Research idea and closest prior work
- [Fourier Neural Operator](https://arxiv.org/abs/2010.08895) · [PINO](https://arxiv.org/abs/2111.03794) · [DeepONet](https://doi.org/10.1038/s42256-021-00302-5)
- [Campos Vilar 2026 thesis](https://repository.tudelft.nl/record/uuid:bc293c72-0833-4df2-bd42-0aa63914ee23) · [code](https://github.com/samuekisde/fno-pino-data-efficiency)
- [Late Fusion Neural Operators](https://arxiv.org/abs/2604.16721) · [HyCOP](https://arxiv.org/abs/2605.00820) · [PINO training study](https://arxiv.org/abs/2606.06164)
- [Residual-based error correction](https://arxiv.org/abs/2210.03008) · [Residual-based corrector operator](https://arxiv.org/abs/2306.12047) · [Hidden-operator discovery](https://arxiv.org/abs/2212.04630) · [NOMTO](https://arxiv.org/abs/2501.08086)
- [Cranmer et al. 2020](https://arxiv.org/abs/2006.11287) · [Universal Differential Equations](https://arxiv.org/abs/2001.04385) · [OrthoReg](https://arxiv.org/abs/2606.19145)
- [Zanna & Bolton ocean closures](https://repository.library.noaa.gov/view/noaa/32948/noaa_32948_DS1.pdf) · [Jakhar et al. 2024](https://doi.org/10.1029/2023MS003874)
- [SINDy](https://doi.org/10.1073/pnas.1517384113) · [Schmidt & Lipson 2009](https://doi.org/10.1126/science.1165893) · [AI Feynman](https://doi.org/10.1126/sciadv.aay2631)
- Data: [PDEBench dataset](https://darus.uni-stuttgart.de/dataset.xhtml?persistentId=doi:10.18419/darus-2986&version=7.0) · [PDEBench Burgers commands](https://github.com/pdebench/PDEBench/blob/main/pdebench/models/run_forward_1D.sh) · [NeuralOperator Burgers](https://neuraloperator.github.io/dev/_modules/neuralop/data/datasets/burgers.html)

### AI for Physics survey
- Surveys: [Physics-informed ML survey 2025](https://doi.org/10.1007/s44379-025-00016-0) · [Scientific discovery in the age of AI](https://doi.org/10.1038/s41586-023-06221-2) · [Stanford AI Index 2026, science](https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_5_science.pdf) · [SciencePedia](https://arxiv.org/abs/2510.26854)
- Foundations: [Hopfield 1982](https://doi.org/10.1073/pnas.79.8.2554) · [Lagaris et al.](https://doi.org/10.1109/72.712178) · [Liquid-state machines](https://doi.org/10.1162/089976602760407955) · [PINNs](https://doi.org/10.1016/j.jcp.2018.10.045) · [Hamiltonian NNs](https://arxiv.org/abs/1906.01563)
- Simulators: [Interaction Networks](https://arxiv.org/abs/1612.00222) · [Learning to Simulate](https://arxiv.org/abs/2002.09405) · [MeshGraphNets](https://arxiv.org/abs/2010.03409)
- Materials and chemistry: [SchNet](https://arxiv.org/abs/1706.08566) · [NequIP](https://doi.org/10.1038/s41467-022-29939-5) · [MACE](https://arxiv.org/abs/2206.07697) · [DeepH](https://arxiv.org/abs/2104.03786) · [GNoME](https://doi.org/10.1038/s41586-023-06735-9) · [A-Lab](https://doi.org/10.1038/s41586-023-06734-w) · [MatterGen](https://doi.org/10.1038/s41586-025-08628-5) · [Polarizable foundation potential](https://doi.org/10.1038/s41467-025-65496-3)
- Weather and climate: [FourCastNet](https://arxiv.org/abs/2202.11214) · [Pangu-Weather](https://doi.org/10.1038/s41586-023-06185-3) · [GraphCast](https://doi.org/10.1126/science.adi2336) · [NeuralGCM](https://doi.org/10.1038/s41586-024-07744-y) · [Aurora](https://doi.org/10.1038/s41586-025-09005-y)
- PDE foundation models: [PDE-FM](https://arxiv.org/abs/2511.21861)
- Physics data and hardware: [ParticleNet](https://doi.org/10.1103/PhysRevD.101.056019) · [GW ML review](https://doi.org/10.1007/s41114-024-00055-8) · [AResGW](https://arxiv.org/abs/2211.01520) · [AResGW sensitivity](https://arxiv.org/abs/2509.05283) · [GWOSC tutorials](https://gwosc.org/tutorials/) · [TESS](https://science.nasa.gov/mission/tess/) · [GNNome](https://genome.cshlp.org/content/early/2024/10/28/gr279307124) · [Memristor reservoir](https://doi.org/10.1038/s41467-017-02337-y)

### World models
[Embodied world-model survey](https://arxiv.org/abs/2510.16732) · [Ha & Schmidhuber](https://arxiv.org/abs/1803.10122) · [Recurrent World Models](https://arxiv.org/abs/1809.01999) · [PlaNet](https://arxiv.org/abs/1811.04551) · [MuZero](https://arxiv.org/abs/1911.08265) · [Dreamer](https://arxiv.org/abs/1912.01603) · [DreamerV2](https://arxiv.org/abs/2010.02193) · [DayDreamer](https://arxiv.org/abs/2106.09797) · [DreamerV3](https://arxiv.org/abs/2301.04104) · [LeCun 2022](https://openreview.net/pdf/315d43ba26f55357a84cec9a7ed15a6610094f79.pdf) · [I-JEPA](https://arxiv.org/abs/2301.08243) · [V-JEPA 2](https://ai.meta.com/research/publications/v-jepa-2-self-supervised-video-models-enable-understanding-prediction-and-planning/) · [Genie](https://deepmind.google/research/publications/60474/) · [Genie 3](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/) · [Cosmos platform](https://research.nvidia.com/publication/2025-01_cosmos-world-foundation-model-platform-physical-ai) · [Cosmos 3](https://research.nvidia.com/labs/cosmos-lab/cosmos3/) · [Cosmos 3 report](https://research.nvidia.com/labs/cosmos-lab/cosmos3/technical-report.pdf) · [World Labs Atlas](https://www.worldlabs.ai/blog/atlas) · [Atlas review](https://kingy.ai/blog/world-labs-atlas-world-model-deep-dive/)

### Recursive self-improvement and automated research
[RSI survey](https://arxiv.org/abs/2607.07663) · [The Last AI Built by Humans](https://arxiv.org/abs/2609.11873) · [STOP](https://arxiv.org/abs/2310.02304) · [Gödel Agent](https://arxiv.org/abs/2410.04444) · [AlphaEvolve](https://arxiv.org/abs/2506.13131) · [AlphaEvolve blog](https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/) · [Darwin Gödel Machine](https://arxiv.org/abs/2505.22954) · [Automated alignment researchers](https://www.anthropic.com/research/automated-researchers-mitigate-alignment-failures) · [Petri auditing](https://www.anthropic.com/research/petri-open-source-auditing)

### Phylogeny: historical branches
- Expert systems and ILP: [MYCIN-era analysis](https://doi.org/10.1016/B978-0-444-87137-4.50029-1) · [Lauritzen & Spiegelhalter 1988](https://doi.org/10.1111/j.2517-6161.1988.tb01721.x) · [Muggleton 1991](https://doi.org/10.1007/BF03037089) ([PDF](https://www.doc.ic.ac.uk/~shm/Papers/ilp.pdf)) · [ILP at 30, Cropper et al.](https://doi.org/10.1007/s10994-021-06089-1) · [Garnelo & Shanahan 2019](https://doi.org/10.1016/j.cobeha.2018.12.010)
- Case-based reasoning: [Aamodt & Plaza 1994](https://doi.org/10.3233/AIC-1994-7104) · Learning classifier systems: [Wilson 1995 (XCS)](https://doi.org/10.1162/evco.1995.3.2.149)
- Fuzzy logic: [Zadeh 1965](https://doi.org/10.1016/S0019-9958(65)90241-X) · [Mamdani & Assilian 1975](https://doi.org/10.1016/S0020-7373(75)80002-2)
- Neural memory: [Kohonen 1990](https://doi.org/10.1109/5.58325) · [Hopfield 1982](https://doi.org/10.1073/pnas.79.8.2554) · [Modern Hopfield / Ramsauer 2020](https://arxiv.org/abs/2008.02217) · [Boltzmann machines 1985](https://doi.org/10.1207/s15516709cog0901_7)
- Evolution: [NEAT 2002](https://doi.org/10.1162/106365602320169811) · [Deep neuroevolution 2017](https://arxiv.org/abs/1712.06567) · Controls: [SVM 1995](https://doi.org/10.1007/BF00994018)
- Sequence models: [Mamba](https://arxiv.org/abs/2312.00752) · [Switch Transformer](https://arxiv.org/abs/2101.03961)

### Frontier census (other areas)
[AlphaGeometry, Trinh 2024](https://doi.org/10.1038/s41586-023-06747-5) · [DeepSeek-R1 report](https://arxiv.org/abs/2501.12948) · [SWE-bench](https://arxiv.org/abs/2310.06770) · [OSWorld](https://arxiv.org/abs/2404.07972) · [In-memory computing, Ielmini & Wong](https://doi.org/10.1038/s41928-018-0092-2)

### Related interest
[Emotion concepts summary](https://www.anthropic.com/research/emotion-concepts-function) · [Emotion concepts paper](https://transformer-circuits.pub/2026/emotions/index.html)

### Tools and venues
[OpenAlex search docs](https://help.openalex.org/api/searching/) · [ICLR 2026 workshop guide](https://iclr.cc/Conferences/2026/WorkshopGuide) · [AI&PDE format](https://openreview.net/pdf?id=med7qzMIaG) · [NeurIPS 2025 AI for Science](https://ai4sciencecommunity.github.io/neurips25/call) · [ICML 2026 AI for Science](https://ai4sciencecommunity.github.io/icml26/call) · [AAAI 2026 AI4Research](https://openreview.net/group?id=AAAI.org%2F2026%2FWorkshop%2FAI4Research)

## R2. Project documents, data, and code

### Research notes

| Document | Contents |
| --- | --- |
| [`project_control.md`](../project_control.md) | Plan, checklist, weekly review, work log |
| [`project-focus-decision.md`](project-focus-decision.md) | Seven-candidate comparison (AI for Physics 32/35), research question, four-week plan |
| [`ai-physics-feasibility.md`](ai-physics-feasibility.md) | Minimum publishable result, go/no-go gates, Phase A → B |
| [`ai-for-physics-survey.md`](ai-for-physics-survey.md) | AI for Physics survey: taxonomy, 29-paper chronology |
| [`world-model-survey.md`](world-model-survey.md) | World-model survey: taxonomy, lineages, bottlenecks |
| [`recursive-self-improvement.md`](recursive-self-improvement.md) | RSI definition, claim/evidence matrix, experiment |
| [`branch-mortality-analysis.md`](branch-mortality-analysis.md) | Phylogeny evidence: labels, citation flow, keywords, edge checks |
| [`present-frontier-census.md`](present-frontier-census.md) | 12 frontier areas compared |
| [`paper-relationship-list.md`](paper-relationship-list.md) | Papers and typed relationships for the atlas |
| [`../docs/open-literature-plan.md`](../docs/open-literature-plan.md) | Literature-import engineering plan |
| [`../docs/branch-realizer-plan.md`](../docs/branch-realizer-plan.md) | Branch Realizer design |
| [`../README.md`](../README.md) | Website setup and features |

### Data and code

| File | Contents |
| --- | --- |
| [`../experiments/burgers-pilot/`](../experiments/burgers-pilot/README.md) | Reference solver, splits, physics checks, shift plot |
| [`../scripts/analyze-branch-trajectories.mjs`](../scripts/analyze-branch-trajectories.mjs) | Title-label analysis |
| [`../scripts/analyze-citation-flow.mjs`](../scripts/analyze-citation-flow.mjs) | Citation flow, keywords, edge checks |
| [`data/branch-trajectory-summary.csv`](data/branch-trajectory-summary.csv) · [`data/branch-yearly-counts.csv`](data/branch-yearly-counts.csv) · [`data/branch-query-sensitivity.csv`](data/branch-query-sensitivity.csv) · [`data/branch-top-cited-papers.csv`](data/branch-top-cited-papers.csv) | Label statistics |
| [`data/branch-citation-flow.csv`](data/branch-citation-flow.csv) · [`data/branch-citation-yearly.csv`](data/branch-citation-yearly.csv) · [`data/edge-citation-evidence.csv`](data/edge-citation-evidence.csv) | Citation evidence |
| [`data/atlas-research-nodes.json`](data/atlas-research-nodes.json) · [`data/atlas-research-edges.csv`](data/atlas-research-edges.csv) | Atlas import data |
| [`../src/data/researchGraph.ts`](../src/data/researchGraph.ts) | The website's nodes and edges, with confidence and citation fields |
