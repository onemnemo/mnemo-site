import { createFullscreenProgram } from './program'
import { EARTH_FS } from './shaders/earth'
import { EARTH_LUT, EARTH_LUT_ROWS, EARTH_LUT_WIDTH } from './shaders/earthLut'

export interface EarthStrip {
  /** Sizes the strip to three cards side by side with the given gap, in device pixels. */
  resize: (cardW: number, cardH: number, gap: number) => void
  /** Renders the strip and cuts it into the card canvases. */
  draw: (targets: CanvasRenderingContext2D[], blurPx: number) => void
  setMotion: (time: number, shiftX: number, shiftY: number, light: [number, number, number]) => void
  dispose: () => void
}

/**
 * The billion students planet. Rendered offscreen as one strip so the horizon lines up
 * across the gaps between cards, then copied into each card's 2D canvas.
 */
export function createEarthStrip(): EarthStrip | null {
  const src = document.createElement('canvas')
  const prog = createFullscreenProgram(src, EARTH_FS, { antialias: false, alpha: false })
  if (!prog) return null
  const { gl, uniform: u } = prog

  const tex = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1)
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGB,
    EARTH_LUT_WIDTH,
    EARTH_LUT_ROWS,
    0,
    gl.RGB,
    gl.UNSIGNED_BYTE,
    EARTH_LUT,
  )
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.uniform1f(u('uTime'), 0)
  gl.uniform2f(u('uShift'), 0, 0)
  gl.uniform3f(u('uLight'), 0, 0, 0)

  let cw = 0
  let ch = 0
  let gp = 0
  return {
    resize: (cardW, cardH, gap) => {
      cw = cardW
      ch = cardH
      gp = gap
      src.width = cw * 3 + gp * 2
      src.height = ch
      gl.viewport(0, 0, src.width, src.height)
      gl.uniform2f(u('res'), src.width, src.height)
    },
    draw: (targets, blurPx) => {
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      targets.forEach((x, i) => {
        x.filter = `blur(${blurPx}px)`
        x.drawImage(src, i * (cw + gp), 0, cw, ch, 0, 0, cw, ch)
      })
    },
    setMotion: (time, sx, sy, light) => {
      gl.uniform1f(u('uTime'), time)
      gl.uniform2f(u('uShift'), sx, sy)
      gl.uniform3f(u('uLight'), ...light)
    },
    dispose: () => {
      gl.deleteTexture(tex)
      prog.dispose()
    },
  }
}
