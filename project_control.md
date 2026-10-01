# ML Civilization — Project Plan

**Last updated:** 2026-10-01
**Current phase:** Mentor review of the research idea (2026-10-02), then the first trainable baseline
**This week:** 2026-09-28 to 2026-10-04

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
| Interactive atlas | Expanded | The 16 measured branches remain in strict year order without node collisions. Timeline view now uses shared, evenly spaced year columns. Idea-flow edges distinguish survival, merger, migration, and extinction/stagnation by label, color, and interactive legend filters. | Use **Restore nodes** if saved drag positions obscure the curated layout; verify further inheritance before adding more idea-flow labels. |
| Seed research content | Complete first integration | Every measured branch now opens a scholarly source. WaveNet, S4, Mamba, and Mamba-2 extend the sequence lineage through 2024 while distinguishing SSM recurrence from its convolutional compute form. | Add only recent nodes that establish a consequential mechanism or branch connection. |
| Local research workflow | Complete | Exploration state, imported papers, relationships, and notes persist locally. | Define a consistent evidence-note format. |
| Literature discovery | Partial | OpenAlex search, Crossref fallback, paper import, deduplication, provenance, and source links are implemented. | Add citation-neighborhood expansion and evidence-layer edges. |
| Shared backend | Planned | A Supabase schema exists, but the app is still local-first and is not connected to it. | Add authentication, sync, and a server-side provider proxy later. |
| Branch Realizer | Planned | The design and evaluation plan exist; no candidate-ranking model has been implemented. | Start with deterministic ranking after more confirmed edges exist. |
| Quality checks | Partial | On 2026-09-24, TypeScript compiled, 54 graph nodes and 66 edge endpoints passed integrity checks, all 16 measured branches had source links, and browser QA confirmed the new nodes, source button, legend, and idea-flow labels render. GitHub Actions run `36018395612` passed the prior lint and production build; verification for this checkpoint is pending push. | Confirm the new GitHub Actions run passes. |
| Cloud development and delivery | Pushed to GitHub | Codespaces and GitHub Actions verify the `main` branch. Pages deployment runs only when the repository variable `ENABLE_PAGES` is `true`; the local Vite site remains the meeting demo. | To publish later, enable Pages with GitHub Actions as its source and set `ENABLE_PAGES=true`. |
| Historical branch analysis | Integrated first pass | The 16-branch census has passed broad-vs-exact query sensitivity analysis; its quantitative diagnoses and interpretation warnings are now visible in the website. | Add citation-flow evidence, expand the branch set, and verify inferred inheritance edges. |
| Frontier census | Complete first pass | Twelve present frontiers are mapped with common bottlenecks, historical ancestors, evidence anchors, and minimum experiments. | Keep four non-preferred comparators in the final decision matrix. |
| AI for Physics deep dive | Complete first pass | Scope, taxonomy, 29-paper chronology, evidence limits, causal edges, open questions, and a decisive experiment are drafted. A 2025 physics-informed-ML survey is linked, with an April seminar comparison and gravitational-wave review. | Check whether detector-noise shift, PDE parameter shift, or another domain best fits student interest and compute. |
| World-model deep dive | Complete first pass | Definition, six-part taxonomy, 17-item chronology, lineage comparisons, bottlenecks, and a 28/35 experiment score are drafted. A revised June 2026 embodied-world-model survey is linked. | Compare the survey's physical-consistency metrics with our proposed intervention evaluation. |
| Recursive self-improvement deep dive | Complete first pass | Definition, exclusions, five-field improvement loop, claim/evidence matrix, bottlenecks, experiment, and 27/35 score are drafted. A revised September 2026 RSI survey is linked. | Keep evaluator strength and loop closure explicit when comparing systems. |
| Research direction | Provisional selection | AI for Physics scored 32/35 for the full hybrid proposal. A 2026 thesis already ran the two-model FNO/PINO Burgers viscosity-shift comparison, so that experiment is a replication pilot; the symbolic correction or another distinct question must carry the semester contribution. | Confirm student interest, course originality requirements, compute, and a small reproducible benchmark before the final choice. |
| Meeting preparation | Ready | One prep document holds today's timeline to the 3 pm meeting, a from-zero explanation of the research idea, the 90-second pitch, the talk track (phylogeny, world models, RSI), and the mentor questions. | Use [meeting-prep.md](research/meeting-prep.md); record the mentor's answers afterwards. |

Detailed engineering plans:

- [Open literature and paper-linking plan](docs/open-literature-plan.md)
- [Branch Realizer plan](docs/branch-realizer-plan.md)

## Revised research outcome

By the end of the week, produce:

- [~] a **statistical history of past ML branches**, not a shortlist of only 3–5 fields;
- [x] an evidence-backed explanation of which branches contracted, why they contracted, and whether their mechanisms survived under other names; *label, citation-flow, and successor-keyword evidence in [`branch-mortality-analysis.md`](research/branch-mortality-analysis.md).*
- [x] a map of useful and inspirational concepts inherited by current research; *section 5 of the branch analysis and the survival/merger/migration edges in the atlas.*
- [~] a broad census of the present AI frontier, with deeper research matrices for **AI for Physics**, **world models**, and **recursive self-improvement**;
- [ ] a transparent comparison followed by **one primary project focus**;
- [~] a chronological paper list and typed relationship list ready to add to the atlas; *selected-lineage seed list done, full 16-branch corpus remains.* and
- [x] a compact relationship map connecting historical branches, current frontiers, and the selected project. *The atlas links genetic programming, symbolic regression, neural operators, reservoirs, and AlphaEvolve to AI for Physics, bounded RSI, and the hybrid project node.*

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
- [x] Add citation-flow, co-citation, and successor-keyword evidence; publication volume alone cannot establish conceptual inheritance. *Done for 13 branches and 10 featured edges (2026-10-01); multi-anchor lineages are listed under remaining work in the analysis.*
- [~] Hand-code causal evidence from primary and contemporaneous sources. *First check: Muggleton (1991) Fig. 1 documents the expert systems → ILP migration. Remaining featured edges are next.*

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
- [~] Validate every causal claim with at least one primary or contemporaneous source and add explicit confidence fields to the import data. *All 66 atlas edges now carry a documented/inferred/proposed judgment, and 10 featured edges carry a separate citation check; source-by-source validation remains.*
- [x] Test revival hypotheses with citation-flow and successor-keyword evidence. *See section 8 of the branch analysis.*

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

The April AI-for-science seminar list supplied by the student spans biological systems, verifiable scientific reasoning/SciencePedia, gravitational-wave detection and AResGW, TESS astronomy, GNNome genome assembly, materials discovery, and DeepH electronic structure. The [AI-for-Physics survey](research/ai-for-physics-survey.md) maps these examples by task. Gravitational waves warrant attention because weak signals meet changing detector noise and physical waveform models; [the 2025 detector-ML review](https://doi.org/10.1007/s41114-024-00055-8) and [AresGW robustness study](https://arxiv.org/abs/2509.05283) make this a credible comparison domain. A gravitational-wave project is an option to evaluate, not the selected focus.

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
- [x] **Atlas** — resolved as World Labs' Atlas (2026-09-01) and added to the survey's lineage section and chronology; revise if the mentor meant another referent.

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
- [x] Render citation evidence separately from human-confirmed causal edges. *Edge hover labels and the node panel's “Connections and evidence” section show judgment and citation check as separate badges (2026-10-01).*
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

### 2026-09-24

- Integrated all 16 branch diagnoses into the visible graph and arranged their historical nodes in year order; chronology remains available even when the main causal layout is customized.
- Added sourced successor paths for expert systems to inductive rule learning, Hopfield memory to its modern form, reservoir computing to physical hardware, and evolutionary program search to AlphaEvolve. Kept the census spokes quiet so the successor paths remain legible.
- Added a source link to every measured branch and extended the sequence lineage with WaveNet, S4, Mamba, and Mamba-2. The graph records SSMs as recurrent/control-theoretic models that can use a convolutional training form, rather than treating them as descendants of CNNs alone.
- Added survival, merger, and migration as visible idea-flow classes while preserving the existing causal predicates. Corrected the timeline to use one collision-free column per represented year and stack same-year nodes.
- Linked a relevant survey in each of the AI-for-Physics, world-model, and RSI deep dives, and placed the April seminar topics and gravitational-wave alternatives in the physics survey.
- Kept GitHub verification independent of Pages activation after confirming that lint and build passed but `configure-pages` failed on an unconfigured repository.
- Confirmed the next GitHub Actions run passed lint and the production build; Pages deployment was intentionally skipped until enabled.

### 2026-09-25

- Completed a paper-feasibility comparison for the hybrid equation-aware model and bounded RSI for automated physics research. The recommended sequence is to publish the controlled physics benchmark first, then reuse its frozen hidden tests for the RSI evaluator study.
- Defined the minimum honest claim, controls, negative-result path, and publication ladder for both ideas. The realistic first target is a short or non-archival reviewed workshop paper; neither broad idea is automatically a main-track contribution.
- Added a separate 2028 U.S. AI PhD decision note. The linked RSI paper is treated as a roadmap rather than a displacement forecast; the recommendation is to preserve the application option, enroll only with full funding and strong advisor fit, and specialize in physical grounding, evaluator design, and verification.
- Completed the idea-flow color treatment: survival, merger, and migration now keep their category color across lines, labels, arrowheads, and hover state.
- Verified the complete source in a clean local copy: `npm run build` and `npm run lint` both pass. A headless-browser render confirmed the atlas and colored legend load correctly.
- Added extinction/stagnation as the fourth idea-flow class and made all four legend keys interactive visibility filters. Marked the fixed-vector encoder–decoder bottleneck and expert-system knowledge-acquisition bottleneck as the first evidence-backed stagnation paths.
- Added a dependency-free 1D viscous Burgers reference pilot with a frozen out-of-viscosity split, conservative mass and dissipative-energy checks, and persistence baselines. The default run passes all checks across 15 trajectories.
- Re-ran `npm run build` and `npm run lint` in the clean verification copy and visually checked the four-color legend in the rendered atlas.

### 2026-10-01

- Added a true extrapolation split (ν = 0.005, 0.08) to the Burgers pilot. The earlier held-out viscosities lay inside the training range and tested only interpolation.
- Moved the pilot horizon from t = 0.4 to t = 2.0. At t = 0.4, viscosity changed the solution by only 1–3% of RMS, too little for a meaningful shift. At t = 2.0 it is 5–18%. All 21 reference trajectories pass the mass and energy checks.
- Added `scripts/analyze-citation-flow.mjs`. For 13 branches it compares citations to a founding paper with title-label visibility. Genetic programming (+0.47), self-organizing maps (+0.25), and ILP (+0.15) show ideas outliving their labels. Expert systems collapsed in both. Symbolic regression's citers are now mostly physics. Five of ten featured atlas edges have direct citation support. Mamba-2 is not in OpenAlex, and AlphaEvolve's references are not indexed. Results are in section 8 of `research/branch-mortality-analysis.md`.
- Identified the "Atlas" in the mentor's world-model list as World Labs' Atlas (announced 2026-09-01). Added it to the brief and to the world-model survey's chronology and lineage section, with its evidence gaps.
- Added successor-keyword evidence: keywords whose share among citing papers grew at least 3×. Examples: neuroevolution → neural architecture search; symbolic regression → SINDy and PDEs; reservoir computing → physical reservoir computing; ILP → explainable AI and program synthesis.
- Found primary-source support for expert systems → ILP. Muggleton (1991) cites MYCIN, and his Fig. 1 compares 100–180 person-years for hand-coded MYCIN and XCON with 1–9 for inductively built GASOIL and BMT. OpenAlex had missed the citation.
- Added `confidence` (documented / inferred / proposed) to all 66 atlas edges and a separate `citation` check to 10 featured edges. The site shows both as separate badges on edge hover and in a new “Connections and evidence” panel section. Build, lint, and a headless-browser render pass.
- Wrote the mentor-meeting brief (now merged into `research/meeting-prep.md`): a talk track on world models, RSI, and the physics research idea, plus questions for the mentor. Re-verified `npm run build` and `npm run lint`.

- Merged the brief, a from-zero research-idea primer, a timed prep checklist, and the older study guide into `research/meeting-prep.md`. Added `plot_viscosity_shift.py`, which draws the Burgers solution for each viscosity split.
- Fixed atlas dragging: nodes did not follow the cursor because React Flow node changes were never applied. Also rendered only on-screen elements, removed the constant edge animation and the blur on panels over the map. A headless measurement went from a frozen drag and a 117 ms pan hitch to a steady 60 fps, and positions persist across reloads.
- Mapped every remaining branch on the atlas: 13 successor and bottleneck nodes and 16 colored idea-flow edges, so all 16 measured branches now show where their ideas went. Edges backed by primary sources or citation keywords are marked documented; interpretive ones are marked inferred.
- Expanded the literature check. Formula-beats-network evidence exists for ODEs (universal differential equations), graph networks (Cranmer 2020), and climate closures, but the closest neural-operator paper (Late Fusion, 2026) lacks a matched learned-correction control. Wrote `research/research-overview.md` with all findings and every cited paper.

**Next active work:** record the mentor's feedback in `project-focus-decision.md`; then add a small matched trainable baseline only after choosing an acceptable dependency and compute budget; then audit the supplied architecture report's strongest claims against primary sources. The full historical citation-flow audit and more recent branch coverage remain open.

## Weekly review

At the end of the week:

- [ ] Mark completed items and move unfinished items forward explicitly.
- [ ] Record the number of papers screened, read, and accepted for each topic.
- [ ] Record the selected research direction and the evidence behind the choice.
- [ ] List assumptions that remain unverified.
- [ ] Choose the next week's single primary outcome.

### Review: week of 2026-09-28

- **Completed and carried forward:** see the 2026-10-01 log. Still open: the project decision (pending the mentor meeting), multi-anchor citation lineages, primary-source checks for the remaining featured edges, the full 16-branch paper corpus, and the trainable baseline.
- **Papers accepted into the written matrices:** AI for Physics 29; world models 18 (including World Labs Atlas); RSI 4 systems plus one category row. The frontier census covers 12 areas. The branch analysis covers 16 title-label branches and 13 citation anchors, and one founding paper (Muggleton 1991) was read in full for edge validation. *Screened and personally read counts: student to fill in.*
- **Selected direction:** provisional. The hybrid equation-aware world model for AI for Physics (32/35) is pending mentor feedback on 2026-10-02.
- **Unverified assumptions:**
  - A data-only FNO will actually fail to extrapolate in viscosity at t = 2.0, i.e., the shift is hard enough to separate the methods.
  - A symbolic correction can be fit stably from training residuals alone.
  - GPU access is available for 3 seeds × 4 models.
  - One anchor paper per branch represents its lineage; Boltzmann machines and neuroevolution suggest it does not.
  - OpenAlex keywords reflect real topical change rather than tagging drift.
- **Next week's single primary outcome:** a reproducible data-only neural-operator baseline on the frozen Burgers splits (train, interpolation, extrapolation), run with 3 seeds and reporting the pilot's metrics. Revise after the mentor meeting if scope or compute changes.
