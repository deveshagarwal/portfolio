"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import professionalData from "@/data/professional.json";
import { ExternalLink, FileText } from "lucide-react";
import Link from "next/link";

export function Professional() {
  return (
    <section id="professional" className="min-h-screen py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading>Professional</SectionHeading>

          {professionalData.intro && (
            <div className="mb-12 text-center">
              <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
                {professionalData.intro}
              </p>
            </div>
          )}

          <div className="mb-8 text-center">
            <p className="text-base text-muted-foreground">
              For a comprehensive overview of my professional experience and qualifications,{" "}
              <Link
                href="/resume"
                className="text-foreground underline decoration-muted-foreground hover:decoration-foreground transition-colors"
              >
                view my resume
              </Link>
              .
            </p>
          </div>

          {/* Experience */}
          <div className="mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl font-bold mb-8 sm:mb-12 text-center">Experience</h3>
            <div className="max-w-3xl mx-auto space-y-6 sm:space-y-10">
              {professionalData.experiences.map((exp: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center bg-black/30 backdrop-blur-sm rounded-lg p-8"
                >
                  <h4 className="text-xl font-semibold mb-2">{exp.title}</h4>
                  <p className="text-lg text-white/70 mb-3">
                    {exp.company}
                  </p>
                  <p className="text-base text-white/80 leading-relaxed">
                    {exp.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          {professionalData.education && (
            <div className="mb-8 sm:mb-12">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Education</h3>

              {/* Degrees */}
              <div className="mb-6 sm:mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-center">Dual Degree</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {professionalData.education.degrees.map((edu: any, index: number) => (
                          <div key={index} className="bg-black/40 rounded-lg p-4 text-center">
                            <h5 className="text-base font-semibold mb-1">{edu.degree}</h5>
                            <p className="text-sm text-muted-foreground">
                              {edu.school}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Skills */}
              <div className="mb-6 sm:mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="text-base">Languages</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {professionalData.education.skills.languages.map((lang: string, i: number) => (
                            <span key={i} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="text-base">ML Frameworks</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {professionalData.education.skills.modules.map((mod: string, i: number) => (
                            <span key={i} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                              {mod}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="text-base">GenAI</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {professionalData.education.skills.genai.map((tool: string, i: number) => (
                            <span key={i} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="text-base">MLOps & Data</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {professionalData.education.skills.mlops.map((tool: string, i: number) => (
                            <span key={i} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>

              {/* Coursework */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Coursework</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {professionalData.education.coursework.map((course: string, i: number) => (
                          <span key={i} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {course}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          )}

          {/* Projects */}
          {professionalData.projects && professionalData.projects.length > 0 && (
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Selected Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {professionalData.projects.map((project: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {project.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
