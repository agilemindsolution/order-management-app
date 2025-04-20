
"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const BackgroundBeams = ({
  className = "",
}: {
  className?: string;
}) => {
  const beamRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setCursorPosition({ x: clientX, y: clientY });
    };

    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculateRotation = () => {
    if (!beamRef.current) return { x: 0, y: 0 };
    const rect = beamRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotationX = (cursorPosition.y - centerY) / 50;
    const rotationY = (cursorPosition.x - centerX) / 50;

    return { x: rotationX, y: rotationY };
  };

  const rotation = calculateRotation();

  return (
    <div
      ref={beamRef}
      className={`h-full absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.div
        style={{
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        className="relative h-full w-full"
      >
        <div className="absolute inset-0 z-50 w-full h-full [mask-image:radial-gradient(rgba(0,0,0,1),transparent_70%)]" />
        
        <div className="absolute bottom-0 left-[calc(50%-20rem)] aspect-square h-[50rem] bg-gradient-to-r from-blue-600 to-indigo-800 opacity-30 blur-[100px]" />
        <div className="absolute -bottom-48 right-[calc(50%-40rem)] aspect-square h-[50rem] bg-gradient-to-l from-blue-900 to-indigo-700 opacity-30 blur-[100px]" />
        <div className="absolute top-1/4 left-1/4 h-[20rem] w-[30rem] bg-blue-600 opacity-30 blur-[100px]" />
        <div className="absolute top-1/2 right-1/3 h-[20rem] w-[30rem] rotate-12 bg-indigo-600 opacity-20 blur-[100px]" />
      </motion.div>
    </div>
  );
};
