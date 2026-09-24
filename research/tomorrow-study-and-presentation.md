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

The leading idea is to test whether adding physical structure helps a learned simulator predict conditions it did not see during training. Compare a neural operator trained from examples, the same model with conservation or equation constraints, and a version with a small symbolic correction. Test on a shifted physical parameter and longer rollouts. Track prediction error, conservation error, stability, uncertainty, and compute.

The question is not “does physics help?” in general. It is: “Under a specified shift, does a particular physical constraint or symbolic correction improve reliable prediction enough to justify its added complexity and cost?” A negative result is useful if the comparison is fair and the shift is explicit.

### A practical MVP to investigate tomorrow

Start by checking **1D viscous Burgers on PDEBench** as the likely pilot, before committing to the 2D Navier–Stokes version. PDEBench includes 10,000-sample 1D Burgers data in its benchmark table, varies viscosity, provides FNO baselines, and reports both prediction and physics-oriented metrics. Its dataset is downloadable in HDF5, and the project publishes generation code. This gives a plausible route to one withheld-viscosity test with a much smaller state than a 2D fluid field. [PDEBench paper](https://papers.nips.cc/paper/2022/file/0a9747136d411fb83f0cf81820d44afb-Paper-Datasets_and_Benchmarks.pdf), [official dataset record](https://darus.uni-stuttgart.de/dataset.xhtml?persistentId=doi:10.18419/darus-2986), [official code](https://github.com/pdebench/PDEBench).

Treat that as a feasibility candidate, not a final benchmark choice. First verify which files are currently downloadable, the precise viscosity values and boundary conditions, and whether the held-out regime is genuinely outside training. If the data setup is awkward, choose another small PDE with an equally clear parameter shift. The benchmark authors explicitly identify unseen-parameter and unseen-time evaluation as open challenges and caution that average RMSE alone misses conservation and stability. Physics-informed neural operators already combine data with PDE constraints, so the novelty must come from a carefully controlled shift and evaluation, not simply adding a physics loss. [PDEBench](https://papers.nips.cc/paper/2022/file/0a9747136d411fb83f0cf81820d44afb-Paper-Datasets_and_Benchmarks.pdf), [PINO](https://arxiv.org/abs/2111.03794).

For the semester minimum, compare a data-only FNO with the same model plus one justified equation or conservation term. Defer symbolic residual discovery until these two runs are reproducible; it is a strong extension, but adds search and interpretation decisions before feasibility is established.

## Decision checks

Before committing, answer these in writing:

1. Can I explain the physical system and the chosen shift well enough to catch an invalid result?
2. Can I run the baseline and at least one comparison with the compute and time I actually have?
3. Is the primary metric decisive, and are the data split and shift defined before tuning?
4. Would I still find the result useful if the hybrid method loses?
5. Is this the project I want to spend a semester learning, rather than simply the highest-scoring row?

If the PDE setup or physical interpretation is too costly, narrow to one tractable benchmark and one constraint before abandoning the topic. If motivation is weak or a stronger alternative fits your resources, change the focus and update the decision record.

## Three-minute presentation

“ML Civilization is an interactive causal atlas of machine-learning history. It connects research methods by the problems that motivated them, the limits that caused branches to contract, and the ideas that survived in later work. The goal is to explain causes and inheritance, not just put papers in date order.

I measured the visibility of 16 historical branch labels in OpenAlex from 1950 to 2025. For each year, I divided exact-title matches by all indexed works, then compared recent publication share with the branch's historical peak. I changed to exact title queries after broad search returned unrelated work and falsely suggested that some fields had revived. These statistics measure labels, not every use of an idea, and they cannot prove why a field declined.

That distinction matters: expert systems as a label contracted sharply, while ideas such as explicit rules, verification, and separating knowledge from inference continued elsewhere. So the atlas keeps documented links separate from interpretation.

I compared broad current frontiers and completed deeper first-pass studies of AI for Physics, world models, and recursive self-improvement. AI for Physics currently scores highest because a small experiment can test transfer under a defined shift with measurable accuracy, conservation, stability, and compute. I have not treated that score as the final answer: I still need to check whether the project fits my interests, skills, and available resources.

The current website is a working research prototype. I can search and inspect nodes, trace a lineage, move through time, and see the selected frontier connections. The graph is a curated seed, not yet a complete history or an automated proof of causality. My next step is to choose one semester project and make its first experiment reproducible.”

## Website demonstration (about two minutes)

1. Open `http://127.0.0.1:5173/` and say the graph is a working prototype with a curated initial scope.
2. Select the hybrid equation-aware world-model node. Explain the proposed question in one sentence.
3. Follow its incoming and outgoing edges to show how the atlas connects older symbolic methods, AI for Physics, and world models.
4. Open one detail panel and distinguish the source-backed historical edge from a proposed project connection.
5. Use search or timeline/lineage controls once; avoid promising that every frontier or branch is already represented.

If the local page is unavailable, run `npm run dev` in the project directory and use the Local URL Vite prints. Do not use a container preview URL.

## Questions to expect

- **Why exact titles?** Broad search counts papers that merely mention a method. Exact title phrases make the label measure more interpretable; the sensitivity file shows how much the answer changes.
- **Does a falling curve mean the method failed?** No. It means the label lost relative publication visibility. Mechanisms can move under other names, and the causal report treats that as a separate question.
- **Why AI for Physics?** It has a tractable experiment, strong physical diagnostics, and a useful bridge from symbolic regression and neural operators to current world models. The comparison is provisional until feasibility and personal fit are checked.
- **What could make the experiment fail?** The constraint may help only in-distribution, destabilize training, or cost more than it saves. Those outcomes are measurable and informative.
- **What is still incomplete?** Broader historical citation-flow validation, full-lineage imports, and empirical replication of the project experiment. The selected graph is an initial integration.

## Leave these unresolved until you have the information

- Exact benchmark and PDE, based on setup cost and physical interpretability.
- Whether to include the symbolic correction in the semester minimum or treat it as an extension after the constrained baseline.
- Whether tomorrow's choice confirms or replaces AI for Physics; your interests and course constraints belong in that decision.
