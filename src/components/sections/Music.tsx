"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import playlistIds from "@/data/spotify-playlists.json";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react";

export function Music() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollToRandom = useCallback(() => {
    if (!emblaApi) return;
    const randomIndex = Math.floor(Math.random() * playlistIds.length);
    emblaApi.scrollTo(randomIndex);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="music" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading>Music I Like</SectionHeading>

          <motion.div
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-white/80 mb-4">
              A collection of playlists with wildly different vibes. From late night jazz to heavy metal to lo-fi beats — scroll through to find whatever mood strikes.
            </p>
            <button
              onClick={scrollToRandom}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm transition-all"
            >
              <Shuffle className="w-4 h-4" />
              Surprise Me
            </button>
          </motion.div>

          {playlistIds.length > 0 ? (
            <>
              <div className="relative px-16">
                <div className="overflow-visible" ref={emblaRef}>
                  <div className="flex gap-6">
                    {playlistIds.map((playlistId, index) => {
                      const isCenter = index === selectedIndex;

                      return (
                        <motion.div
                          key={playlistId}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: isCenter ? 1 : 0.3,
                            scale: isCenter ? 1 : 0.85,
                            filter: isCenter ? 'blur(0px)' : 'blur(4px)',
                          }}
                          transition={{ duration: 0.5 }}
                          className="flex-[0_0_100%] sm:flex-[0_0_80%] lg:flex-[0_0_60%] min-w-0"
                        >
                          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden h-full">
                            <iframe
                              src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
                              width="100%"
                              height="380"
                              frameBorder="0"
                              allowFullScreen
                              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                              loading="lazy"
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={scrollPrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-3 transition-all z-10"
                  aria-label="Previous playlist"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>

                <button
                  onClick={scrollNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-3 transition-all z-10"
                  aria-label="Next playlist"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                <div className="flex justify-center gap-2 mt-8">
                  {playlistIds.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => emblaApi?.scrollTo(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === selectedIndex
                          ? 'bg-white w-8'
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                      aria-label={`Go to playlist ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <a
                  href="https://open.spotify.com/user/21pbqbpc64xohgu4ogmc2e67y"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-medium rounded-full transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                  Follow Me on Spotify
                </a>
              </motion.div>
            </>
          ) : (
            <div className="text-center py-20 text-white/60">
              <p>Run `python3 scripts/fetch-spotify-playlists.py` to fetch your playlists.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
