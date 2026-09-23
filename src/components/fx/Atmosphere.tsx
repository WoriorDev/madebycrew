"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Star = { x: number; y: number; z: number; r: number; a: number };
type Cube = {
  x: number;
  y: number;
  z: number;
  size: number;
  rx: number;
  ry: number;
  rz: number;
  spin: number;
};

/**
 * Kosmiczne tło w stylu TDA / fintech pin —
 * gwiazdy + mgławica + rojące się glass-cube’y reagujące na scroll.
 * Kolory: MadeByCrew (lime na głębokim grafcie).
 */
export function Atmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let time = 0;

    const stars: Star[] = [];
    const cubes: Cube[] = [];

    function seed() {
      stars.length = 0;
      cubes.length = 0;
      const starCount = Math.min(220, Math.floor((w * h) / 9000));
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: (Math.random() - 0.5) * 2.4,
          y: (Math.random() - 0.5) * 2.4,
          z: Math.random() * 1.6 + 0.2,
          r: Math.random() * 1.4 + 0.3,
          a: Math.random() * 0.55 + 0.15,
        });
      }
      const cubeCount = Math.min(48, Math.floor(w / 28));
      for (let i = 0; i < cubeCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 0.15 + Math.random() * 1.1;
        cubes.push({
          x: Math.cos(angle) * radius * (0.4 + Math.random()),
          y: (Math.random() - 0.5) * 1.1,
          z: 0.35 + Math.random() * 1.8,
          size: 0.04 + Math.random() * 0.09,
          rx: Math.random() * Math.PI,
          ry: Math.random() * Math.PI,
          rz: Math.random() * Math.PI,
          spin: (Math.random() - 0.5) * 0.4,
        });
      }
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function project(x: number, y: number, z: number, camZ: number) {
      const depth = z + camZ;
      const f = 1.15 / Math.max(0.12, depth);
      return {
        x: w * 0.5 + x * f * Math.min(w, h) * 0.55,
        y: h * 0.48 + y * f * Math.min(w, h) * 0.55,
        s: f,
      };
    }

    function rotatePoint(
      x: number,
      y: number,
      z: number,
      rx: number,
      ry: number,
      rz: number,
    ) {
      // rx
      let y1 = y * Math.cos(rx) - z * Math.sin(rx);
      let z1 = y * Math.sin(rx) + z * Math.cos(rx);
      let x1 = x;
      // ry
      let x2 = x1 * Math.cos(ry) + z1 * Math.sin(ry);
      let z2 = -x1 * Math.sin(ry) + z1 * Math.cos(ry);
      let y2 = y1;
      // rz
      const x3 = x2 * Math.cos(rz) - y2 * Math.sin(rz);
      const y3 = x2 * Math.sin(rz) + y2 * Math.cos(rz);
      return { x: x3, y: y3, z: z2 };
    }

    function drawCube(c: Cube, camZ: number, scroll: number) {
      const rotX = c.rx + time * c.spin + scroll * 1.8;
      const rotY = c.ry + time * c.spin * 0.7 + scroll * 2.4;
      const rotZ = c.rz + scroll * 0.6;
      const hs = c.size * 0.5;
      const corners = [
        [-hs, -hs, -hs],
        [hs, -hs, -hs],
        [hs, hs, -hs],
        [-hs, hs, -hs],
        [-hs, -hs, hs],
        [hs, -hs, hs],
        [hs, hs, hs],
        [-hs, hs, hs],
      ].map(([px, py, pz]) => {
        const r = rotatePoint(px, py, pz, rotX, rotY, rotZ);
        return project(c.x + r.x, c.y + r.y, c.z + r.z, camZ);
      });

      const edges: [number, number][] = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 4],
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7],
      ];

      const cx = corners.reduce((a, p) => a + p.x, 0) / 8;
      const cy = corners.reduce((a, p) => a + p.y, 0) / 8;
      const glow = Math.max(0.15, Math.min(1, corners[0].s));

      // soft core glow
      const g = ctx!.createRadialGradient(cx, cy, 0, cx, cy, 40 * glow);
      g.addColorStop(0, `rgba(215,255,50,${0.18 * glow})`);
      g.addColorStop(1, "rgba(215,255,50,0)");
      ctx!.fillStyle = g;
      ctx!.beginPath();
      ctx!.arc(cx, cy, 40 * glow, 0, Math.PI * 2);
      ctx!.fill();

      ctx!.strokeStyle = `rgba(215,255,50,${0.25 + glow * 0.45})`;
      ctx!.lineWidth = Math.max(0.6, 1.2 * glow);
      ctx!.beginPath();
      for (const [a, b] of edges) {
        ctx!.moveTo(corners[a].x, corners[a].y);
        ctx!.lineTo(corners[b].x, corners[b].y);
      }
      ctx!.stroke();

      // faint face fill on nearest faces
      ctx!.fillStyle = `rgba(247,248,250,${0.03 + glow * 0.06})`;
      const faces = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [0, 1, 5, 4],
      ];
      for (const face of faces) {
        ctx!.beginPath();
        ctx!.moveTo(corners[face[0]].x, corners[face[0]].y);
        for (let i = 1; i < face.length; i++) {
          ctx!.lineTo(corners[face[i]].x, corners[face[i]].y);
        }
        ctx!.closePath();
        ctx!.fill();
      }
    }

    function frame(now: number) {
      time = now * 0.001;
      const scroll = progress.current;
      const camZ = 0.55 + scroll * 1.35;
      const drift = scroll * 0.35;

      ctx!.clearRect(0, 0, w, h);

      // nebula
      const nebula = ctx!.createRadialGradient(
        w * (0.5 + Math.sin(time * 0.15) * 0.03),
        h * (0.42 - drift * 0.08),
        0,
        w * 0.5,
        h * 0.45,
        Math.max(w, h) * 0.55,
      );
      nebula.addColorStop(0, "rgba(215,255,50,0.14)");
      nebula.addColorStop(0.35, "rgba(215,255,50,0.05)");
      nebula.addColorStop(0.7, "rgba(80,100,40,0.03)");
      nebula.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = nebula;
      ctx!.fillRect(0, 0, w, h);

      // secondary bloom
      const bloom2 = ctx!.createRadialGradient(
        w * 0.72,
        h * (0.65 + drift * 0.1),
        0,
        w * 0.72,
        h * 0.65,
        Math.max(w, h) * 0.35,
      );
      bloom2.addColorStop(0, "rgba(247,248,250,0.06)");
      bloom2.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = bloom2;
      ctx!.fillRect(0, 0, w, h);

      // stars
      for (const star of stars) {
        const p = project(
          star.x + Math.sin(time * 0.05 + star.z) * 0.02,
          star.y - scroll * 0.15 * (1.2 - star.z),
          star.z,
          camZ * 0.35,
        );
        const twinkle =
          star.a *
          (0.55 + 0.45 * Math.sin(time * 2.2 + star.x * 12 + star.y * 7));
        ctx!.fillStyle = `rgba(247,248,250,${twinkle})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, star.r * p.s, 0, Math.PI * 2);
        ctx!.fill();
      }

      // cubes sorted far → near
      const sorted = [...cubes].sort((a, b) => b.z - a.z);
      for (const cube of sorted) {
        // disperse slightly with scroll
        const spread = 1 + scroll * 0.55;
        const moved: Cube = {
          ...cube,
          x: cube.x * spread,
          y: cube.y * spread - scroll * 0.25,
          z: cube.z - scroll * 0.45,
        };
        if (moved.z + camZ < 0.08) continue;
        drawCube(moved, camZ, scroll);
      }

      // vignette
      const vig = ctx!.createRadialGradient(
        w * 0.5,
        h * 0.5,
        Math.min(w, h) * 0.2,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.75,
      );
      vig.addColorStop(0, "rgba(5,6,7,0)");
      vig.addColorStop(1, "rgba(5,6,7,0.72)");
      ctx!.fillStyle = vig;
      ctx!.fillRect(0, 0, w, h);

      raf = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize);

    let st: ScrollTrigger | undefined;
    if (!reduce) {
      st = ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });
      raf = requestAnimationFrame(frame);
    } else {
      // static single paint
      progress.current = 0.2;
      frame(0);
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
      st?.kill();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050607]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(215,255,50,0.07),transparent_55%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      <div className="film-noise absolute inset-0 opacity-[0.28]" />
    </div>
  );
}
