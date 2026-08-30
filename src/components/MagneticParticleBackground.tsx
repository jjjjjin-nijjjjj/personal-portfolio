"use client";

import { useEffect, useRef } from "react";

export const BG_CONFIG = {
  particleColor: "rgba(244, 124, 77, 0.72)",
  cursorColor: "rgba(244, 124, 77, 0.95)",
  maxParticles: 140,
  gravityRadius: 150,
  gridSize: 40,
  gridInfluenceRadius: 280,
  gridParallax: 8,
  gridBaseColor: "rgba(244, 124, 77, 0.16)",
  gridHighlightColor: "rgba(244, 124, 77, 0.68)",
  gridShadowColor: "rgba(31, 31, 31, 0.2)",
  spring: 0.012,
  gravity: 0.045,
  damping: 0.91,
} as const;

type Particle = {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  driftX: number;
  driftY: number;
};

export default function MagneticParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cursor = { x: -1000, y: -1000, smoothX: -1000, smoothY: -1000, active: false, lastMove: 0, energy: 0 };
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let previousTime = 0;
    let isVisible = !document.hidden;

    const createParticles = () => {
      particles = Array.from({ length: BG_CONFIG.maxParticles }, () => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        return {
          baseX: x,
          baseY: y,
          x,
          y,
          vx: 0,
          vy: 0,
          radius: 1 + Math.random() * 1.35,
          phase: Math.random() * Math.PI * 2,
          driftX: 5 + Math.random() * 13,
          driftY: 5 + Math.random() * 13,
        };
      });
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
      if (reduceMotion) draw(0, false);
    };

    const draw = (time: number, update = true) => {
      context.clearRect(0, 0, width, height);
      const cursorActive = cursor.active && time - cursor.lastMove < 700;

      if (update) {
        cursor.smoothX += (cursor.x - cursor.smoothX) * 0.12;
        cursor.smoothY += (cursor.y - cursor.smoothY) * 0.12;
        cursor.energy += ((cursorActive ? 1 : 0) - cursor.energy) * (cursorActive ? 0.14 : 0.045);
      }

      const drawGrid = (offsetX: number, offsetY: number) => {
        context.beginPath();
        for (let x = offsetX % BG_CONFIG.gridSize; x <= width; x += BG_CONFIG.gridSize) {
          context.moveTo(x, 0);
          context.lineTo(x, height);
        }
        for (let y = offsetY % BG_CONFIG.gridSize; y <= height; y += BG_CONFIG.gridSize) {
          context.moveTo(0, y);
          context.lineTo(width, y);
        }
        context.stroke();
      };

      context.globalAlpha = 1;
      context.lineWidth = 0.7;
      context.strokeStyle = BG_CONFIG.gridBaseColor;
      drawGrid(0, 0);

      if (cursor.energy > 0.01) {
        const normalizedX = cursor.smoothX / Math.max(width, 1) - 0.5;
        const normalizedY = cursor.smoothY / Math.max(height, 1) - 0.5;
        const offsetX = normalizedX * BG_CONFIG.gridParallax * 2 * cursor.energy;
        const offsetY = normalizedY * BG_CONFIG.gridParallax * 2 * cursor.energy;
        const lightGrid = context.createRadialGradient(
          cursor.smoothX,
          cursor.smoothY,
          0,
          cursor.smoothX,
          cursor.smoothY,
          BG_CONFIG.gridInfluenceRadius,
        );
        lightGrid.addColorStop(0, BG_CONFIG.gridHighlightColor);
        lightGrid.addColorStop(0.58, "rgba(244, 124, 77, 0.14)");
        lightGrid.addColorStop(1, "rgba(244, 124, 77, 0)");
        context.globalAlpha = cursor.energy;
        context.lineWidth = 1.15;
        context.strokeStyle = lightGrid;
        drawGrid(offsetX, offsetY);

        const shadowGrid = context.createRadialGradient(
          cursor.smoothX + 18,
          cursor.smoothY + 18,
          0,
          cursor.smoothX + 18,
          cursor.smoothY + 18,
          BG_CONFIG.gridInfluenceRadius * 0.82,
        );
        shadowGrid.addColorStop(0, BG_CONFIG.gridShadowColor);
        shadowGrid.addColorStop(1, "rgba(31, 31, 31, 0)");
        context.globalAlpha = cursor.energy * 0.72;
        context.lineWidth = 0.8;
        context.strokeStyle = shadowGrid;
        drawGrid(-offsetX * 0.65, -offsetY * 0.65);
      }

      context.globalAlpha = 1;

      particles.forEach((particle) => {
        const breathX = Math.sin(time * 0.00018 + particle.phase) * particle.driftX;
        const breathY = Math.cos(time * 0.00015 + particle.phase) * particle.driftY;
        const homeX = particle.baseX + breathX;
        const homeY = particle.baseY + breathY;
        const dx = cursor.x - particle.x;
        const dy = cursor.y - particle.y;
        const distance = Math.hypot(dx, dy) || 1;
        const inGravity = cursorActive && distance < BG_CONFIG.gravityRadius;

        if (update) {
          particle.vx += (homeX - particle.x) * BG_CONFIG.spring;
          particle.vy += (homeY - particle.y) * BG_CONFIG.spring;
          if (inGravity) {
            const pull = (1 - distance / BG_CONFIG.gravityRadius) * BG_CONFIG.gravity;
            particle.vx += dx * pull;
            particle.vy += dy * pull;
          }
          particle.vx *= BG_CONFIG.damping;
          particle.vy *= BG_CONFIG.damping;
          particle.x += particle.vx;
          particle.y += particle.vy;
        }

        if (cursor.energy <= 0.01) return;

        context.globalAlpha = cursor.energy;
        context.fillStyle = inGravity ? BG_CONFIG.cursorColor : BG_CONFIG.particleColor;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius * (inGravity ? 1.55 : 1), 0, Math.PI * 2);
        context.fill();
      });

      if (cursor.energy > 0.01) {
        const glow = context.createRadialGradient(cursor.x, cursor.y, 0, cursor.x, cursor.y, BG_CONFIG.gravityRadius);
        glow.addColorStop(0, "rgba(244, 124, 77, 0.14)");
        glow.addColorStop(1, "rgba(244, 124, 77, 0)");
        context.globalAlpha = cursor.energy;
        context.fillStyle = glow;
        context.beginPath();
        context.arc(cursor.x, cursor.y, BG_CONFIG.gravityRadius, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
    };

    const animate = (time: number) => {
      if (isVisible && time - previousTime >= 1000 / 60) {
        draw(time);
        previousTime = time;
      }
      animationFrame = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      cursor.x = event.clientX;
      cursor.y = event.clientY;
      if (cursor.smoothX < -500) {
        cursor.smoothX = event.clientX;
        cursor.smoothY = event.clientY;
      }
      cursor.active = true;
      cursor.lastMove = performance.now();
    };
    const handlePointerLeave = () => { cursor.active = false; };
    const handleVisibility = () => { isVisible = !document.hidden; };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibility);
    if (!reduceMotion) animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="magnetic-particle-background" aria-hidden="true" />;
}
