# ML Civilization — Project Plan

**Last updated:** 2026-09-24
**Current phase:** Validate semester-project fit, then prepare a reproducible first experiment
**This week:** 2026-09-21 to 2026-09-27

## North star

Build an evidence-backed causal atlas of machine-learning history that explains:

1. how a research direction emerged;
2. why it succeeded, stalled, or died out;
3. what unresolved ideas connect it to today's frontier; and
4. which branches may be worth exploring next.

## Status key

- [x] Complete
- [~] In progress or partially complete
- [ ] Not started
- [?] Needs clarification or a decision

## Current project status

| Area | Status | Current state | Next action |
| --- | --- | --- | --- |
| Interactive atlas | Expanded | Causal graph, node details, search, lineage view, fog, and timeline are implemented; the AI-for-Physics lineage and frontier comparators are visible. The site is branded ML Civilization. | Complete a manual browser walkthrough; the automated browser control service was unavailable on 2026-09-24. |
| Seed research content | Complete first integration | The visible graph connects genetic programming, symbolic regression, neural operators, AI for Physics, world models, bounded RSI, and the leading project candidate. Its untested gains are labelled as proposed. | Expand only after evidence notes and relationship imports are reviewed. |
| Local research workflow | Complete | Exploration state, imported papers, relationships, and notes persist locally. | Define a consistent evidence-note format. |
| Literature discovery | Partial | OpenAlex search, Crossref fallback, paper import, deduplication, provenance, and source links are implemented. | Add citation-neighborhood expansion and evidence-layer edges. |
| Shared backend | Planned | A Supabase schema exists, but the app is still local-first and is not connected to it. | Add authentication, sync, and a server-side provider proxy later. |
| Branch Realizer | Planned | The design and evaluation plan exist; no candidate-ranking model has been implemented. | Start with deterministic ranking after more confirmed edges exist. |
| Quality checks | Partial | Production build and lint passed on 2026-09-18. On 2026-09-24, TypeScript compilation and import-graph integrity passed; full Vite build, lint, and visual browser verification were not completed because local file/dependency access stalled and browser control was unavailable. There is no automated test suite. | Re-run `npm run build` and `npm run lint` in the local Terminal, then manually click through the meeting demo. |
| Cloud development and delivery | Pushed to GitHub | Codespaces and GitHub Actions configuration are committed on `main`; the remote is `EchoEcho-666/ML-Evolution`. | Verify the repository's Pages setting before relying on the hosted page; use local Vite for the meeting. |
| Historical branch analysis | In progress | The 16-branch census has passed broad-vs-exact query sensitivity analysis, and a first causal/inheritance report is complete. | Add citation-flow evidence, expand the branch set, and verify inferred inheritance edges. |
| Frontier census | Complete first pass | Twelve present frontiers are mapped with common bottlenecks, historical ancestors, evidence anchors, and minimum experiments. | Keep four non-preferred comparators in the final decision matrix. |
| AI for Physics deep dive | Complete first pass | Scope, taxonomy, 29-paper chronology, evidence limits, causal edges, open questions, and a decisive experiment are drafted. | Verify metadata and compare its 32/35 provisional score against world models and RSI. |
| World-model deep dive | Complete first pass | Operational definition, six-part taxonomy, 17-item chronology, lineage notes for Ha, LeCun/JEPA, DeepMind, and NVIDIA, evidence limits, causal edges, bottlenecks, and a 28/35 experiment score are drafted. | Convert the selected AI-for-Physics lineage and its comparators into evidence-backed imports. |
| Recursive self-improvement deep dive | Complete first pass | Operational definition, exclusions, five-field improvement loop, target taxonomy, claim/evidence matrix, causal edges, bottlenecks, bounded falsifiable experiment, and a 27/35 provisional score are drafted. | Preserve bounded RSI as a comparator; convert documented claims and edges into the import list. |
| Research direction | Provisional selection | AI for Physics scored 32/35 for the full hybrid proposal. A 2026 thesis already ran the two-model FNO/PINO Burgers viscosity-shift comparison, so that experiment is a replication pilot; the symbolic correction or another distinct question must carry the semester contribution. | Confirm student interest, course originality requirements, compute, and a small reproducible benchmark before the final choice. |
| Meeting preparation | Draft ready | A five-hour study path, short talk track, local-site demo steps, and likely questions are prepared. | Use [tomorrow's study and presentation guide](research/tomorrow-study-and-presentation.md), then capture the chosen focus and next experiment. |

Detailed engineering plans:

- [Open literature and paper-linking plan](docs/open-literature-plan.md)
- [Branch Realizer plan](docs/branch-realizer-plan.md)

## Revised research outcome

By the end of the week, produce:

- [~] a **statistical history of past ML branches**, not a shortlist of only 3–5 fields;
- [ ] an evidence-backed explanation of which branches contracted, why they contracted, and whether their mechanisms survived under other names;
- [ ] a map of useful and inspirational concepts inherited by current research;
- [~] a broad census of the present AI frontier, with deeper research matrices for **AI for Physics**, **world models**, and **recursive self-improvement**;
- [ ] a transparent comparison followed by **one primary project focus**;
- [ ] a chronological paper list and typed relationship list ready to add to the atlas; and
- [ ] a compact relationship map connecting historical branches, current frontiers, and the selected project.

The minimum useful result is no longer a small candidate list. It is a reproducible dataset, a causal interpretation with uncertainty labels, a frontier comparison, and a single justified project decision.

## Priority 1 — Statistical history of ML branches

### Research questions

- Which research identities grew, peaked, contracted, revived, or remained active?
- Did a branch genuinely die, or did only its name disappear?
- Which causes best explain contraction: scientific limits, brittle engineering, missing compute/data, weak evaluation, funding changes, or replacement by another paradigm?
- Which concepts were inherited by modern methods, and which remain useful or inspirational now?

### Statistical design

- [x] Use OpenAlex works dated 1950–2025; exclude incomplete 2026 counts.
- [x] Use title-anchored branch queries to measure the visibility of a research identity rather than incidental full-text mentions.
- [x] Normalize each year's branch count by all OpenAlex-indexed works that year and report papers per 100,000 works.
- [x] Compare the 2021–2025 mean with the branch's historical peak five-year mean (`survival ratio`).
- [x] Compare 2021–2025 with 2016–2020 (`recent trend ratio`) to distinguish continued decline from revival.
- [x] Include support-vector machines and Bayesian networks as active controls.
- [x] Run exact-phrase, plural/orthographic-alias, and broad-query sensitivity checks.
- [ ] Add citation-flow, co-citation, and successor-keyword evidence; publication volume alone cannot establish conceptual inheritance.
- [ ] Hand-code causal evidence from primary and contemporaneous sources.

**Current seed set (16):** expert systems, symbolic AI, case-based reasoning, inductive logic programming, learning classifier systems, fuzzy logic, genetic programming, artificial life, self-organizing maps, Hopfield networks, Boltzmann machines, reservoir computing, neuroevolution, symbolic regression, plus the two controls. The set is extensible; it is not a cap.

### Preliminary descriptive signals — not yet causal conclusions

| Signal | Result from current run | Interpretation to test |
| --- | --- | --- |
| Strong contraction | Expert systems survival ratio `0.062` | The label contracted sharply, but rules, verification, and knowledge/inference separation migrated elsewhere. |
| Legacy niches | Inductive logic programming `0.127`; learning classifier systems `0.163`; artificial life `0.216` | These identities persist at a small fraction of peak normalized publication share. |
| Surviving niches | Case-based reasoning `0.376`; genetic programming `0.531`; self-organizing maps `0.436`; Boltzmann machines `0.641` | These are not dead; they persist in narrower communities or through descendant mechanisms. |
| Revival/growth | Reservoir computing `1.000`, trend `3.245`; symbolic regression `1.000`, trend `3.356`; neuroevolution `1.000`, trend `1.840`; Hopfield networks trend `2.301` | New hardware, scientific discovery, deep networks, or modern reinterpretations have reopened the branches. |
| Active controls | Fuzzy logic `0.962`; support-vector machines `0.817`; Bayesian networks `1.000` | Older methods can remain active even when frontier attention moves elsewhere. |

These numbers measure title-label visibility. They do **not** prove that a mechanism died or establish why a decline occurred.

### Reproducible outputs already generated

- [Analysis script](scripts/analyze-branch-trajectories.mjs)
- [Yearly normalized counts](research/data/branch-yearly-counts.csv)
- [Trajectory summary](research/data/branch-trajectory-summary.csv)
- [Top-cited works per title query](research/data/branch-top-cited-papers.csv)
- [Broad-vs-exact query sensitivity](research/data/branch-query-sensitivity.csv)
- [Method, thresholds, and limitations](research/data/branch-analysis-metadata.json)
- [Causal and inheritance analysis](research/branch-mortality-analysis.md)

### Required causal interpretation for every branch

- [x] Draft origin, promise, contraction, replacement, inheritance, and current-value interpretations for all 16 branches/controls.
- [x] Distinguish documented inheritance from interpretive similarity in the candidate relationship table.
- [ ] Validate every causal claim with at least one primary or contemporaneous source and add explicit confidence fields to the import data.
- [ ] Test revival hypotheses with citation-flow and successor-keyword evidence.

**Deliverable:** `research/branch-mortality-analysis.md`, the reproducible data above, and a branch-to-successor relationship table.

## Priority 2 — Census the present frontier before choosing

The frontier census should be broad enough to prevent selection bias. It will cover at least:

- AI for science and scientific discovery;
- world models, embodied AI, robotics, and physical AI;
- automated AI research and bounded recursive self-improvement;
- reasoning, planning, test-time compute, and verifiable inference;
- multimodal and native spatial/temporal models;
- continual, online, and memory-augmented learning;
- interpretability, evaluation, robustness, and alignment;
- efficient models, hardware–algorithm co-design, and neuromorphic/physical computing;
- causal and neuro-symbolic learning;
- synthetic data, self-play, open-endedness, and agent societies; and
- domain foundation models for biology, chemistry, materials, climate, and mathematics.

For each frontier: define the object of study, representative primary papers, 2024–2026 evidence, unresolved bottleneck, tractability, historical ancestors, and the smallest falsifiable project.

**Deliverable:** [Present-frontier census](research/present-frontier-census.md) and its common comparison matrix. First pass complete.

## Priority 3 — Deep dive: AI for Physics

- [x] Define the scope: **AI used to do physics** as primary and **physics used to improve AI** as secondary.
- [x] Define the survey's time range and inclusion criteria.
- [x] Find recent survey/review papers to establish vocabulary and coverage.
- [x] Build a chronological matrix of 29 important primary papers.
- [x] Group the literature into a working taxonomy, including:
  - scientific discovery and hypothesis generation;
  - simulation and surrogate modelling;
  - inverse problems and parameter inference;
  - physics-informed learning;
  - foundation models for physical systems; and
  - experiment control and autonomous laboratories.
- [x] For each group, record the problem, method, evidence, limitations, and open questions.
- [x] Identify causal links and turning points suitable for the atlas.
- [x] Draft the survey structure, thesis, candidate projects, and smallest decisive experiment.

**Deliverable:** [AI for Physics survey and paper matrix](research/ai-for-physics-survey.md). First pass complete.

## Priority 4 — Deep dive: world models

### Scope and definitions

- [x] Define “world model” and distinguish at least:
  - learned environment simulators;
  - latent predictive models for agents;
  - video/generative world models; and
  - hierarchical or abstraction-based predictive models.
- [x] Decide which definition governs the survey and document exclusions.

### Required lineages and organizations

- [x] **David Ha** — trace the lineage around learned world models and agent behaviour.
- [x] **Yann LeCun** — trace predictive learning, JEPA-style representations, and the proposed autonomous-intelligence architecture.
- [x] **NVIDIA** — map its world/foundation-model work to the broader research lineage; distinguish research contributions from product positioning.
- [~] **Atlas** — the exact paper, project, lab, or system remains unspecified; the survey records this ambiguity rather than silently selecting one.

### Synthesis

- [x] Create a chronological paper matrix.
- [x] Compare objectives, training signals, state representations, actions, memory, planning, and evaluation.
- [x] Document what caused each major approach to emerge.
- [x] Identify approaches that faded, what replaced them, and whether the underlying idea survived.
- [x] List current bottlenecks and 3–5 frontier questions.
- [x] Draft the survey outline and a one-paragraph thesis.
- [x] Convert the main lineages into proposed atlas nodes and typed causal edges.

**Deliverable:** [World-model survey and paper matrix](research/world-model-survey.md). First pass complete; the provisional score is **28/35**.

## Priority 5 — Deep dive: recursive self-improvement (RSI)

- [x] Write an operational definition of recursive self-improvement.
- [x] Separate RSI from ordinary fine-tuning, self-reflection, prompt iteration, tool use, and fixed human-led training loops.
- [x] Define the improvement loop: what proposes, evaluates, accepts, and preserves an improvement?
- [x] Build a taxonomy of what can improve: model weights, code, prompts, data, tools, memory, architecture, training procedure, or evaluation.
- [x] Trace foundational arguments and the strongest available empirical precursors.
- [x] Record claimed capabilities separately from demonstrated results.
- [x] Identify bottlenecks: reliable evaluation, credit assignment, regressions, resource limits, security, and loss of human control.
- [x] Identify the current frontier and propose the smallest falsifiable experiment.
- [x] Decide whether RSI should be its own atlas branch or a frontier node connected to automated AI research and agent learning.

**Deliverable:** [Recursive self-improvement survey and claim/evidence matrix](research/recursive-self-improvement.md). First pass complete; the provisional score is **27/35**.

## Priority 6 — Select exactly one project focus

Score each candidate from 1–5 on:

| Criterion | Question |
| --- | --- |
| Under-exploration | Is important evidence or synthesis genuinely missing? |
| Frontier relevance | Does it connect to an active, consequential open problem? |
| Tractability | Can a useful experiment or atlas branch be completed with available resources? |
| Evidence quality | Are there enough primary sources to make defensible causal claims? |
| Atlas fit | Does it reveal a meaningful historical branch, dead end, or revival? |
| Decisive evaluation | Can success or failure be measured without relying on subjective demos? |
| Distinct contribution | Is there a credible contribution beyond another general survey or benchmark? |

- [x] Publish the completed score matrix and sensitivity analysis for reasonable weight changes.
- [~] Identify one leading candidate rather than carry multiple co-equal options; student confirmation or replacement is pending.
- [x] Define its research question, minimum experiment, dataset or benchmark, success criterion, risks, and four-week milestone.
- [x] Write a decision note explaining why AI for Physics, world models, RSI, and the strongest other frontiers were selected or deferred.

**Deliverable:** [Project-focus decision](research/project-focus-decision.md). Comparison and recommendation are complete; the student's final semester-project choice is pending the 2026-09-25 review.

## Priority 7 — Paper list and relationship graph

- [~] Produce a deduplicated chronological list of accepted papers with DOI, arXiv, and OpenAlex identifiers where available. The selected-lineage seed list is complete; the full 16-branch corpus remains.
- [x] Give every relationship a typed predicate: `MOTIVATES`, `EXTENDS`, `REPLACES`, `REVIVES`, `CONTRADICTS`, `ENABLES`, `APPLIES`, or `EVALUATES`.
- [x] Attach a source and short evidence note to every documented edge in the selected-lineage import.
- [x] Keep documented, inferred, counterfactual, and speculative edges visually and semantically distinct in the relationship list.
- [x] Include negative and null evidence in the survey notes and relationship-list semantics.
- [x] Export an import-ready table matching the atlas node and edge schema for the selected lineage.

**Deliverable:** `research/paper-relationship-list.md` plus CSV/JSON imports.

## Suggested execution order

1. **Measure history:** validate the 16-branch statistical census and expand it where the taxonomy has obvious gaps.
2. **Explain history:** code causal reasons for decline and trace mechanism inheritance using primary sources.
3. **Census the frontier:** map the broad present landscape before privileging the three deep-dive interests.
4. **Deep dive:** build comparable evidence matrices for AI for Physics, world models, and RSI.
5. **Decide:** use one rubric to choose exactly one project focus and smallest decisive experiment.
6. **Relate:** create the chronological paper list and typed, evidence-backed relationship graph.
7. **Integrate:** add only well-supported nodes and relationships to the atlas.

## Common research-note template

Use this structure for every field, organization, or research lineage:

```text
Topic:
Definition and boundaries:
Originating problem:
Why it emerged:
Seminal work:
Core mechanism or claim:
Evidence for:
Evidence against:
Why it stalled or died out:
What replaced it:
What survived under another name:
What has changed since then:
Current frontier:
Smallest decisive experiment:
Candidate atlas nodes and edges:
Primary sources:
Confidence / unresolved questions:
```

## Engineering backlog after this research sprint

- [ ] Add OpenCitations one-hop references and citations.
- [ ] Render citation evidence separately from human-confirmed causal edges.
- [ ] Add “promote to causal edge” with a required explanation.
- [ ] Add request caching, cancellation, retry/backoff, and rate-limit indicators.
- [ ] Add saved research collections and monitoring.
- [ ] Connect Supabase authentication and synchronized storage.
- [ ] Implement deterministic branch-candidate scoring and temporal replay.
- [ ] Add automated interaction, accessibility, and persistence tests.

## Research activity log

### 2026-09-22

- Replaced the 3–5-field shortlist with an extensible, quantitative branch-history program.
- Defined a normalized five-year survival and recent-trend method, with explicit limits on what publication counts can prove.
- Implemented `scripts/analyze-branch-trajectories.mjs` and generated four reproducible OpenAlex data artifacts under `research/data/`.
- Recorded preliminary signals for contraction, survival, and revival without treating them as causal conclusions.
- Expanded the current-research task from three interests to a broad frontier census, while retaining deep dives on AI for Physics, world models, and RSI.
- Changed the decision requirement from “one or two directions” to exactly one primary project focus.
- Specified the final paper-list schema and typed relationship vocabulary for atlas integration.
- Corrected the bibliometric queries from broad title matching to exact phrases with plural and orthographic aliases; regenerated every artifact and added a sensitivity table.
- Completed the first causal analysis of all 16 historical branches and controls, including documented versus inferred inheritance edges.
- Completed a 12-area present-frontier census and retained four non-preferred comparison fields to reduce selection bias.
- Completed the AI for Physics deep-dive draft with a 29-paper chronology and a provisional project score of `32/35`.

**Next active work:** complete the world-model and RSI deep dives, compare all candidates against AI for Physics, select one focus, and export the paper/relationship graph.

## Weekly review

At the end of the week:

- [ ] Mark completed items and move unfinished items forward explicitly.
- [ ] Record the number of papers screened, read, and accepted for each topic.
- [ ] Record the selected research direction and the evidence behind the choice.
- [ ] List assumptions that remain unverified.
- [ ] Choose the next week's single primary outcome.
