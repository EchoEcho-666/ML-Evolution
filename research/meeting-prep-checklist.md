# Meeting prep — 2026-10-01, until 3:00 pm

Priority: **own the research idea.** The phylogeny, world models, and RSI support it. Tick boxes as you go.

## 12:40–1:20 · Understand the research idea (most important)

- [ ] Read [`research-idea-primer.md`](research-idea-primer.md) sections 1–4 slowly.
- [ ] Open [`experiments/burgers-pilot/viscosity-shift.svg`](../experiments/burgers-pilot/viscosity-shift.svg) in a browser. Find the shock. Find which curve is roundest (ν = 0.08) and say why.
- [ ] Run the pilot yourself: `python3 experiments/burgers-pilot/burgers_pilot.py`. Find the three splits in the output and note that all checks pass.
- [ ] Answer self-checks 1–4 out loud **before** reading the answers.
- [ ] Without looking, write the four models on paper and what each one adds.

## 1:20–1:45 · Defend it

- [ ] Read primer sections 5–8 and answer self-checks 5–7.
- [ ] Practise the 3 hardest questions out loud (answers in the brief, section 7):
  - "Hasn't physics-informed ML been done?"
  - "Why call a PDE surrogate a world model?"
  - "What if nothing works?"
- [ ] Decide your own answer to: *would I still want this project if the formula loses?* Write one sentence.

## 1:45–2:00 · Say it in 90 seconds

- [ ] Say this out loud twice, then in your own words:

  > "I want to know whether learned physics models can be trusted outside the conditions they were trained on. I use the Burgers equation, where viscosity is the knob: I train on some viscosities and test on values outside that range. I compare four models: a data-only neural operator, the same with a physics loss (a replication of a 2026 thesis), the same with a short fitted formula as a correction, and the same with an equally small neural-net correction as the control. If the formula beats the equal-size net on extrapolation, structure matters, not just capacity. The reference solver and frozen splits are done; next is training the baseline, for which I need GPU access."

- [ ] Time it. Under 90 seconds.

## 2:00–2:25 · Phylogeny, world models, RSI

- [ ] Run `npm run dev`, open the printed URL, click **Go to map**.
- [ ] Walk the demo path in [`mentor-meeting-2026-10-02.md`](mentor-meeting-2026-10-02.md) section 0 once: legend colors, Timeline, Expert Systems → What followed, Genetic Programming, Hybrid Equation-Aware World Model.
- [ ] Open **Hopfield Networks** → *Connections and evidence* to show the judgment and citation badges.
- [ ] Remember the Muggleton 1991 numbers: hand-coded MYCIN/XCON took **100–180** person-years, learned GASOIL/BMT took **1–9**.
- [ ] Skim brief sections 1–2: one line each for Ha, LeCun, DeepMind, NVIDIA, World Labs Atlas; RSI's five fields and STOP → Gödel Agent → AlphaEvolve → DGM.

## 2:25–2:45 · Questions for the mentor

- [ ] Pick your top 3 from brief section 6. Recommended: **compute/GPU**, **scope (4 models too many?)**, **physics vs world models vs RSI**.
- [ ] Write them on paper or a note on your phone.

## 2:45–3:00 · Buffer

- [ ] Keep the website and the shift plot open in tabs.
- [ ] Glass of water. Stop studying at 2:55.

## After the meeting

- [ ] Write the mentor's answers into `project-focus-decision.md`, and change the status from provisional to confirmed or revised.
