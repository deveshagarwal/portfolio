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
          )}
        </motion.div>
      </div>
    </section>
  );
}
