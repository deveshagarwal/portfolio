// Web scraping approach to get public Spotify playlists
// No API authentication needed!

import * as cheerio from 'cheerio';

const SPOTIFY_USER_ID = '21pbqbpc64xohgu4ogmc2e67y';

export const getUserPlaylists = async () => {
  try {
    const response = await fetch(
      `https://open.spotify.com/user/${SPOTIFY_USER_ID}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract playlist data from the page's JSON-LD structured data
    const scriptTag = $('script[type="application/ld+json"]').html();

    if (scriptTag) {
      const structuredData = JSON.parse(scriptTag);
      return structuredData;
    }

    // Fallback: try to extract from meta tags
    const playlists: any[] = [];

    // Look for playlist links and data
    $('a[href*="/playlist/"]').each((i, elem) => {
      const href = $(elem).attr('href');
      const text = $(elem).text().trim();

      if (href && text) {
        const playlistId = href.split('/playlist/')[1]?.split('?')[0];
        if (playlistId && !playlists.find(p => p.id === playlistId)) {
          playlists.push({
            id: playlistId,
            name: text,
            external_urls: {
              spotify: `https://open.spotify.com/playlist/${playlistId}`
            }
          });
        }
      }
    });

    return { items: playlists };
  } catch (error) {
    console.error('Error scraping Spotify profile:', error);
    return { items: [] };
  }
};

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: { url: string; height: number; width: number }[];
  tracks: { total: number };
  external_urls: { spotify: string };
  owner: { display_name: string };
  public: boolean;
}
