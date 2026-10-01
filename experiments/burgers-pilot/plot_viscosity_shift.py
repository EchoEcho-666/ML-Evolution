#!/usr/bin/env python3
"""Draw the Burgers solution at the final time for each viscosity split as a dependency-free SVG."""

from __future__ import annotations

from pathlib import Path

from burgers_pilot import EXTRAPOLATION_VISCOSITIES, TEST_VISCOSITIES, TRAIN_VISCOSITIES, initial_condition, simulate

GRID = 96
FINAL_TIME = 2.0
WIDTH, HEIGHT, PAD = 760, 420, 56

series = [("initial condition (t = 0)", initial_condition(GRID, 0.0), "#9aa5a0", "4 4")]
for group, values, color in (
    ("train", TRAIN_VISCOSITIES, "#3f7d63"),
    ("interpolation test", TEST_VISCOSITIES, "#c0912f"),
    ("extrapolation test", EXTRAPOLATION_VISCOSITIES, "#b5523b"),
):
    for viscosity in values:
        final_state = simulate(viscosity, 0.0, GRID, FINAL_TIME, 1)[-1]
        series.append((f"ν = {viscosity} ({group})", final_state, color, "" if group == "train" else "7 3"))

y_min, y_max = -1.6, 1.6
x_of = lambda index: PAD + (WIDTH - 2 * PAD) * index / (GRID - 1)
y_of = lambda value: PAD + (HEIGHT - 2 * PAD) * (y_max - value) / (y_max - y_min)

parts = [
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {WIDTH} {HEIGHT + 150}" font-family="Helvetica, Arial, sans-serif">',
    f'<rect width="{WIDTH}" height="{HEIGHT + 150}" fill="#ffffff"/>',
    f'<text x="{PAD}" y="30" font-size="16" fill="#1d2b25">1D viscous Burgers at t = {FINAL_TIME}: same start, different viscosity ν</text>',
    f'<line x1="{PAD}" y1="{y_of(0)}" x2="{WIDTH - PAD}" y2="{y_of(0)}" stroke="#d5dbd8"/>',
    f'<line x1="{PAD}" y1="{PAD}" x2="{PAD}" y2="{HEIGHT - PAD}" stroke="#d5dbd8"/>',
    f'<text x="{WIDTH / 2}" y="{HEIGHT - 20}" font-size="12" fill="#55625c" text-anchor="middle">position x on a periodic domain [0, 2π)</text>',
    f'<text x="18" y="{HEIGHT / 2}" font-size="12" fill="#55625c" transform="rotate(-90 18 {HEIGHT / 2})" text-anchor="middle">velocity u</text>',
]
for label, values, color, dash in series:
    points = " ".join(f"{x_of(i):.1f},{y_of(v):.1f}" for i, v in enumerate(values))
    parts.append(f'<polyline points="{points}" fill="none" stroke="{color}" stroke-width="1.8" stroke-dasharray="{dash}" opacity="0.9"/>')
for row, (label, _, color, dash) in enumerate(series):
    y = HEIGHT + 10 + 18 * row
    parts.append(f'<line x1="{PAD}" y1="{y}" x2="{PAD + 30}" y2="{y}" stroke="{color}" stroke-width="2" stroke-dasharray="{dash}"/>')
    parts.append(f'<text x="{PAD + 40}" y="{y + 4}" font-size="12" fill="#2b3833">{label}</text>')
parts.append("</svg>")

output = Path(__file__).with_name("viscosity-shift.svg")
output.write_text("\n".join(parts) + "\n", encoding="utf-8")
print(f"wrote {output}")
print("max |u| at t=2 by viscosity:", {nu: round(max(abs(v) for v in s), 3) for nu, s in ((lbl, vals) for lbl, vals, _, _ in series[1:])})
