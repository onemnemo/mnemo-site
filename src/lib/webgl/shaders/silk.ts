/** Silk: smooth folds of colour from a light top to a deep bottom, with a soft sheen. */
export const SILK_FS = `precision highp float;
uniform vec2 res;uniform float seed;uniform vec3 c[5];
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);for(int i=0;i<5;i++){v+=a*n(p);p=m*p;a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/res;
  vec2 p=vec2(uv.x*res.x/res.y,uv.y);
  p=vec2(p.x*.55,p.y*1.7)+seed;
  vec2 q=vec2(fbm(p),fbm(p+vec2(5.2,1.3)));
  vec2 r=vec2(fbm(p+2.4*q+vec2(1.7,9.2)),fbm(p+2.4*q+vec2(8.3,2.8)));
  float w=fbm(p+3.*r);
  float t=clamp((1.-uv.y)*1.05-.02+(w-.5)*1.5+(q.x-.5)*.7,0.,1.)*4.;
  vec3 col=c[0];
  col=mix(col,c[1],smoothstep(0.,1.,t));col=mix(col,c[2],smoothstep(1.,2.,t));
  col=mix(col,c[3],smoothstep(2.,3.,t));col=mix(col,c[4],smoothstep(3.,4.,t));
  col=mix(col,vec3(1.),pow(.5+.5*sin(t*4.2+w*5.),10.)*.16);
  col+=(h(gl_FragCoord.xy*.731+seed)-.5)*.06;
  gl_FragColor=vec4(col,1.);}`
