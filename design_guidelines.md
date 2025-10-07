# Design Guidelines: Automotive Social Network Application

## Design Approach: Reference-Based (Snapchat + Instagram Hybrid)
This is a pixel-perfect implementation based on provided visual references. The application combines Snapchat's ephemeral moments with Instagram's social features, tailored for automotive enthusiasts.

---

## Core Design System

### Color Palette

**Dark Mode (Primary Theme)**
- Background Base: `0 0% 8%` (Near-black)
- Card Backgrounds: `0 0% 12%` with 10-20% opacity
- Neon Yellow (Primary): `60 100% 50%` 
- Bright White (Headers): `0 0% 98%`
- Light Gray (Secondary Text): `0 0% 70%`
- Dark Gray (Tertiary): `0 0% 45%`

**Accent & States**
- Border Highlights: Neon Yellow at 1px thickness
- Hover States: Neon Yellow at 100% opacity (from semi-transparent)
- Success: `142 76% 36%`
- Warning: `38 92% 50%`
- Error: `0 72% 51%`

### Typography

**Font Family**
- Primary: Modern sans-serif (Inter, Montserrat, or Poppins)
- Sharp, clean lines with excellent readability on dark backgrounds

**Hierarchy**
- H1 (Page Titles): 2rem (32px), Neon Yellow, font-weight: 700
- H2 (Section Headers): 1.5rem (24px), Bright White, font-weight: 600
- H3 (Card Titles): 1.25rem (20px), Bright White, font-weight: 600
- Body Text: 1rem (16px), Light Gray, font-weight: 400
- Small/Meta: 0.875rem (14px), Dark Gray, font-weight: 400
- Usernames: Neon Yellow with VIP badge adjacent

---

## Glassmorphism Implementation

**All Cards & Panels**
- Background: `backdrop-blur-md` with 10-20% opacity dark overlay
- Border: 1px solid Neon Yellow
- Shadow: `shadow-lg` with subtle glow effect
- Border Radius: rounded-xl (12px) for cards, rounded-lg (8px) for buttons

**Specific Components**
- Profile Cards: Glass effect with flip animation capability
- Chat Bubbles: Semi-transparent with backdrop blur
- Event Cards: Glass cards with location pin and date badge
- Menu Grid Items: Glass effect with icon and label

---

## Layout & Spacing

**Container System**
- App Max Width: Full viewport width (mobile-first)
- Content Padding: px-4 (16px horizontal)
- Section Spacing: py-6 (24px vertical)
- Card Spacing: gap-4 between grid items

**Commonly Used Spacing Units**
- Tight: p-2, m-2 (8px)
- Standard: p-4, m-4 (16px)
- Generous: p-6, m-6 (24px)
- Section: p-8, m-8 (32px)

---

## Navigation Architecture

### Bottom Tab Bar (Fixed)
5-tab navigation bar fixed at bottom:
1. **MAP** - Map pin icon, landing screen
2. **CHATS** - Message bubble icon
3. **MENU** - App logo, **centered and highlighted** with larger size/glow
4. **MOMENTS** - Fire/Snapchat icon
5. **PROFILE** - User avatar icon

- Active State: Neon Yellow icon and label
- Inactive State: Light Gray icon
- Background: Dark glass panel with subtle top border

### Menu Hub (9-Grid)
3x3 grid layout with glassmorphic cards:
- SCAN, SUPPORT, VEHICLES
- ALERT, TOURS, FRIENDS  
- CREWS, DRIVE, SEARCH

Each card: Icon (top), Label (bottom), glass background, yellow border

---

## Component Library

### Profile Card (Flip Animation)
**Front Face:**
- Profile photo (circular, large)
- Username with VIP badge if applicable
- Primary vehicle display with 3D plate
- Crew badge/plaque (tappable)

**Back Face:**
- Bio text area
- Social media links (Instagram, TikTok, YouTube) with edit/delete icons
- Rotation animation: smooth 3D flip on tap

### 3D License Plate Generator
**Critical Feature - Realistic Rendering**
- Templates: TR (Turkey), DE (Germany), US (United States)
- Effects: Embossed text, chrome/metallic finish, subtle reflections
- VIP Exclusive Styles: Carbon fiber, full chrome, custom colored backgrounds
- Editable: Tap to change plate text/style

### Vehicle Cards
- Hero image (swipeable gallery for multiple photos)
- 3D rendered license plate
- Technical specs overlay (HP, Torque, Year)
- Modification list section
- Social links for vehicle-specific accounts
- Moments from this vehicle (scrollable)

### Chat Interface
**Message Bubbles:**
- User messages: Right-aligned, Neon Yellow background
- Other messages: Left-aligned, dark glass background
- Timestamp: Small gray text below
- Channel Types: Global, Local, Crew, Event, Friend (with distinct badges)

### Moments Feed
**Snapchat-Style Stories:**
- Vertical scrolling feed
- Full-width image/video cards
- Username overlay (top-left) with VIP badge
- Interaction buttons (bottom): Like, Comment, Share
- Time elapsed badge (top-right)
- Camera FAB (floating action button): Bottom-right, Neon Yellow, large

### Event Cards
- Event image/banner (if uploaded)
- Title, Date/Time, Location (with map preview)
- Attendance counter and avatars
- "Join Event" button (Neon Yellow)
- Map marker indicator for location

### VIP Badge & Elements
- Crown/Star icon in Neon Yellow
- Always visible next to username
- Exclusive UI: Special plate styles, unlimited garage badge
- Trending boost indicator on Moments

---

## Interactive States

### Buttons
**Primary (CTA):**
- Default: Semi-transparent Neon Yellow background
- Hover/Press: Solid Neon Yellow (100% opacity)
- Text: Black for contrast

**Secondary:**
- Default: Transparent with Neon Yellow border
- Hover: Yellow border with 10% yellow fill

**Icon Buttons:**
- Default: Light Gray
- Active: Neon Yellow
- Tap: Scale animation (0.95x)

### Forms & Inputs
- Background: Dark glass (20% opacity)
- Border: 1px Light Gray, focuses to Neon Yellow
- Text: Bright White
- Placeholder: Dark Gray
- Error State: Red border with error text below

---

## Icon System
Use **Heroicons** or **Ionicons** for consistency:
- Navigation: Outline style when inactive, solid when active
- Actions: Always solid style
- Size: 24px standard, 32px for primary actions, 20px for secondary

---

## Images & Media

### Photography Style
- High-quality automotive photography
- Dark, moody backgrounds preferred
- Neon/street lighting aesthetic
- Action shots and detail close-ups

### Image Placement
- Profile Photos: Circular, 120px diameter
- Vehicle Gallery: Full-width cards, 16:9 ratio
- Moments: Full-screen vertical (9:16 ratio)
- Event Banners: 16:9 ratio, max-height 200px
- Crew Logos: Square, 80px

---

## Animations & Transitions
**Minimal & Purposeful:**
- Profile Card Flip: 600ms 3D rotation
- Tab Switch: 200ms fade
- Button Press: 150ms scale (0.95x)
- Modal Entry: 300ms slide-up with fade
- Loading States: Pulsing yellow glow

---

## Map Integration
- Dark map theme (Mapbox Dark or Google Maps Night)
- User location: Pulsing yellow circle
- Event markers: Custom yellow pins with event icons
- Sticker locations: Collectible badge icons
- Nearby users: Small avatar markers
- Clustering for dense areas

---

## Accessibility
- Maintain WCAG AA contrast ratios
- Yellow on black: 14.5:1 (excellent)
- White on black: 19:1 (excellent)
- Focus indicators: 2px yellow outline
- Touch targets: Minimum 44x44px
- Screen reader labels on all interactive elements

---

## Critical UX Principles
1. **Every feature must be functional** - No placeholder buttons
2. **Real-time updates** - WebSocket for chats and notifications
3. **Smooth animations** - 60fps for all transitions
4. **Instant feedback** - Visual confirmation for all actions
5. **Progressive disclosure** - Advanced features behind clear pathways
6. **VIP prominence** - Badges visible everywhere, exclusive features clearly marked