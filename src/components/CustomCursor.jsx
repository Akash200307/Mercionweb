import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  
  useEffect(() => {
    // Check if the device supports hover (i.e. is a desktop with a mouse)
    const hasHover = window.matchMedia('(hover: hover)').matches;
    const isMobile = window.innerWidth <= 1024;
    
    if (!hasHover || isMobile) {
      setIsTouchDevice(true);
      return;
    }
    
    setIsTouchDevice(false);
    
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    
    let mx = 0, my = 0, rx = 0, ry = 0;
    
    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };
    
    document.addEventListener('mousemove', onMouseMove);
    
    let animationFrameId;
    
    const render = () => {
      if (cursor && ring) {
        // GPU accelerated translate3d instead of layout-triggering left/top
        cursor.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
        
        // Smooth easing for the ring
        rx += (mx - rx) * 0.15;
        ry += (my - ry) * 0.15;
        
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-ring" ref={ringRef}></div>
    </>
  );
}
