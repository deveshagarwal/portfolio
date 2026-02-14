"use client";

import { motion } from "framer-motion";
import { ConstellationView } from "./ConstellationView";
import mapConfig from "@/data/map-config.json";

export function MapOfMe() {
  return (
    <section
      id="map"
      className="min-h-screen flex items-center justify-center py-12 px-4"
    >
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Navigate My World
          </h2>
          <p className="text-lg">
            Click on any of the stars to explore different aspects of my journey
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full h-[70vh] relative"
        >
          <ConstellationView
            nodes={mapConfig.nodes}
            connections={mapConfig.connections}
          />
        </motion.div>
      </div>
    </section>
  );
}
