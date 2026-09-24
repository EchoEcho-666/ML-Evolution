# Tomorrow's research study and 3 pm presentation

**Purpose:** Use the 10 am–3 pm work block to understand the research options, pressure-test the current recommendation, and leave with a project choice you can explain. The existing AI-for-Physics choice is provisional evidence, not an obligation.

## Suggested five-hour plan

| Time | Focus | Leave with |
| --- | --- | --- |
| 10:00–10:25 | Explain ML Civilization in your own words. Review the one-paragraph project pitch below and the visible atlas. | A clear answer to “what does this project do that a paper timeline does not?” |
| 10:25–11:05 | Read `branch-mortality-analysis.md` and the summary/method sections in `project_control.md`. | Explain normalized title-label counts, exact-title search, and label death versus mechanism survival. |
| 11:05–12:00 | Read the thesis, experiment, and limitations in `ai-for-physics-survey.md`; inspect `world-model-survey.md` for the overlap. | State what the proposed experiment changes, measures, and cannot establish. |
| 12:00–12:30 | Break, then list your own interests, available compute/data, and skills you want to build. | A personal feasibility and motivation checklist. |
| 12:30–1:20 | Compare AI for Physics, world models, and bounded RSI using the common rubric in `project-focus-decision.md`; skim the four retained alternatives in `present-frontier-census.md`. | One preferred focus plus one credible backup, with reasons grounded in your constraints. |
| 1:20–2:05 | Make the experiment smaller: choose one PDE, one model family, one shift, and one primary metric. Identify the dataset, baseline, and first-week setup. | A one-page project specification and a stop/go test for feasibility. |
| 2:05–2:35 | Decide whether to confirm or revise the current focus. Record what evidence would change your mind. | A project choice you own, including one uncertainty. |
| 2:35–3:00 | Rehearse the talk track below and open the local Vite site at `http://127.0.0.1:5173/`. | A 3-minute explanation and a reliable 2-minute website demonstration. |

## Research choice in plain language

The leading idea is to test whether a compact symbolic correction helps a learned physical model predict conditions it did not see during training. Compare a data-driven operator, the same operator with an equation constraint, and a version with the symbolic correction. Test on a held-out physical parameter. Track prediction error, physical consistency, and compute. Add long rollouts only if the chosen model actually predicts step by step.

The question is not “does physics help?” in general. It is: “Under a specified shift, does a particular physical constraint or symbolic correction improve reliable prediction enough to justify its added complexity and cost?” A negative result is useful if the comparison is fair and the shift is explicit.

### A practical MVP to investigate tomorrow

Start by checking **1D viscous Burgers on PDEBench** as the likely pilot. PDEBench varies viscosity, provides FNO baselines, and reports prediction and physics-oriented metrics. Its full HDF5 files are about **7.7 GB per viscosity**, so downloading several complete files is not a small first step. Use the official code to inspect a reproducible small data-generation path or subset before committing to the benchmark. The 16-point mini Burgers dataset in NeuralOperator can check that the model pipeline runs, but cannot alone prove viscosity transfer. [PDEBench paper](https://papers.nips.cc/paper/2022/file/0a9747136d411fb83f0cf81820d44afb-Paper-Datasets_and_Benchmarks.pdf), [official dataset record](https://darus.uni-stuttgart.de/dataset.xhtml?persistentId=doi:10.18419/darus-2986&version=7.0), [PDEBench code](https://github.com/pdebench/PDEBench), [NeuralOperator dataset documentation](https://neuraloperator.github.io/dev/_modules/neuralop/data/datasets/burgers.html).

Treat that as a feasibility candidate, not a final benchmark choice. First verify which files are currently downloadable, the precise viscosity values and boundary conditions, and whether the held-out regime is genuinely outside training. If the data setup is awkward, choose another small PDE with an equally clear parameter shift. The benchmark authors explicitly identify unseen-parameter and unseen-time evaluation as open challenges and caution that average RMSE alone misses conservation and stability. Physics-informed neural operators already combine data with PDE constraints, so the novelty must come from a carefully controlled shift and evaluation, not simply adding a physics loss. [PDEBench](https://papers.nips.cc/paper/2022/file/0a9747136d411fb83f0cf81820d44afb-Paper-Datasets_and_Benchmarks.pdf), [PINO](https://arxiv.org/abs/2111.03794).

For the first milestone, compare a data-only FNO with the same model plus one justified equation term. This is a replication pilot: a [2026 TU Delft thesis](https://repository.tudelft.nl/record/uuid:bc293c72-0833-4df2-bd42-0aa63914ee23) already did a matched FNO/PINO comparison on PDEBench Burgers, including a viscosity shift. A distinct semester result needs the symbolic correction or another clearly specified new question. Check the data and compute path before choosing it. The thesis used a CUDA cluster; its [code and limitations](https://github.com/samuekisde/fno-pino-data-efficiency) give a realistic setup reference.

## Decision checks

Before committing, answer these in writing:

1. Can I explain the physical system and the chosen shift well enough to catch an invalid result?
2. Can I run the replication pilot and the additional comparison that makes my result distinct with the compute and time I actually have?
3. Is the primary metric decisive, and are the data split and shift defined before tuning?
4. Would I still find the result useful if the hybrid method loses?
5. Is this the project I want to spend a semester learning, rather than simply the highest-scoring row?

If the PDE setup or physical interpretation is too costly, narrow to one tractable benchmark and one constraint before abandoning the topic. If motivation is weak or a stronger alternative fits your resources, change the focus and update the decision record.

## Three-minute presentation

“ML Civilization is an interactive causal atlas of machine-learning history. It connects research methods by the problems that motivated them, the limits that caused branches to contract, and the ideas that survived in later work. The goal is to explain causes and inheritance, not just put papers in date order.

I measured the visibility of 16 historical branch labels in OpenAlex from 1950 to 2025. For each year, I divided exact-title matches by all indexed works, then compared recent publication share with the branch's historical peak. I changed to exact title queries after broad search returned unrelated work and falsely suggested that some fields had revived. These statistics measure labels, not every use of an idea, and they cannot prove why a field declined.

That distinction matters: expert systems as a label contracted sharply, while ideas such as explicit rules, verification, and separating knowledge from inference continued elsewhere. So the atlas keeps documented links separate from interpretation.

I compared broad current frontiers and completed deeper first-pass studies of AI for Physics, world models, and recursive self-improvement. AI for Physics currently scores highest because equations give independent checks on predictions. A recent thesis already ran the simplest two-model comparison under a viscosity shift, so that would be my starting replication. The proposed contribution is to test whether a compact symbolic correction adds reliable transfer. I still need to confirm that the full experiment fits my interests, skills, and available resources.

The current website is a working research prototype. I can search and inspect nodes, trace a lineage, move through time, and see connections to the leading frontier candidate. The graph is a curated seed, not yet a complete history or an automated proof of causality. My next step is to choose one semester project and make its first experiment reproducible.”

## Website demonstration (about two minutes)

1. Run `npm run dev`, open the Local URL Vite prints, and click **Go to map** if the prologue appears. Say the graph is a working prototype with a curated initial scope.
2. Turn on **Timeline** to show the 16 historical branches left to right by emergence year. Search for **Branch Survival Analysis** and explain that its evaluation links measure research-label trajectories. If an older saved arrangement affects the regular map, turn Timeline off and use **Restore nodes**.
3. Open **Expert Systems**, then **What followed** to trace the knowledge-acquisition bottleneck and inductive rule learning. Open **Hopfield Networks**, **Reservoir Computing**, or **Genetic Programming** for another path into current work.
4. Search for **Hybrid Equation-Aware World Model** and click **Focus**. Explain that it is the leading candidate, not a completed result.
5. Follow its incoming motivation from AI for Physics. Distinguish the measured historical evidence from the proposed semester experiment, and avoid claiming that every causal inheritance edge is already verified.

The Local URL is normally `http://127.0.0.1:5173/`. Use the port Vite prints if 5173 is occupied. Do not use a container preview URL.

## Questions to expect

- **Why exact titles?** Broad search counts papers that merely mention a method. Exact title phrases make the label measure more interpretable; the sensitivity file shows how much the answer changes.
- **Does a falling curve mean the method failed?** No. It means the label lost relative publication visibility. Mechanisms can move under other names, and the causal report treats that as a separate question.
- **Why AI for Physics?** It has independent physical diagnostics and a useful bridge from symbolic regression and neural operators to current world models. The exact experiment still needs a viable data and compute path and a contribution beyond the recent FNO/PINO comparison.
- **What could make the experiment fail?** The constraint may help only in-distribution, destabilize training, or cost more than it saves. Those outcomes are measurable and informative.
- **What is still incomplete?** Broader historical citation-flow validation, full-lineage imports, and empirical replication of the project experiment. The visible graph is an initial integration.

## Leave these unresolved until you have the information

- Exact benchmark and PDE, based on setup cost and physical interpretability.
- Whether a compact symbolic correction can fit the semester. If not, choose a different distinct question or agree with the supervisor that a careful replication is sufficient.
- Whether tomorrow's choice confirms or replaces AI for Physics; your interests and course constraints belong in that decision.
