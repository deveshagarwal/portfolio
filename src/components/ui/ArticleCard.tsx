"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { formatDate, truncateText } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface ArticleCardProps {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
  imageUrl?: string;
}

export function ArticleCard({
  title,
  link,
  pubDate,
  excerpt,
  imageUrl,
}: ArticleCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden h-full">
      {imageUrl && (
        <div className="aspect-[16/9] relative overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg line-clamp-2 flex-1">{title}</CardTitle>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors flex-shrink-0"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
        <p className="text-sm text-muted-foreground">{formatDate(pubDate)}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {truncateText(excerpt, 150)}
        </p>
      </CardContent>
    </Card>
  );
}
