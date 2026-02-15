#!/usr/bin/env python3
"""
Script to fetch public Spotify playlists and save them to a JSON file.
Run this periodically to update your playlists.
"""

import json
import re
import urllib.request
from urllib.error import URLError

SPOTIFY_USER_ID = "21pbqbpc64xohgu4ogmc2e67y"
OUTPUT_FILE = "src/data/spotify-playlists.json"

def fetch_playlists():
    url = f"https://open.spotify.com/user/{SPOTIFY_USER_ID}"

    try:
        req = urllib.request.Request(
            url,
            headers={
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            }
        )

        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')

        # Find all playlist IDs in the HTML
        playlist_pattern = r'/playlist/([a-zA-Z0-9]+)'
        playlist_ids = list(set(re.findall(playlist_pattern, html)))

        print(f"Found {len(playlist_ids)} playlists")

        # Save to JSON
        with open(OUTPUT_FILE, 'w') as f:
            json.dump(playlist_ids, f, indent=2)

        print(f"Saved playlists to {OUTPUT_FILE}")
        return playlist_ids

    except URLError as e:
        print(f"Error fetching playlists: {e}")
        return []

if __name__ == "__main__":
    playlists = fetch_playlists()
    print(f"\nPlaylist IDs:")
    for pid in playlists:
        print(f"  - {pid}")
