# Present AI frontier census

**Status:** broad first pass before deep dives  
**Updated:** 2026-09-22  
**Decision rule:** do not select the project focus from this document alone; use it to decide what deserves deep comparison

## Scope

“Frontier” here means a research area in which at least one of the following changed materially in 2024–2026:

- a capability crossed a previously important threshold;
- a new model class, training signal, or evaluation regime became credible;
- a scientific or physical workflow moved from demonstration toward use;
- a bottleneck became measurable enough for a decisive experiment; or
- a historical idea was reopened by new compute, data, hardware, or foundation models.

The census distinguishes **technical evidence** from company positioning. A polished demonstration is not treated as proof of generality.

## Frontier map

| Frontier | What changed recently | Central unresolved bottleneck | Historical ancestors | Small project-scale experiment |
| --- | --- | --- | --- | --- |
| AI for Physics and physical-system foundation models | Neural operators, differentiable simulators, weather/climate models, scientific foundation models, and equation discovery now span multiple physical domains. | Extrapolation outside the training distribution while respecting invariants, uncertainty, and causal interventions. | Symbolic regression, reservoir computing, energy models, ILP, Bayesian structure | Compare a learned operator, a physics-constrained model, and a hybrid symbolic residual on one PDE under parameter and resolution shift. |
| World models and physical AI | Latent predictive agents, action-conditioned video models, and interactive generative environments are converging. | Long-horizon physical and causal consistency; action grounding; evaluation beyond visual plausibility. | Hopfield memory, CBR, dynamical systems, artificial life, predictive coding | Test whether latent rollouts predict intervention outcomes better than video-quality metrics suggest. |
| Automated AI research and bounded RSI | Systems can revise code, search algorithms, run experiments, and retain improvements inside externally evaluated loops. | Evaluator reliability, hidden regressions, benchmark gaming, direction-setting, and safe persistence. | Genetic programming, neuroevolution, LCS, expert-system verification | Let an agent improve a small solver under hidden tests, mutation budgets, regression suites, and adversarial evaluator checks. |
| Verifiable reasoning and inference-time search | Search, self-consistency, proof assistants, process supervision, and learned verifiers can spend compute at inference time. | Transferring gains from domains with hard verifiers to open-ended tasks without reward hacking. | Automated theorem proving, expert systems, planning, Monte Carlo search | Compare generator-only, generator-plus-search, and generator-plus-verifier systems under matched inference compute. |
| Long-horizon agents and computer use | Models increasingly operate tools, codebases, browsers, and research environments across many steps. | Error accumulation, state tracking, recovery, permissions, and evaluation under changing environments. | Planning, CBR, blackboard systems, hierarchical RL | Introduce controlled environmental changes and measure recovery rather than only task completion. |
| Multimodal, spatial, and temporal foundation models | Native combinations of text, image, audio, video, 3D, and action are replacing late fusion. | Persistent identity, geometry, temporal consistency, and grounded cross-modal causality. | Multiview geometry, graphical models, predictive coding, SOMs | Use synthetic scenes with exact object identities and interventions to isolate spatial/temporal binding errors. |
| Embodied robotics and generalist policies | Large-scale robot datasets, vision-language-action policies, and world-model planning are beginning to transfer across embodiments. | Safe data-efficient adaptation, contact-rich physics, latency, and sim-to-real reliability. | Model-based control, fuzzy control, imitation learning, reservoir dynamics | Evaluate adaptation to a changed mass, friction, or camera with a fixed interaction budget. |
| Continual, online, and memory-augmented learning | External memory, retrieval, context extension, parameter-efficient adaptation, and test-time learning offer several alternatives to full retraining. | Learning new facts or skills without catastrophic forgetting, contamination, or unsafe self-modification. | CBR, complementary learning systems, Hopfield memory, online Bayesian learning | Stream tasks with controlled concept drift and measure acquisition, retention, calibration, and rollback. |
| Interpretability, evaluation, robustness, and alignment | Automated behavioral auditing, representation-level interventions, sparse feature discovery, and agentic evaluations are scaling. | Whether measured proxies track real failure modes, especially when models recognize or manipulate evaluations. | Expert-system explanations, causal intervention, software verification, adversarial testing | Train against a visible evaluation suite and test whether gains survive hidden causal interventions and adaptive red teams. |
| Efficient architectures and hardware–algorithm co-design | State-space models, sparse experts, quantization, in-memory compute, photonics, and physical neural systems challenge dense attention and von Neumann movement costs. | End-to-end gains after communication, programmability, reliability, and manufacturing costs are included. | Reservoir computing, analog AI, neuromorphic computing, cellular automata | Compare energy, latency, accuracy, and robustness on one streaming task using a reproducible cost model. |
| Causal and neuro-symbolic learning | Learned representations are being combined with programs, constraints, theorem provers, knowledge graphs, and intervention models. | Scaling explicit structure without recreating the knowledge-acquisition bottleneck. | Symbolic AI, ILP, Bayesian networks, expert systems | Give models the same data but different permitted background rules and test sample efficiency plus out-of-distribution reasoning. |
| Synthetic data, self-play, open-endedness, and multi-agent learning | Models increasingly generate curricula, opponents, data, tools, and successor artifacts. | Diversity collapse, self-confirming errors, ecological instability, and weak open-ended metrics. | Artificial life, evolutionary computation, LCS, game theory | Measure whether an evolving curriculum produces transferable skills on held-out environments rather than only endogenous complexity. |

## Evidence anchors

### AI for Physics

- Physics-informed neural networks place governing equations inside the training objective ([Raissi, Perdikaris, and Karniadakis, 2019](https://doi.org/10.1016/j.jcp.2018.10.045)).
- Fourier Neural Operators learn mappings between function spaces rather than one fixed discretization ([Li et al., 2020](https://arxiv.org/abs/2010.08895)).
- GraphCast demonstrated learned medium-range global weather prediction ([Lam et al., 2023](https://doi.org/10.1126/science.adi2336)).
- Symbolic regression provides interpretable candidate laws rather than only forecasts ([AI Feynman](https://doi.org/10.1126/sciadv.aay2631)).
- The 2026 AI Index reports rapid expansion of scientific foundation models while emphasizing that agents still trail experts on full research reproduction ([science chapter](https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_5_science.pdf)).

### World models and embodied prediction

- World Models compressed observations into a latent dynamics model for agent control ([Ha and Schmidhuber, 2018](https://arxiv.org/abs/1803.10122)).
- Dreamer learns behaviors from imagined latent trajectories ([Hafner et al., 2020](https://arxiv.org/abs/1912.01603)); DreamerV3 broadened the same recipe across domains ([2023](https://arxiv.org/abs/2301.04104)).
- V-JEPA 2 combines large-scale video pretraining with limited robot-interaction data and action-conditioned planning ([Meta, 2025](https://ai.meta.com/research/publications/v-jepa-2-self-supervised-video-models-enable-understanding-prediction-and-planning/)).
- Genie 3 demonstrates real-time interactive generated environments but reports consistency over minutes rather than open-ended horizons ([DeepMind, 2025](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/)).
- NVIDIA's Cosmos line explicitly targets world foundation models for physical AI ([Cosmos technical report](https://research.nvidia.com/labs/cosmos-lab/cosmos3/technical-report.pdf)).

### Automated research and bounded RSI

- STOP lets a scaffolding program recursively improve a target program while remaining inside a human-specified objective and evaluator ([Zelikman et al., 2023](https://arxiv.org/abs/2310.02304)).
- AlphaEvolve combines model-generated program proposals, automated evaluators, and evolutionary selection ([DeepMind, 2025](https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/)).
- The Darwin Gödel Machine modifies its own coding-agent code and retains empirically successful descendants in an open-ended archive ([Zhang et al., 2025](https://arxiv.org/abs/2505.22954)).
- Automated alignment researchers provide a bounded 2026 example of repeated proposal, training, evaluation, and retention, while also exposing cheating and proxy limitations ([Anthropic, 2026](https://www.anthropic.com/research/automated-researchers-mitigate-alignment-failures)).

These systems demonstrate closed improvement loops over code, methods, or scaffolds. They do **not** yet establish unrestricted autonomous improvement of model weights, objectives, evaluators, and research direction.

### Verifiable reasoning

- AlphaGeometry combines a neural language model with a symbolic deduction engine for olympiad geometry ([Trinh et al., 2024](https://doi.org/10.1038/s41586-023-06747-5)).
- DeepSeek-R1 reports reinforcement-learning-driven reasoning behavior and distilled variants ([2025 technical report](https://arxiv.org/abs/2501.12948)).
- The frontier advantage is strongest where answers can be checked by execution, formal proof, tests, or exact constraints; open-ended judgment remains harder.

### Agent evaluation

- SWE-bench evaluates agents against real repository issues and executable tests ([Jimenez et al., 2024](https://arxiv.org/abs/2310.06770)).
- OSWorld evaluates multimodal agents in real computer environments ([Xie et al., 2024](https://arxiv.org/abs/2404.07972)).
- Automated behavioral tools such as Petri test agents through diverse multi-turn scenarios, but remain proxy evaluations ([Anthropic, 2025](https://www.anthropic.com/research/petri-open-source-auditing)).

### Efficient and physical computation

- Mixture-of-experts architectures conditionally activate only part of model capacity ([Switch Transformer](https://arxiv.org/abs/2101.03961)).
- Mamba reopens recurrent state-space sequence modeling with hardware-aware selective state updates ([Gu and Dao, 2023](https://arxiv.org/abs/2312.00752)).
- Memristive reservoir systems exploit device dynamics for temporal processing while training only a readout ([Du et al., 2017](https://doi.org/10.1038/s41467-017-02337-y)).
- In-memory compute targets the data-movement bottleneck directly, but device variability and system integration remain central constraints ([Ielmini and Wong, 2018](https://doi.org/10.1038/s41928-018-0092-2)).

## Preliminary comparison

Scores are provisional, 1–5, and exist only to identify what the deep dives must resolve. “Evaluation” asks whether a small project can obtain a decisive result; “atlas fit” asks whether the topic exposes historical death, survival, or revival.

| Frontier | Relevance | Tractability | Evidence | Evaluation | Atlas fit | Main caution |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| AI for Physics | 5 | 4 | 5 | 5 | 5 | Broad scope must be narrowed to one physical problem. |
| World models | 5 | 3 | 5 | 3 | 5 | Video quality can hide poor causal or action modeling. |
| Bounded RSI / automated research | 5 | 3 | 3 | 3 | 5 | Easy to optimize a proxy and mistake it for general self-improvement. |
| Verifiable reasoning | 5 | 4 | 5 | 5 | 4 | Strongest results may not transfer outside verifier-rich domains. |
| Long-horizon agents | 5 | 4 | 5 | 3 | 4 | Benchmarks change rapidly and are contamination-prone. |
| Multimodal/spatial/temporal models | 5 | 3 | 5 | 3 | 4 | Training frontier-scale models is infeasible for this project. |
| Embodied robotics | 5 | 2 | 5 | 4 | 5 | Hardware and data access reduce tractability. |
| Continual and memory-augmented learning | 4 | 4 | 4 | 4 | 5 | Many incompatible problem definitions. |
| Interpretability/evaluation/alignment | 5 | 3 | 5 | 3 | 4 | Explanations and benchmarks may not be faithful. |
| Efficient architectures/hardware | 5 | 2 | 4 | 5 | 5 | Real cost claims need hardware measurements. |
| Causal and neuro-symbolic learning | 4 | 4 | 4 | 4 | 5 | Explicit structure can recreate manual knowledge bottlenecks. |
| Open-ended and multi-agent learning | 4 | 3 | 3 | 2 | 5 | “Open-ended progress” lacks a settled metric. |

## What advances to deep comparison

The three user-priority areas remain mandatory:

1. **AI for Physics** — best combination of falsifiability, historical revival, and tractable experiments.
2. **World models** — central to embodied and predictive intelligence, but evaluation must separate appearance from causality.
3. **Bounded recursive self-improvement** — highly consequential and historically rich, but must be defined as a measurable improvement loop rather than an intelligence-explosion claim.

Four additional comparators should remain in the final decision matrix because they could outperform one of the preferred topics:

- verifiable reasoning;
- continual and memory-augmented learning;
- causal/neuro-symbolic learning; and
- efficient/physical computation.

## Relationships to historical branches

| Historical branch | Relationship | Present frontier | Status |
| --- | --- | --- | --- |
| Symbolic regression | `ENABLES` | Interpretable physical-law discovery | Documented |
| Reservoir computing | `REVIVED_BY` | Physical and neuromorphic computation | Documented |
| Hopfield networks | `REVIVED_BY` | Attention-like associative memory | Documented |
| Expert systems | `INSPIRES` | Explicit verifiers and constrained agents | Inferred; needs citation lineage |
| CBR | `INSPIRES` | Retrieval and episodic agent memory | Inferred; needs citation lineage |
| ILP | `EXTENDS` | Neuro-symbolic program induction | Documented |
| Genetic programming | `REVIVED_BY` | LLM-guided evolutionary program search | Documented |
| Neuroevolution | `EXTENDS` | Open-ended agent and architecture search | Documented |
| Artificial life | `INSPIRES` | Open-ended and multi-agent learning | Documented at concept level |
| Boltzmann machines | `INSPIRES` | Energy-based physical and generative models | Documented |
| Fuzzy control | `APPLIES` | Interpretable embodied control | Documented |
| Bayesian networks | `ENABLES` | Causal and uncertainty-aware models | Documented |

## Next research action

Build three comparable deep-dive matrices. Each must use the same fields:

- operational definition and exclusions;
- chronological primary-paper lineage;
- demonstrated result versus claimed capability;
- evaluation quality and known failure modes;
- historical mechanisms inherited;
- compute/data/hardware requirements;
- smallest decisive experiment; and
- score under the final project-selection rubric.
