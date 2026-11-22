export interface LongExposurePalette {
  /** Five stops, dark to light along the ramp. */
  c: readonly [string, string, string, string, string]
  /** Band angle in radians. */
  a: number
  /** Horizontal stretch of the bands. */
  s: number
  glow: string
  /** Glow centre in uv. */
  g: readonly [number, number]
  /** Glow strength. */
  ga: number
}

export const LONG_EXPOSURE = {
  dusk: {
    c: ['#0f0e10', '#3a2a2b', '#a9705f', '#5d6472', '#262c37'],
    a: -0.28,
    s: 3.4,
    glow: '#e39a78',
    g: [0.5, 0.32],
    ga: 0.16,
  },
  slate: {
    c: ['#101318', '#24324a', '#5a7090', '#a9b6c8', '#2a3346'],
    a: 0.62,
    s: 3.6,
    glow: '#c9d6e8',
    g: [0.7, 0.62],
    ga: 0.16,
  },
  rose: {
    c: ['#140d10', '#4a1f2c', '#b8576f', '#e3a3a8', '#3a2630'],
    a: 0.55,
    s: 3.4,
    glow: '#f2b7b7',
    g: [0.35, 0.6],
    ga: 0.18,
  },
  ember: {
    c: ['#140c0a', '#5a2014', '#c4502e', '#efb08a', '#3b2219'],
    a: -0.5,
    s: 3.8,
    glow: '#ffc49a',
    g: [0.65, 0.5],
    ga: 0.2,
  },
  amber: {
    c: ['#141007', '#4d3511', '#c9892f', '#f0d39a', '#3a2c18'],
    a: 0.45,
    s: 3.4,
    glow: '#ffe2a8',
    g: [0.4, 0.62],
    ga: 0.18,
  },
  fjord: {
    c: ['#0d1719', '#1c3632', '#5f8379', '#b2cacc', '#29463d'],
    a: 0.78,
    s: 4.6,
    glow: '#d4e6e6',
    g: [0.4, 0.45],
    ga: 0.2,
  },
  lilac: {
    c: ['#100e16', '#2c2540', '#6f6198', '#c9bfe6', '#2a2438'],
    a: 0.5,
    s: 3.8,
    glow: '#e2dbff',
    g: [0.6, 0.55],
    ga: 0.18,
  },
} as const satisfies Record<string, LongExposurePalette>

export const SILK = {
  sunset: ['#fde9de', '#f6b49c', '#ec6a55', '#c63a5e', '#5b3a9a'],
  meadow: ['#f6f4e4', '#d9e7b8', '#9cc68e', '#4f9470', '#24584a'],
  sky: ['#f6f8fd', '#d3e2f8', '#93b4ec', '#5b80d8', '#2c3f8f'],
  rose: ['#fff0ee', '#f9c3c9', '#ef7f98', '#c74a7e', '#6a3c9a'],
  sea: ['#f1f8f6', '#bfe3df', '#6fbcc0', '#2b7ea5', '#123e63'],
  dawn: ['#fbf3e6', '#f3d9b0', '#e0a86e', '#b5694a', '#5a3542'],
} as const satisfies Record<string, readonly string[]>

export type LongExposureName = keyof typeof LONG_EXPOSURE
export type SilkName = keyof typeof SILK
export type FieldName = LongExposureName | `silk-${SilkName}`

export const isSilk = (name: FieldName): name is `silk-${SilkName}` => name.startsWith('silk-')

/** CSS gradient shown before (or instead of) the shader. */
export function fieldFallback(name: FieldName): string {
  if (isSilk(name)) return `linear-gradient(180deg,${SILK[name.slice(5) as SilkName].join(',')})`
  const p: LongExposurePalette = LONG_EXPOSURE[name]
  return `linear-gradient(${180 + p.a * 57}deg,${p.c[4]},${p.c[3]} 30%,${p.c[2]} 55%,${p.c[1]} 80%,${p.c[0]})`
}
