"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Star, Loader2, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

interface Movie {
  id: string;
  title: string;
  director: string;
  year: number;
  rating: number;
  genre: string;
  posterUrl?: string;
  letterboxdUrl?: string;
}

export function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [intro, setIntro] = useState<string>("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch("/api/letterboxd");
        if (!response.ok) throw new Error("Failed to fetch movies");
        const data = await response.json();
        setMovies(data.movies);
        setIntro(data.intro || "");
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Unable to load movies from Letterboxd");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <section id="movies" className="min-h-screen py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading>Movies I've Recently Enjoyed</SectionHeading>

          {intro && (
            <div className="mb-12 text-center">
              <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
                {intro}
              </p>
            </div>
          )}

          {loading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {movies.map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow h-full overflow-hidden">
                      {movie.posterUrl && (
                        <div className="aspect-[2/3] relative overflow-hidden bg-muted">
                          <img
                            src={movie.posterUrl}
                            alt={movie.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                      <CardHeader className="pb-2 p-3">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-sm line-clamp-2 leading-tight">{movie.title}</CardTitle>
                          {movie.letterboxdUrl && (
                            <a
                              href={movie.letterboxdUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="p-3 pt-0">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => {
                              const filled = i < Math.floor(movie.rating);
                              const halfFilled = i < movie.rating && i >= Math.floor(movie.rating);
                              return (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    filled
                                      ? "fill-yellow-400 text-yellow-400"
                                      : halfFilled
                                      ? "fill-yellow-400/50 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              );
                            })}
                          </div>
                          <span className="text-muted-foreground">{movie.year}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 flex justify-center"
              >
                <a
                  href="https://letterboxd.com/deveshagarwal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors group"
                >
                  <img
                    src="/images/letterboxd-circles.svg"
                    alt="Letterboxd"
                    className="w-8 h-8"
                  />
                  <span className="font-medium">See more of what I watch on Letterboxd</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
