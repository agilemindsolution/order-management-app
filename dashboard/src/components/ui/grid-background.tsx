
"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export const GridBackground = ({
  className = "",
}: {
  className?: string;
}) => {
  const gridSize = 40;
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseEntered, setMouseEntered] = useState(false);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCursorPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  useEffect(() => {
    const containerElement = containerRef.current;
    if (containerElement) {
      containerElement.addEventListener("mousemove", handleMouseMove as any);
      containerElement.addEventListener("mouseenter", () => setMouseEntered(true));
      containerElement.addEventListener("mouseleave", () => setMouseEntered(false));
    }
    
    return () => {
      if (containerElement) {
        containerElement.removeEventListener("mousemove", handleMouseMove as any);
        containerElement.removeEventListener("mouseenter", () => setMouseEntered(true));
        containerElement.removeEventListener("mouseleave", () => setMouseEntered(false));
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className={`w-full h-full ${className}`}
    >
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <pattern 
            id="grid-pattern" 
            width={gridSize} 
            height={gridSize} 
            patternUnits="userSpaceOnUse"
          >
            <path 
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`} 
              fill="none" 
              stroke="rgba(59, 130, 246, 0.15)" 
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
      
      {mouseEntered && (
        <motion.div 
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 250,
            height: 250,
            borderRadius: '50%',
            x: cursorPosition.x - 125, 
            y: cursorPosition.y - 125,
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0) 70%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </div>
  );
};
