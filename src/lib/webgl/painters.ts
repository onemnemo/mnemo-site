import type { LongExposurePalette } from './palettes'
import { createFullscreenProgram, hexToRgb, sizeCanvas, type FullscreenProgram } from './program'
import { LONG_EXPOSURE_FS } from './shaders/longExposure'
import { SILK_FS } from './shaders/silk'

const STILL_ATTRS: WebGLContextAttributes = {
  antialias: false,
  preserveDrawingBuffer: true,
  alpha: false,
}

const flatRgb = (colors: readonly string[]) => new Float32Array(colors.flatMap(hexToRgb))

export interface LongExposurePainter {
  canvas: HTMLCanvasElement
  paint: (
    w: number,
    h: number,
    pal: LongExposurePalette,
    time: number,
    seed: number,
    glow: readonly [number, number] | null,
    grain: number,
  ) => void
  dispose: () => void
}

export function createLongExposurePainter(canvas: HTMLCanvasElement): LongExposurePainter | null {
  const prog = createFullscreenProgram(canvas, LONG_EXPOSURE_FS, STILL_ATTRS)
  if (!prog) return null
  const { gl, uniform: u } = prog
  return {
    canvas,
    dispose: prog.dispose,
    paint: (w, h, pal, time, seed, glow, grain) => {
      sizeCanvas(canvas, w, h)
      gl.viewport(0, 0, w, h)
      gl.uniform2f(u('uRes'), w, h)
      gl.uniform1f(u('uTime'), time)
      gl.uniform1f(u('uSeed'), seed)
      gl.uniform1f(u('uAngle'), pal.a)
      gl.uniform1f(u('uStretch'), pal.s)
      gl.uniform3fv(u('uC'), flatRgb(pal.c))
      gl.uniform3fv(u('uGlowCol'), flatRgb([pal.glow]))
      const g = glow ?? pal.g
      gl.uniform2f(u('uGlow'), g[0], g[1])
      gl.uniform1f(u('uGlowAmt'), pal.ga)
      gl.uniform1f(u('uGrain'), grain)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    },
  }
}

export interface SilkPainter {
  canvas: HTMLCanvasElement
  paint: (w: number, h: number, colors: readonly string[], seed: number) => void
  dispose: FullscreenProgram['dispose']
}

export function createSilkPainter(canvas: HTMLCanvasElement): SilkPainter | null {
  const prog = createFullscreenProgram(canvas, SILK_FS, STILL_ATTRS)
  if (!prog) return null
  const { gl, uniform: u } = prog
  return {
    canvas,
    dispose: prog.dispose,
    paint: (w, h, colors, seed) => {
      sizeCanvas(canvas, w, h)
      gl.viewport(0, 0, w, h)
      gl.uniform2f(u('res'), w, h)
      gl.uniform1f(u('seed'), seed)
      gl.uniform3fv(u('c'), flatRgb(colors))
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    },
  }
}
