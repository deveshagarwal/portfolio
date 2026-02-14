# Quick Start Guide

## 🚀 Get Your Portfolio Running in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Customize Your Content

#### Update Personal Info
Edit `src/data/personal.json`:
- Change name, tagline, and bio
- Update email address
- Add your Substack RSS feed URL (format: `https://yourname.substack.com/feed`)
- Update social media links

#### Update Professional Info
Edit `src/data/professional.json`:
- Add your job title and company
- Update research interests
- Add your projects and publications

#### Add Your Books
Edit `src/data/books.json`:
- Add books you've read
- Optionally add book cover images to `public/images/book-covers/`

#### Add Your Movies
Edit `src/data/movies.json`:
- Add your favorite movies

### Step 3: Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio!

### Step 4: Customize the Map

The interactive "Map of Me" is configured in `src/data/map-config.json`.

To adjust node positions:
- Change `x` and `y` values (0-100, representing percentages)
- Test different layouts until you're happy

Example:
```json
{
  "id": "professional",
  "label": "Professional",
  "targetSection": "professional",
  "position": { "x": 30, "y": 35 }
}
```

### Step 5: Add Your Profile Photo

1. Add your photo to `public/images/profile.jpg`
2. Update the Hero section if needed in `src/components/sections/Hero.tsx`

### Step 6: Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

That's it! Your portfolio is live! 🎉

## 📝 Common Customizations

### Change Theme Colors
Edit `src/config/theme.ts` to change the color scheme.

### Disable Sections
Comment out sections you don't want in `src/app/page.tsx`:
```typescript
// <Writing />  // This section won't appear
```

### Update Theme (Dark/Light)
The theme toggle is in the top-right corner. Default is dark mode.
Change the default in `src/app/layout.tsx`:
```typescript
<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
```

### Add Custom Sections
1. Create component in `src/components/sections/YourSection.tsx`
2. Add to `src/app/page.tsx`
3. Add a node in `src/data/map-config.json`

## 🐛 Troubleshooting

### Substack Feed Not Loading?
- Verify your Substack URL ends with `/feed`
- Make sure the feed is public
- Check browser console for errors

### Port 3000 Already in Use?
Next.js will automatically try port 3001, 3002, etc.

### Build Errors?
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

## 📚 Need More Help?

Check the full README.md for detailed documentation!
