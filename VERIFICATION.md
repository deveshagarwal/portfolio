# Verification Checklist

Use this checklist to verify your portfolio is working correctly.

## ✅ Development Setup

- [ ] Dependencies installed (`npm install` completed successfully)
- [ ] Development server starts without errors (`npm run dev`)
- [ ] Can access site at http://localhost:3000 (or 3001)
- [ ] No console errors in browser developer tools

## ✅ Visual Check

### Hero Section
- [ ] Name displays correctly
- [ ] Tagline shows below name
- [ ] Bio text is readable
- [ ] Scroll indicator (down arrow) is visible and animated
- [ ] Clicking scroll indicator navigates to Map section

### Map of Me Section
- [ ] All 5 nodes are visible (Professional, Writing, Reading, Movies, Contact)
- [ ] Connection lines appear between nodes
- [ ] Nodes animate on load (fade in, pulse effect)
- [ ] Hovering over nodes shows hover effect (glow/scale)
- [ ] Clicking each node smoothly scrolls to the correct section:
  - [ ] Professional node → Professional section
  - [ ] Writing node → Writing section
  - [ ] Reading node → Reading section
  - [ ] Movies node → Movies section
  - [ ] Contact node → Contact section

### Professional Section
- [ ] Job title and company display
- [ ] Research interests show in cards (3 cards)
- [ ] Projects display with technologies (2 projects)
- [ ] Publications list appears with authors and venues
- [ ] External links work (if URLs provided)

### Writing Section
- [ ] Section has different background (muted)
- [ ] Loading spinner appears initially (if Substack URL is valid)
- [ ] Articles display in grid (3 columns on desktop)
- [ ] Article cards show title, date, and excerpt
- [ ] External link icon on each card
- [ ] Error message appears if feed invalid (expected if using default URL)

### Reading Section
- [ ] Books display in grid (4 columns on desktop)
- [ ] Each book card shows title and author
- [ ] Star ratings display correctly (filled stars match rating)
- [ ] Year appears on each card
- [ ] Notes display if provided
- [ ] Book covers would show if images added (placeholder OK for now)

### Movies Section
- [ ] Section has different background (muted)
- [ ] Movies display in grid (3 columns on desktop)
- [ ] Each movie shows title and director
- [ ] Star ratings display correctly
- [ ] Year and genre display
- [ ] Genre appears as colored badge

### Contact Section
- [ ] Contact form appears with all fields (Name, Email, Message)
- [ ] Email address displays with mail icon
- [ ] Social links display with correct icons
- [ ] Form validates required fields
- [ ] Submit button shows "Sending..." when clicked
- [ ] Footer text appears at bottom

## ✅ Interactive Features

### Theme Toggle
- [ ] Theme toggle button visible in top-right corner
- [ ] Clicking toggle switches between light and dark mode
- [ ] All sections adapt to theme change
- [ ] No visual glitches during theme switch
- [ ] Theme preference persists on page reload

### Animations
- [ ] Hero text fades in on load
- [ ] Map nodes animate on first view
- [ ] Section content animates when scrolling into view
- [ ] Hover effects work on cards and buttons
- [ ] Smooth scroll behavior when clicking map nodes

### Navigation
- [ ] Clicking map nodes scrolls to correct sections
- [ ] Smooth scrolling works (not instant jump)
- [ ] Can scroll manually without issues
- [ ] All section IDs match map config targets

## ✅ Responsive Design

### Desktop (1920x1080+)
- [ ] All sections fill viewport appropriately
- [ ] Map constellation is clearly visible
- [ ] Text is readable
- [ ] Cards arrange in proper grid layouts
- [ ] No horizontal scrolling

### Tablet (768x1024)
- [ ] Map scales appropriately
- [ ] Card grids adjust (2-3 columns)
- [ ] Text remains readable
- [ ] Navigation works correctly
- [ ] No layout breaking

### Mobile (375x667)
- [ ] All content is accessible
- [ ] Single column layout
- [ ] Map is simplified but usable
- [ ] Touch interactions work
- [ ] Text is readable without zooming

## ✅ Data Configuration

### Personal Data
- [ ] `src/data/personal.json` has correct information
- [ ] Social links are valid URLs
- [ ] Substack URL format is correct (ends with /feed)

### Professional Data
- [ ] `src/data/professional.json` is updated
- [ ] All fields are filled appropriately
- [ ] URLs are valid (if provided)

### Books Data
- [ ] `src/data/books.json` has at least one book
- [ ] All required fields present (id, title, author, rating, year)
- [ ] Ratings are between 1-5

### Movies Data
- [ ] `src/data/movies.json` has at least one movie
- [ ] All required fields present
- [ ] Ratings are between 1-5

### Map Config
- [ ] `src/data/map-config.json` has 5 nodes
- [ ] All position values are between 0-100
- [ ] All targetSection values match section IDs
- [ ] Connections array has at least 3 connections

## ✅ Performance

- [ ] Initial page load is fast (< 3 seconds)
- [ ] Animations are smooth (no jank)
- [ ] No unnecessary re-renders in console
- [ ] Images load without blocking (if using covers)

## ✅ Production Build

```bash
npm run build
npm start
```

- [ ] Build completes without errors
- [ ] No TypeScript errors
- [ ] No build warnings (or only minor warnings)
- [ ] Production server starts successfully
- [ ] All features work in production mode

## ✅ Deployment (Vercel)

```bash
vercel
```

- [ ] Deployment succeeds
- [ ] Production URL is accessible
- [ ] All sections work on live site
- [ ] Substack feed loads on production
- [ ] Theme toggle works
- [ ] Map navigation functions correctly
- [ ] No console errors on live site

## 🐛 Common Issues & Fixes

### Substack Feed Error
**Issue**: "Failed to fetch articles" error
**Fix**: Update `substackUrl` in `src/data/personal.json` with your actual Substack feed URL (format: `https://yourname.substack.com/feed`)

### Book Covers Not Showing
**Issue**: Books show without cover images
**Fix**: Add images to `public/images/book-covers/` and update paths in `books.json`, or remove the `cover` field to use text-only cards

### Map Nodes Overlapping
**Issue**: Constellation nodes are too close together
**Fix**: Adjust `x` and `y` values in `src/data/map-config.json` to spread them out

### Theme Not Persisting
**Issue**: Theme resets on page refresh
**Fix**: Clear browser cache and ensure `next-themes` is properly installed

### Port Already in Use
**Issue**: "Port 3000 is already in use"
**Fix**: Next.js will automatically try 3001, 3002, etc. Or kill the process using port 3000:
```bash
lsof -ti:3000 | xargs kill -9
```

## 📝 Notes

- The default Substack URL in `personal.json` is a placeholder. Update it with your actual Substack feed URL.
- Book covers are optional. Books will display without images if no cover is provided.
- The contact form currently logs to console. Integrate with an email service for production use.
- Some warnings during build about Framer Motion are normal and don't affect functionality.

## ✨ You're Done!

If all items are checked, your portfolio is ready to share with the world! 🎉
