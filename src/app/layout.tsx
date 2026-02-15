import type { Metadata } from "next";
import { Inter, Monofett, Cairo_Play } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { CursorFollower } from "@/components/ui/CursorFollower";
import { Navigation } from "@/components/layout/Navigation";

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
  title: "Portfolio - Your Name",
  description: "Applied Scientist & Creative Thinker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${cairoPlay.variable} ${monofett.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* Content */}
          <div className="relative z-10">
            <div className="fixed inset-0 bg-white/10 pointer-events-none z-1"></div>
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
