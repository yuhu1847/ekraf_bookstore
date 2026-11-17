"use client";

import { useEffect, useRef } from "react";

/**
 * Ultra-light WebGL background (raw WebGL1, zero dependencies).
 *
 * A full-screen fixed canvas renders soft, warm "coffee & clay" blobs whose
 * positions are driven by `u_scroll` (0 = top/hero, 1 = footer). As the user
 * scrolls, the warm tones travel down the page — motion that connects hero
 * to footer. Falls back to the plain cream background if WebGL is missing,
 * renders a single static frame when the user prefers reduced motion, and
 * pauses the render loop while the tab is hidden.
 */

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;

uniform vec2 u_res;
uniform float u_time;
uniform float u_scroll;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(11.3, 7.9);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2(uv.x * aspect, uv.y);

  float t = u_time * 0.05;
  float s = u_scroll;

  // gentle organic warp so blob edges are not perfect circles
  float w = fbm(p * 1.6 + vec2(t, -t * 0.7));

  // three blob centers: top sand glow, mid-right mocha, bottom ember.
  // each travels down (or up) as the page scrolls from hero to footer.
  vec2 c1 = vec2(0.24 * aspect + 0.10 * sin(t * 1.7), 1.18 - s * 1.30 + 0.06 * cos(t * 1.1));
  vec2 c2 = vec2(1.06 * aspect + 0.14 * cos(t * 1.3 + 2.0), 0.70 - s * 0.55 + 0.08 * sin(t * 1.9));
  vec2 c3 = vec2(0.55 * aspect + 0.18 * sin(t * 0.9 + 4.0), -0.08 + s * 1.25 + 0.07 * cos(t * 1.4 + 1.0));

  float d1 = distance(p, c1 + (w - 0.5) * 0.35);
  float d2 = distance(p, c2 + (w - 0.5) * 0.35);
  float d3 = distance(p, c3 + (w - 0.5) * 0.30);

  float g1 = exp(-d1 * d1 * 3.0);
  float g2 = exp(-d2 * d2 * 4.2);
  float g3 = exp(-d3 * d3 * 3.6);

  vec3 base  = vec3(0.976, 0.973, 0.965); // cream  #F9F8F6
  vec3 sand  = vec3(0.941, 0.918, 0.882); // warm sand
  vec3 mocha = vec3(0.624, 0.506, 0.400); // soft mocha
  vec3 ember = vec3(0.827, 0.506, 0.384); // soft terracotta

  vec3 col = base;
  col = mix(col, sand, g1 * 0.80);
  col = mix(col, mocha, g2 * (0.20 + 0.28 * s));
  col = mix(col, ember, g3 * (0.12 + 0.32 * s));

  // the whole page warms up very slightly towards the footer
  col = mix(col, ember, s * 0.05);

  // static fine grain keeps banding away without flicker
  float grain = (hash(gl_FragCoord.xy) - 0.5) * 0.014;
  gl_FragColor = vec4(col + grain, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function WebglBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      depth: false,
      stencil: false,
      alpha: false,
      powerPreference: "low-power",
    });
    if (!gl) return; // graceful fallback: plain cream background

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uScroll = gl.getUniformLocation(prog, "u_scroll");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      const w = Math.max(1, Math.floor(window.innerWidth * dpr));
      const h = Math.max(1, Math.floor(window.innerHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const scrollProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    let raf = 0;
    let running = true;
    const start = performance.now();

    const draw = (now: number) => {
      resize();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform1f(uScroll, scrollProgress());
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      if (!running) return;
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    // static single frame for reduced motion
    draw(performance.now() + 12000);
    if (!reduced) {
      raf = requestAnimationFrame(loop);
    }

    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    const onContextLost = (e: Event) => {
      e.preventDefault();
      running = false;
    };

    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("webglcontextlost", onContextLost);
    window.addEventListener("resize", resize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
