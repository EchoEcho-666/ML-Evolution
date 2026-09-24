# AI for Physics — survey and project matrix

**Status:** comparable deep-dive draft  
**Updated:** 2026-09-22  
**Primary scope:** AI used to model, infer, discover, design, or control physical systems  
**Secondary scope:** physical principles or substrates that materially change AI methods

## Start with a review

[When physics meets machine learning: a survey of physics-informed machine learning (2025)](https://doi.org/10.1007/s44379-025-00016-0) is the best starting review for the proposed equation-aware project. It organizes why and how known physics enters a learned model, including surrogate simulation and the limits of physical constraints. It covers the *physics-informed* part of this survey; the broader [scientific-discovery review in Nature](https://doi.org/10.1038/s41586-023-06221-2) provides context for hypothesis generation and experiments. Neither is a complete census of all physics subfields.

## Thesis

AI for Physics is moving from isolated surrogate models toward reusable models of operators, dynamics, materials, and experiments. Its central unsolved problem is not interpolation accuracy. It is **reliable transfer across physical regimes while preserving invariants, calibrated uncertainty, causal response, and computational advantage**. The most promising project-scale opportunity is therefore a controlled comparison of data-driven, physics-constrained, and hybrid symbolic models under distribution shift—not another in-distribution leaderboard.

## Boundaries

Included:

- forward simulation and learned surrogates;
- inverse problems and parameter inference;
- discovery of equations, invariants, and interpretable laws;
- physics-informed and equivariant learning;
- foundation models for PDEs, weather, climate, atomistic systems, and particle physics;
- experiment planning, control, and autonomous laboratories; and
- physical or neuromorphic computation when the substrate is essential to the learning mechanism.

Excluded from the primary comparison:

- generic LLM physics question answering without connection to research workflows;
- chemistry or biology papers with no physical modeling component;
- product demonstrations without methods, baselines, or falsifiable evaluation; and
- “physics-inspired” metaphors that do not impose an equation, symmetry, conservation law, energy, dynamics, or physical substrate.

## The April AI-for-science seminar topics in context

The seminar titles shared by a student in September 2026 span several tasks and disciplines. They are useful examples of the wider landscape, not evidence that the course endorsed any one semester project.

| Seminar topic | Research task | How it relates to this survey |
| --- | --- | --- |
| Generative AI for biological systems across scales | Model interacting biological processes | AI for science adjacent to physics; many methods transfer, but the biological claim requires its own validation. |
| Structured and verifiable reasoning / SciencePedia | Build inspectable chains of scientific claims | Cross-cutting evaluation and knowledge organization; the [SciencePedia paper](https://arxiv.org/abs/2510.26854) reports a verifiable reasoning knowledge base. |
| Gravitational-wave detection and AresGW | Find rare merger signals in noisy detector time series | Physics data analysis and inverse inference; [AResGW](https://arxiv.org/abs/2211.01520) is one concrete deep-learning detector. |
| NASA TESS data | Find and characterize periodic brightness changes | Astronomy signal detection at scale; [NASA describes TESS](https://science.nasa.gov/mission/tess/) as an active exoplanet survey. |
| GNNome genome assembly | Resolve paths through ambiguous assembly graphs | Biology rather than physics; [the GNNome paper](https://genome.cshlp.org/content/early/2024/10/28/gr279307124) is a useful example of graph structure guiding scientific inference. |
| Materials discovery | Predict and screen candidate properties | Atomistic models, uncertainty, and experimental confirmation; see the materials family below. |
| DeepH electronic structure | Approximate an expensive quantum calculation | [DeepH](https://arxiv.org/abs/2104.03786) learns density-functional-theory Hamiltonians to reduce repeated self-consistent calculations. |

### Why gravitational waves attract AI work

The [gravitational-wave ML review (Living Reviews in Relativity, 2025)](https://doi.org/10.1007/s41114-024-00055-8) surveys detector optimization, noise mitigation, simulated signals, detection, localization, and parameter estimation. The combination of weak rare signals, changing instrumental noise, physics-based waveform models, and public detector data creates several well-defined ML tasks. The [Gravitational Wave Open Science Center](https://gwosc.org/tutorials/) provides beginner tutorials and real data. This helps explain the two gravitational-wave seminars; it is an inference from the research landscape, not a claim about the course organizer's intent.

The research challenge is reliability under changing noise and at very low false-alarm rates. A [2025 sensitivity study of AresGW](https://arxiv.org/abs/2509.05283) found performance varied across month-long real-noise samples, so simply comparing an ML detector with a traditional pipeline on one split would not be a new contribution. This is a close cousin of the proposed physics-model regime-shift question: the shift is detector noise instead of viscosity. The thesis project remains open to either domain after checking interest, data, compute, and prior work.

## Taxonomy

| Family | Learned object | Physics enters through | Main promise | Main failure mode |
| --- | --- | --- | --- | --- |
| Physics-informed learning | A solution, field, or parameterization | Residual losses, boundary/initial conditions, conservation penalties | Learn with sparse labels and respect known equations | Optimization stiffness; poor scaling; false confidence outside collocation coverage |
| Neural operators | A map between functions | Operator structure, spectral/local kernels, meshes | Reusable solvers across discretizations and parameters | Rollout error, boundary sensitivity, limited cross-equation transfer |
| Graph and particle simulators | Interacting states and update rules | Relational or equivariant architecture | Flexible simulation of particles, meshes, and materials | Long-horizon drift and costly high-fidelity training data |
| Equation and law discovery | Symbolic equations or sparse terms | Dimensional constraints, candidate libraries, priors | Human-readable, falsifiable hypotheses | Noise, confounding, non-identifiability, combinatorial search |
| Weather and Earth models | Global spatiotemporal state transitions | Spherical geometry, reanalysis, hybrid dynamics | Large forecast speedups and ensemble prediction | Distribution shift, extremes, climate-scale drift, dependence on assimilation data |
| Atomistic and materials models | Energies, forces, properties, structures | Symmetry/equivariance, potentials, long-range terms | Fast simulation and inverse design | Coverage of chemical space, rare events, defects, synthesis feasibility |
| Particle and high-energy physics | Events, jets, detector response, latent representations | Lorentz/permutation symmetry, detector geometry, simulation | Better inference and reusable event representations | Simulation mismatch, calibration, interpretability, domain adaptation |
| Autonomous experimentation | Policies over measurements or synthesis steps | Instruments, constraints, uncertainty, closed-loop feedback | Reduce experiment count and discover materials/processes | Weak reproducibility, hidden human intervention, unsafe or narrow objectives |
| Physical computation | Hardware dynamics as computation | Material, optical, analog, quantum, or neuromorphic substrate | Speed and energy efficiency | Noise, variability, programmability, end-to-end system cost |

## Chronological primary-paper matrix

| Year | Paper/system | Family | Contribution | Evidence | Limitation relevant now |
| ---: | --- | --- | --- | --- | --- |
| 1982 | [Hopfield, *Neural networks and physical systems*](https://doi.org/10.1073/pnas.79.8.2554) | Physical principles for AI | Energy-based associative memory | Convergent dynamics for content-addressable memory | Classical capacity and spurious attractors |
| 1998 | [Lagaris et al., neural solutions of differential equations](https://doi.org/10.1109/72.712178) | Physics-informed learning | Encoded boundary conditions in neural trial solutions | ODE/PDE demonstrations | Small problems; optimization and scaling not resolved |
| 2002 | [Maass et al., liquid-state machines](https://doi.org/10.1162/089976602760407955) | Physical/dynamical computation | Fixed recurrent dynamics plus trained readout | Temporal computing theory and tasks | Reservoir design and stability sensitivity |
| 2009 | [Schmidt and Lipson, symbolic physical-law discovery](https://doi.org/10.1126/science.1165893) | Law discovery | Recovered conservation laws and nonlinear relations from data | Experimental dynamical systems | Search cost and robustness to noise/confounding |
| 2016 | [SINDy](https://doi.org/10.1073/pnas.1517384113) | Law discovery | Sparse regression selects governing terms from a library | Multiple nonlinear dynamical systems | True terms must be representable in the library |
| 2016 | [Interaction Networks](https://arxiv.org/abs/1612.00222) | Relational simulator | Learned object–relation dynamics with graph structure | Physical prediction and reasoning tasks | Short horizons and simplified environments |
| 2017 | [SchNet](https://arxiv.org/abs/1706.08566) | Atomistic learning | Continuous-filter convolutions for molecular and material properties | Quantum-chemistry datasets | Locality and long-range interaction limits |
| 2017 | [Memristor reservoir computing](https://doi.org/10.1038/s41467-017-02337-y) | Physical computation | Used device dynamics as a temporal reservoir | Hardware demonstration | Device variability and system integration |
| 2019 | [Physics-informed neural networks](https://doi.org/10.1016/j.jcp.2018.10.045) | Physics-informed learning | Unified PDE forward and inverse problems through residual optimization | Navier–Stokes and related demonstrations | Training pathologies on stiff, multiscale, or high-frequency systems |
| 2019 | [Hamiltonian Neural Networks](https://arxiv.org/abs/1906.01563) | Structured dynamics | Learned Hamiltonians and symplectic-like dynamics | Better conservation and extrapolation on canonical systems | Assumes appropriate coordinates and Hamiltonian structure |
| 2020 | [AI Feynman](https://doi.org/10.1126/sciadv.aay2631) | Law discovery | Combined neural fitting with physics-motivated decomposition and symbolic search | Recovered benchmark equations | Benchmarks cleaner than real scientific identification |
| 2020 | [Learning to Simulate Complex Physics](https://arxiv.org/abs/2002.09405) | Graph/particle simulator | Graph networks learned particle dynamics | Long rollouts across material types | Drift and simulation-data dependence |
| 2020 | [MeshGraphNets](https://arxiv.org/abs/2010.03409) | Mesh simulator | Learned dynamics on adaptive meshes | Multiple CFD and structural tasks | Expensive training data; generalization boundaries |
| 2020 | [Fourier Neural Operator](https://arxiv.org/abs/2010.08895) | Neural operator | Learned solution operators in Fourier space | Resolution transfer and PDE benchmarks | Boundary geometry, high frequencies, and long rollouts |
| 2021 | [DeepONet](https://doi.org/10.1038/s42256-021-00302-5) | Neural operator | Universal operator approximation via branch/trunk networks | Diverse operator-learning tasks | Sensor placement and data requirements |
| 2021 | [Physics-Informed Neural Operator](https://arxiv.org/abs/2111.03794) | Hybrid operator | Combined operator learning with PDE constraints | Data-efficient PDE learning | Physics loss does not guarantee global fidelity |
| 2022 | [NequIP](https://doi.org/10.1038/s41467-022-29939-5) | Atomistic learning | E(3)-equivariant interatomic potentials | Data efficiency and molecular dynamics | Coverage, rare configurations, and long-range effects |
| 2022 | [MACE](https://arxiv.org/abs/2206.07697) | Atomistic learning | Higher-order equivariant message passing | Accurate force fields with efficient evaluation | Transfer beyond training chemistry |
| 2022 | [FourCastNet](https://arxiv.org/abs/2202.11214) | Weather | Global data-driven forecasting with adaptive Fourier operators | Fast high-resolution forecasts | Extremes and long-range climate use were not established |
| 2023 | [Pangu-Weather](https://doi.org/10.1038/s41586-023-06185-3) | Weather | 3D neural weather forecasting | Competitive deterministic forecasts with large speedups | Reanalysis dependence and probabilistic calibration |
| 2023 | [GraphCast](https://doi.org/10.1126/science.adi2336) | Weather | Graph-based global medium-range prediction | Outperformed a leading operational deterministic system on many metrics | Extreme events, uncertainty, and climate transfer |
| 2023 | [GNoME](https://doi.org/10.1038/s41586-023-06735-9) | Materials discovery | Scaled graph networks and active learning for stable crystal discovery | Large expansion of predicted stable materials | Predicted stability does not ensure synthesis or useful properties |
| 2023 | [A-Lab](https://doi.org/10.1038/s41586-023-06734-w) | Autonomous laboratory | Closed-loop inorganic synthesis planning and execution | Synthesized a subset of targeted materials | Narrow workflow and substantial engineered infrastructure |
| 2024 | [NeuralGCM](https://doi.org/10.1038/s41586-024-07744-y) | Hybrid Earth model | Combined differentiable atmospheric dynamics with learned components | Weather and climate simulations | Coupling, extremes, and climate reliability remain open |
| 2024 | [ParticleNet](https://doi.org/10.1103/PhysRevD.101.056019) | High-energy physics | Dynamic graph networks over particle clouds for jet tagging | Strong collider classification | Domain shift from simulation to detector data |
| 2025 | [MatterGen](https://doi.org/10.1038/s41586-025-08628-5) | Materials generation | Diffusion-based generation conditioned on material properties | Generated stable candidate structures and validation examples | Synthesis feasibility, novelty validation, and coverage |
| 2025 | [Aurora](https://doi.org/10.1038/s41586-025-09005-y) | Earth foundation model | Pretrained on more than one million hours of diverse Earth-system data | Transfer across forecasting tasks | Physical consistency and rare-regime reliability |
| 2025 | [PDE-FM](https://arxiv.org/abs/2511.21861) | PDE foundation model | One model across heterogeneous PDE datasets | Transfer results across twelve datasets | Preprint evidence; cross-family generalization remains early |
| 2025 | [Long-range polarizable foundation potential](https://doi.org/10.1038/s41467-025-65496-3) | Atomistic foundation model | Combined explicit electrostatics with equivariant learned potentials | Multiple materials and reactive-dynamics applications | Computational cost and unseen chemistry |

## What the evidence establishes

### Established

- Learned surrogates can accelerate selected numerical forecasts and simulations by orders of magnitude after training.
- Symmetry, conservation, differential equations, and operator structure can materially improve data efficiency or extrapolation in appropriate regimes.
- Equivariant atomistic models have made learned interatomic potentials broadly useful within covered chemical/configurational domains.
- Symbolic and sparse methods can recover interpretable governing relations in controlled settings.
- Closed-loop laboratories can automate bounded synthesis or measurement workflows.

### Not established

- A universal physics foundation model that transfers reliably across unrelated equations, scales, boundary conditions, and geometries.
- Reliable long-horizon extrapolation merely from low one-step or in-distribution error.
- Scientific discovery from predictive performance alone; identifiability, causal intervention, and experimental validation remain necessary.
- General autonomous science from narrow agent or laboratory demonstrations.
- Physical consistency from architecture branding alone; constraints must be measured directly.

## Causal turning points for the atlas

| From | Relationship | To | Explanation |
| --- | --- | --- | --- |
| Hand-designed numerical solvers | `MOTIVATES` | Learned surrogates | High-fidelity simulation cost created demand for amortized prediction. |
| Differential equations and boundary conditions | `CONSTRAINS` | PINNs | Known equations became training signals rather than only data generators. |
| PINN optimization failures | `MOTIVATES` | Neural operators and hybrid solvers | Learning one solution at a time did not provide robust reusable operators. |
| Fourier analysis | `ENABLES` | FNO | Spectral convolution supplies a resolution-flexible global operator parameterization. |
| Graph relational bias | `ENABLES` | Particle and mesh simulators | Interaction structure matches objects, particles, and irregular discretizations. |
| Symmetry groups | `CONSTRAINS` | Equivariant atomistic models | Rotations, translations, and permutations are encoded rather than relearned. |
| Genetic programming | `INTRODUCES` | Symbolic regression | Executable expression search became a route to candidate scientific laws. |
| Symbolic-regression brittleness | `MOTIVATES` | Physics-guided hybrid discovery | Dimensional analysis, neural decomposition, sparsity, and priors reduce search. |
| Numerical weather prediction | `PROVIDES_DATA_FOR` | GraphCast/Pangu/FourCastNet | Reanalysis and operational simulations supply dense global training targets. |
| Learned forecast limitations | `MOTIVATES` | NeuralGCM | Hybrid dynamics retain a differentiable physical core. |
| Task-specific material models | `MOTIVATES` | Foundation interatomic potentials | Diverse pretraining aims to amortize representation learning across chemistry. |
| Reservoir computing | `REVIVED_BY` | Physical reservoirs | Material dynamics make the fixed nonlinear transformation computationally useful. |

## Current bottlenecks

1. **Out-of-distribution physics:** new Reynolds numbers, geometries, materials, forcing, resolutions, phases, and boundary conditions.
2. **Long-horizon stability:** small local errors can violate invariants or compound into qualitatively wrong trajectories.
3. **Uncertainty and calibration:** deterministic accuracy is insufficient for scientific or safety-critical decisions.
4. **Identifiability:** multiple equations or latent mechanisms can explain the same observational data.
5. **Data provenance:** simulations inherit assumptions; experiments are sparse, biased, and heterogeneous.
6. **Evaluation leakage:** benchmarks often sample from the same simulator, discretization, or parameter family as training.
7. **Scientific validity:** predictive success does not by itself produce explanation, causality, or experimental confirmation.
8. **Compute accounting:** training amortization, inference speed, data generation, and solver baselines must be compared end to end.

## Frontier questions

1. Can one model transfer across PDE families while retaining conservation and calibrated uncertainty?
2. Which physical priors genuinely improve extrapolation, and which merely improve interpolation efficiency?
3. Can a model propose compact equations that remain correct under active interventions and new regimes?
4. When should learned surrogates replace, augment, or control numerical solvers rather than imitate them?
5. Can foundation interatomic potentials detect when a configuration lies outside their reliable chemical domain?
6. Can scientific agents choose experiments that distinguish competing mechanisms instead of only reducing prediction error?

## Candidate project directions

| Direction | Contribution | Minimum experiment | Decisive success criterion | Risk |
| --- | --- | --- | --- | --- |
| Physics-grounded world model for one PDE | Connect AI for Physics with world-model evaluation | Train matched autoregressive operator models with and without conservation/symbolic residuals | Better parameter-shift and long-rollout error without worse in-distribution cost | Can collapse into routine surrogate benchmarking |
| Symbolic residual discovery | Recover the part a neural simulator systematically misses | Fit a neural operator, then use constrained symbolic regression on residual dynamics | Recovered expression improves held-out regimes and matches known/hidden mechanism | Symbolic search may recover correlations rather than mechanism |
| Evaluator study for automated physics research | Connect AI for Physics with bounded RSI | Agent proposes solver changes under public plus hidden physics tests | Gains persist on hidden grids, parameters, invariants, and compute budgets | Agent loop adds complexity without scientific insight |
| Uncertainty-aware physical operator | Test reliable decision support | Compare deterministic, ensemble, Bayesian, and generative operators | Calibration and coverage improve under shift at useful cost | Scope can become too broad |

## Recommended smallest decisive experiment

### Hybrid equation-aware world model under regime shift

Use one open PDE benchmark with controllable parameters—such as 2D Navier–Stokes, shallow water, or reaction–diffusion—and compare three matched models:

1. a purely data-driven neural operator;
2. the same model with explicit residual/conservation penalties; and
3. the same model plus a compact symbolic residual correction.

Hold architecture, training trajectories, and optimization budget constant. Test on:

- unseen physical parameters;
- unseen spatial resolution;
- longer rollout horizons;
- conservation/invariant error;
- calibration or ensemble coverage; and
- total train-plus-inference compute.

The experiment succeeds only if the hybrid improves at least one predeclared out-of-distribution target without hiding a regression in in-distribution error, stability, or compute. A negative result is scientifically useful because it identifies when added “physics” does not buy transfer.

## Provisional project-selection score

| Criterion | Score (1–5) | Reason |
| --- | ---: | --- |
| Under-exploration | 4 | The broad field is crowded, but controlled inheritance and regime-shift comparisons remain incomplete. |
| Frontier relevance | 5 | Scientific foundation models and learned physical simulators are expanding quickly. |
| Tractability | 4 | Strong open datasets and small PDE models permit credible experiments without frontier-scale compute. |
| Evidence quality | 5 | Mature numerical baselines, equations, and exact diagnostics support rigorous evaluation. |
| Atlas fit | 5 | It connects symbolic regression, energy models, reservoirs, graph learning, and foundation models. |
| Decisive evaluation | 5 | Error, invariants, stability, calibration, and compute can be measured directly. |
| Distinct contribution | 4 | The project must emphasize causal regime shift and historical mechanism comparison to avoid becoming another benchmark. |

**Total: 32/35.** This is the current benchmark to beat; it is not yet the final decision.
