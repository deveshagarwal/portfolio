"use client";

import { motion } from "framer-motion";
import { Download, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ResumePage() {
  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-6"
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-white hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Portfolio
          </Link>

          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Resume
          </a>
        </motion.div>

        {/* PDF Viewer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full bg-white rounded-lg shadow-2xl overflow-hidden"
          style={{ height: "calc(100vh - 140px)" }}
        >
          <iframe
            src="/resume.pdf"
            className="w-full h-full"
            title="Resume"
          />
        </motion.div>
      </div>
    </main>
  );
}
