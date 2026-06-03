# CasaDeFootball DESIGN.md

## Purpose
This DESIGN.md defines the visual and interaction system for **CasaDeFootball** and can also act as a reusable design brief for future sports, editorial, and dark premium web projects. Any agent working on this repo should follow this file across future passes unless a newer version explicitly replaces it.

This is not a generic startup UI system.
This is a **premium football editorial system**.

---

## Core Identity

### Brand idea
Football as spectacle.
Crowd energy, matchday tension, floodlights, turf, motion blur, stadium scale, and editorial storytelling.

### Tone
- Dark-first
- Cinematic
- Athletic
- Editorial
- Premium
- Sharp
- Intentional
- Built, not generated

### What it should feel like
The site should feel closer to a premium football media product, campaign microsite, or sports editorial experience than a generic SaaS landing page.

---

## Design Principles

1. **Photography leads.** Visual emotion comes from football imagery, not decorative UI effects.
2. **Dark canvas first.** The background is not filler; it is part of the brand atmosphere.
3. **One accent, used with discipline.** Football green is a signal color, not a decoration color.
4. **Typography carries authority.** Use strong display typography and restrained body text.
5. **Sharp beats soft.** Prefer rectangular precision over rounded, bubbly components.
6. **Motion must feel expensive.** Subtle, confident, smooth. Never gimmicky.
7. **Editorial rhythm over repetitive sections.** Vary composition, hierarchy, and spacing across sections.
8. **No AI-slop.** If a section looks like it came from a default AI website generator, redesign it.

---

## Color System

Use these tokens unless there is a project-specific reason to extend them.

```css
:root {
  --color-canvas: #0a0a0a;
  --color-surface: #111111;
  --color-surface-card: #1a1a1a;
  --color-surface-elevated: #222222;
  --color-surface-soft: #0d0d0d;

  --color-accent: #00a651;
  --color-accent-hover: #008f44;
  --color-accent-active: #006b33;
  --color-accent-soft: rgba(0, 166, 81, 0.12);

  --color-text: #ffffff;
  --color-text-body: #bbbbbb;
  --color-text-muted: #7e7e7e;
  --color-text-faint: #5a5a5a;
  --color-text-inverse: #000000;

  --color-hairline: #2c2c2c;
  --color-hairline-strong: #3a3a3a;

  --color-sale-red: #e22718;
  --color-win-green: #00a651;
  --color-draw-gold: #f4b400;
}
```

### Color rules
- Backgrounds should stay within the black/charcoal family.
- Main text should be white or near-white.
- Body text should be softened, not dimmed into low-contrast gray mush.
- Accent green should be used for primary CTA emphasis, active nav states, score/result badges, and controlled highlights.
- Do not introduce purple, magenta, random neon blue, or gradient rainbow accents unless a project explicitly calls for it.

---

## Typography

### Preferred font pairing
- **Display:** Bebas Neue
- **Body:** Inter

Fallbacks are allowed when implementation constraints exist, but the overall hierarchy must remain the same: bold, compressed, uppercase display moments paired with calm, clean editorial body text.

```css
:root {
  --font-display: 'Bebas Neue', 'Anton', 'Arial Narrow', sans-serif;
  --font-body: 'Inter', 'Helvetica Neue', sans-serif;

  --text-hero: clamp(64px, 8vw, 120px);
  --text-2xl: clamp(40px, 5vw, 72px);
  --text-xl: clamp(28px, 3.5vw, 48px);
  --text-lg: clamp(20px, 2.5vw, 32px);
  --text-base: 16px;
  --text-sm: 14px;
  --text-xs: 12px;
}
```

### Typography rules
- Hero and major section headings use the display font, uppercase, tight leading, and strong scale.
- Body copy uses the body font with clean spacing and lighter weight.
- Labels, badges, nav items, and buttons use compact uppercase styling with tracking.
- Avoid mixing too many font personalities.
- Avoid soft, generic startup typography.

---

## Spacing and Shape

```css
:root {
  --radius-none: 0px;
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-pill: 9999px;
  --radius-full: 50%;

  --space-xxs: 4px;
  --space-xs: 8px;
  --space-sm: 12px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 40px;
  --space-xxl: 64px;
  --space-section: 96px;

  --transition: 180ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Shape rules
- Use rectangular or nearly rectangular cards by default.
- Avoid bubbly cards and over-rounded component systems.
- Pill shapes are acceptable for specific button patterns, especially ghost or primary CTAs.
- Borders should be subtle, dark, and precise.
- Shadows should be restrained; depth should come more from contrast, surfaces, and imagery than from heavy glow.

---

## Layout System

### Container
```css
.container {
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: clamp(16px, 3vw, 64px);
}
```

### Grid
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(320px, 100%), 1fr));
  gap: var(--space-lg);
}
```

### Layout rules
- Major sections should breathe, but not feel empty.
- Section rhythm must vary. Avoid copy-paste vertical blocks with identical spacing and hierarchy.
- Body content should be left-aligned by default.
- Use asymmetric editorial moments where useful.
- Photography bands may break out full bleed.
- Avoid the default AI landing page pattern of centered hero, three identical cards, testimonial strip, CTA footer.

---

## Hero Direction

The hero is one of the most important brand signals.

### Hero rules
- Full viewport or near full viewport height.
- Full-bleed football imagery when possible.
- Massive display heading.
- Minimal copy.
- One strong CTA.
- Strong visual tension and depth.
- Avoid “text floating on a flat dark background” unless the atmosphere is exceptionally well-crafted.

### Hero sample pattern
```css
.hero {
  position: relative;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
}
.hero__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero__content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  padding: var(--space-xxl);
}
.hero__headline {
  font-family: var(--font-display);
  font-size: var(--text-hero);
  text-transform: uppercase;
  line-height: 0.95;
  letter-spacing: 0.02em;
  color: var(--color-text);
}
```

---

## Buttons

### Primary button
Use sparingly. Usually on surfaces or interior sections, not always on top of photography.

```css
.btn-primary {
  background: var(--color-accent);
  color: #fff;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  border-radius: var(--radius-pill);
  padding: 16px 32px;
  height: 48px;
  border: none;
  cursor: pointer;
  transition: background var(--transition);
}
```

### Ghost button
Best for hero or image-led bands.

```css
.btn-ghost {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-text);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  border-radius: var(--radius-pill);
  padding: 16px 32px;
  height: 48px;
  cursor: pointer;
  transition: background var(--transition), color var(--transition);
}
```

### Button rules
- One strong CTA per major section.
- Avoid cluttered action groups.
- Avoid generic gradient buttons.
- Avoid oversized, floating, soft-shadowed CTA pills.

---

## Component Patterns

### Match cards
- Dark surface
- Sharp border
- Strong score typography
- Small result/status color only where needed
- Clean spacing and readable metadata

### Article cards
- Editorial image-first layout
- Strong title hierarchy
- Minimal metadata
- Good crop discipline on images
- No decorative icons unless truly necessary

### Stats cards
- Strong numeric hierarchy
- Clean label system
- Minimal chrome
- Feels like sports data, not SaaS analytics marketing

### Navigation
- Sharp, compact, clean
- Transparent or low-chrome on hero overlay
- Strong active state
- Mobile menu should feel intentional, not default drawer boilerplate

### Footer
- Keep it strong and minimal
- No cluttered mega-footer unless the site structure really demands it

---

## Motion System

### Motion principles
- Motion should feel premium, not attention-seeking.
- Use reveal, fade, slide, subtle scale, and image movement carefully.
- Motion should improve perceived quality and hierarchy.
- Respect `prefers-reduced-motion`.

### Good motion examples
- Hero content reveal
- Image reveal on load
- Section reveal on scroll
- Subtle card hover lift or shift
- Clean nav/menu transition

### Avoid
- Bouncy toy-like motion
- Excessive parallax
- Scroll-jacking
- Decorative infinite motion with no purpose
- Anything that makes the site feel like a demo template

---

## Imagery Direction

Use real football imagery and art direction thoughtfully.

### Preferred imagery
- Stadium atmosphere
- Match action
- Players in motion
- Floodlights
- Crowd emotion
- Grass/turf texture
- Tight editorial crops
- Monochrome or high-contrast sports photography where suitable

### Avoid
- Generic stock team huddles everywhere
- Random smiling business-style sports photos
- Poor low-resolution hero images
- Unrelated abstract graphics used to fake depth

---

## Content Tone

Copy should feel:
- concise
- confident
- football-aware
- editorial
- specific

Avoid generic filler like:
- Discover more
- Unlock your potential
- Transform your football journey
- Experience the future of sports

Prefer language grounded in football, matches, clubs, culture, stories, stats, and atmosphere.

---

## Anti-Patterns

Do not ship these unless a project explicitly demands otherwise:

- Purple or blue AI gradients
- Neon blobs
- Over-rounded UI
- Generic glassmorphism
- Centered body text everywhere
- Three identical feature cards with icons in circles
- Decorative floating shapes
- Colored side borders on cards
- Template SaaS section stacking
- Random glows used as visual crutches
- Placeholder or fake demo-looking copy
- Motion that exists only to look “fancy”

If the work looks like it came from a one-shot AI website builder, it has failed the brief.

---

## Accessibility and Quality

Always maintain:
- semantic HTML
- proper heading structure
- visible focus states
- adequate contrast
- accessible button/link targets
- responsive layout behavior
- clean mobile hierarchy

This design system should feel premium on both desktop and mobile.

---

## Agent Instructions

Any future coding or design agent working on CasaDeFootball or derivative projects should:

1. Read this DESIGN.md first.
2. Audit the existing code before rewriting.
3. Preserve good implementation work.
4. Align all new work to this design system.
5. Remove AI-slop patterns if they appear.
6. Prefer refinement over unnecessary replacement.
7. Keep the site visually coherent across passes.

If there is ambiguity, choose the option that feels more **editorial, athletic, restrained, and premium**.

---

## Reuse Across Future Projects

This DESIGN.md can also be reused for future projects that are:
- sports sites
- dark editorial brands
- campaign-style landing pages
- premium media experiences
- football culture products

For non-football future projects, preserve the system logic but swap the imagery direction and possibly the accent color if the new brand requires it.

---

## Final Test

Before considering a page complete, ask:

- Does this feel premium?
- Does it feel football-first?
- Does it avoid looking AI-generated?
- Does typography carry enough authority?
- Is the accent color disciplined?
- Is the page emotionally led by imagery and hierarchy rather than decoration?
- Would this still look good if seen next to professionally designed sports/editorial work?

If the answer is no, keep refining.
