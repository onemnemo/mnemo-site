/**
 * Long exposure field: soft bands of colour, as if a sunset were photographed with the
 * shutter held open, with film grain on top. Used live in the hero and as stills.
 */
export const LONG_EXPOSURE_FS = `precision highp float;
uniform vec2 uRes;uniform float uTime;uniform float uSeed;uniform float uAngle;uniform float uStretch;
uniform vec3 uC[5];uniform vec3 uGlowCol;uniform vec2 uGlow;uniform float uGlowAmt;uniform float uGrain;
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
float a=hash(i),b=hash(i+vec2(1.,0.)),c=hash(i+vec2(0.,1.)),d=hash(i+vec2(1.,1.));
return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
vec3 ramp(float h){h=clamp(h,0.,1.);
vec3 c=mix(uC[0],uC[1],smoothstep(0.,.3,h));
c=mix(c,uC[2],smoothstep(.24,.5,h));
c=mix(c,uC[3],smoothstep(.46,.74,h));
c=mix(c,uC[4],smoothstep(.7,1.,h));return c;}
void main(){
vec2 uv=gl_FragCoord.xy/uRes;
vec2 p=(gl_FragCoord.xy-.5*uRes)/uRes.y;
float ca=cos(uAngle),sa=sin(uAngle);
vec2 q=vec2(ca*p.x-sa*p.y,sa*p.x+ca*p.y);
q*=vec2(1./uStretch,1.7);
float t=uTime;
vec2 w=vec2(fbm(q*1.1+vec2(t*.05,uSeed)),fbm(q*1.1+vec2(-t*.04,uSeed*1.7+3.1)));
float f=fbm(q*1.6+w*2.3+vec2(t*.03,0.));
float h=uv.y+(f-.5)*.62+(w.x-.5)*.26;
vec3 col=ramp(h);
vec2 d=(uv-uGlow)*vec2(uRes.x/uRes.y,1.);
col+=uGlowCol*exp(-dot(d,d)*3.)*uGlowAmt;
vec2 v=uv-.5;col*=1.-.32*dot(v,v)*1.6;
col+=(hash(gl_FragCoord.xy+fract(t*7.)*91.)-.5)*uGrain;
gl_FragColor=vec4(col,1.);}`
