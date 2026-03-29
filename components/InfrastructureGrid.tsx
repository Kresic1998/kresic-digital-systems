'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function InfrastructureGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // 1. Scene Setup
    const scene = new THREE.Scene();
    
    // 2. Camera Setup (Perspective view looking down at an angle)
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, -25, 12);
    camera.lookAt(0, 0, 0);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Grid Geometry & Material
    // Plane on the X-Y axis. We will displace the Z axis.
    const segments = 60;
    const geometry = new THREE.PlaneGeometry(100, 100, segments, segments);
    
    // Save original positions to calculate displacement without accumulating errors
    const originalPositions = new Float32Array(geometry.attributes.position.array);

    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
      wireframe: true,
      blending: THREE.AdditiveBlending, // Gives a subtle glowing effect where lines intersect
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 5. Interaction Setup
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let intersectPoint: THREE.Vector3 | null = null;
    let isMouseOver = false;

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // Calculate mouse position in Normalized Device Coordinates (-1 to +1)
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      
      // We raycast against a mathematical plane instead of the complex wireframe for performance
      const mathPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const target = new THREE.Vector3();
      raycaster.ray.intersectPlane(mathPlane, target);
      
      if (target) {
        intersectPoint = target;
      }
    };

    const onMouseEnter = () => { isMouseOver = true; };
    const onMouseLeave = () => { isMouseOver = false; };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // 6. Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      const positions = geometry.attributes.position;
      const hoverRadius = 12;
      const hoverIntensity = 4;

      // Displace vertices based on mouse position and ambient wave
      for (let i = 0; i < positions.count; i++) {
        const vx = originalPositions[i * 3];
        const vy = originalPositions[i * 3 + 1];
        let vz = 0;

        // Ambient flowing wave (breathing effect)
        vz += Math.sin(vx * 0.2 + time) * 0.3;
        vz += Math.cos(vy * 0.2 + time * 0.8) * 0.3;

        // Mouse displacement (magnet/ripple effect)
        if (isMouseOver && intersectPoint) {
          const dx = vx - intersectPoint.x;
          const dy = vy - intersectPoint.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < hoverRadius) {
            // Gaussian bell curve for smooth rippling
            const effect = Math.exp(-(distance * distance) / (hoverRadius * 2));
            vz += effect * hoverIntensity;
          }
        }

        positions.setZ(i, vz);
      }

      positions.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // 7. Cleanup phase to prevent memory leaks in React
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      
      cancelAnimationFrame(animationFrameId);
      
      // Dispose Three.js objects
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
      className="relative w-full h-48 bg-[#0a0a0a] overflow-hidden rounded-md border border-white/5"
      style={{ cursor: 'crosshair' }}
    >
      {/* Decorative System Overlay */}
      <div className="absolute bottom-3 right-3 select-none pointer-events-none flex flex-col items-end">
        <span className="text-[10px] text-white/30 font-mono tracking-widest uppercase">
          System.Arch_v2.0
        </span>
        <div className="flex items-center gap-2 mt-1 opacity-20">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
          <span className="text-[8px] text-white font-mono uppercase">Online</span>
        </div>
      </div>
      
      {/* Ambient Grid Glow (CSS Fallback/Enhancement) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
}