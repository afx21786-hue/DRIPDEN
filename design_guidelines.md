# DRIPDEN Design Guidelines

## Design Approach
**Reference-Based: Gen-Z Social Commerce (TikTok + Airbnb fusion)**
This is a dark-mode, neon-glowing Gen-Z fashion platform. Primary inspiration from TikTok's UI animations and energy, combined with Airbnb's card-based exploration model, but with a futuristic neon aesthetic.

---

## Core Design Principles

### Visual Identity
- **Dark Mode First**: All pages built on dark backgrounds with neon accents
- **Neon Glow Aesthetic**: Purple-pink-blue-mint gradients with glowing effects
- **Glass Morphism**: Frosted glass blur panels for cards and overlays
- **Hyper-Local Discovery**: Shop cards before products (like exploring a city)
- **TikTok Energy**: Smooth micro-animations, snappy transitions, addictive feel

---

## Color System

### Primary Palette
- `#A85CFF` Neon Grape (Primary accent, CTAs)
- `#FF7DDC` Cotton Candy (Secondary accent, highlights)
- `#4C7BFF` Electric Blue (Links, interactive elements)
- `#6FFFC7` Mint Pop (Success states, special features)
- `#F8F8FA` Cloud White (Primary text)
- `#0E0E11` Midnight Graphite (Background)

### Application
- Background: Midnight Graphite (#0E0E11)
- Cards: Semi-transparent white/purple with glass blur + neon borders
- Text: Cloud White for primary, reduced opacity for secondary
- CTAs: Gradient buttons (Grape → Cotton Candy) with glow
- Hover states: Brighter neon glow, card lift effect

---

## Typography

### Font Families
- **Headings**: Sora (Bold, modern, tech-forward)
- **Body**: Inter or Manrope (Clean, readable)

### Hierarchy
- Hero Titles: Sora 48-72px, bold, neon gradient text
- Section Headings: Sora 32-40px, semi-bold
- Card Titles: Sora 20-24px, medium
- Body Text: Inter 16px, regular
- Captions: Inter 14px, light

---

## Layout System

### Spacing Scale
Use Tailwind units: `2, 4, 6, 8, 12, 16, 20, 24, 32`
- Tight spacing: `p-2, gap-4` (within cards)
- Standard: `p-6, gap-6` (card padding)
- Generous: `py-12, py-20` (section spacing)

### Grid Patterns
- Shop Cards: 3-column grid on desktop (lg:grid-cols-3), 2 on tablet, 1 on mobile
- Product Grids: 4-column (lg:grid-cols-4), responsive scaling
- Feature Sections: 2-column splits for content + visual

---

## Component Library

### Navigation
- Sticky dark navbar with frosted glass blur
- Logo left, Search center, Profile/Cart/DripCoins right
- Neon glow on hover, smooth underline animations
- Mobile: Hamburger with slide-in drawer

### Shop Cards (Primary UI Element)
- Glass blur background with neon gradient border
- Circular glowing shop logo (top-left or center)
- Shop banner image with gradient overlay
- 3 mini product preview thumbnails
- Shop tags (Streetwear, Trending, etc.) as pills with glow
- Hover: Card lifts (translate-y-2), border glow intensifies

### Product Cards
- Vertical card with product image
- Neon thin border (1px)
- Price in gradient text
- Heart icon (wishlist) with glow on save
- Hover: Subtle lift + border glow

### Buttons
- Primary: Gradient (Grape → Cotton Candy) with glow shadow
- Secondary: Outlined with neon border, transparent background
- Icon buttons: Circular with subtle glow
- Hover: Increase glow intensity, slight scale (1.02)

### Input Fields
- Dark background with subtle border
- Neon focus state (border glows)
- Floating labels or placeholder text in Cloud White

### AI Chat Assistant (DripBot)
- Fixed bottom-right floating bubble
- Pulsing neon glow animation
- Click opens chat panel with glass blur background
- Messages: User (right, Grape gradient), Bot (left, darker glass)

### Flash Drops Section
- Prominent banner with pulsing neon border animation
- Countdown timer in large glowing numbers
- Limited quantity badge with urgency colors
- Product cards with "LIVE NOW" indicator

---

## Page-Specific Layouts

### Landing Page
- Full-screen hero with neon animated text + holographic accents
- Feature grid (3-col) showcasing AI tools
- Shop preview carousel
- CTA sections with gradient backgrounds

### Login/Signup
- Centered glass blur panel (max-w-md)
- Neon glowing input fields
- Social auth buttons (Google) with icons
- Smooth fade-in animation on load

### Home (Shop Explorer)
- Search bar at top with filter pills below
- Shop card grid with infinite scroll
- "Trending Shops" section with horizontal scroll
- Flash Drops banner above fold

### Shop Page
- Large neon banner header
- Shop info (logo, name, description, follow button)
- Product grid below with filters sidebar
- Sticky "View Cart" button if items added

### Product Detail
- 2-column layout: Gallery left, details right
- Size/color selectors as neon-bordered chips
- Large gradient "Add to Cart" button
- "AI Outfit Ideas" section below with generated looks

### Profile Dashboard
- User header with photo, name, DripCoins balance (large glowing number)
- Tab navigation (Saved Shops, Saved Items, Outfit Boards)
- Grid layouts for saved content
- DripCoins earned activity feed

---

## Animations & Interactions

### Micro-Animations
- Card hover: Lift (translateY -8px) + glow increase (300ms ease)
- Button press: Scale down (0.98) + glow pulse
- Page transitions: Fade + slide (400ms)
- Scroll reveals: Fade-in from bottom (stagger children)

### Loading States
- Skeleton screens with shimmer effect
- Neon pulsing spinner for AI processing
- Progress bars with gradient fill

### Special Effects
- Neon glow: `box-shadow: 0 0 20px rgba(168, 92, 255, 0.5)`
- Glass blur: `backdrop-blur-lg bg-white/10`
- Gradient text: `bg-gradient-to-r from-[#A85CFF] to-[#FF7DDC] bg-clip-text text-transparent`

---

## Images

### Required Images
- **Hero Section**: Abstract neon cityscape or holographic fashion imagery (full-width, minimal height ~60vh)
- **Shop Banners**: Each shop card has a header banner (16:9 ratio, neon overlay)
- **Product Images**: Square aspect ratio, clean backgrounds
- **User Avatars**: Circular with neon ring border
- **AI Illustration**: Futuristic AI assistant character for DripBot sections

### Treatment
- All images have subtle neon gradient overlays
- Hero images: Dark tint (40% opacity) for text readability
- Product images: Clean, minimal editing to show details
- Buttons on images: Frosted glass background with blur

---

## Accessibility
- Maintain WCAG AA contrast despite dark theme (Cloud White on dark backgrounds)
- Focus states with visible neon outline
- Keyboard navigation support for all interactive elements
- Alt text for all images including decorative neon graphics