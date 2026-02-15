"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaCard } from "@/components/ui/MediaCard";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Book {
  id: string;
  title: string;
  author: string;
  cover?: string;
  rating: number;
  year?: number;
  notes?: string;
  goodreadsUrl?: string;
}

export function Reading() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [intro, setIntro] = useState<string>("");

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch("/api/goodreads");
        if (!response.ok) throw new Error("Failed to fetch books");
        const data = await response.json();
        setBooks(data.books);
        setIntro(data.intro || "");
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Unable to load books from Goodreads");
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  return (
    <section id="reading" className="min-h-screen py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading>Books I've Read Lately</SectionHeading>

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
                {books.map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <MediaCard
                      title={book.title}
                      subtitle={book.author}
                      rating={book.rating}
                      year={book.year}
                      imageUrl={book.cover}
                      notes={book.notes}
                    />
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <a
                  href="https://www.goodreads.com/user/show/189791537"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-medium rounded-full transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.827 17.064c-.348.446-1.116.848-1.932.848-1.092 0-1.932-.6-2.016-1.848h-.072c-.396.972-1.212 1.968-2.844 1.968-1.848 0-3.24-1.416-3.24-3.528 0-2.184 1.428-3.6 3.42-3.6 1.488 0 2.376.828 2.736 1.752h.072v-1.536h1.752v5.088c0 .6.3.876.696.876.348 0 .672-.18.9-.48l.528.46zm-6.564-.936c1.2 0 1.968-1.056 1.968-2.592 0-1.536-.768-2.592-1.968-2.592-1.188 0-1.956 1.056-1.956 2.592 0 1.536.768 2.592 1.956 2.592z"/>
                  </svg>
                  Follow Me on Goodreads
                </a>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
