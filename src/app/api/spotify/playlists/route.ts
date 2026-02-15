import { NextResponse } from 'next/server';
import { getUserPlaylists } from '@/lib/spotify';

export async function GET() {
  try {
    const data = await getUserPlaylists();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Spotify playlists:', error);
    return NextResponse.json(
      { error: 'Failed to fetch playlists' },
      { status: 500 }
    );
  }
}

export const revalidate = 3600; // Revalidate every hour
