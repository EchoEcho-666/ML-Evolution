# ML branch mortality, survival, and conceptual inheritance

**Status:** first evidence-backed draft  
**Updated:** 2026-09-22  
**Quantitative source:** OpenAlex works, 1950–2025  
**Unit of analysis:** explicit research labels appearing as exact phrases in paper titles

## Executive finding

The data do not support a simple story in which old machine-learning branches disappear and are replaced wholesale. They show four different outcomes:

1. **A research label can collapse while its mechanisms survive.** Expert systems are the clearest case: their normalized title share is only 6.2% of its historical peak, yet explicit rules, knowledge bases, explanations, verification, and human-readable intermediate structures remain central in narrower systems.
2. **A field can become a stable engineering tradition rather than a fashionable frontier.** Fuzzy logic retains 96.2% of its peak normalized publication share. Support-vector machines and Bayesian networks, included as controls, also remain active.
3. **A niche can be reopened by a new substrate or neighboring frontier.** Reservoir computing is being revived by physical and neuromorphic hardware; symbolic regression by scientific discovery; neuroevolution by deep reinforcement learning and automated program search; Hopfield networks by modern associative memory and attention.
4. **Apparent revival can be a retrieval artifact.** Broad title queries falsely made learning classifier systems and artificial life look strongly revived. Exact-phrase queries changed both to legacy niches.

The practical lesson for ML Civilization is that “died out” should never be a single node status. The atlas should represent at least three distinct claims:

- the **label** lost publication share;
- the original **technical package** stopped being competitive; and
- one or more **mechanisms** were inherited, renamed, or recombined.

## 1. Statistical method

### Corpus and queries

The analysis uses OpenAlex works published from 1950 through 2025. The incomplete 2026 publication year is excluded. For each branch, the primary query uses exact, title-anchored phrases with plural wildcards and spelling variants where necessary—for example, `"expert system*"` and both hyphenated and unhyphenated forms of case-based reasoning.

This is a measure of **research-identity visibility**, not all use of a method. A paper can use fuzzy control, associative memory, evolutionary search, or a rule engine without naming the historical field in its title.

The query design follows OpenAlex's distinction between broad stemmed search and exact quoted phrases. See the [OpenAlex search documentation](https://help.openalex.org/api/searching/) and the checked-in [analysis metadata](data/branch-analysis-metadata.json).

### Metrics

For branch \(b\) in year \(y\):

`share(b,y) = 100,000 × branch_title_count(b,y) / all_OpenAlex_works(y)`

The analysis reports:

- **Peak window:** the five-year period with the highest mean normalized share.
- **Recent share:** the mean normalized share for 2021–2025.
- **Survival ratio:** recent share divided by the historical peak-window share.
- **Recent trend ratio:** mean share in 2021–2025 divided by mean share in 2016–2020.

Descriptive labels use preregistered thresholds from [branch-analysis-metadata.json](data/branch-analysis-metadata.json): below 0.10 is “contracted / label largely died”; 0.10–0.35 is “legacy niche”; 0.35–0.80 is a surviving niche; and 0.80 or higher is active. A recent trend of at least 1.20 adds a revival/growth qualifier.

These thresholds summarize trajectories; they do not prove historical causes.

### Query sensitivity

The median exact-query corpus retained 89.6% of the broad-query corpus. Most branch-level survival ratios were stable, but two were not:

| Branch | Broad survival | Exact survival | Difference | Cause of instability |
| --- | ---: | ---: | ---: | --- |
| Learning classifier systems | 0.780 | 0.163 | -0.617 | Broad search included unrelated titles containing “learning,” “classifier,” and “system.” |
| Artificial life | 1.000 | 0.216 | -0.784 | Broad search included work where “artificial” and “life” appeared separately, especially artificial intelligence and synthetic-life applications. |

This validates exact-phrase title search as the primary measure. The full comparison is in [branch-query-sensitivity.csv](data/branch-query-sensitivity.csv).

## 2. Quantitative results

| Branch | Exact-title works | Peak window | Survival | Recent trend | Descriptive diagnosis |
| --- | ---: | --- | ---: | ---: | --- |
| Expert systems | 35,043 | 1987–1991 | 0.062 | 0.887 | Contracted; label largely died |
| Symbolic AI | 54 | 2021–2025 | 1.000 | 4.700 | Growing label, but tiny and terminology-sensitive |
| Case-based reasoning | 6,643 | 2002–2006 | 0.376 | 0.757 | Surviving niche, declining recently |
| Inductive logic programming | 804 | 1996–2000 | 0.127 | 0.916 | Legacy niche |
| Learning classifier systems | 707 | 2002–2006 | 0.163 | 0.887 | Legacy niche |
| Fuzzy logic | 49,051 | 2002–2006 | 0.962 | 1.014 | Active engineering field |
| Genetic programming | 10,276 | 2002–2006 | 0.531 | 0.881 | Surviving niche |
| Artificial life | 1,859 | 1994–1998 | 0.216 | 1.101 | Legacy niche, roughly stable recently |
| Self-organizing maps | 8,833 | 2002–2006 | 0.436 | 0.720 | Surviving niche, declining recently |
| Hopfield networks | 1,122 | 1999–2003 | 0.405 | 2.301 | Reviving |
| Boltzmann machines | 2,461 | 2015–2019 | 0.641 | 0.655 | Surviving niche after recent decline |
| Reservoir computing | 3,350 | 2021–2025 | 1.000 | 3.245 | Growing / revived |
| Neuroevolution | 817 | 2021–2025 | 1.000 | 1.840 | Growing / revived |
| Symbolic regression | 1,746 | 2021–2025 | 1.000 | 3.356 | Growing / revived |
| Support-vector machines | 45,270 | 2006–2010 | 0.817 | 1.091 | Active control |
| Bayesian networks | 22,058 | 2021–2025 | 1.000 | 1.195 | Active control |

The exact values and yearly series are in [branch-trajectory-summary.csv](data/branch-trajectory-summary.csv) and [branch-yearly-counts.csv](data/branch-yearly-counts.csv).

## 3. Branch-by-branch causal interpretation

### 3.1 Expert systems — the clearest label death

**Why they emerged.** Early systems such as DENDRAL and MYCIN showed that narrow, explicitly encoded domain knowledge could outperform general-purpose search. The commercial boom followed because rules were inspectable and could be attached to high-value configuration, diagnosis, and decision tasks.

**Why the package contracted.** Contemporary researchers identified two structural problems: the cost of eliciting and maintaining expert knowledge, and brittle behavior outside the encoded envelope. A 1988 analysis explicitly framed these as the knowledge-acquisition bottleneck and brittleness ([Cohen and Feigenbaum-era analysis](https://doi.org/10.1016/B978-0-444-87137-4.50029-1)). Commercial decline was amplified by the cost of specialized Lisp hardware and by cheaper general-purpose workstations. Statistical learning later offered a different scaling route: acquire regularities from examples instead of hand-authoring every rule.

**What survived.** The useful inheritance is not “large flat rule bases.” It is the separation of knowledge from inference, explicit provenance, local explanations, constrained reasoning, and verification. Bayesian expert systems replaced brittle certainty factors with probabilistic graphical structure; Pearl's message-passing work is a direct bridge ([1988 paper](https://doi.org/10.1111/j.2517-6161.1988.tb01721.x)). Current retrieval, tool use, knowledge graphs, and verifier-guided agents echo pieces of the architecture, but direct historical inheritance must be demonstrated edge by edge rather than asserted by analogy.

**Verdict:** label died; monolithic package was superseded; several governance and reasoning mechanisms remain highly useful. **Confidence: high.**

### 3.2 Symbolic AI — not a clean time series

The exact phrase “symbolic artificial intelligence” was rarely used during symbolic AI's period of dominance; researchers often called the work AI, logic, planning, theorem proving, or knowledge representation. Its corpus of only 54 exact-title works therefore measures a recent contrast label, especially “neuro-symbolic AI,” rather than the historical size of symbolic research.

Recent growth reflects renewed interest in combining learned representations with objects, relations, rules, or programs ([Garnelo and Shanahan, 2019](https://doi.org/10.1016/j.cobeha.2018.12.010)). It should be treated as a terminology case study, not evidence that symbolic AI vanished and returned.

**Verdict:** quantitative trajectory is not historically valid; use venue/topic and citation-community methods in the next iteration. **Confidence: high about the limitation, low about the trajectory.**

### 3.3 Case-based reasoning — absorbed into broader retrieval and instance-based practice

**Core idea.** CBR solves a new problem by retrieving similar prior cases, reusing or adapting a solution, revising it, and retaining the new experience. The canonical framework is Aamodt and Plaza's four-stage cycle ([1994](https://doi.org/10.3233/AIC-1994-7104)).

**Why it narrowed.** High-dimensional learned representations and large statistical datasets made generic nearest-neighbor, recommendation, and retrieval systems easier to train and benchmark. CBR's distinctive adaptation and case-maintenance stages remained domain-specific and knowledge-intensive; similarity does not guarantee that a retrieved solution is adaptable.

**What survived.** Episodic memory, instance-based explanation, retrieval followed by adaptation, and online retention remain useful. Modern retrieval-augmented generation resembles the retrieve/reuse pattern, but the present evidence supports **conceptual convergence**, not yet a documented citation lineage. The adaptation step is the underused part that could inspire world-model agents and tool-using systems.

**Verdict:** surviving niche; core memory-and-adaptation loop is inspirational. **Confidence: medium.**

### 3.4 Inductive logic programming — interpretability retained, search scalability constrained

**Core idea.** ILP induces logic programs from examples plus background knowledge, learning relations rather than only vector-valued functions ([Muggleton, 1991](https://doi.org/10.1007/BF03037089)).

**Why it narrowed.** Combinatorial hypothesis spaces, sensitivity to representation and background knowledge, predicate invention, noise, and the difficulty of learning efficient programs constrained scaling. Vector-based deep learning won on perceptual tasks because representation learning and optimization were more automated.

**What survived.** Program synthesis, differentiable logic, neuro-symbolic learning, relational learning, and interpretable scientific rules preserve the ambition. A 30-year review documents renewed meta-level search, recursive program learning, predicate invention, and neural-symbolic hybrids while retaining the core scalability challenges ([Cropper et al., 2022](https://doi.org/10.1007/s10994-021-06089-1)).

**Verdict:** legacy niche; strong conceptual value where background knowledge and auditable rules matter. **Confidence: high.**

### 3.5 Learning classifier systems — a narrow evolutionary rule-learning identity

**Core idea.** LCS populations evolve condition–action rules while reinforcement signals update their fitness. Accuracy-based systems such as XCS shifted selection toward general but accurate rules ([Wilson, 1995](https://doi.org/10.1162/evco.1995.3.2.149)).

**Why it narrowed.** The combination of evolutionary population search, credit assignment, rule discovery, and many interacting design parameters was harder to scale and benchmark than gradient-based reinforcement learning. Deep RL learned representations directly, while LCS often depended on engineered encodings.

**What survived.** Explicit rule populations, niche protection, diversity maintenance, and simultaneous policy learning plus interpretable structure remain relevant to open-ended search and bounded self-improvement.

**Verdict:** legacy niche; potentially inspirational for diverse self-improving agent populations. **Confidence: medium.**

### 3.6 Fuzzy logic — not dead

Fuzzy logic represented graded membership rather than forcing crisp category boundaries ([Zadeh, 1965](https://doi.org/10.1016/S0019-9958(65)90241-X)). Mamdani-style controllers demonstrated that linguistic rules could control nonlinear physical processes ([1975](https://doi.org/10.1016/S0020-7373(75)80002-2)).

Its normalized publication share remains near its peak. This is a mature engineering tradition in control, decision systems, and hybrid neuro-fuzzy models, not a failed AI branch. It receives less frontier attention because it does not automatically learn large representations from raw data, not because graded reasoning stopped being useful.

**Verdict:** active; useful for interpretable control and uncertainty-like linguistic structure, but not a substitute for probabilistic calibration. **Confidence: high.**

### 3.7 Genetic programming — expensive search, durable idea

**Core idea.** Genetic programming searches over executable structures rather than only parameter vectors, popularized by Koza's 1992 program-evolution framework.

**Why it narrowed.** Program search is computationally expensive, fitness evaluations can dominate cost, representations create destructive mutations, and unconstrained evolution produces bloated or brittle programs. Gradient descent is vastly more efficient when objectives are differentiable.

**What survived and changed.** Symbolic regression, neuroevolution, AutoML, novelty search, and quality-diversity methods retain evolutionary search. LLMs now supply semantically meaningful program mutations while automated evaluators supply selection. AlphaEvolve explicitly combines model-generated programs, automated evaluation, and an evolutionary archive ([DeepMind, 2025](https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/)).

**Verdict:** surviving niche with a strong modern descendant; useful when artifacts are discrete, executable, and objectively testable. **Confidence: high.**

### 3.8 Artificial life — identity contracted, open-endedness survives

Artificial life studied life-like organization, adaptation, emergence, and evolution in computational or synthetic systems. Its exact-title peak occurred in 1994–1998 and its current normalized share is 21.6% of that peak.

The field narrowed because compelling demonstrations were often difficult to connect to standardized task performance, real-world utility, or cumulative benchmarks. Simple digital environments could produce striking emergence without resolving how complexity scales or transfers.

Open-ended evolution, artificial societies, cellular automata, collective behavior, and artificial chemistries survive across complex-systems research, evolutionary robotics, multi-agent learning, and quality-diversity research. Their strongest contribution to world models and RSI is the question of how to maintain novelty and ecological pressure without collapsing diversity.

**Verdict:** legacy niche; inspirational for open-endedness, but evaluation remains the central weakness. **Confidence: medium.**

### 3.9 Self-organizing maps — displaced as a default representation tool

Self-organizing maps combine competitive learning with neighborhood preservation to place high-dimensional observations on a lower-dimensional lattice ([Kohonen, 1990](https://doi.org/10.1109/5.58325)).

They narrowed because modern embedding learning and visualization methods offered more flexible objectives, better scaling, and easier integration into end-to-end pipelines. SOM results also depend on map geometry, initialization, and choices that do not naturally express uncertainty.

They remain useful for topology-aware clustering, interpretable prototypes, visualization, and domain workflows such as cytometry. The surviving idea is a structured, discrete map of prototypes—potentially useful for interpretable latent spaces and agent memory.

**Verdict:** surviving niche, currently declining. **Confidence: medium-high.**

### 3.10 Hopfield networks — a documented conceptual revival

Hopfield's original network used an energy function and recurrent dynamics to implement content-addressable memory ([1982](https://doi.org/10.1073/pnas.79.8.2554)). Classical capacity and spurious-attractor limits kept it from becoming the default large-scale memory architecture.

Modern Hopfield networks change the energy function, obtain much larger storage capacity, and connect the update rule to Transformer attention ([Ramsauer et al., 2020](https://arxiv.org/abs/2008.02217)). Hardware work also uses Hopfield dynamics for optimization.

**Verdict:** reviving; associative retrieval and energy-based convergence are directly useful to world-model memory. **Confidence: high.**

### 3.11 Boltzmann machines — generative leadership lost, energy modeling survives

Boltzmann machines introduced stochastic energy-based learning ([Ackley, Hinton, and Sejnowski, 1985](https://doi.org/10.1207/s15516709cog0901_7)). Restricted Boltzmann machines and contrastive divergence helped make deep generative pretraining practical before large labeled datasets and improved gradient methods.

They lost prominence because training and partition-function estimation were difficult, while autoencoders, autoregressive models, GANs, and diffusion models offered more scalable likelihood surrogates or sample quality. The exact-title series peaks in 2015–2019 and declines afterward.

Energy-based modeling, negative sampling, latent-variable learning, and connections to statistical physics survive. The branch is especially relevant to AI for Physics, but the specific Boltzmann-machine package is no longer the dominant generative route.

**Verdict:** surviving niche after decline; mechanisms inherited broadly. **Confidence: high.**

### 3.12 Reservoir computing — revival through physics

Reservoir computing holds a recurrent dynamical system mostly fixed and trains only a simple readout. Echo-state and liquid-state formulations reduced recurrent training difficulty but traded it for reservoir-design sensitivity and less adaptable internal features.

End-to-end gated RNNs and Transformers became the general software default. The idea reopened when researchers recognized that optical, memristive, mechanical, spintronic, and quantum systems can supply rich dynamics natively. A memristor implementation demonstrates temporal processing with only the readout trained ([Du et al., 2017](https://doi.org/10.1038/s41467-017-02337-y)); physical-reservoir work explicitly targets efficient non-von-Neumann computation.

**Verdict:** genuine revival; especially important at the intersection of AI for Physics and physical computing. **Confidence: high.**

### 3.13 Neuroevolution — revived where gradients are awkward

Neuroevolution searches over network weights, structures, or learning rules. NEAT's historical contribution was to evolve topology while protecting structural innovations ([Stanley and Miikkulainen, 2002](https://doi.org/10.1162/106365602320169811)).

It narrowed because backpropagation is far more sample- and compute-efficient for differentiable objectives. It revived in reinforcement learning, architecture search, quality diversity, and open-ended systems where objectives are sparse, discontinuous, deceptive, or multi-objective. Deep neuroevolution demonstrated competitive results on selected RL tasks ([Such et al., 2017](https://arxiv.org/abs/1712.06567)).

**Verdict:** growing niche; useful for population diversity and non-differentiable search, not a general replacement for gradients. **Confidence: high.**

### 3.14 Symbolic regression — the strongest science-facing revival

Symbolic regression searches for compact mathematical expressions that fit data. It inherited genetic programming's executable search but targets interpretable equations. Historically it suffered from combinatorial explosion, expression bloat, noise sensitivity, and the difficulty of separating good fit from spurious complexity.

Scientific-discovery systems changed the context. Symbolic regression has recovered physical laws from experimental data ([Schmidt and Lipson, 2009](https://doi.org/10.1126/science.1165893)); AI Feynman used physical structure and neural guidance to reduce the search space ([Udrescu and Tegmark, 2020](https://doi.org/10.1126/sciadv.aay2631)). Current work combines dimensional analysis, differentiable surrogates, transformers, and strong priors.

**Verdict:** genuine growth; directly relevant to AI for Physics because outputs can be tested as equations rather than only predictive scores. **Confidence: high.**

### 3.15 Support-vector machines — active control

SVMs provided convex maximum-margin learning with kernelized nonlinear decision boundaries ([Cortes and Vapnik, 1995](https://doi.org/10.1007/BF00994018)). Deep learning displaced them on raw high-dimensional perception because learned representations and scale mattered more than a fixed kernel. They remain competitive on many moderate-sized, structured, or high-dimensional datasets.

**Verdict:** active mature method; a useful counterexample to “not frontier = dead.” **Confidence: high.**

### 3.16 Bayesian networks — active control and absorbed infrastructure

Bayesian networks represent conditional dependence in a directed graph and support probabilistic inference, causal modeling under additional assumptions, and decision support. Their title share is at a historical high.

They remain active because uncertainty and graph structure are persistent problems, while modern probabilistic programming and causal inference absorbed many of their tools. Exact inference can be intractable and structure learning is difficult, but these are scaling boundaries rather than field death.

**Verdict:** active and broadly inherited. **Confidence: high.**

## 4. Cross-branch causes of decline

The cases support six recurring mechanisms:

| Cause | Strong examples | What replaced or constrained it |
| --- | --- | --- |
| Knowledge acquisition and maintenance cost | Expert systems, ILP, CBR adaptation | Statistical learning, representation learning, retrieval over less structured corpora |
| Combinatorial search cost | ILP, genetic programming, symbolic regression, LCS | Gradient optimization; later, stronger priors and learned proposal models |
| Weak or fragmented evaluation | Artificial life, open-ended evolution, some CBR | Standardized supervised and RL benchmarks |
| Fixed or hand-designed representation | Expert systems, LCS, classical SOM/CBR | End-to-end learned representations |
| Difficult probabilistic or energy training | Boltzmann machines | VAEs, autoregressive models, GANs, diffusion |
| Hardware mismatch turned opportunity | Reservoir computing, Hopfield optimization | Initially software-trained deep nets; later physical/neuromorphic substrates reopened the idea |

No branch in the table died for only one reason. Scientific limitations interacted with available hardware, data, benchmarks, software tooling, and funding narratives.

## 5. Concepts worth carrying forward

| Historical concept | Current use value | Most relevant frontier |
| --- | --- | --- |
| Explicit knowledge/inference separation | Auditing, constrained agents, provenance, verifiers | RSI and trustworthy agents |
| Retrieve–reuse–revise–retain cycle | Episodic memory plus adaptation and online learning | World models and agents |
| Relational rule induction | Interpretable hypotheses using background knowledge | AI for Physics; neuro-symbolic AI |
| Population diversity and niche protection | Avoiding premature convergence and monoculture | RSI; open-ended agents |
| Fuzzy linguistic control | Human-readable control under graded boundaries | Robotics and physical systems |
| Executable evolutionary search | Search over code and discrete algorithms with hard evaluators | RSI and automated discovery |
| Open-ended ecological pressure | Sustained novelty rather than one fixed objective | World models; multi-agent learning |
| Prototype maps and topology preservation | Structured, inspectable latent memory | World models and interpretability |
| Associative memory and energy descent | Content-addressable retrieval and stable attractors | World models |
| Energy-based latent modeling | Physical inductive bias and structured generation | AI for Physics |
| Fixed nonlinear dynamics plus trained readout | Cheap learning on unconventional hardware | AI for Physics / physical AI |
| Human-readable equation search | Falsifiable scientific hypotheses | AI for Physics |
| Bayesian graph structure | Uncertainty, interventions, causal hypotheses | All three deep dives |

## 6. Candidate documented and inferred relationships

The following are proposed atlas edges. “Documented” means the target paper or a strong review explicitly establishes the connection. “Inferred” means the similarity is analytically useful but still needs direct citation evidence.

| Source | Relationship | Target | Evidence status | Reason |
| --- | --- | --- | --- | --- |
| Expert systems | `FAILS_UNDER` | Knowledge-acquisition bottleneck | Documented | Hand-building and maintaining large rule bases became the limiting step. |
| Expert systems | `MOTIVATES` | Automated rule learning / ILP | Documented | ILP attempts to learn symbolic rules from examples and background knowledge. |
| Expert systems | `EXTENDS` | Probabilistic expert systems | Documented | Bayesian networks add calibrated probabilistic dependence and inference. |
| Expert-system explanation | `INSPIRES` | Verifier-guided agents | Inferred | Both separate candidate generation from explicit checking, but lineage must be sourced. |
| Case-based reasoning | `GENERALIZES` | Episodic agent memory | Inferred | Stored experiences are retrieved and adapted to current problems. |
| CBR retrieve/reuse | `INSPIRES` | Retrieval-augmented generation | Inferred | Structural resemblance is clear; direct lineage is not yet established. |
| ILP | `EXTENDS` | Neuro-symbolic program induction | Documented | New systems combine logic programs with learned embeddings or differentiable components. |
| Learning classifier systems | `INSPIRES` | Diverse self-improving agent populations | Inferred | Rule populations combine selection, local credit, and niche maintenance. |
| Genetic programming | `INTRODUCES` | Symbolic regression | Documented | GP supplied the dominant early search machinery for expressions. |
| Genetic programming | `REVIVED_BY` | LLM-guided evolutionary code search | Documented | LLMs propose mutations while automated evaluators select programs. |
| Artificial life | `INSPIRES` | Open-ended learning | Documented | Both seek sustained novelty, emergence, and increasing complexity. |
| Self-organizing maps | `INSPIRES` | Structured prototype memory | Inferred | Topology-preserving prototypes could organize inspectable world-model memory. |
| Hopfield networks | `REVIVED_BY` | Modern Hopfield networks | Documented | A new energy function increases capacity and changes retrieval dynamics. |
| Modern Hopfield networks | `RELATES_TO` | Transformer attention | Documented | The modern update rule is mathematically connected to attention. |
| Boltzmann machines | `ENABLES` | Deep generative pretraining | Documented | RBMs and contrastive divergence supported early deep belief models. |
| Boltzmann machines | `INSPIRES` | Modern energy-based models | Documented | Energy functions and negative-phase learning remain foundational. |
| Echo-state / liquid-state models | `GENERALIZES` | Reservoir computing | Documented | Reservoir computing unifies fixed recurrent dynamics with trained readouts. |
| Reservoir computing | `REVIVED_BY` | Physical reservoirs | Documented | Material dynamics replace simulated reservoirs and offer speed/energy advantages. |
| Neuroevolution | `EXTENDS` | Deep neuroevolution | Documented | Evolutionary search was applied at deep-network scale. |
| Symbolic regression | `APPLIES` | Automated physical-law discovery | Documented | Expression search produces candidate equations from measurements. |
| Bayesian networks | `ENABLES` | Probabilistic causal models | Documented | Directed factorization supports intervention-oriented extensions under added assumptions. |

## 7. Implications for the three preferred frontiers

### AI for Physics

The strongest historical inputs are symbolic regression, reservoir computing, energy-based models, relational rule induction, and Bayesian structure. This is the frontier with the clearest path from revived historical ideas to falsifiable outputs: equations, conserved quantities, calibrated forecasts, or accelerated simulations.

### World models

The strongest inputs are associative memory, case retrieval and adaptation, dynamical reservoirs, prototype maps, artificial-life open-endedness, and probabilistic state structure. The historical warning is that impressive simulation is not enough: evaluation must test intervention, counterfactual consistency, long-horizon memory, and action-conditioned prediction.

### Recursive self-improvement

The strongest inputs are genetic programming, neuroevolution, learning-classifier populations, explicit verification, and Bayesian uncertainty. Historical failures point directly to the bottleneck: proposal generation is easier than trustworthy evaluation, regression prevention, credit assignment, and preservation of diversity.

## 8. What is still missing

Before this report can support final project selection, it needs:

- citation-flow analysis from historical papers into modern descendants;
- venue/topic-based reconstruction of symbolic AI, whose name is not stable enough for exact-title analysis;
- expansion beyond the current seed set, especially cybernetics, evolutionary strategies, probabilistic programming, connectionism, analog AI, and developmental robotics;
- hand verification of the top-cited-paper list and removal of duplicate editions;
- causal evidence on funding and hardware shifts from contemporaneous reports rather than retrospective summaries; and
- a comparison against the present-frontier census using the common decision rubric.

## Reproducible artifacts

- [Analysis script](../scripts/analyze-branch-trajectories.mjs)
- [Yearly counts](data/branch-yearly-counts.csv)
- [Trajectory summary](data/branch-trajectory-summary.csv)
- [Query sensitivity](data/branch-query-sensitivity.csv)
- [Top-cited works](data/branch-top-cited-papers.csv)
- [Metadata and limitations](data/branch-analysis-metadata.json)
