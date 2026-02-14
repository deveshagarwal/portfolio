import { NextResponse } from "next/server";
import { parseSubstackFeed } from "@/lib/rss-parser";
import personalData from "@/data/personal.json";

// Cache for 15 minutes
let cache: { articles: any[]; timestamp: number } | null = null;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

export async function GET() {
  try {
    // Check cache
    if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
      return NextResponse.json({ articles: cache.articles });
    }

    // Fetch fresh data
    const articles = await parseSubstackFeed(personalData.substackUrl);

    // Update cache
    cache = {
      articles,
      timestamp: Date.now(),
    };

    return NextResponse.json({ articles });
  } catch (error) {
    console.error("Error fetching Substack feed:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
