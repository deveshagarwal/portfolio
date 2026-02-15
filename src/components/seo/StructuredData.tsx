export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Devesh Agarwal",
    url: "https://verydevesh.vercel.app",
    image: "https://verydevesh.vercel.app/images/profile.jpeg",
    jobTitle: "Machine Learning Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Thumbtack",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "University of California, Berkeley",
    },
    knowsAbout: [
      "Machine Learning",
      "Artificial Intelligence",
      "Computer Vision",
      "Natural Language Processing",
      "RAG Systems",
      "Large Language Models",
      "Python",
      "PyTorch",
      "TensorFlow",
    ],
    sameAs: [
      "https://www.linkedin.com/in/deveshagar/",
      "https://github.com/deveshagarwal",
      "https://substack.com/@verydevesh",
    ],
    email: "deveshagarwal@berkeley.edu",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
