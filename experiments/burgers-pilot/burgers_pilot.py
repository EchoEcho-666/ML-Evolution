#!/usr/bin/env python3
"""Dependency-free reference and baseline for a 1D viscous Burgers pilot."""

from __future__ import annotations

import argparse
import json
import math
from pathlib import Path


TRAIN_VISCOSITIES = (0.01, 0.02, 0.04)
TEST_VISCOSITIES = (0.015, 0.03)
EXTRAPOLATION_VISCOSITIES = (0.005, 0.08)
PHASES = (0.0, 0.7, 1.4)


def initial_condition(grid_size: int, phase: float) -> list[float]:
    return [
        math.sin(2.0 * math.pi * index / grid_size + phase)
        + 0.35 * math.sin(4.0 * math.pi * index / grid_size - 0.5 * phase)
        for index in range(grid_size)
    ]


def rhs(state: list[float], viscosity: float, dx: float) -> list[float]:
    size = len(state)
    derivative = [0.0] * size
    for index, value in enumerate(state):
        left = state[index - 1]
        right = state[(index + 1) % size]
        flux_right = 0.25 * (value * value + right * right) - 0.5 * max(abs(value), abs(right)) * (right - value)
        flux_left = 0.25 * (left * left + value * value) - 0.5 * max(abs(left), abs(value)) * (value - left)
        advection = -(flux_right - flux_left) / dx
        diffusion = viscosity * (right - 2.0 * value + left) / (dx * dx)
        derivative[index] = advection + diffusion
    return derivative


def rk3_step(state: list[float], viscosity: float, dx: float, dt: float) -> list[float]:
    first_rhs = rhs(state, viscosity, dx)
    first = [value + dt * change for value, change in zip(state, first_rhs)]
    second_rhs = rhs(first, viscosity, dx)
    second = [0.75 * old + 0.25 * (value + dt * change) for old, value, change in zip(state, first, second_rhs)]
    third_rhs = rhs(second, viscosity, dx)
    return [
        old / 3.0 + 2.0 * (value + dt * change) / 3.0
        for old, value, change in zip(state, second, third_rhs)
    ]


def simulate(viscosity: float, phase: float, grid_size: int, final_time: float, snapshots: int) -> list[list[float]]:
    dx = 2.0 * math.pi / grid_size
    state = initial_condition(grid_size, phase)
    trajectory = [state]
    time = 0.0

    for snapshot_index in range(1, snapshots + 1):
        target_time = final_time * snapshot_index / snapshots
        while time < target_time - 1e-14:
            wave_speed = max(max(abs(value) for value in state), 1e-9)
            advective_limit = dx / wave_speed
            diffusive_limit = dx * dx / (2.0 * viscosity)
            dt = min(0.35 * min(advective_limit, diffusive_limit), target_time - time)
            state = rk3_step(state, viscosity, dx, dt)
            time += dt
        trajectory.append(state)
    return trajectory


def mean(values: list[float]) -> float:
    return sum(values) / len(values)


def energy(values: list[float]) -> float:
    return mean([value * value for value in values])


def squared_error(prediction: list[float], target: list[float]) -> float:
    return mean([(predicted - actual) ** 2 for predicted, actual in zip(prediction, target)])


def evaluate(viscosities: tuple[float, ...], grid_size: int, final_time: float, snapshots: int) -> dict[str, float | int]:
    one_step_errors: list[float] = []
    rollout_errors: list[float] = []
    mass_drifts: list[float] = []
    energy_violations = 0

    for viscosity in viscosities:
        for phase in PHASES:
            trajectory = simulate(viscosity, phase, grid_size, final_time, snapshots)
            initial_mean = mean(trajectory[0])
            mass_drifts.append(max(abs(mean(state) - initial_mean) for state in trajectory))
            one_step_errors.extend(squared_error(previous, current) for previous, current in zip(trajectory, trajectory[1:]))
            rollout_errors.append(squared_error(trajectory[0], trajectory[-1]))
            energies = [energy(state) for state in trajectory]
            energy_violations += sum(later > earlier + 1e-10 for earlier, later in zip(energies, energies[1:]))

    return {
        "trajectories": len(viscosities) * len(PHASES),
        "persistence_one_step_rmse": math.sqrt(mean(one_step_errors)),
        "persistence_final_rollout_rmse": math.sqrt(mean(rollout_errors)),
        "max_mass_drift": max(mass_drifts),
        "energy_monotonicity_violations": energy_violations,
    }


def run(grid_size: int, final_time: float, snapshots: int) -> dict[str, object]:
    held_out = set(TEST_VISCOSITIES) | set(EXTRAPOLATION_VISCOSITIES)
    if set(TRAIN_VISCOSITIES) & held_out:
        raise AssertionError("Training and held-out viscosity sets must be disjoint.")
    if any(min(TRAIN_VISCOSITIES) <= nu <= max(TRAIN_VISCOSITIES) for nu in EXTRAPOLATION_VISCOSITIES):
        raise AssertionError("Extrapolation viscosities must lie outside the training range.")

    report: dict[str, object] = {
        "equation": "u_t + u u_x = nu u_xx (periodic on [0, 2pi))",
        "solver": "Rusanov finite-volume flux + centered diffusion + SSP-RK3",
        "grid_size": grid_size,
        "final_time": final_time,
        "snapshots": snapshots,
        "phases": PHASES,
        "split": {
            "train_viscosities": TRAIN_VISCOSITIES,
            "test_viscosities": TEST_VISCOSITIES,
            "extrapolation_viscosities": EXTRAPOLATION_VISCOSITIES,
        },
        "train": evaluate(TRAIN_VISCOSITIES, grid_size, final_time, snapshots),
        "test": evaluate(TEST_VISCOSITIES, grid_size, final_time, snapshots),
        "extrapolation": evaluate(EXTRAPOLATION_VISCOSITIES, grid_size, final_time, snapshots),
    }

    for split in ("train", "test", "extrapolation"):
        metrics = report[split]
        assert isinstance(metrics, dict)
        if metrics["max_mass_drift"] > 1e-10:
            raise AssertionError(f"{split} reference solver failed the mass-conservation check")
        if metrics["energy_monotonicity_violations"]:
            raise AssertionError(f"{split} reference solver violated viscous energy dissipation")
    return report


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--grid-size", type=int, default=96)
    parser.add_argument("--final-time", type=float, default=2.0)
    parser.add_argument("--snapshots", type=int, default=20)
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()

    if args.grid_size < 16 or args.final_time <= 0 or args.snapshots < 1:
        parser.error("grid size must be >= 16, final time > 0, and snapshots >= 1")

    rendered = json.dumps(run(args.grid_size, args.final_time, args.snapshots), indent=2)
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(rendered + "\n", encoding="utf-8")
    print(rendered)


if __name__ == "__main__":
    main()
