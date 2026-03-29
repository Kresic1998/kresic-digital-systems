'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type MarketPulseVisualProps = {
  className?: string;
};

export default function MarketPulseVisual({ className }: MarketPulseVisualProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // 1. Postavke scene i kamere
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    // 2. Postavke renderera
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const canvas = renderer.domElement;
    Object.assign(canvas.style, {
      position: "absolute",
      left: "0",
      top: "0",
      width: "100%",
      height: "100%",
      zIndex: "0",
      display: "block",
    });
    container.appendChild(canvas);

    // 3. Konfiguracija valova
    const segmentCount = 200;
    const waveData = [
      { color: 0x10b981, amplitude: 6, frequency: 0.15, speed: 1.5, opacity: 0.8 }, // Primarni Emerald
      { color: 0x94a3b8, amplitude: 4, frequency: 0.1, speed: 0.8, opacity: 0.4 },  // Sekundarni Slate
      { color: 0x3b82f6, amplitude: 8, frequency: 0.05, speed: 0.5, opacity: 0.3 }, // Plavi signal
      { color: 0xf8fafc, amplitude: 3, frequency: 0.2, speed: 2.0, opacity: 0.2 },  // Svijetli signal
    ];

    const waves: THREE.Line[] = [];
    const geometries: THREE.BufferGeometry[] = [];

    waveData.forEach((config) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array((segmentCount + 1) * 3);
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const material = new THREE.LineBasicMaterial({ 
        color: config.color, 
        transparent: true, 
        opacity: config.opacity 
      });

      const line = new THREE.Line(geometry, material);
      scene.add(line);
      waves.push(line);
      geometries.push(geometry);
    });

    // 4. Animacijska petlja
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      waves.forEach((line, index) => {
        const config = waveData[index];
        const positions = line.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i <= segmentCount; i++) {
          const x = (i - segmentCount / 2) * 0.8;
          const y = Math.sin(x * config.frequency + elapsed * config.speed) * config.amplitude;
          const noise = index === 0 ? Math.sin(elapsed * 5 + x) * 0.5 : 0;

          positions[i * 3] = x;
          positions[i * 3 + 1] = y + noise;
          positions[i * 3 + 2] = 0;
        }
        line.geometry.attributes.position.needsUpdate = true;
      });

      renderer.render(scene, camera);
    };

    animate();

    // 5. Responzivnost
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // 6. Čišćenje resursa
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      geometries.forEach(g => g.dispose());
      waves.forEach(w => {
        if (Array.isArray(w.material)) {
          w.material.forEach(m => m.dispose());
        } else {
          w.material.dispose();
        }
      });
      
      renderer.dispose();
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={[
        "relative isolate w-full min-h-[12rem] h-48 overflow-hidden rounded-xl border border-white/20 bg-[#020617]",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Grid Overlay - pojačan kontrast */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: 'center'
        }}
      />

      {/* Labele su sada svijetle (text-white/90) i jasno vidljive */}
      <div className="absolute top-4 left-5 pointer-events-none select-none z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981] animate-pulse"></div>
          <span className="font-mono text-[11px] text-white font-bold tracking-[0.2em] uppercase">
            Signal_Quality: <span className="text-emerald-400">High</span>
          </span>
        </div>
      </div>

      <div className="absolute bottom-4 right-5 pointer-events-none select-none text-right z-10">
        <div className="font-mono text-[10px] text-slate-300 uppercase tracking-widest font-semibold">
          Volatility_Index
        </div>
        <div className="font-mono text-[14px] text-white mt-0.5 drop-shadow-md">
          0.42 <span className="text-[10px] text-emerald-400 font-bold">RMS</span>
        </div>
      </div>

      {/* CRT efekt skeniranja */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(255,255,255,0.05)_50%)] bg-[length:100%_4px] opacity-30"></div>

      {/* Vinjeta za fokus na sredinu */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,transparent_20%,#020617_100%)]"></div>
    </div>
  );
}