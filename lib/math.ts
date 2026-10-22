/**
 * Small, dependency-free math helpers shared by the scroll hooks,
 * the hero text transitions and the blueprint camera rig.
 */

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Maps `v` from the [start, end] window to a clamped 0..1 value. */
export const range = (v: number, start: number, end: number) => clamp((v - start) / (end - start));

export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Frame-rate independent exponential smoothing. `lambda` is the
 * "stiffness": higher values settle faster. Using `1 - e^(-λ·dt)` instead of
 * a fixed lerp factor keeps the motion identical at 60Hz and 120Hz and
 * prevents visible jumps after a dropped frame.
 */
export const damp = (current: number, target: number, lambda: number, dt: number) =>
  lerp(current, target, 1 - Math.exp(-lambda * dt));
