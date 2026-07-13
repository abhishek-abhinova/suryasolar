import React, { useEffect, useRef, useState } from 'react';

const AnimatedCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  
  const mouseCoords = useRef({ x: 0, y: 0 });
  const dotCoords = useRef({ x: 0, y: 0 });
  const ringCoords = useRef({ x: 0, y: 0 });
  
  const dotScale = useRef(1);
  const ringScale = useRef(1);
  
  const isHoveredRef = useRef(false);
  const isVisibleRef = useRef(false);

  const [isTouchDevice] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0)
    );
  });

  useEffect(() => {
    if (isTouchDevice) return;

    // 1. Mouse movement tracking
    const handleMouseMove = (e) => {
      mouseCoords.current = { x: e.clientX, y: e.clientY };
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    // 2. High-performance event delegation for hover states (runs at native speed)
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      
      const isClickable = target.closest('a, button, input, select, textarea, [role="button"], input[type="range"]');
      const hovered = !!isClickable;
      
      if (hovered !== isHoveredRef.current) {
        isHoveredRef.current = hovered;
        
        // Dynamically update colors to avoid React state triggers
        if (ringRef.current) {
          if (hovered) {
            ringRef.current.style.backgroundColor = 'rgba(15, 118, 110, 0.12)';
            ringRef.current.style.borderColor = '#FDB813';
          } else {
            ringRef.current.style.backgroundColor = 'transparent';
            ringRef.current.style.borderColor = 'rgba(15, 118, 110, 0.45)';
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // 3. Animation loop using requestAnimationFrame (rAF)
    let animationFrameId;
    
    const renderCursor = () => {
      // Snappy LERP follow for the inner dot
      dotCoords.current.x += (mouseCoords.current.x - dotCoords.current.x) * 0.35;
      dotCoords.current.y += (mouseCoords.current.y - dotCoords.current.y) * 0.35;
      
      // Buttery smooth fluid LERP follow for the outer ring
      ringCoords.current.x += (mouseCoords.current.x - ringCoords.current.x) * 0.15;
      ringCoords.current.y += (mouseCoords.current.y - ringCoords.current.y) * 0.15;
      
      // LERP calculation for scaling on hover
      const targetDotScale = isHoveredRef.current ? 1.5 : 1;
      const targetRingScale = isHoveredRef.current ? 1.7 : 1;
      
      dotScale.current += (targetDotScale - dotScale.current) * 0.2;
      ringScale.current += (targetRingScale - ringScale.current) * 0.15;
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotCoords.current.x}px, ${dotCoords.current.y}px, 0) translate(-50%, -50%) scale(${dotScale.current})`;
      }
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringCoords.current.x}px, ${ringCoords.current.y}px, 0) translate(-50%, -50%) scale(${ringScale.current})`;
      }
      
      animationFrameId = requestAnimationFrame(renderCursor);
    };
    
    animationFrameId = requestAnimationFrame(renderCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Hide native browser cursor only on desktop devices with hover support */}
      <style>{`
        @media (pointer: fine) {
          body, a, button, input, select, textarea, [role="button"], input[type="range"] {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Snappy Center Dot */}
      <div
        ref={dotRef}
        className="hidden md:block fixed pointer-events-none z-[9999] rounded-full w-2.5 h-2.5 bg-primary"
        style={{
          left: 0,
          top: 0,
          transform: 'translate3d(0, 0, 0) translate(-50%, -50%) scale(1)',
          opacity: 0,
          transition: 'opacity 0.2s ease-out',
        }}
      />

      {/* Fluid Trailing Outer Ring */}
      <div
        ref={ringRef}
        className="hidden md:block fixed pointer-events-none z-[9998] rounded-full border-2 transition-colors duration-300"
        style={{
          left: 0,
          top: 0,
          width: '26px',
          height: '26px',
          backgroundColor: 'transparent',
          borderColor: 'rgba(15, 118, 110, 0.45)',
          transform: 'translate3d(0, 0, 0) translate(-50%, -50%) scale(1)',
          opacity: 0,
          transition: 'opacity 0.2s ease-out',
        }}
      />
    </>
  );
};

export default AnimatedCursor;
