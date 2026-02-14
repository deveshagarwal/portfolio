"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import personalData from "@/data/personal.json";
import { ConstellationView } from "@/components/map/ConstellationView";
import mapConfig from "@/data/map-config.json";

export function Hero() {
  // Randomize star positions on each load
  const randomizedNodes = useMemo(() => {
    const minDistanceBetweenStars = 20; // Increased from 15 to spread them out more
    const minDistanceFromEdge = 10; // Keep nodes at least 10 units from edge
    const positions: { x: number; y: number }[] = [];

    return mapConfig.nodes.map(node => {
      if (node.isCenter) {
        positions.push({ x: 50, y: 50 });
        return {
          ...node,
          position: { x: 50, y: 50 }
        };
      }

      // Try to find a position that's not too close to other stars or edges
      let attempts = 0;
      let x, y, angle, distance;

      do {
        angle = Math.random() * Math.PI * 2;
        // Vary distance more - between 20-38 units for more organic look
        distance = 20 + Math.random() * 18;
        x = 50 + Math.cos(angle) * distance;
        y = 50 + Math.sin(angle) * distance;
        attempts++;
      } while (
        attempts < 50 &&
        (
          // Check distance from other stars
          positions.some(pos => {
            const dist = Math.sqrt((pos.x - x) ** 2 + (pos.y - y) ** 2);
            return dist < minDistanceBetweenStars;
          }) ||
          // Check distance from edges (with padding for text)
          x < minDistanceFromEdge ||
          x > 100 - minDistanceFromEdge ||
          y < minDistanceFromEdge ||
          y > 100 - minDistanceFromEdge
        )
      );

      positions.push({ x, y });

      return {
        ...node,
        position: { x, y }
      };
    });
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center relative px-4 py-12"
    >
      {/* Constellation Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl relative z-10 mb-12"
      >
        <div className="w-full h-[70vh] relative">
          <ConstellationView
            nodes={randomizedNodes}
            connections={mapConfig.connections}
          />
        </div>
      </motion.div>

      {/* Bio Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center max-w-4xl relative z-10"
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Hi, I'm Devesh!
        </motion.h1>

        <motion.div
          className="text-sm md:text-base text-white/90 max-w-2xl mx-auto space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {personalData.bio.split('\n').map((paragraph, i) => (
            paragraph.trim() && (
              <p
                key={i}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            )
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
