"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { SubstackArticle } from "@/types";
import { Loader2 } from "lucide-react";

export function Writing() {
  const [articles, setArticles] = useState<SubstackArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const intro = "I write when something won't leave me alone. Sometimes it's an idea I'm trying to untangle. Sometimes it's just an observation that refuses to sit still. My Substack is where I think out loud—essays on technology, culture, human behavior, and whatever else captures my attention.";

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch("/api/substack");
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load articles"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  return (
    <section id="writing" className="min-h-screen py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading>Writing</SectionHeading>

          <div className="mb-12 text-center">
            <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
              {intro}
            </p>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">{error}</p>
              <p className="text-sm text-muted-foreground">
                Update your Substack URL in <code>src/data/personal.json</code>
              </p>
            </div>
          )}

          {!loading && !error && articles.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">
                No articles found. Check your Substack feed URL.
              </p>
            </div>
          )}

          {!loading && !error && articles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <motion.div
                  key={article.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ArticleCard
                    title={article.title}
                    link={article.link}
                    pubDate={article.pubDate}
                    excerpt={article.contentSnippet}
                    imageUrl={article.imageUrl}
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
