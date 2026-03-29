'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function DataFlowVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    // 2. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Particle System Configuration
    const particleCount = 1800;
    const geometry = new THREE.BufferGeometry();
    
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount);

    // Initial state: Scattered on the left
    for (let i = 0; i < particleCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 120;     // X
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;  // Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;  // Z

      // Individual velocity for depth feel
      velocities[i] = 0.1 + Math.random() * 0.25;
      sizes[i] = Math.random() * 1.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // 4. Animation Logic
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      
      const posAttr = geometry.attributes.position;
      const colAttr = geometry.attributes.color;

      for (let i = 0; i < particleCount; i++) {
        let ix = i * 3;
        let iy = i * 3 + 1;
        let iz = i * 3 + 2;

        // Move Right
        posAttr.array[ix] += velocities[i];

        // Loop back to left when exiting
        if (posAttr.array[ix] > 60) {
          posAttr.array[ix] = -60;
          posAttr.array[iy] = (Math.random() - 0.5) * 60;
          posAttr.array[iz] = (Math.random() - 0.5) * 30;
        }

        const xPos = posAttr.array[ix];
        const progress = (xPos + 60) / 120; // 0 to 1 mapping

        if (progress < 0.4) {
          // PHASE 1: ENTROPY (Left)
          // Chaotic jitter
          posAttr.array[iy] += Math.sin(time * 2 + i) * 0.05;
          posAttr.array[iz] += Math.cos(time * 2 + i) * 0.05;
          
          // Warm colors (Red/Orange)
          colAttr.array[ix] = 0.9; // R
          colAttr.array[iy] = 0.3; // G
          colAttr.array[iz] = 0.2; // B
        } 
        else if (progress >= 0.4 && progress < 0.7) {
          // PHASE 2: TRANSITION (Middle)
          // Smoothly pulling into horizontal lanes
          const targetY = Math.round(posAttr.array[iy] / 8) * 8;
          posAttr.array[iy] += (targetY - posAttr.array[iy]) * 0.05;
          posAttr.array[iz] *= 0.95; // Flatten depth

          // Shift to Blue
          colAttr.array[ix] = 0.2;
          colAttr.array[iy] = 0.5;
          colAttr.array[iz] = 0.9;
        } 
        else {
          // PHASE 3: STRUCTURE (Right)
          // Perfect alignment
          const targetY = Math.round(posAttr.array[iy] / 10) * 10;
          posAttr.array[iy] += (targetY - posAttr.array[iy]) * 0.1;
          posAttr.array[iz] = 0;

          // Cool Emerald
          colAttr.array[ix] = 0.1;
          colAttr.array[iy] = 0.9;
          colAttr.array[iz] = 0.5;
        }
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // 5. Responsive Handling
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // 6. Comprehensive Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-48 bg-[#050505] overflow-hidden rounded-lg border border-white/5"
    >
      {/* Technical Overlay */}
      <div className="absolute top-4 left-4 pointer-events-none select-none">
        <div className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
          Data.Ingestion_v1.0
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          <div className="font-mono text-[9px] text-white/40 uppercase tracking-tighter">
            Status: Processing_Stream
          </div>
        </div>
      </div>

      {/* Grid Pattern Background for extra depth */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)] pointer-events-none"></div>
    </div>
  );
}