"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { Star } from "lucide-react";

interface MediaCardProps {
  title: string;
  subtitle: string;
  rating: number;
  year: number;
  imageUrl?: string;
  notes?: string;
}

export function MediaCard({
  title,
  subtitle,
  rating,
  year,
  imageUrl,
  notes,
}: MediaCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {imageUrl && (
        <div className="aspect-[2/3] relative overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <CardHeader className="pb-2 p-3">
        <CardTitle className="text-sm line-clamp-2 leading-tight">{title}</CardTitle>
        <p className="text-xs text-muted-foreground line-clamp-1">{subtitle}</p>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          {year && <span className="text-muted-foreground">{year}</span>}
        </div>
        {notes && <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{notes}</p>}
      </CardContent>
    </Card>
  );
}
