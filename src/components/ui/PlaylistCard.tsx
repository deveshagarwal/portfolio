"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SpotifyPlaylist } from "@/lib/spotify";
import { Music } from "lucide-react";

interface PlaylistCardProps {
  playlist: SpotifyPlaylist;
  index: number;
}

export function PlaylistCard({ playlist, index }: PlaylistCardProps) {
  const imageUrl = playlist.images?.[0]?.url || '/images/playlist-placeholder.png';

  return (
    <motion.a
      href={playlist.external_urls.spotify}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Card Container */}
      <div className="relative overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 h-full">
        {/* Album Art */}
        <div className="relative w-full aspect-square overflow-hidden">
          {playlist.images?.[0]?.url ? (
            <Image
              src={imageUrl}
              alt={playlist.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
              <Music className="w-16 h-16 text-white/30" />
            </div>
          )}
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Playlist Info */}
        <div className="p-4">
          <h3 className="font-semibold text-white text-lg mb-2 line-clamp-1 group-hover:text-green-400 transition-colors">
            {playlist.name}
          </h3>

          {playlist.description && (
            <p className="text-sm text-white/60 line-clamp-2 mb-2">
              {playlist.description}
            </p>
          )}

          <div className="flex items-center justify-between text-xs text-white/50">
            <span>{playlist.tracks.total} tracks</span>
            {playlist.owner && (
              <span className="line-clamp-1">by {playlist.owner.display_name}</span>
            )}
          </div>
        </div>

        {/* Spotify Green Accent */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-green-500 rounded-full p-2">
            <svg
              className="w-4 h-4 text-black"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
          </div>
        </div>
      </div>
    </motion.a>
  );
}
