# Personal Portfolio with Interactive Map of Me

A unique, interactive portfolio website featuring an innovative constellation-style "Map of Me" navigation system. Built with React, Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Interactive Constellation Navigation**: Navigate through different sections using an animated star map
- **Full-Screen Hero Section**: Welcoming introduction with smooth animations
- **Professional Section**: Showcase your research, projects, and publications
- **Substack Integration**: Automatically pulls and displays your latest writing from Substack
- **Reading & Movies Sections**: Editable lists with ratings and covers
- **Contact Form**: Simple form for visitors to get in touch
- **Dark/Light Theme**: Seamless theme switching with next-themes
- **Smooth Animations**: Framer Motion powers all transitions and interactions
- **Fully Responsive**: Optimized for desktop, tablet, and mobile

## Getting Started

### Prerequisites

- Node.js 18+ (Note: create-next-app requires Node 20.9.0+, but the app will run on 18+)
- npm or yarn

### Installation

1. Clone or navigate to the repository:
```bash
cd "/Users/dagarwal/Desktop/Claude Exp/portfolio"
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization Guide

### Easy (No Code Required)

#### 1. Personal Information
Edit `src/data/personal.json`:
```json
{
  "name": "Your Name",
  "tagline": "Your Tagline",
  "bio": "Your bio...",
  "email": "your.email@example.com",
  "substackUrl": "https://yoursubstack.substack.com/feed",
  "socialLinks": [...]
}
```

#### 2. Professional Info
Edit `src/data/professional.json` to update:
- Job title and company
- Research interests
- Projects
- Publications

#### 3. Books List
Edit `src/data/books.json`:
```json
{
  "books": [
    {
      "id": "book-1",
      "title": "Book Title",
      "author": "Author Name",
      "cover": "/images/book-covers/book.jpg",
      "rating": 5,
      "year": 2024,
      "notes": "Optional notes"
    }
  ]
}
```

Add book cover images to `public/images/book-covers/`

#### 4. Movies List
Edit `src/data/movies.json`:
```json
{
  "movies": [
    {
      "id": "movie-1",
      "title": "Movie Title",
      "director": "Director Name",
      "year": 2024,
      "rating": 5,
      "genre": "Genre"
    }
  ]
}
```

#### 5. Map Configuration
Edit `src/data/map-config.json` to change:
- Node positions (x, y coordinates from 0-100)
- Node labels
- Connections between nodes

Example:
```json
{
  "nodes": [
    {
      "id": "professional",
      "label": "Professional",
      "targetSection": "professional",
      "position": { "x": 30, "y": 35 }
    }
  ],
  "connections": [
    { "from": "professional", "to": "writing" }
  ]
}
```

#### 6. Theme Colors
Edit `src/config/theme.ts` to change the color scheme. Values are in HSL format.

### Intermediate

#### Adding New Sections

1. Create a new component in `src/components/sections/`
2. Add the section to `src/app/page.tsx`
3. Add a corresponding node in `src/data/map-config.json`
4. The section ID must match the `targetSection` in the map config

#### Changing Map Style

The constellation view is in `src/components/map/ConstellationView.tsx`. You can modify:
- Node appearance (circle size, colors, glow effects)
- Connection line styles
- Animation timing and effects

### Advanced

#### Contact Form Integration

The contact form API route is at `src/app/api/contact/route.ts`. Integrate with:
- SendGrid
- Nodemailer
- AWS SES
- Resend
- Or any other email service

Example with SendGrid:
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const msg = {
  to: 'your-email@example.com',
  from: 'noreply@yourdomain.com',
  subject: `Contact from ${name}`,
  text: message,
  html: `<p>${message}</p>`,
};

await sgMail.send(msg);
```

#### Custom RSS Feeds

To add RSS feeds beyond Substack, modify `src/lib/rss-parser.ts` and create new API routes similar to `src/app/api/substack/route.ts`.

## Project Structure

```
portfolio/
├── public/              # Static assets
│   └── images/          # Images (profile, book covers, etc.)
├── src/
│   ├── app/             # Next.js app router
│   │   ├── api/         # API routes
│   │   ├── layout.tsx   # Root layout
│   │   ├── page.tsx     # Main page
│   │   └── globals.css  # Global styles
│   ├── components/
│   │   ├── map/         # Map navigation components
│   │   ├── sections/    # Content sections
│   │   ├── ui/          # Reusable UI components
│   │   └── layout/      # Layout components
│   ├── data/            # JSON content files
│   ├── lib/             # Utility functions
│   ├── types/           # TypeScript types
│   └── config/          # Configuration files
└── ...
```

## Building for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy

Or use the Vercel CLI:
```bash
npm install -g vercel
vercel
```

### Other Platforms

This Next.js app can be deployed to:
- Netlify
- AWS Amplify
- Railway
- Render
- Any platform supporting Node.js

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations and interactions
- **next-themes** - Dark/light mode
- **rss-parser** - RSS feed parsing
- **Lucide React** - Icons

## Troubleshooting

### Substack Feed Not Loading

1. Check that your Substack URL is correct in `src/data/personal.json`
2. Ensure the URL ends with `/feed`
3. Check the browser console for errors
4. Verify the feed is publicly accessible

### Book Covers Not Showing

1. Ensure images are in `public/images/book-covers/`
2. Check that the path in `books.json` matches the actual file
3. Use relative paths starting with `/images/`

### Map Nodes Not Aligned

1. Adjust `x` and `y` values in `src/data/map-config.json`
2. Values should be between 0-100 (percentage of container)
3. Test on different screen sizes

### Theme Not Switching

1. Ensure `next-themes` is properly installed
2. Check that `ThemeProvider` wraps your app in `layout.tsx`
3. Clear browser cache

## License

MIT License - Feel free to use this template for your own portfolio!

## Support

For issues or questions:
1. Check this README
2. Review the code comments
3. Check Next.js documentation: https://nextjs.org/docs
4. Check Framer Motion docs: https://www.framer.com/motion/

---

Built with React, Next.js, TypeScript, and Tailwind CSS
