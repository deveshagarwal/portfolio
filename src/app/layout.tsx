import type { Metadata } from "next";
import { Inter, Monofett, Cairo_Play } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { CursorFollower } from "@/components/ui/CursorFollower";
import { Navigation } from "@/components/layout/Navigation";
import { StructuredData } from "@/components/seo/StructuredData";

const cairoPlay = Cairo_Play({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-heading-primary"
});

const monofett = Monofett({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading-secondary"
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  metadataBase: new URL('https://verydevesh.vercel.app'),
  title: "Devesh Agarwal - Machine Learning Engineer & Applied Scientist",
  description: "Devesh Agarwal is a Machine Learning Engineer and Applied Scientist specializing in AI/ML, RAG systems, computer vision, and GenAI. Currently at Thumbtack. Previously Equinix and Visa. UC Berkeley graduate with expertise in Python, PyTorch, and LLMs.",
  keywords: [
    "Devesh Agarwal",
    "Devesh",
    "Devesh Agarwal portfolio",
    "Devesh Agarwal Machine Learning",
    "Devesh Agarwal Berkeley",
    "Devesh Agarwal Thumbtack",
    "Devesh Agarwal Equinix",
    "Machine Learning Engineer",
    "Applied Scientist",
    "AI Engineer",
    "Data Scientist",
    "RAG",
    "LLM",
    "Computer Vision",
    "Python",
    "PyTorch",
    "GenAI",
    "Berkeley",
    "Thumbtack",
    "Equinix",
    "ML Engineer NYC",
    "AI jobs"
  ],
  authors: [{ name: "Devesh Agarwal" }],
  creator: "Devesh Agarwal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://verydevesh.vercel.app",
    title: "Devesh Agarwal - Machine Learning Engineer & Applied Scientist",
    description: "Devesh Agarwal - Machine Learning Engineer specializing in AI/ML, RAG systems, computer vision, and GenAI. Currently at Thumbtack.",
    siteName: "Devesh Agarwal",
    images: [
      {
        url: "/images/profile.jpeg",
        width: 1200,
        height: 630,
        alt: "Devesh Agarwal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devesh Agarwal - Machine Learning Engineer & Applied Scientist",
    description: "Machine Learning Engineer specializing in AI/ML, RAG systems, and computer vision. Available for hire.",
    images: ["/images/profile.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={`${inter.variable} ${cairoPlay.variable} ${monofett.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* Content */}
          <div className="relative z-10">
            <div className="relative z-20">
              <CursorFollower />
              <Navigation />
              <ThemeToggle />
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
