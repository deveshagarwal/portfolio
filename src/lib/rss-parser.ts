import Parser from "rss-parser";
import { SubstackArticle } from "@/types";

const parser = new Parser({
  customFields: {
    item: ['enclosure']
  }
});

export async function parseSubstackFeed(
  feedUrl: string
): Promise<SubstackArticle[]> {
  try {
    const feed = await parser.parseURL(feedUrl);

    return (
      feed.items?.map((item: any) => {
        // Extract image from enclosure tag or content
        let imageUrl = null;
        if (item.enclosure?.url) {
          imageUrl = item.enclosure.url;
        } else if (item.content) {
          // Fallback: extract first image from content
          const imgMatch = item.content.match(/<img[^>]+src="([^"]+)"/);
          if (imgMatch) {
            imageUrl = imgMatch[1];
          }
        }

        return {
          title: item.title || "",
          link: item.link || "",
          pubDate: item.pubDate || "",
          contentSnippet: item.contentSnippet || "",
          content: item.content || "",
          imageUrl,
        };
      }) || []
    );
  } catch (error) {
    console.error("Error parsing RSS feed:", error);
    throw new Error("Failed to parse RSS feed");
  }
}
