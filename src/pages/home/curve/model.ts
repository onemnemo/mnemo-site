/**
 * A small model of the scheduler, close enough to FSRS to be honest about the shape:
 * recall decays as R = 0.9^(t/S), a review resets it, and the stability S grows with
 * the grade.
 */
const LN = Math.log(0.9)
const GROW = [0, 1.25, 2.6, 4.3]
const AGAIN = 10 / 1440

export const S0 = 3.2
export const GRADE_NAMES = ['Again', 'Hard', 'Good', 'Easy'] as const
/** The grades the demo plays, in order. */
export const RUN = [2, 2, 0, 2, 2, 3] as const

export type Grade = 0 | 1 | 2 | 3
export interface Review {
  t: number
  S: number
  g: Grade
}

export const recall = (dt: number, S: number) => Math.exp((LN * dt) / S)
export const nextStability = (S: number, g: Grade) =>
  g === 0 ? Math.max(0.5, S * 0.3) : S * (GROW[g] ?? 1)
export const gap = (S: number, g: Grade) => (g === 0 ? AGAIN : S)

export const formatGap = (d: number) =>
  d < 1
    ? 'later today'
    : d < 30
      ? `${Math.round(d)} days`
      : d < 365
        ? `${Math.round(d / 3) / 10} months`
        : `${Math.round(d / 36.5) / 10} years`

/** The visible span in days for a run that has reached day `n`. */
export const targetSpan = (n: number) => Math.max(30, n * 1.22 + 6)
