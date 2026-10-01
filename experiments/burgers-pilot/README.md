# Burgers pilot

This is the first execution gate for the hybrid AI-for-physics project. It freezes a small out-of-viscosity split and verifies the numerical reference before any neural or symbolic method is added.

The script solves periodic 1D viscous Burgers,

`u_t + u u_x = nu u_xx`,

with a conservative Rusanov flux, centered diffusion, and SSP-RK3 time integration. It uses only the Python standard library.

## Run

```bash
python3 experiments/burgers-pilot/burgers_pilot.py
```

To retain the machine-readable report:

```bash
python3 experiments/burgers-pilot/burgers_pilot.py \
  --output experiments/burgers-pilot/results/reference-baseline.json
```

The output includes:

- frozen training viscosities `0.01, 0.02, 0.04`;
- held-out interpolation viscosities `0.015, 0.03` (inside the training range);
- held-out extrapolation viscosities `0.005, 0.08` (outside the training range — this is the real transfer test);
- mass-conservation and viscous-energy checks; and
- one-step and final-rollout RMSE for the persistence baseline.

The default horizon is `t = 2.0`, after the shock forms. At the earlier default `t = 0.4`, changing viscosity from 0.02 to 0.005 or 0.08 moved the solution by only 1–3% of its RMS, so a model could ignore viscosity and still look good on the "shift." At `t = 2.0` the same change is 5–18%.

To see the shift, run `python3 experiments/burgers-pilot/plot_viscosity_shift.py` and open `viscosity-shift.svg` in a browser.

The persistence score is deliberately weak. Its job is to catch broken data or evaluation pipelines before introducing a trainable model.

## Next gate

Only after this passes should the project add three matched trainable conditions: data-only operator, physics-residual operator, and symbolic correction, plus a non-symbolic residual control. Keep the split, metrics, and compute budget identical. The full rationale and publication criteria are in [`../../research/ai-physics-publication-feasibility.md`](../../research/ai-physics-publication-feasibility.md).
