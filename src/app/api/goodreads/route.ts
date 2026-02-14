import { NextResponse } from "next/server";
import Parser from "rss-parser";
import booksData from "@/data/books.json";

const parser = new Parser({
  customFields: {
    item: [
      ['book_image_url', 'bookImageUrl'],
      ['book_large_image_url', 'bookLargeImageUrl'],
      ['user_rating', 'userRating'],
      ['author_name', 'authorName'],
      ['book_published', 'bookPublished'],
    ]
  }
});

// Cache for 1 hour
let cache: { books: any[]; timestamp: number } | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

const GOODREADS_USER_ID = "189791537";
const GOODREADS_RSS_URL = `https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}?shelf=read`;

export async function GET() {
  try {
    // Check cache
    if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
      return NextResponse.json({
        books: cache.books,
        intro: booksData.intro
      });
    }

    // Fetch fresh data from Goodreads RSS
    const feed = await parser.parseURL(GOODREADS_RSS_URL);

    // Parse books from RSS feed
    const books = feed.items
      .map((item: any, index: number) => {
        // Extract user rating
        const userRating = parseInt(item.userRating || "0");

        // Extract book title (remove "by Author" part if present)
        const titleMatch = item.title?.match(/^(.+?)\s+by\s+/);
        const title = titleMatch ? titleMatch[1] : item.title || "Unknown";

        // Extract author name
        const author = item.authorName || "Unknown Author";

        // Extract year from book_published or pubDate
        const yearMatch = item.bookPublished?.match(/\d{4}/) ||
                         item.pubDate?.match(/\d{4}/);
        const year = yearMatch ? parseInt(yearMatch[0]) : null;

        // Get book cover image
        const cover = item.bookLargeImageUrl || item.bookImageUrl || null;

        // Extract notes from description (if any)
        const descriptionMatch = item.content?.match(/<br\/><br\/>\s*(.+?)\s*<br\/>/);
        const notes = descriptionMatch ? descriptionMatch[1] : "";

        return {
          id: `goodreads-${index}`,
          title,
          author,
          cover,
          rating: userRating,
          year,
          notes: notes || undefined,
          goodreadsUrl: item.link,
        };
      })
      .filter(Boolean) // Remove null entries
      .slice(0, 50); // Show more books

    // Update cache
    cache = {
      books,
      timestamp: Date.now(),
    };

    return NextResponse.json({
      books,
      intro: booksData.intro
    });
  } catch (error) {
    console.error("Error fetching Goodreads feed:", error);
    return NextResponse.json(
      { error: "Failed to fetch books from Goodreads" },
      { status: 500 }
    );
  }
}
