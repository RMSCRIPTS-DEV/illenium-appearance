const REFERENCE_WIDTH = 1920;
const REFERENCE_HEIGHT = 1080;

/**
 * Viewport-based scaling utility.
 * Mirrors the SCSS vp($px) function:
 * average of vw/vh based on a 1920x1080 reference resolution.
 */
export function vp(px: number): string {
  const vw = (px / REFERENCE_WIDTH) * 100;
  const vh = (px / REFERENCE_HEIGHT) * 100;

  return `calc((${vw}vw + ${vh}vh) / 2)`;
}

/**
 * Clamped viewport-based scaling.
 * Keeps the scaled value between min and max (in px).
 */
export function vpClamp(px: number, min: number, max: number): string {
  return `clamp(${min}px, ${vp(px)}, ${max}px)`;
}

