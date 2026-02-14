import { NextResponse } from "next/server";
import Parser from "rss-parser";
import moviesData from "@/data/movies.json";

const parser = new Parser({
  customFields: {
    item: [
      ['letterboxd:memberRating', 'memberRating'],
      ['letterboxd:filmTitle', 'filmTitle'],
      ['letterboxd:filmYear', 'filmYear'],
      ['letterboxd:rewatch', 'rewatch'],
    ]
  }
});

// Cache for 1 hour
let cache: { movies: any[]; timestamp: number } | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

const LETTERBOXD_USERNAME = "deveshagarwal";
const LETTERBOXD_RSS_URL = `https://letterboxd.com/${LETTERBOXD_USERNAME}/rss/`;

export async function GET() {
  try {
    // Check cache
    if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
      return NextResponse.json({
        movies: cache.movies,
        intro: moviesData.intro
      });
    }

    // Fetch fresh data from Letterboxd RSS
    const feed = await parser.parseURL(LETTERBOXD_RSS_URL);

    // Parse movies from RSS feed
    const movies = feed.items
      .map((item: any, index: number) => {
        // Get rating from letterboxd:memberRating field
        const rating = parseFloat(item.memberRating || "0");

        // Only include highly rated movies (4+ stars)
        if (rating < 4) return null;

        // Get title and year from custom fields
        const title = item.filmTitle || item.title || "Unknown";
        const year = parseInt(item.filmYear || new Date().getFullYear().toString());

        // Extract poster image from description
        let posterUrl = null;
        if (item.content) {
          const imgMatch = item.content.match(/<img[^>]+src="([^"]+)"/);
          if (imgMatch) {
            posterUrl = imgMatch[1];
          }
        }

        return {
          id: `letterboxd-${index}`,
          title,
          director: "TBD", // Letterboxd RSS doesn't include director
          year,
          rating,
          genre: "Film",
          posterUrl,
          letterboxdUrl: item.link,
        };
      })
      .filter(Boolean) // Remove null entries
      .slice(0, 10); // Limit to 10 movies

    // Update cache
    cache = {
      movies,
      timestamp: Date.now(),
    };

    return NextResponse.json({
      movies,
      intro: moviesData.intro
    });
  } catch (error) {
    console.error("Error fetching Letterboxd feed:", error);
    return NextResponse.json(
      { error: "Failed to fetch movies from Letterboxd" },
      { status: 500 }
    );
  }
}
