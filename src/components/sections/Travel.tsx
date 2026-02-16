"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Dynamically import Globe to avoid SSR issues
const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-[600px]">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  ),
});

interface City {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
}

interface TravelData {
  intro: string;
  cities: City[];
}

export function Travel() {
  const [travelData, setTravelData] = useState<TravelData | null>(null);
  const [loading, setLoading] = useState(true);
  const globeEl = useRef<any>();

  useEffect(() => {
    // Fetch travel data
    fetch("/data/travel.json")
      .then((res) => res.json())
      .then((data) => {
        setTravelData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading travel data:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (globeEl.current && travelData) {
      // Auto-rotate the globe
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.3;
      globeEl.current.controls().enableZoom = true;

      // Add material for points
      const THREE = (window as any).THREE;
      if (THREE) {
        globeEl.current.pointsMaterial(() => new THREE.MeshBasicMaterial({
          color: '#fbbf24',
          transparent: true,
          opacity: 0.9
        }));
      }
    }
  }, [travelData]);

  // Transform cities to points with labels (for tooltips)
  const points = travelData?.cities.map((city) => ({
    lat: city.lat,
    lng: city.lng,
    size: 0.1,
    color: "rgba(251, 191, 36, 0.01)", // Nearly invisible
    label: `${city.name}, ${city.country}`,
  }));

  // Transform cities to HTML elements (for glow effect)
  const htmlMarkers = travelData?.cities.map((city) => ({
    lat: city.lat,
    lng: city.lng,
  }));

  // Calculate unique countries and continents
  const uniqueCountries = travelData ? new Set(travelData.cities.map(city => city.country)).size : 0;
  const uniqueContinents = 5; // Asia, Europe, North America, Australia/Oceania, Africa

  return (
    <section id="travel" className="min-h-screen py-8 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading>Places I've Explored</SectionHeading>

          {travelData?.intro && (
            <div className="mb-8 text-center">
              <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
                {travelData.intro}
              </p>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-[600px]">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm"
            >
              <Globe
                ref={globeEl}
                globeImageUrl="https://unpkg.com/three-globe@2.31.1/example/img/earth-dark.jpg"
                backgroundImageUrl="https://unpkg.com/three-globe@2.31.1/example/img/night-sky.png"
                pointsData={points}
                pointAltitude={0.005}
                pointRadius={(d: any) => d.size}
                pointColor="color"
                pointLabel="label"
                pointsMerge={false}
                pointResolution={32}
                htmlElementsData={htmlMarkers}
                htmlElement={(d: any) => {
                  const el = document.createElement('div');
                  el.innerHTML = `
                    <div style="
                      width: 4px;
                      height: 4px;
                      border-radius: 50%;
                      background: radial-gradient(circle, #fbbf24 0%, #f59e0b 30%, rgba(251, 191, 36, 0) 70%);
                      box-shadow: 0 0 8px 2px rgba(251, 191, 36, 0.8), 0 0 16px 4px rgba(251, 191, 36, 0.4);
                      pointer-events: none;
                    "></div>
                  `;
                  el.style.pointerEvents = 'none';
                  return el;
                }}
                htmlTransitionDuration={0}
                htmlAltitude={0.005}
                atmosphereColor="rgba(100, 150, 255, 0.15)"
                atmosphereAltitude={0.15}
                showAtmosphere={true}
                width={typeof window !== "undefined" ? Math.min(window.innerWidth - 32, 1200) : 1200}
                height={700}
                enablePointerInteraction={true}
              />
            </motion.div>
          )}

          {/* Travel stats */}
          {travelData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12"
            >
              <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 min-w-[200px] hover:bg-white/10 transition-colors">
                  <div className="text-6xl font-bold text-yellow-400 mb-3 text-center">
                    1
                  </div>
                  <div className="text-xl text-white/80 text-center">Planet</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 min-w-[200px] hover:bg-white/10 transition-colors">
                  <div className="text-6xl font-bold text-yellow-400 mb-3 text-center">
                    {uniqueContinents}
                  </div>
                  <div className="text-xl text-white/80 text-center">Continents</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 min-w-[200px] hover:bg-white/10 transition-colors">
                  <div className="text-6xl font-bold text-yellow-400 mb-3 text-center">
                    {uniqueCountries}
                  </div>
                  <div className="text-xl text-white/80 text-center">Countries</div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
