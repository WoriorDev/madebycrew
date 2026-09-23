"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Lightweight canvas fragment-shader vibe (noise + lime wash). Static CSS fallback if canvas fails. */
export function ShaderBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas || reduce) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vs = `
      attribute vec2 a;
      void main(){ gl_Position = vec4(a,0.0,1.0); }
    `;
    const fs = `
      precision mediump float;
      uniform float u_t;
      uniform vec2 u_r;
      float n(vec2 p){
        return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453);
      }
      void main(){
        vec2 uv = gl_FragCoord.xy / u_r;
        float g = n(uv * u_r * 0.35 + u_t * 0.02);
        float wash = smoothstep(0.15, 0.95, 1.0 - length(uv - vec2(0.72, 0.35)));
        vec3 base = vec3(0.063, 0.071, 0.078);
        vec3 lime = vec3(0.843, 1.0, 0.196);
        vec3 col = mix(base, lime, wash * 0.12 + g * 0.035);
        gl_FragColor = vec4(col, 0.85);
      }
    `;

    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uT = gl.getUniformLocation(prog, "u_t");
    const uR = gl.getUniformLocation(prog, "u_r");

    let raf = 0;
    let start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uR, canvas.width, canvas.height);
    };

    const draw = (now: number) => {
      gl.uniform1f(uT, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div aria-hidden className={cn("absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(215,255,50,0.12),transparent_50%),#101214]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-90" />
    </div>
  );
}
