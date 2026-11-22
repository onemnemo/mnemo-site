import { FULLSCREEN_TRIANGLE, FULLSCREEN_VS } from './shaders/fullscreen'

export interface FullscreenProgram {
  gl: WebGLRenderingContext
  uniform: (name: string) => WebGLUniformLocation | null
  dispose: () => void
}

/**
 * Compiles a fragment shader against the shared fullscreen triangle.
 * Returns null when WebGL is unavailable or the shader fails, so callers fall back to CSS.
 */
export function createFullscreenProgram(
  canvas: HTMLCanvasElement,
  fragmentSource: string,
  attributes: WebGLContextAttributes,
): FullscreenProgram | null {
  const gl = canvas.getContext('webgl', attributes)
  if (!gl) return null

  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type)
    if (!shader) return null
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null
  }
  const vs = compile(gl.VERTEX_SHADER, FULLSCREEN_VS)
  const fs = compile(gl.FRAGMENT_SHADER, fragmentSource)
  const program = gl.createProgram()
  if (!vs || !fs || !program) return null
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null
  gl.useProgram(program)

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, FULLSCREEN_TRIANGLE, gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(program, 'p')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

  const cache = new Map<string, WebGLUniformLocation | null>()
  return {
    gl,
    uniform: (name) => {
      if (!cache.has(name)) cache.set(name, gl.getUniformLocation(program, name))
      return cache.get(name) ?? null
    },
    dispose: () => {
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      // Release the context only once its canvas has left the page; a canvas that stays
      // (StrictMode re-running an effect) must keep a usable context for the next program.
      if (!canvas.isConnected) gl.getExtension('WEBGL_lose_context')?.loseContext()
    },
  }
}

export const hexToRgb = (hex: string): [number, number, number] => [
  parseInt(hex.slice(1, 3), 16) / 255,
  parseInt(hex.slice(3, 5), 16) / 255,
  parseInt(hex.slice(5, 7), 16) / 255,
]

export const sizeCanvas = (canvas: HTMLCanvasElement, width: number, height: number) => {
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
  }
}
