/**
 * A billion students: one strip of film, graded from the reference photo and cut across
 * the three cards so the horizon carries over the gaps.
 */
export const EARTH_FS = `
  precision highp float;
  uniform vec2 res;
  uniform sampler2D lut;
  uniform float uTime;   // seconds; 0 gives the original still
  uniform vec2 uShift;   // parallax, in card heights
  uniform vec3 uLight;   // pointer xy in card heights, z = strength

  float h2(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
  float n2(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
    return mix(mix(h2(i),h2(i+vec2(1,0)),f.x), mix(h2(i+vec2(0,1)),h2(i+vec2(1,1)),f.x), f.y); }
  float fbm(vec2 p){ float a=.5,s=0.; for(int i=0;i<5;i++){ s+=a*n2(p); p=p*2.02+vec2(3.1,1.7); a*=.5; } return s; }

  vec3 look(float d, float k){
    float x = clamp((d + 1000.0) / 1400.0, 0.0, 1.0) * 255.0 / 256.0 + 0.5/256.0;
    return texture2D(lut, vec2(x, (k + 0.5) / 3.0)).rgb;
  }

  void main(){
    // work in units of card height, y pointing down
    vec2 P = vec2(gl_FragCoord.x, res.y - gl_FragCoord.y) / res.y;
    vec2 Q = P;          // screen position, for the pointer light
    P -= uShift;
    float t = uTime;

    // horizon: a very large circle, almost flat over card one,
    // already tilted in card one and steepening to ~25 degrees in card three
    vec2 C = vec2(-0.9184, 8.1230);
    float R = 7.7079;
    vec2 v = P - C;
    float s = length(v) - R;              // > 0 above the horizon
    float along = atan(v.x, -v.y) * R;    // arc length along the horizon

    // distance in reference-photo pixels (3 photo px per css px, card = 480 css px)
    float d = -s * 1440.0;

    // streaks: warp the profile along the horizon, strongest in and under the band
    // (they slide slowly along the limb and the layers breathe, so the air drifts)
    float st = fbm(vec2(along * 3.0 - t * 0.16, s * 55.0 + sin(t * 0.45 + along * 2.2) * 0.9 - t * 0.12));
    float st2 = fbm(vec2(along * 1.1 + 9.0 + t * 0.07, s * 18.0 - t * 0.09));
    float near = exp(-pow((d - 40.0) / 260.0, 2.0));
    d += (st - 0.5) * 70.0 * near + (st2 - 0.5) * 45.0;

    // three looks, handing over across the gaps
    float u = gl_FragCoord.x / res.x;
    float t1 = smoothstep(0.27, 0.40, u), t2 = smoothstep(0.60, 0.73, u);
    vec3 col = look(d, 0.0) * (1.0 - t1) + look(d, 1.0) * (t1 - t2) + look(d, 2.0) * t2;

    // the band breathes a little along its length
    // (the still term is kept as is so the first frame is the original still)
    float b = fbm(vec2(along * 1.3, 4.0));
    b = mix(b, fbm(vec2(along * 1.3 - t * 0.09, 4.0 + t * 0.07)), min(t * 0.25, 1.0));
    col *= 0.9 + 0.3 * b * near;

    // haze rising off the limb and drifting along it, always moving
    float hz = fbm(vec2(along * 2.0 - t * 0.06, s * 10.0 - t * 0.1) + vec2(fbm(vec2(along * 4.0 + t * 0.05, s * 20.0)), 0.0));
    float above = exp(-max(s, 0.0) / 0.09) * smoothstep(-0.01, 0.02, s);
    col += col * smoothstep(0.42, 0.78, hz) * above * 0.45 * min(t * 0.25, 1.0);

    // a faint, slow swell of light on the limb
    col *= 1.0 + 0.08 * sin(t * 0.7) * near;

    // pointer: a soft warm sheen, a little stronger where it meets the band
    vec2 dl = Q - uLight.xy;
    float sh = exp(-dot(dl, dl) / 0.09) * uLight.z;
    col += col * sh * (0.07 + 0.14 * near) + vec3(1.0, 0.94, 0.84) * sh * 0.015;

    // grain, a touch heavier in the shadows like the print
    float l = dot(col, vec3(.299,.587,.114));
    float g = h2(gl_FragCoord.xy) + h2(gl_FragCoord.xy * 1.37 + 7.0) - 1.0;
    col += g * (0.045 - 0.02 * l);
    gl_FragColor = vec4(col, 1.0);
  }`
