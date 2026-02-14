"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import personalData from "@/data/personal.json";
import { Github, Linkedin, Twitter, Mail, Facebook, Instagram, BookOpen } from "lucide-react";
import { useState } from "react";

const iconMap: Record<string, any> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  substack: BookOpen,
};

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading>Get In Touch</SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Contact Form */}
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={status === "loading"}>
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </Button>

                  {status === "success" && (
                    <p className="text-sm text-green-600">Message sent successfully!</p>
                  )}
                  {status === "error" && (
                    <p className="text-sm text-red-600">Failed to send message. Please try again.</p>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Connect with me</h3>
                  <div className="space-y-3">
                    {personalData.socialLinks.map((link) => {
                      const Icon = iconMap[link.icon];
                      return (
                        <a
                          key={link.platform}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                        >
                          {Icon && <Icon className="w-5 h-5" />}
                          <span>{link.platform}</span>
                        </a>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Built with Next.js, TypeScript, and Tailwind CSS •{" "}
              {new Date().getFullYear()}
            </p>
            <p className="mt-2">
              (Thanks Claude Code!)
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
