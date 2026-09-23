# World Models — survey and project matrix

**Status:** comparable deep-dive draft
**Updated:** 2026-09-22
**Primary scope:** learned models that predict, simulate, or support intervention in an environment
**Secondary scope:** generative environment models and predictive representation learning when they are used for action, planning, or physical reasoning

## Thesis

“World model” is not one model class. It is a family of learned internal models that compress observations, predict future states, and sometimes estimate the consequences of actions. The historical movement is from **compact latent dynamics for a particular control task**, through **planning-relevant models that need not reconstruct the world**, toward **large predictive or generative models intended to cover many environments and embodiments**.

The unresolved problem is not whether a model can generate plausible frames. It is whether its latent state preserves the variables needed for **intervention, long-horizon prediction, planning, uncertainty, and transfer**. A model can look realistic while getting the causal consequence of an action wrong.

## Operational definition and boundaries

For this survey, a world model is a learned model that represents an environment state or belief and predicts at least one of:

- future observations or latent states;
- rewards, values, or other planning-relevant outcomes;
- the result of an action or intervention; or
- a structured physical or social transition.

Included:

- learned environment simulators and latent dynamics models;
- model-based reinforcement learning systems that plan in learned state;
- predictive representation models such as JEPA when adapted to action-conditioned prediction;
- video or generative models that support interactive environments, simulation, or embodied-agent research; and
- hierarchical models that predict at multiple temporal or abstraction scales.

Excluded from the main comparison:

- ordinary next-token language models with no environment or intervention evaluation;
- static image or video generation with no state, action, or consistency test;
- hand-built physics engines, except as ground-truth evaluators or hybrid components; and
- company claims that lack a method description or measurable result.

The phrase “world model” is therefore used as a functional category, not as a claim that a system contains a complete or human-like model of the world.

## Taxonomy

| Family | Predicted object | Actions | Typical use | Main failure mode |
| --- | --- | --- | --- | --- |
| Learned environment simulator | Observations and latent dynamics | Explicit or inferred | Generate interactive training environments | Visual plausibility without reliable state or action semantics |
| Latent predictive control model | Compact hidden state, reward, and continuation | Explicit | Planning and policy learning | Representation omits variables needed for rare interventions |
| Planning-sufficient model | Reward, value, policy, or selected latent transitions | Explicit | Tree search and decision making | Good decisions in benchmark games without general physical understanding |
| Predictive representation model | Abstract embedding of future observations | Added later or implicit | Perception, anticipation, and planning | Matching embeddings may hide wrong pixels, geometry, or causal details |
| Generative/video world model | Pixels, video tokens, or multimodal future | Text, camera, or action | Interactive simulation, data generation, embodied research | Drift, hallucinated objects, limited action space, and short horizons |
| Hierarchical world model | States and transitions at multiple time scales | Explicit or abstract | Long-horizon planning and abstraction | Errors in high-level abstractions or poor cross-level credit assignment |

## Chronological primary-paper matrix

| Year | Paper/system | Family | Contribution | Demonstrated result | Limitation relevant now |
| ---: | --- | --- | --- | --- | --- |
| 2018 | [World Models — Ha and Schmidhuber](https://arxiv.org/abs/1803.10122) | Latent predictive control | Compressed visual observations into spatial and temporal latent variables and trained a compact policy in the model's “dream” | A policy trained in generated rollouts transferred to the actual environment | Small benchmark environments; model error and limited action semantics were not a general solution |
| 2018 | [Recurrent World Models Facilitate Policy Evolution](https://arxiv.org/abs/1809.01999) | Latent predictive control | Used a recurrent world model as the substrate for policy evolution | Compact policies achieved strong results across selected environments | Performance depended on the learned model and task distribution |
| 2019 | [PlaNet — Learning Latent Dynamics for Planning from Pixels](https://arxiv.org/abs/1811.04551) | Latent predictive control | Planned in a latent state-space model learned from images, without reconstructing every pixel during planning | Strong sample efficiency on continuous-control tasks | Short-horizon planning and task-specific environments limited claims of generality |
| 2019 | [MuZero](https://arxiv.org/abs/1911.08265) | Planning-sufficient model | Learned only model quantities useful for search: reward, policy, value, and latent transitions | Matched AlphaZero on Go, chess, and shogi without supplied rules; achieved a state-of-the-art result on 57 Atari games | The model need not reconstruct the physical world, and success in games does not establish broad causal understanding |
| 2020 | [Dreamer](https://arxiv.org/abs/1912.01603) | Latent predictive control | Learned behaviors by backpropagating through imagined latent trajectories | Demonstrated model-based learning for continuous control from pixels | Limited domains and sensitivity to representation/model error |
| 2020 | [DreamerV2](https://arxiv.org/abs/2010.02193) | Latent predictive control | Used discrete latent states and imagined rollouts for Atari | Reported human-level or better performance across the Atari suite | Benchmark success still relied on a fixed, relatively closed environment family |
| 2021 | [DayDreamer](https://arxiv.org/abs/2106.09797) | Embodied latent control | Adapted Dreamer to real-world robot learning with online interaction | Learned several robot skills from real-world experience | Hardware, task, and data collection constraints remained substantial |
| 2022 | [A Path Towards Autonomous Machine Intelligence — LeCun](https://openreview.net/pdf/315d43ba26f55357a84cec9a7ed15a6610094f79.pdf) | Hierarchical predictive architecture | Proposed a hierarchical world model using predictive representations, action-conditioned prediction, planning, and short-term memory | A research architecture and program, not a complete empirical system | Many components remained aspirational or separately evaluated |
| 2023 | [DreamerV3](https://arxiv.org/abs/2301.04104) | Latent predictive control | Standardized a world-model RL recipe across diverse tasks with a single configuration | Reported strong results over more than 150 tasks across eight domains | Breadth across benchmarks is not arbitrary real-world transfer; model reliability under intervention shift remains open |
| 2023 | [I-JEPA](https://arxiv.org/abs/2301.08243) | Predictive representation | Predicted representations of target image regions from a context region rather than reconstructing pixels | Strong semantic representations and downstream transfer | Static-image prediction does not by itself provide action-conditioned dynamics |
| 2024 | [Genie](https://deepmind.google/research/publications/60474/) | Generative interactive simulator | Learned a video tokenizer, autoregressive dynamics model, and latent action model from unlabeled internet video | Generated action-controllable environments without ground-truth action labels | Latent actions and generated worlds were not equivalent to verified real-world actions or dynamics |
| 2025 | [V-JEPA 2](https://ai.meta.com/research/publications/v-jepa-2-self-supervised-video-models-enable-understanding-prediction-and-planning/) | Predictive representation plus action model | Pretrained on more than one million hours of video, then adapted an action-conditioned latent model with limited robot data | Reported strong video understanding and zero-shot pick-and-place planning on two Franka setups | Planning coverage was narrow; zero-shot deployment does not prove broad physical causality |
| 2025 | [Genie 3](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/) | Generative interactive simulator | Generated navigable worlds at real-time frame rates with promptable events and short-term consistency | Reported 24 fps, 720p environments with consistency for a few minutes | Google explicitly lists limited action space, multi-agent interaction, real-world-location accuracy, and duration as limitations |
| 2025 | [Cosmos World Foundation Model Platform](https://research.nvidia.com/publication/2025-01_cosmos-world-foundation-model-platform-physical-ai) | Generative/video world model platform | Positioned pretrained video models, curation tools, tokenizers, and post-training as a platform for physical-AI developers | Open-weight/open-source platform materials and downstream customization examples | Product/platform positioning is broader than evidence for a generally reliable simulator |
| 2025–26 | [Cosmos 3](https://research.nvidia.com/labs/cosmos-lab/cosmos3/) | Omnimodal world model | Connects text, images, video, audio, and actions for physical-AI tasks | Research/product system reports unified understanding, generation, simulation, and action capabilities | The breadth of modalities increases the need for task-specific causal and safety evaluation |

## What caused the main approaches to emerge?

### 1. Model-free control was data-hungry

Early model-based RL work emerged because a compact model could reuse experience and allow an agent to learn in imagined rollouts. The causal opportunity was not “make realistic pictures”; it was to reduce real-environment interaction by learning a useful predictive state.

### 2. Pixel-perfect reconstruction was often the wrong target

MuZero made the key distinction explicit: a model used for planning can predict only the quantities needed by the decision process. This can be more tractable than reconstructing every observation, but it also narrows what can be claimed. A planning-sufficient model is not automatically a general simulator.

### 3. Better representations enabled broader transfer

JEPA-style methods arose partly from the difficulty of forcing high-dimensional models to predict every pixel. Predicting an abstract representation can emphasize stable semantic structure. The trade-off is that information discarded as “irrelevant” for representation learning may become essential for a later intervention or safety-critical action.

### 4. Scale and unlabeled video reopened generative simulation

Genie, V-JEPA 2, and Cosmos use large video corpora to reduce the need for hand-authored simulators and action labels. This creates a possible bridge from passive observation to interactive environments. It also creates a new causal gap: passive video contains fewer controlled interventions than a simulator or robot experiment, so apparent physical knowledge may be observational rather than actionable.

### 5. Physical AI made deployment constraints visible

Robot and autonomous-vehicle use cases require latency, camera/action grounding, rare-event coverage, and failure recovery. A generated environment that is useful for exploration or data augmentation may still be unsafe as the sole source of policy validation.

## Evidence: established versus unestablished

### Established or strongly supported

- Compact learned latent models can support planning and improve sample efficiency on bounded control tasks.
- A model can be useful for decisions without reconstructing all pixels; MuZero is the clearest example.
- Dreamer-style imagined rollouts work across a broad collection of benchmark environments.
- Predictive representation learning can produce useful semantic and temporal features from unlabeled visual data.
- Large video models can generate interactive or action-conditioned environments with limited direct action data.

### Not established

- That visual fidelity is a reliable proxy for causal or physical accuracy.
- That internet video alone identifies the consequences of novel interventions.
- That a world model trained on one embodiment transfers safely to another.
- That minutes of consistency imply hours of stable simulation or useful long-horizon planning.
- That a model with “world model” branding supports general scientific, robotic, or autonomous-agent reasoning.

## David Ha, Yann LeCun, Google DeepMind, and NVIDIA lineages

### David Ha

Ha and Schmidhuber provide the compact latent-dynamics starting point: compress observations, predict in latent space, and train a policy inside imagined experience. The historical contribution is a clean causal loop connecting representation, simulation, and control. The limitation is equally important: the experiments show task-relevant prediction in small environments, not a complete world simulator.

### Yann LeCun and JEPA

LeCun's 2022 architecture frames world modeling as hierarchical predictive representation learning combined with memory, goals, and planning. I-JEPA is an empirical representation-learning precursor; V-JEPA 2 extends the direction to video and action-conditioned robot planning. This lineage is best represented as **predictive state abstraction**, not as ordinary video generation.

### Google DeepMind

DeepMind spans several distinct branches: Dreamer learns latent dynamics for control; MuZero learns planning-sufficient latent quantities; Genie learns generative interactive environments; and Genie 3 emphasizes real-time, promptable, visually rich worlds. These systems should be linked by `EXTENDS` or `REPLACES` edges only when the evidence supports a specific technical inheritance; shared marketing language is not enough.

### NVIDIA

Cosmos is primarily a platform and model family for physical-AI development. Its contribution to the atlas is important as a frontier synthesis: pretrained video/world models, data curation, tokenization, and post-training are packaged for downstream simulators and robots. The atlas should mark claims about “general-purpose world models” as product positioning unless accompanied by task-level evidence, baselines, and failure analysis.

### “Atlas” ambiguity

The project plan names **Atlas** as a required lineage but does not identify a paper, lab, or system. This survey does not silently choose an interpretation. A later import should add the exact Atlas referent only after it is specified, because several unrelated robotics and world-model projects use that name.

## Causal turning points for the atlas

| From | Relationship | To | Evidence status | Explanation |
| --- | --- | --- | --- | --- |
| Expensive real-environment interaction | `MOTIVATES` | Latent world models | Documented | Ha, PlaNet, and Dreamer use learned predictive states to train or plan through imagined experience. |
| Pixel reconstruction objective | `CONTRADICTS` | Planning-sufficient models | Documented | MuZero shows that planning can use reward, value, policy, and latent transitions without reconstructing observations. |
| Latent model error and limited benchmark breadth | `MOTIVATES` | General-purpose world-model recipes | Inferred from chronology | DreamerV3 and later foundation models seek broader task and data coverage, but the causal explanation needs paper-by-paper evidence. |
| Static predictive representation | `EXTENDS` | Action-conditioned predictive representation | Documented | I-JEPA-style representation learning is extended in V-JEPA 2 with an action-conditioned latent model for robot planning. |
| Unlabeled internet video | `ENABLES` | Generative interactive environments | Documented | Genie learns latent actions and interactive environments from video without ground-truth action labels. |
| Need for physical-AI data and simulation | `MOTIVATES` | Cosmos world-model platform | Documented as product motivation | NVIDIA positions curated video, pretrained models, and post-training as infrastructure for physical-AI developers; effectiveness varies by downstream task. |
| Short-horizon visual plausibility | `CONTRADICTS` | Reliable long-horizon intervention model | Inferred | Consistency limits, action-space limits, and untested counterfactuals create a direct evaluation gap. |

## Current bottlenecks

1. **Causal action grounding:** the model must represent what an action changes, not merely what usually follows in passive video.
2. **Long-horizon compounding error:** small state errors accumulate and can change the future qualitatively.
3. **Hidden-state sufficiency:** compression may discard contact forces, object identity, occluded state, or rare-event variables.
4. **Evaluation beyond pixels:** visual quality, video similarity, and language judgments do not establish intervention accuracy.
5. **Uncertainty and abstention:** a useful model must flag when a rollout leaves its reliable support.
6. **Transfer across embodiments and environments:** camera, morphology, action space, dynamics, and safety constraints change.
7. **Data provenance:** passive web video, synthetic video, simulator trajectories, and robot data encode different biases.
8. **Compute and latency:** a model may be accurate but unusable if planning requires too many samples or cannot run at control frequency.

## Frontier questions

1. Which latent variables are necessary for reliable intervention prediction, and can sufficiency be tested rather than assumed?
2. Can a model trained mostly on passive video learn calibrated counterfactuals when action data are sparse?
3. How should world-model benchmarks separate appearance, state estimation, dynamics, planning, and safety?
4. Can hierarchical predictive models reduce long-horizon drift without hiding errors in a coarse abstraction?
5. When does adding a physics engine, symbolic constraint, or retrieval memory improve transfer enough to justify complexity?
6. Can a world model detect and abstain from unsupported rollouts before an agent acts on them?

## Recommended smallest decisive experiment

### Intervention-aware world-model evaluation under controlled shift

Use a small environment with a known simulator and rendered observations, such as a procedurally varied 2D/3D manipulation or navigation task. Generate training trajectories with one set of masses, friction values, layouts, and camera viewpoints. Hold architecture and data budget as constant as practical, and compare:

1. a video-prediction baseline;
2. an action-conditioned latent dynamics model; and
3. the same latent model augmented with explicit state/provenance features or a simple physics constraint.

Evaluate on held-out interventions and environment changes:

- one-step and 10–50-step state prediction;
- counterfactual action accuracy;
- goal-reaching or model-predictive-control success;
- object identity and spatial consistency;
- calibration/coverage of predicted uncertainty;
- abstention when the rollout leaves the training distribution; and
- training plus inference compute and latency.

The decisive result is not “best-looking video.” A model wins only if it improves intervention or planning performance under held-out dynamics without hiding a regression in ordinary prediction, calibration, or compute. A negative result would identify where extra predictive structure fails to buy causal transfer.

## Provisional project-selection score

| Criterion | Score (1–5) | Reason |
| --- | ---: | --- |
| Under-exploration | 4 | The field is crowded, but causal evaluation of visually strong world models remains fragmented. |
| Frontier relevance | 5 | World models connect foundation models, robotics, simulation, and physical AI. |
| Tractability | 3 | A small controlled benchmark is feasible, but training and evaluation choices are easy to get wrong. |
| Evidence quality | 4 | The core RL lineage is strong; the newest product-like systems have less independently verified evidence. |
| Atlas fit | 5 | The topic links recurrent dynamics, memory, predictive coding, model-based control, artificial life, and embodied AI. |
| Decisive evaluation | 3 | Causal and long-horizon evaluation is possible but more difficult than standard accuracy metrics. |
| Distinct contribution | 4 | A historical, intervention-focused comparison can be distinctive if it avoids another visual-quality benchmark. |

**Total: 28/35.** World models are a strong frontier comparator, but currently trail AI for Physics because their most important evaluation problem—causal usefulness under long-horizon shift—is harder to isolate cleanly.

## Atlas node and edge candidates

Suggested nodes:

- Learned latent dynamics
- World Models (Ha–Schmidhuber)
- PlaNet
- Dreamer / DreamerV3
- MuZero
- JEPA / I-JEPA
- V-JEPA 2
- Genie
- Genie 3
- Cosmos World Foundation Models
- Intervention-aware world-model evaluation

Suggested typed edges:

- `MOTIVATES`: expensive environment interaction → learned latent dynamics
- `EXTENDS`: World Models → Dreamer
- `REPLACES`: pixel-reconstruction planning → MuZero's planning-sufficient latent model
- `EXTENDS`: I-JEPA → V-JEPA 2
- `ENABLES`: large-scale video pretraining → Genie/V-JEPA 2/Cosmos
- `APPLIES`: world models → embodied robot planning
- `EVALUATES`: intervention-aware benchmark → world-model families
- `CONTRADICTS`: visual plausibility → causal reliability claim

Every edge should retain a confidence label and an evidence note. The `REPLACES` edge above is scoped to the planning objective, not a claim that MuZero replaced all predictive simulation.

## Meeting explanation

“World models are not simply videos generated by AI. In the useful sense, a world model predicts what matters about an environment and how it changes when an agent acts. The field has moved from compact latent models for control, to models that support planning without reconstructing every pixel, to large video and interactive-environment models. The hard question is whether a visually plausible rollout is also causally useful: will the predicted consequence of an unseen action be right, over a long horizon, with calibrated uncertainty? That is why my proposed test measures intervention and planning under held-out dynamics rather than visual quality alone.”

