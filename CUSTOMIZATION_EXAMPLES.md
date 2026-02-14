# Customization Examples

This guide shows you exactly how to customize common elements of your portfolio.

## 📝 Example 1: Update Personal Info

**File:** `src/data/personal.json`

```json
{
  "name": "Jane Doe",
  "tagline": "AI Researcher & Software Engineer",
  "bio": "I'm passionate about building AI systems that make a difference. I specialize in natural language processing and have published research in leading ML conferences.",
  "email": "jane.doe@example.com",
  "substackUrl": "https://janedoe.substack.com/feed",
  "socialLinks": [
    {
      "platform": "GitHub",
      "url": "https://github.com/janedoe",
      "icon": "github"
    },
    {
      "platform": "LinkedIn",
      "url": "https://linkedin.com/in/janedoe",
      "icon": "linkedin"
    },
    {
      "platform": "Twitter",
      "url": "https://twitter.com/janedoe",
      "icon": "twitter"
    }
  ]
}
```

## 💼 Example 2: Add Your Job & Projects

**File:** `src/data/professional.json`

```json
{
  "title": "Senior Applied Scientist",
  "company": "Tech Company Inc",
  "location": "San Francisco, CA",
  "description": "Leading research in large language models and their applications to real-world problems.",
  "research": [
    {
      "title": "Large Language Models",
      "description": "Training and fine-tuning LLMs for specific downstream tasks."
    },
    {
      "title": "Retrieval-Augmented Generation",
      "description": "Building systems that combine retrieval with generation for factual accuracy."
    }
  ],
  "projects": [
    {
      "title": "AI Assistant Platform",
      "description": "Built a conversational AI platform serving 1M+ users daily.",
      "technologies": ["Python", "PyTorch", "FastAPI", "React"],
      "url": "https://github.com/yourusername/ai-assistant"
    }
  ],
  "publications": [
    {
      "title": "Scaling Laws for Neural Language Models",
      "authors": ["Jane Doe", "Co-Author"],
      "venue": "NeurIPS 2025",
      "year": 2025,
      "url": "https://arxiv.org/abs/example"
    }
  ]
}
```

## 📚 Example 3: Customize Your Reading List

**File:** `src/data/books.json`

```json
{
  "books": [
    {
      "id": "book-1",
      "title": "The Alignment Problem",
      "author": "Brian Christian",
      "cover": "/images/book-covers/alignment-problem.jpg",
      "rating": 5,
      "year": 2024,
      "notes": "Essential reading on AI safety and alignment challenges."
    },
    {
      "id": "book-2",
      "title": "Gödel, Escher, Bach",
      "author": "Douglas Hofstadter",
      "rating": 5,
      "year": 2024,
      "notes": "A mind-bending exploration of consciousness and computation."
    },
    {
      "id": "book-3",
      "title": "Superintelligence",
      "author": "Nick Bostrom",
      "rating": 4,
      "year": 2023,
      "notes": "Thought-provoking analysis of AI's potential future."
    }
  ]
}
```

**Note:** Book covers are optional. If you don't have images, just remove the `cover` field.

## 🎬 Example 4: Add Your Favorite Movies

**File:** `src/data/movies.json`

```json
{
  "movies": [
    {
      "id": "movie-1",
      "title": "Her",
      "director": "Spike Jonze",
      "year": 2013,
      "rating": 5,
      "genre": "Sci-Fi"
    },
    {
      "id": "movie-2",
      "title": "Ex Machina",
      "director": "Alex Garland",
      "year": 2014,
      "rating": 5,
      "genre": "Sci-Fi"
    },
    {
      "id": "movie-3",
      "title": "The Social Network",
      "director": "David Fincher",
      "year": 2010,
      "rating": 4,
      "genre": "Drama"
    }
  ]
}
```

## 🗺️ Example 5: Customize Map Layout

**File:** `src/data/map-config.json`

Here are different layout styles you can try:

### Circular Layout
```json
{
  "nodes": [
    {
      "id": "professional",
      "label": "Work",
      "targetSection": "professional",
      "position": { "x": 50, "y": 20 }
    },
    {
      "id": "writing",
      "label": "Blog",
      "targetSection": "writing",
      "position": { "x": 80, "y": 40 }
    },
    {
      "id": "reading",
      "label": "Books",
      "targetSection": "reading",
      "position": { "x": 80, "y": 60 }
    },
    {
      "id": "movies",
      "label": "Films",
      "targetSection": "movies",
      "position": { "x": 50, "y": 80 }
    },
    {
      "id": "contact",
      "label": "Connect",
      "targetSection": "contact",
      "position": { "x": 20, "y": 60 }
    }
  ],
  "connections": [
    { "from": "professional", "to": "writing" },
    { "from": "writing", "to": "reading" },
    { "from": "reading", "to": "movies" },
    { "from": "movies", "to": "contact" },
    { "from": "contact", "to": "professional" }
  ]
}
```

### Star Pattern
```json
{
  "nodes": [
    {
      "id": "professional",
      "label": "Professional",
      "targetSection": "professional",
      "position": { "x": 50, "y": 50 }
    },
    {
      "id": "writing",
      "label": "Writing",
      "targetSection": "writing",
      "position": { "x": 50, "y": 20 }
    },
    {
      "id": "reading",
      "label": "Reading",
      "targetSection": "reading",
      "position": { "x": 80, "y": 50 }
    },
    {
      "id": "movies",
      "label": "Movies",
      "targetSection": "movies",
      "position": { "x": 50, "y": 80 }
    },
    {
      "id": "contact",
      "label": "Contact",
      "targetSection": "contact",
      "position": { "x": 20, "y": 50 }
    }
  ],
  "connections": [
    { "from": "professional", "to": "writing" },
    { "from": "professional", "to": "reading" },
    { "from": "professional", "to": "movies" },
    { "from": "professional", "to": "contact" }
  ]
}
```

## 🎨 Example 6: Change Theme Colors

**File:** `src/config/theme.ts`

### Blue Theme (Default)
```typescript
export const themeConfig = {
  light: {
    primary: "221.2 83.2% 53.3%",  // Blue
    // ... other colors
  },
  dark: {
    primary: "217.2 91.2% 59.8%",  // Lighter blue
    // ... other colors
  },
};
```

### Purple Theme
```typescript
export const themeConfig = {
  light: {
    primary: "271 91% 65%",  // Purple
    primaryForeground: "0 0% 100%",
    // ... keep other colors same
  },
  dark: {
    primary: "271 91% 70%",  // Lighter purple
    primaryForeground: "0 0% 100%",
    // ... keep other colors same
  },
};
```

### Green Theme
```typescript
export const themeConfig = {
  light: {
    primary: "142 71% 45%",  // Green
    primaryForeground: "0 0% 100%",
    // ... keep other colors same
  },
  dark: {
    primary: "142 71% 50%",  // Lighter green
    primaryForeground: "0 0% 100%",
    // ... keep other colors same
  },
};
```

**HSL Format:** `Hue Saturation% Lightness%`
- Hue: 0-360 (color wheel position)
- Saturation: 0-100% (color intensity)
- Lightness: 0-100% (how light/dark)

Use a tool like [HSL Color Picker](https://hslpicker.com/) to find colors you like.

## 📧 Example 7: Add Email Service (SendGrid)

**File:** `src/app/api/contact/route.ts`

1. Install SendGrid:
```bash
npm install @sendgrid/mail
```

2. Update the contact route:
```typescript
import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const msg = {
      to: "your.email@example.com",
      from: "noreply@yourdomain.com",
      subject: `Portfolio Contact: ${name}`,
      text: message,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await sgMail.send(msg);

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
```

3. Add to `.env.local`:
```
SENDGRID_API_KEY=your_api_key_here
```

## 🔧 Example 8: Add a New Section

Let's add a "Skills" section:

1. **Create the component:** `src/components/sections/Skills.tsx`
```typescript
"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Skills() {
  const skills = [
    { name: "Python", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "PyTorch", level: 85 },
    { name: "React", level: 80 },
  ];

  return (
    <section id="skills" className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading>Skills</SectionHeading>
        <div className="space-y-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium">{skill.name}</span>
                <span className="text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

2. **Add to main page:** `src/app/page.tsx`
```typescript
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <MapOfMe />
      <Professional />
      <Skills />  {/* New section */}
      <Writing />
      <Reading />
      <Movies />
      <Contact />
    </main>
  );
}
```

3. **Add node to map:** `src/data/map-config.json`
```json
{
  "nodes": [
    // ... existing nodes
    {
      "id": "skills",
      "label": "Skills",
      "targetSection": "skills",
      "position": { "x": 40, "y": 50 }
    }
  ],
  "connections": [
    // ... existing connections
    { "from": "professional", "to": "skills" }
  ]
}
```

## 💡 Pro Tips

1. **Start Simple:** Begin with the default content, then gradually customize
2. **Test Frequently:** Run `npm run dev` after each change to see results
3. **Use Git:** Track your changes with git so you can undo if needed
4. **Mobile First:** Always test on mobile view (use browser DevTools)
5. **Backup Data:** Keep a copy of your JSON files before major edits

## 🎯 Common Customization Goals

| Goal | Files to Edit |
|------|---------------|
| Make it yours | `personal.json`, `professional.json` |
| Change colors | `src/config/theme.ts` |
| Rearrange map | `map-config.json` |
| Add sections | Create in `src/components/sections/`, add to `page.tsx` |
| Change fonts | Update `src/app/layout.tsx` |
| Add analytics | Add script to `src/app/layout.tsx` |

## 🚀 Ready to Deploy?

Once you're happy with your customizations:

```bash
# Build and test locally
npm run build
npm start

# Deploy to Vercel
vercel
```

Your unique portfolio will be live in minutes!
