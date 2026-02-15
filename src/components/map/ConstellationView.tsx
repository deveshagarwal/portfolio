"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapConnection, MapNode as MapNodeType } from "@/types";
import { MapNode } from "./MapNode";

interface ConstellationViewProps {
  nodes: MapNodeType[];
  connections: MapConnection[];
}

export function ConstellationView({
  nodes,
  connections,
}: ConstellationViewProps) {
  // Track rotation angle for counter-rotating text
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 120000; // 120 seconds in ms

    const updateRotation = () => {
      const elapsed = Date.now() - startTime;
      const angle = (elapsed / duration) * 360;
      setRotationAngle(angle % 360);
      requestAnimationFrame(updateRotation);
    };

    const animationFrame = requestAnimationFrame(updateRotation);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Generate random background stars only once
  const backgroundStars = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.5 + 0.2,
      twinkle: Math.random() * 2 + 2,
      delay: Math.random() * 2,
    })), []
  );

  // Get center node
  const centerNode = nodes.find(n => n.isCenter);
  const outerNodes = nodes.filter(n => !n.isCenter);

  return (
    <svg
      viewBox={isMobile ? "10 10 80 80" : "0 0 100 100"}
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Background stars */}
      <g className="background-stars">
        {backgroundStars.map((star) => (
          <motion.circle
            key={star.id}
            cx={star.x}
            cy={star.y}
            r={star.size}
            className="fill-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [star.opacity, star.opacity * 0.3, star.opacity] }}
            transition={{
              duration: star.twinkle,
              repeat: Infinity,
              ease: "easeInOut",
              delay: star.delay
            }}
          />
        ))}
      </g>

      <defs>
        <filter id="lineGlow">
          <feGaussianBlur stdDeviation="0.3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Rotating group - connection lines and outer nodes revolve together */}
      <g transform={`rotate(${rotationAngle} 50 50)`}>
        {/* Connection lines from center (50,50) to each outer node - render first so they're behind */}
        <g className="connections">
          {outerNodes.map((node, index) => {
            const nodeX = node.position.x;
            const nodeY = node.position.y;

            return (
              <React.Fragment key={`connection-${node.id}`}>
                {/* Glow layer */}
                <line
                  x1={50}
                  y1={50}
                  x2={nodeX}
                  y2={nodeY}
                  className="stroke-blue-200"
                  strokeWidth="0.4"
                  filter="url(#lineGlow)"
                  opacity={0.2}
                />
                {/* Main line */}
                <line
                  x1={50}
                  y1={50}
                  x2={nodeX}
                  y2={nodeY}
                  className="stroke-white"
                  strokeWidth="0.15"
                  opacity={0.3}
                />
              </React.Fragment>
            );
          })}
        </g>

        {/* Outer nodes */}
        <g className="nodes">
          {outerNodes.map((node) => (
            <MapNode
              key={node.id}
              id={node.id}
              label={node.label}
              targetSection={node.targetSection}
              x={node.position.x}
              y={node.position.y}
              isCenter={false}
              icon={(node as any).icon}
              rotationAngle={rotationAngle}
            />
          ))}
        </g>
      </g>

      {/* Center node - stationary and rendered last so it's on top */}
      {centerNode && (
        <g className="center-node">
          <MapNode
            key={centerNode.id}
            id={centerNode.id}
            label={centerNode.label}
            targetSection={centerNode.targetSection}
            x={centerNode.position.x}
            y={centerNode.position.y}
            isCenter={centerNode.isCenter}
            icon={(centerNode as any).icon}
          />
        </g>
      )}
    </svg>
  );
}
