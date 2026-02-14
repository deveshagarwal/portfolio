"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface MapNodeProps {
  id: string;
  label: string;
  targetSection: string;
  x: number;
  y: number;
  isCenter?: boolean;
  icon?: string;
  rotationAngle?: number;
}

export function MapNode({ id, label, targetSection, x, y, isCenter, icon, rotationAngle = 0 }: MapNodeProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push(targetSection);
  };

  // Icon path data and colors for different icons - cleaner, more modern designs
  const iconPaths: Record<string, string> = {
    briefcase: "M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4z",
    pen: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 5.63l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 0 0 0-1.41z",
    book: "M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zM3 18.5V7c1.1-.35 2.3-.5 3.5-.5 1.7 0 4.15.65 5.5 1.5v11.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5zm18 0c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z",
    film: "M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"
  };

  const iconColors: Record<string, string> = {
    briefcase: "#000000", // black
    pen: "#000000", // black
    book: "#000000", // black
    film: "#000000" // black
  };

  if (isCenter) {
    return (
      <g
        onClick={handleClick}
        className="cursor-pointer"
        transform={`translate(${x}, ${y})`}
      >
        {/* Subtle glow for center node */}
        <motion.circle
          cx="0"
          cy="0"
          r="12"
          className="fill-white opacity-5"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Profile image circle - looks like a brighter star */}
        <motion.circle
          cx="0"
          cy="0"
          r="8"
          className="fill-white/30"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
        {/* Image (using clipPath for circular mask) */}
        <defs>
          <clipPath id="profileClip">
            <circle cx="0" cy="0" r="7.5" />
          </clipPath>
        </defs>
        <motion.image
          href="/images/profile.jpeg"
          x="-7.5"
          y="-7.5"
          width="15"
          height="15"
          clipPath="url(#profileClip)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      </g>
    );
  }

  return (
    <g
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer"
      transform={`translate(${x}, ${y})`}
    >
      {/* Outer glow effect - star-like */}
      <motion.circle
        cx="0"
        cy="0"
        r="8"
        className="fill-white"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.05, 0.15]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 2
        }}
      />
      {/* Star background circle - white */}
      <motion.circle
        cx="0"
        cy="0"
        r="5"
        className="fill-white"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
      {/* Counter-rotate group for icon and text to keep them upright */}
      <g transform={`rotate(${-rotationAngle})`}>
        {/* Colored icon - centered inside circle */}
        {icon && iconPaths[icon] && (
          <g transform="translate(-2, -2) scale(0.17)">
            <motion.path
              d={iconPaths[icon]}
              fill={iconColors[icon]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
            {/* Add spine line for book icon */}
            {icon === 'book' && (
              <motion.line
                x1="12"
                y1="5"
                x2="12"
                y2="21"
                stroke={iconColors[icon]}
                strokeWidth="0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            )}
          </g>
        )}
        {/* Label on hover */}
        <motion.text
          x="0"
          y="9"
          textAnchor="middle"
          className="fill-white pointer-events-none font-light"
          style={{ fontSize: '2.5px', letterSpacing: '0.05em' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.9 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.text>
      </g>
    </g>
  );
}
