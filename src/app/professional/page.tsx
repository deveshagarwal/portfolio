"use client";

import { Professional } from "@/components/sections/Professional";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfessionalPage() {
  return (
    <main className="relative min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-8 left-8 z-50"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-white hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </motion.div>
      <Professional />
    </main>
  );
}
