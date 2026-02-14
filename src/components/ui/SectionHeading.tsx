import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "text-4xl md:text-5xl font-bold mb-8 text-center",
        className
      )}
    >
      {children}
    </h2>
  );
}
