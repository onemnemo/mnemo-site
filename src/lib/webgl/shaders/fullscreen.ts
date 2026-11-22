/** One oversized triangle that covers clip space; every effect draws with it. */
export const FULLSCREEN_VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'

export const FULLSCREEN_TRIANGLE = new Float32Array([-1, -1, 3, -1, -1, 3])
