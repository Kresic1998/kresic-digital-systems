import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  /** Set only on client to avoid SSR/client UUID mismatch (hydration error). */
  const [sessionUid, setSessionUid] = useState<string | null>(null);

  useEffect(() => {
    setSessionUid(crypto.randomUUID().slice(0, 8));
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.z = 450;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- 1. Point Cloud (Sfera čestica) ---
    const particleCount = 6000;
    const particlesGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const radius = 280;

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      const isAccent = Math.random() > 0.97;
      if (isAccent) {
        colors[i * 3] = 0.06;     // Emerald base
        colors[i * 3 + 1] = 0.72; 
        colors[i * 3 + 2] = 0.50; 
      } else {
        const brightness = 0.3 + Math.random() * 0.4;
        colors[i * 3] = brightness;
        colors[i * 3 + 1] = brightness;
        colors[i * 3 + 2] = brightness + 0.1;
      }
    }

    particlesGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending 
    });

    const pointCloud = new THREE.Points(particlesGeom, particlesMat);
    scene.add(pointCloud);

    // --- 2. Neuralne linije (Dinamičke veze) ---
    const lineMaxDistance = 40;
    const linesGeom = new THREE.BufferGeometry();
    const linePositions = new Float32Array(1500 * 6); 
    linesGeom.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    
    const linesMat = new THREE.LineBasicMaterial({ 
      color: 0x10b981, 
      transparent: true, 
      opacity: 0.12,
      blending: THREE.AdditiveBlending
    });
    const lineSegments = new THREE.LineSegments(linesGeom, linesMat);
    scene.add(lineSegments);

    // --- 3. Stanje interakcije ---
    const mouse = new THREE.Vector2();
    let targetRotationX = 0;
    let targetRotationY = 0;
    let implodeFactor = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotationY = mouse.x * 0.35;
      targetRotationX = -mouse.y * 0.35;
    };

    const onClick = () => {
      implodeFactor = 1.1; 
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- 4. Animaciona petlja ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Glatko rotiranje ka mišu
      pointCloud.rotation.y += (targetRotationY - pointCloud.rotation.y) * 0.04;
      pointCloud.rotation.x += (targetRotationX - pointCloud.rotation.x) * 0.04;
      lineSegments.rotation.copy(pointCloud.rotation);

      const posAttr = particlesGeom.attributes.position;
      const linePosArray = linesGeom.attributes.position.array;
      let lineIdx = 0;

      implodeFactor *= 0.95; 

      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        const pulse = 1 + Math.sin(elapsed * 0.6 + i * 0.05) * 0.012;
        
        const currentX = originalPositions[ix] * pulse;
        const currentY = originalPositions[iy] * pulse;
        const currentZ = originalPositions[iz] * pulse;

        posAttr.array[ix] = currentX * (1 - implodeFactor * 0.55);
        posAttr.array[iy] = currentY * (1 - implodeFactor * 0.55);
        posAttr.array[iz] = currentZ * (1 - implodeFactor * 0.55);

        // Renderovanje veza samo za prvih N čestica (optimizacija)
        if (i < 180 && lineIdx < linePosArray.length - 6) { 
            for (let j = i + 1; j < 180; j++) {
                const jx = j * 3;
                const dx = posAttr.array[ix] - posAttr.array[jx];
                const dy = posAttr.array[iy] - posAttr.array[jx+1];
                const dz = posAttr.array[iz] - posAttr.array[jx+2];
                const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

                if (dist < lineMaxDistance) {
                    linePosArray[lineIdx++] = posAttr.array[ix];
                    linePosArray[lineIdx++] = posAttr.array[iy];
                    linePosArray[lineIdx++] = posAttr.array[iz];
                    linePosArray[lineIdx++] = posAttr.array[jx];
                    linePosArray[lineIdx++] = posAttr.array[jx+1];
                    linePosArray[lineIdx++] = posAttr.array[jx+2];
                }
            }
        }
      }

      // Čišćenje preostalih linija
      for (let k = lineIdx; k < linePosArray.length; k++) {
        linePosArray[k] = 0;
      }

      posAttr.needsUpdate = true;
      linesGeom.attributes.position.needsUpdate = true;
      
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      renderer.dispose();
      particlesGeom.dispose();
      particlesMat.dispose();
      linesGeom.dispose();
      linesMat.dispose();
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-0 min-h-[100dvh] w-full bg-[#030303] overflow-hidden"
    >
      {/* Centralni žig (Kresic Digital Systems) - Optimizovana vidljivost */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none px-6 text-center">
        <h2 className="font-mono text-white/[0.20] text-[5vw] md:text-[3.5vw] tracking-[0.6em] uppercase whitespace-nowrap blur-[0.4px] drop-shadow-[0_0_20px_rgba(255,255,255,0.03)] transition-opacity duration-1000">
          Kresic Digital Systems
        </h2>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.04)_0%,transparent_75%)] pointer-events-none"></div>

      {/* HUD Overlay */}
      <div className="absolute bottom-10 right-10 pointer-events-none select-none text-right hidden sm:block">
        <div className="flex items-center justify-end gap-3 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></div>
          <span className="font-mono text-[10px] text-white/40 tracking-[0.3em] uppercase">
            System_Core.Online
          </span>
        </div>
        <div className="font-mono text-[8px] text-white/20 uppercase tracking-widest">
          UID: {sessionUid ?? "--------"} · Protocol: Neural_Sync
        </div>
      </div>

      {/* Scanlines Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] opacity-10"></div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)] pointer-events-none"></div>
    </div>
  );
}