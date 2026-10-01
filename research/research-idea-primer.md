# The research idea, from zero

Read this first. It explains the project so you can say it in your own words and defend it. Each section ends with a self-check question; answers are at the bottom.

## 1. The question in one sentence

> When a learned model of a physical system has to predict a condition it never saw in training, does adding a short **formula** (symbolic correction) help it more than adding an equally small **neural network** correction?

Everything else is setup that makes that comparison fair.

*Self-check 1:* Why do we need the "equally small neural network" at all?

## 2. The physics: the Burgers equation

`u_t + u·u_x = ν·u_xx`

- `u(x, t)` is the velocity of a 1D fluid along a ring, so the right edge wraps to the left edge.
- `u·u_x` (**advection**): fast parts catch up with slow parts, so a smooth wave **steepens into a near-vertical front (a shock)**.
- `ν·u_xx` (**viscosity**): smooths sharp features. Large ν gives a soft, rounded front; small ν gives a sharp, steep one.

Look at [`experiments/burgers-pilot/viscosity-shift.svg`](../experiments/burgers-pilot/viscosity-shift.svg) (open it in a browser). Every curve starts from the same grey wave. By t = 2 all of them have formed a shock near the middle. The extrapolation curves differ most: **ν = 0.08 is visibly rounder** and ν = 0.005 is the sharpest.

It's the standard test bed because it is the simplest equation with both nonlinearity (shocks) and dissipation, one clear knob (ν), and an exact numerical reference to check against.

*Self-check 2:* If you double ν, does the shock get sharper or smoother? Why?

## 3. The shift: interpolation vs extrapolation

| Split | Viscosities | What it tests |
| --- | --- | --- |
| Train | 0.01, 0.02, 0.04 | What the model learns from |
| Interpolation test | 0.015, 0.03 | Unseen, but **between** training values. Usually easy. |
| Extrapolation test | 0.005, 0.08 | Unseen and **outside** the training range. The real question. |

Neural networks usually interpolate well and extrapolate badly. A formula can extrapolate if it captures *how* the answer depends on ν (e.g., "the error scales like ν·u_xx"). That gap is the whole bet.

Also why the end time is t = 2: before the shock forms, viscosity barely changes the solution (1–3%). A model could ignore ν and still look good. After the shock, the difference is 5–18%.

*Self-check 3:* Why is a test at ν = 0.03 not enough to claim the model generalizes?

## 4. The four models

All four share the same backbone, data, and training budget. Only the added piece changes.

| # | Model | What it adds | Role |
| --- | --- | --- | --- |
| 1 | **FNO** (Fourier Neural Operator) | Nothing. Learns the map *initial wave → wave at time t* purely from data. It works in frequency space, so it handles smooth waves well and doesn't care about grid resolution. | Data-only baseline |
| 2 | **FNO + PDE loss** (PINO-style) | During training, also penalize how badly the prediction violates the Burgers equation. | Physics-constrained baseline (already studied; this is the replication) |
| 3 | **FNO + symbolic correction** | After training, look at model 1's errors on the *training* data and fit a short formula to them using sparse regression (e.g., SINDy or PySR). Add the formula to the prediction. | **The new idea** |
| 4 | **FNO + learned correction** | Same as 3, but the correction is a small neural net with a similar number of parameters. | **The control** |

**Reading the result:**
- 3 beats 4 on extrapolation → **the formula's structure matters**, not just extra capacity. The interesting result.
- 3 ≈ 4 → any gain is just "an extra correction module." Still useful: it says symbolic structure isn't buying anything here.
- Neither beats 1 → corrections fitted on training errors don't transfer. Also useful, as a negative result.
- 3 helps interpolation but not extrapolation → the formula overfit. Report it.

Open design choice to ask the mentor about: what the formula is allowed to contain, e.g., terms like `ν·u_xx`, `u·u_x`, `u²`, with ν as an input. Giving it the exact Burgers terms makes it too easy, and you can't then claim "discovery."

*Self-check 4:* Why must the symbolic correction be fitted only on training data?

## 5. What gets measured

- **Prediction error** (relative L2 / RMSE) on train, interpolation, and extrapolation, reported separately.
- **Physics consistency:** does total "mass" stay constant, and does energy only decrease (as viscosity requires)? The reference solver already passes both with zero violations.
- **Cost:** training and inference compute, so a gain isn't just "spent more."
- **Worst seed**, not only the average, over at least 3 random seeds.

*Self-check 5:* Why report the worst seed?

## 6. What's new, honestly

- Models 1 vs 2 under a viscosity shift were already compared in a 2026 TU Delft thesis (PDEBench Burgers). So **1 and 2 are a replication**: they make sure your setup is right.
- Fitting formulas to residuals and combining operators with sparse regression also exist (e.g., a 2026 "Late Fusion Operator" workshop paper).
- **What's new is the controlled comparison:** symbolic vs equal-size learned correction, on a pre-declared extrapolation split, with physics checks and cost. Most papers skip the control (model 4), so they can't tell structure from capacity.
- Realistic target: a short workshop paper (AI for Science / AI & PDE), not a main conference.

*Self-check 6:* What's the one-line answer to "hasn't this been done?"

## 7. How it connects to world models and RSI

- **World models:** this is a tiny world model. It predicts how a physical state evolves, tested exactly where world models fail: conditions outside training. Unlike video world models (Genie, Cosmos, World Labs Atlas), here the right answer is known exactly.
- **RSI (Phase B, later):** freeze the extrapolation tests as a *hidden* test suite. Let a coding agent try to improve the model using only visible tests. Do its improvements survive the hidden physics tests, or does it overfit what it can see? That is the evaluator problem from the RSI survey, measured with real ground truth.
- **The phylogeny:** symbolic regression comes from genetic programming (1990s), and its citations are now led by physics (33%). Your project is a modern descendant of a branch the website shows reviving.

*Self-check 7:* In one sentence, why is physics a better testbed for the evaluation problem than video?

## 8. Status and next step

- Done: reference solver, frozen splits (train / interpolation / extrapolation), physics checks; all 21 trajectories pass.
- Next: train model 1 (FNO) with 3 seeds and see whether it actually struggles on extrapolation. **If FNO extrapolates fine, the shift is too easy and needs to be widened before anything else.** That is the first go/no-go.
- Needs: GPU access (ask the mentor) and PyTorch plus the `neuraloperator` library.

---

## Answers

1. Without it, if the symbolic version wins, you can't tell whether the *formula* helped or just *any extra module* helped.
2. Smoother. ν multiplies the diffusion term, which spreads out sharp gradients.
3. 0.03 is between training values (interpolation); extrapolation needs a value outside 0.01–0.04.
4. Fitting on test data leaks the answer, so the extrapolation test would no longer be a test.
5. A method that is great on average but sometimes breaks is not reliable, and averages hide that.
6. "The two-model comparison has been done, and I replicate it. The new part is symbolic vs equally sized learned correction under extrapolation, which separates structure from capacity."
7. In physics the true answer and conservation laws are known exactly, so you can measure whether a model is right, not just whether it looks right.
