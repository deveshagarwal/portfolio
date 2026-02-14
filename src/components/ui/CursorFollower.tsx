"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function CursorFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollComets, setScrollComets] = useState<{ id: number; x: number; y: number; direction: number }[]>([]);

  useEffect(() => {
    // Detect if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    let animationFrameId: number;
    let lastScrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout;

    const updateMousePosition = (e: MouseEvent) => {
      if (!isMobile) {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      if (!isMobile) {
        setIsVisible(false);
      }
    };

    // Handle scroll on mobile - create comet effect
    const handleScroll = () => {
      if (isMobile) {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY;

        if (Math.abs(scrollDelta) > 5) {
          const direction = scrollDelta > 0 ? 1 : -1;
          const newComet = {
            id: Date.now(),
            x: Math.random() * window.innerWidth,
            y: window.innerHeight / 2,
            direction
          };
          setScrollComets((prev) => [...prev, newComet]);

          // Remove comet after animation
          setTimeout(() => {
            setScrollComets((prev) => prev.filter((c) => c.id !== newComet.id));
          }, 800);
        }

        lastScrollY = currentScrollY;
      }
    };

    // Update trail on every frame (desktop only)
    const updateTrail = () => {
      if (!isMobile) {
        setTrail((prev) => {
          const newTrail = [{ x: mousePosition.x, y: mousePosition.y }, ...prev];
          return newTrail.slice(0, 12);
        });
      }
      animationFrameId = requestAnimationFrame(updateTrail);
    };

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });
    animationFrameId = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('resize', checkMobile);
      cancelAnimationFrame(animationFrameId);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [mousePosition, isMobile]);

  return (
    <>
      {/* Mobile scroll comets */}
      {isMobile && scrollComets.map((comet) => (
        <motion.div
          key={comet.id}
          className="fixed pointer-events-none z-50"
          initial={{
            x: comet.x,
            y: comet.y,
            opacity: 1,
            scale: 1
          }}
          animate={{
            x: comet.direction > 0 ? comet.x + 300 : comet.x - 300,
            y: comet.y + comet.direction * 100,
            opacity: 0,
            scale: 0.5
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative w-3 h-3">
            <div className="absolute inset-0 bg-white rounded-full blur-sm" />
            <div className="absolute inset-0.5 bg-blue-200 rounded-full" />
            {/* Trail effect */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-blue-300 via-blue-400 to-transparent"
              style={{
                width: '60px',
                right: comet.direction > 0 ? '100%' : 'auto',
                left: comet.direction < 0 ? '100%' : 'auto',
                transform: comet.direction < 0 ? 'scaleX(-1) translateY(-50%)' : 'translateY(-50%)'
              }}
            />
          </div>
        </motion.div>
      ))}

      {/* Desktop cursor follower */}
      {!isMobile && isVisible && (
        <>
          {/* Comet tail - smooth curved gradient */}
          {trail.length > 2 && (
        <svg
          className="fixed pointer-events-none z-50 inset-0 w-full h-full"
          style={{ mixBlendMode: "screen" }}
        >
          <defs>
            <linearGradient id="tailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(147, 197, 253, 0.8)" />
              <stop offset="50%" stopColor="rgba(96, 165, 250, 0.4)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
            </linearGradient>
          </defs>
          <path
            d={`M ${trail[0].x},${trail[0].y} ${trail
              .slice(1, -1)
              .map((pos, i) => {
                const next = trail[i + 2];
                const cx = (pos.x + next.x) / 2;
                const cy = (pos.y + next.y) / 2;
                return `Q ${pos.x},${pos.y} ${cx},${cy}`;
              })
              .join(" ")}`}
            stroke="url(#tailGradient)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            filter="blur(0.5px)"
          />
        </svg>
      )}

      {/* Star/comet core - bright center */}
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 500,
          mass: 0.5,
        }}
      >
        <div className="relative w-4 h-4">
          {/* Bright star core */}
          <div className="absolute inset-0 bg-white rounded-full blur-sm" />
          <div className="absolute inset-1 bg-blue-200 rounded-full" />
          {/* Star points */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center rotate-90">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent" />
          </div>
        </div>
      </motion.div>

      {/* Nebula glow effect */}
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 32,
          y: mousePosition.y - 32,
          scale: [1, 1.1, 1],
        }}
        transition={{
          x: { type: "spring", damping: 15, stiffness: 150, mass: 1 },
          y: { type: "spring", damping: 15, stiffness: 150, mass: 1 },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div className="w-16 h-16 rounded-full bg-gradient-radial from-purple-400/20 via-blue-400/10 to-transparent blur-md" />
      </motion.div>
        </>
      )}
    </>
  );
}
