# Should I start a U.S. AI PhD in 2028?

**Updated:** 2026-09-25  
**Decision horizon:** applications in late 2027; enrollment decision in spring 2028  
**Conclusion:** **a PhD is not necessary for every AI career, but it remains a rational option for original research—especially AI for physics—if it is fully funded, advisor-specific, and treated as AI-augmented training rather than credential insurance. Apply if research itself is the goal; do not enroll merely because a PhD once seemed like the safe route.**

## What the RSI paper does and does not imply

[The Last AI Built by Humans: Toward Genuine Recursive Self-Improvement](https://arxiv.org/abs/2609.11873) is a taxonomy and roadmap, not a forecast of when human researchers become unnecessary. It gives no 2028 or 2034 displacement date and no probability that full RSI will arrive.

Its own evidence argues against treating full scientific automation as accomplished:

- it rates science as **strong at L2 and early at L3**, not at general recursive meta-improvement;
- it says current evidence is strongest for bounded component-level improvement, while adaptation of the improvement mechanism remains rare;
- scientific-agent evaluators, update rules, and promotion criteria remain largely fixed;
- open-ended hypothesis spaces, expensive experiments, ambiguous failure attribution, and irreversible physical consequences make scientific feedback harder than software tests;
- it keeps human missions, safety boundaries, protected evaluation, final acceptance, consequential release authority, and access permissions outside the autonomous loop; and
- it calls long-horizon, transferable gains an unresolved empirical question.

Therefore, the paper supports a different conclusion: AI will automate more of the execution of research, but choosing worthwhile questions, designing evaluators, grounding claims in the physical world, attributing failures, and accepting consequential results remain bottlenecks. Those are exactly the parts of a good PhD that should receive more emphasis.

## Is the PhD necessary?

| Intended path | How necessary is a PhD? | Reason |
| --- | --- | --- |
| Tenure-track professor or academic lab leader | **Usually necessary** | The doctorate is the standard research credential and apprenticeship for independent scholarship. |
| Frontier research scientist or specialized AI-for-science researcher | **Often very useful; sometimes expected** | Deep domain knowledge, publications, mentors, and access to research infrastructure matter. Exceptional non-PhD routes exist but are not the default. |
| ML engineer, research engineer, product builder, or startup engineer | **Not necessary** | Demonstrated systems ability and shipped work can dominate the credential; a PhD has a large time opportunity cost. |
| Founder or independent researcher | **Optional** | A doctorate can supply a network and research discipline, but customers, collaborators, capital, and strong artifacts can provide an alternative path. |
| “I want protection from AI displacement” | **Not a sufficient reason** | No degree guarantees task security. A static credential is a weak hedge against rapidly changing tools. |

U.S. labor data do not currently show research disappearing. The Bureau of Labor Statistics projects employment for computer and information research scientists to grow about 20% from 2024 to 2034, although projections are not guarantees and may miss discontinuous AI effects. The occupation typically requires at least a master's degree rather than universally requiring a doctorate: [BLS Occupational Outlook Handbook](https://www.bls.gov/ooh/computer-and-information-technology/computer-and-information-research-scientists.htm).

The opportunity cost is material. Recent NSF data put the median time from doctoral-program start in computer science at roughly 5.8 years (2022 cohort data). Among 2024 U.S. doctorate recipients with definite commitments, expected median salaries in computer and information sciences were about $180,000 in industry, $100,000 in academia, and $70,000 for postdocs. These numbers describe selected new doctorate recipients, not the return caused by earning the degree, but they show why “do a PhD for money” is not a simple argument: [NSF time-to-degree table](https://ncses.nsf.gov/pubs/nsf24300/assets/nsf24300-data-tables-and-resources.pdf), [NSF 2024 salary analysis](https://ncses.nsf.gov/pubs/nsf26312).

## How AI changes the value of the PhD

AI reduces the value of being the person who only performs routine literature search, boilerplate coding, standard experiments, or first-pass writing. It increases the value of being able to:

- formulate a question whose answer would change scientific belief or action;
- distinguish a plausible story from an identifiable physical mechanism;
- design hidden, adversarial, or out-of-distribution evaluations;
- know when a simulator, measurement, or benchmark is misleading;
- combine ML with physics, applied mathematics, numerical methods, and instrumentation;
- audit AI-generated claims and reproduce them independently; and
- lead human–AI research systems rather than compete with the model on raw output volume.

This is consistent with current evidence. AI systems can already generate and refine hypotheses and automate bounded experimentation, but even system builders describe validation as central. METR's measurements show rapidly improving agent performance on software tasks, while also emphasizing uncertainty and resource accounting; software time horizons should not be read directly as forecasts for open-ended physics research: [METR task-completion time horizons](https://metr.org/time-horizons/), [METR expenditure-horizon study](https://metr.org/blog/2026-07-21-expenditure-horizon/). Google DeepMind's Co-Scientist work presents AI as a partner whose hypotheses still require scientific review and experimental validation: [Co-Scientist](https://deepmind.google/blog/co-scientist-a-multi-agent-ai-partner-to-accelerate-research/).

## A robust 2028 decision

The decision should work across several futures:

| 2028–2034 world | What happens to the PhD? | Robust response |
| --- | --- | --- |
| AI progress remains fast but mostly tool-like | AI-literate researchers become much more productive. | Join a lab that already uses agents, automation, and strong evaluation; avoid a thesis made obsolete by routine scaling. |
| Research agents automate most coding and standard experiments | Execution becomes cheap; question selection, validation, and access to the physical world become more important. | Specialize in AI for physics, causal evaluation, numerical verification, or experimental systems. Build benchmarks that agents cannot grade themselves. |
| Genuine RSI arrives quickly | Forecasting specific job roles becomes unreliable; a six-year fixed plan is risky. | Preserve exit options, review annually, and avoid programs that punish changing direction or leaving with a master's. |
| Progress slows or hits reliability/compute limits | Traditional research expertise remains valuable. | A strong research apprenticeship retains its usual value. |

The robust choice is not “PhD no matter what” or “skip it because AGI may arrive.” It is to buy option value: become competitive enough to apply, then decide with 18 more months of evidence.

## Conditions for a yes

Start the PhD only if most of these are true:

1. The offer is fully funded, without relying on personal debt.
2. At least two plausible advisors support work you would still care about if today's model architecture changes.
3. The lab values falsification, reproducibility, and domain grounding rather than only benchmark volume.
4. You want the daily work of research: reading, debugging, failed experiments, uncertainty, and writing—not only the title or outcome.
5. The program permits collaboration across ML and physics/applied mathematics and gives access to compute, data, or experiments you cannot easily obtain alone.
6. You can leave with useful skills, publications, and preferably a master's if the environment or AI landscape changes.
7. The opportunity is better than your concrete 2028 alternatives, not better than an imagined generic job.

## Conditions for a no or defer

Do not enroll, or defer, if:

- the primary reason is fear that AI will otherwise make you irrelevant;
- the program is unfunded or financially fragile;
- the advisor fit is weak, coercive, or dependent on one narrow project;
- you mainly want to build products and already have a strong engineering or startup route;
- the lab treats AI as prohibited assistance instead of a research instrument to evaluate; or
- by 2028 you have not enjoyed an extended research project enough to justify five or six more years.

## Plan from now to the 2028 decision

### September 2026 to June 2027 — test research fit

- Complete the hybrid AI-for-physics pilot in `ai-physics-publication-feasibility.md`.
- Aim for one clean, reproducible workshop submission or technical report; publication is useful, but learning whether you enjoy the process is more important.
- Work with a professor or research group long enough to experience failed experiments, review, and revision.
- Use AI aggressively but log where it fails: hallucinated citations, invalid equations, leakage, evaluator gaming, and irreproducible code.

### Summer to autumn 2027 — preserve the option

- Shortlist U.S. labs by advisor and research environment, not university ranking alone.
- Prefer programs spanning ML with physics, scientific computing, control, applied math, or experimentation.
- Ask current students about funding, advisor availability, compute access, publication expectations, internship policy, time to degree, and safe exit paths.
- Apply to a focused portfolio of fully funded programs and also pursue strong research-engineering alternatives.

### Spring 2028 — decide using new evidence

Compare each offer with the actual alternative available then. Re-read the newest capability evaluations rather than extrapolating this 2026 paper. Choose the PhD only when the advisor, project freedom, resources, and daily work justify the opportunity cost.

### During the PhD — annual continuation gate

Each year ask:

- Am I learning to define and validate problems that AI cannot reliably grade for itself?
- Is the advisor relationship working?
- Does the lab give me data, instruments, collaborators, or conceptual depth unavailable outside?
- Are my skills and artifacts improving my options even if the thesis topic changes?
- Is continuing better than the real external opportunities I now have?

Leaving a program that no longer passes those tests is not failure; it is an update based on evidence.

## Recommendation

**Plan to apply in late 2027, but do not decide today that you must enroll.** Use the next year to produce one serious AI-for-physics artifact and to test whether you like research under uncertainty. If you do, a fully funded U.S. PhD starting in 2028 remains defensible even under fast AI progress—provided you train for question selection, physical grounding, evaluator design, and verification. If your real preference is building systems quickly, a research-engineering path may be better, and no PhD is required to remain relevant.
