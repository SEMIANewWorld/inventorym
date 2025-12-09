# Diwali Gift Distribution App - Design Guidelines

## Design Approach
**Hybrid System-Based with Festive Celebration**: Material Design foundation enhanced with Diwali-themed visual elements. The approach balances functional dashboard requirements with celebratory aesthetics - think Google's Diwali Doodles meets modern admin interfaces.

**Key Design Principles**:
- Celebratory yet professional - festive without compromising usability
- Clear hierarchy for multi-role access (Admin, HR, Employee views)
- Data-dense layouts with breathing room
- Trust and transparency in gift tracking

## Core Design Elements

### A. Color Palette

**Light Mode**:
- Primary: 25 85% 55% (Diwali Orange - warm, celebratory)
- Secondary: 280 60% 50% (Deep Purple - traditional)
- Accent: 45 95% 60% (Golden Yellow - prosperity, used sparingly for CTAs)
- Background: 0 0% 98% (Soft white)
- Surface: 0 0% 100% (Pure white cards)
- Text Primary: 240 15% 15%
- Text Secondary: 240 10% 45%

**Dark Mode**:
- Primary: 25 80% 60%
- Secondary: 280 55% 60%
- Accent: 45 90% 65%
- Background: 240 15% 8%
- Surface: 240 12% 12%
- Text Primary: 0 0% 95%
- Text Secondary: 0 0% 70%

**Status Colors**:
- Success (Acknowledged): 142 70% 45%
- Warning (Pending): 38 92% 50%
- Error: 0 84% 60%

### B. Typography

**Font Families** (via Google Fonts):
- Headings: 'Poppins' (600, 700) - modern, friendly, professional
- Body: 'Inter' (400, 500, 600) - highly readable for data tables
- Accent/Festive: 'Playfair Display' (700) - for hero/celebration moments

**Scale**:
- Hero/Display: 3.5rem (56px) / line-height 1.1
- H1: 2.25rem (36px) / line-height 1.2
- H2: 1.875rem (30px) / line-height 1.3
- H3: 1.5rem (24px) / line-height 1.4
- Body: 1rem (16px) / line-height 1.6
- Small: 0.875rem (14px) / line-height 1.5

### C. Layout System

**Spacing Primitives**: Tailwind units of 4, 8, 12, 16, 24 (p-4, gap-8, mt-12, py-16, mb-24)
- Tight spacing: 4 units (component internals)
- Standard: 8 units (between related elements)
- Section spacing: 16-24 units (major sections)

**Container Strategy**:
- Max-width: 7xl (1280px) for dashboards
- Cards/Tables: max-w-6xl with proper overflow handling
- Forms: max-w-2xl centered

**Grid Patterns**:
- Dashboard stats: 4-column grid on desktop (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)
- HR Cards: 2-column grid (grid-cols-1 lg:grid-cols-2)
- Employee tables: Full-width responsive with horizontal scroll on mobile

### D. Component Library

**Navigation**:
- Top navbar: Fixed, glass-morphism effect (backdrop-blur-md bg-white/80)
- Logo with diya (lamp) icon on left
- Role-based menu items center
- Profile dropdown right with notification badge for pending acknowledgments

**Dashboard Cards**:
- Elevated surface: shadow-lg with subtle border
- Gradient backgrounds for stats cards (orange to purple)
- Icon + Number + Label layout
- Hover: subtle lift (hover:shadow-xl transition)

**Data Tables**:
- Zebra striping for rows (alternate bg-gray-50)
- Sticky header on scroll
- Action buttons: icon-only with tooltips
- Status badges: pill-shaped with status colors
- Pagination: bottom-right with page numbers

**Forms**:
- Floating labels for text inputs
- File upload: Drag-and-drop zone with CSV icon
- Submit buttons: Full-width primary accent color
- Validation: Inline error messages in red

**Email Template**:
- Header: Festive banner with diyas and rangoli pattern (decorative image)
- Body: White card on gradient background
- CTA Button: Large, accent-colored, 3D shadow effect
- Footer: Company branding with social links

**Modals/Overlays**:
- Backdrop: dark overlay (bg-black/40)
- Content: centered card with close icon top-right
- Confirmation dialogs: Icon + Message + Action buttons

### E. Festive Design Elements

**Decorative Patterns**:
- Subtle rangoli patterns as background elements (opacity 5-10%)
- Diya (lamp) icons for acknowledgment success states
- Mandala corner decorations on hero sections
- Sparkle/firework micro-animations on successful actions (brief, 0.3s)

**Visual Hierarchy**:
- Hero sections: Use Playfair Display with decorative underline
- Cards: Subtle gradient borders (1px, orange to purple)
- Icons: Heroicons with festive color fills for status indicators

## Images

**Hero Section Image**: 
- Description: Abstract Diwali celebration - stylized diyas (oil lamps) with warm bokeh lights, rangoli patterns, marigold flowers
- Placement: Full-width hero background with overlay gradient (dark gradient bottom-up for text readability)
- Treatment: Slightly desaturated to avoid overwhelming text content

**Dashboard Decorative Images**:
- Small decorative diya icons next to stat numbers
- Gift box illustrations in empty states
- Festive confetti pattern for success messages

**Email Template Image**:
- Header banner: Horizontal Diwali pattern with diyas and lights (150px height)
- Background: Subtle mandala watermark (very low opacity)

## Responsive Behavior

**Breakpoints**:
- Mobile (< 640px): Single column, simplified navigation (hamburger), stacked stats
- Tablet (640-1024px): 2-column layouts, condensed tables
- Desktop (> 1024px): Full multi-column layouts, expanded data views

**Mobile Optimizations**:
- Bottom navigation for HR/Admin quick actions
- Swipe actions on employee list items
- Compact table view with expand/collapse rows
- Touch-friendly buttons (min 44px height)

## Accessibility & Dark Mode

- Maintain WCAG AA contrast ratios (4.5:1 for text)
- Dark mode: Consistent implementation across all components including form inputs
- Focus states: 2px accent color ring with offset
- Screen reader labels for all icon-only buttons
- Keyboard navigation for all interactive elements