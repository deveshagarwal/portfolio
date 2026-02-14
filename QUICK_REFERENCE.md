# Quick Reference Card

## 🚀 Essential Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel
vercel
```

## 📝 Edit Content (No Code!)

| What to Change | File to Edit |
|----------------|--------------|
| Name, bio, email, Substack URL | `src/data/personal.json` |
| Job, research, projects | `src/data/professional.json` |
| Books list | `src/data/books.json` |
| Movies list | `src/data/movies.json` |
| Map node positions | `src/data/map-config.json` |
| Theme colors | `src/config/theme.ts` |

## 🗺️ Map Configuration

Edit `src/data/map-config.json`:

```json
{
  "nodes": [
    {
      "id": "professional",
      "label": "Professional",
      "targetSection": "professional",
      "position": { "x": 30, "y": 35 }
    }
  ]
}
```

- `x` and `y`: Position from 0-100 (percentage of container)
- `targetSection`: Must match section `id` in `src/app/page.tsx`

## 📁 Add Images

| Image Type | Location |
|-----------|----------|
| Profile photo | `public/images/profile.jpg` |
| Book covers | `public/images/book-covers/yourbook.jpg` |

## 🎨 Customize Colors

Edit `src/config/theme.ts` - values are in HSL format:

```typescript
primary: "221.2 83.2% 53.3%"  // Hue Saturation Lightness
```

## 🧩 Section IDs

Sections in `src/app/page.tsx`:
- `hero` - Welcome screen
- `map` - Interactive map
- `professional` - Work & research
- `writing` - Substack articles
- `reading` - Books
- `movies` - Movies
- `contact` - Contact form

## ⚙️ Enable/Disable Sections

Edit `src/app/page.tsx`:

```typescript
// Comment out to hide a section
// <Writing />
```

## 🔗 Substack Setup

1. Get your Substack feed URL: `https://yourname.substack.com/feed`
2. Update in `src/data/personal.json`:
   ```json
   "substackUrl": "https://yourname.substack.com/feed"
   ```

## 📧 Contact Form Integration

Edit `src/app/api/contact/route.ts` to add email service:

**Popular Services:**
- SendGrid
- Resend
- Nodemailer
- AWS SES
- Mailgun

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 in use | Next.js will try 3001, 3002, etc. |
| Substack not loading | Check URL ends with `/feed` |
| Theme not saving | Clear browser cache |
| Book covers missing | Add images to `public/images/book-covers/` |

## 📦 Project Structure

```
portfolio/
├── src/
│   ├── app/              # Next.js pages & API routes
│   ├── components/       # React components
│   ├── data/            # ⭐ Edit these JSON files
│   ├── lib/             # Utilities
│   ├── config/          # Theme configuration
│   └── types/           # TypeScript types
├── public/              # Static files & images
└── [config files]       # Build configuration
```

## 🌐 Access Your Site

- **Development:** http://localhost:3000
- **Production:** Deploy with Vercel, get custom URL

## ✅ Verification Checklist

- [ ] All JSON files updated with your content
- [ ] Substack URL configured correctly
- [ ] Dev server runs without errors (`npm run dev`)
- [ ] Map navigation works (click nodes)
- [ ] Theme toggle works (top-right button)
- [ ] All sections display correctly
- [ ] Responsive on mobile (test with browser DevTools)

## 📚 Full Documentation

- `README.md` - Complete guide
- `QUICKSTART.md` - Setup in 5 minutes
- `VERIFICATION.md` - Testing checklist
- `IMPLEMENTATION_SUMMARY.md` - Technical details

---

**Pro Tip:** Start with QUICKSTART.md, then customize!
