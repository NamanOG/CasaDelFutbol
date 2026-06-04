# CasaDeFootball DESIGN.md

## Purpose

This DESIGN.md defines the visual, motion, and interaction system for **CasaDeFootball**.

It is the source of truth for all redesign work in this repo.

This is **not** a generic football editorial system.
This is a **premium FIFA World Cup 2026-inspired football tournament system**.

If any implementation choice conflicts with this file, this file wins.

---

## Core Identity

### Brand idea

Football as a global event.

This site should feel like a tournament universe:

- stadium scale
- broadcast energy
- matchday tension
- fan culture
- national identity
- editorial storytelling
- premium sports branding

### Tone

- Dark-first
- Cinematic
- Athletic
- Tournament-driven
- Premium
- Sharp
- Confident
- Energetic
- Built, not generated

### What it should feel like

The site should feel closer to:

- FIFA World Cup digital branding
- a premium tournament microsite
- a broadcast companion experience
- a modern sports campaign page

It should **not** feel like a generic football blog, SaaS landing page, or template homepage.

---

## Design Principles

1. **Tournament identity first.** The visual system should feel like an event brand, not just a content site.
2. **Football atmosphere matters.** Floodlights, pitch lines, crowd energy, scoreboards, brackets, and broadcast cues should shape the experience.
3. **One dark base, many controlled accents.** The background stays dark and premium; color is used deliberately.
4. **Typography must feel monumental.** Headings should have authority and scale.
5. **Geometric systems are part of the brand.** Use circles, arcs, rings, blocks, and panel structures inspired by tournament graphics.
6. **Motion must feel expensive.** Smooth, restrained, cinematic, and purposeful.
7. **Editorial rhythm over repetition.** Vary section compositions so the site feels designed, not assembled.
8. **No AI-slop.** If a section feels generic, over-rounded, or template-like, redesign it.

---

## Visual Direction

### Overall direction

Blend:

- FIFA World Cup 2026 branding energy
- premium football culture
- modern sports editorial design
- broadcast-style graphics
- immersive motion and depth

### Visual language

Use:

- bold color blocks
- large geometric forms
- layered gradients
- subtle pitch-line motifs
- stadium lighting effects
- scoreboard-inspired modules
- circular tournament graphics
- asymmetric layouts
- image-led sections

### What to avoid

- generic SaaS gradients
- random decorative blobs
- over-soft glassmorphism
- pastel toy visuals
- standard “three cards and a CTA” homepage structure
- anything that looks like a default AI website

---

## Color System

Use these tokens as the foundation.

```css
:root {
  --color-canvas: #0a0a0a;
  --color-surface: #111111;
  --color-surface-card: #171717;
  --color-surface-elevated: #1f1f1f;
  --color-surface-soft: #0d0d0d;

  --color-text: #ffffff;
  --color-text-body: #c7c7c7;
  --color-text-muted: #8c8c8c;
  --color-text-faint: #5f5f5f;
  --color-text-inverse: #000000;

  --color-hairline: #282828;
  --color-hairline-strong: #3a3a3a;

  --color-primary-blue: #595ec7;
  --color-primary-green: #28b84e;
  --color-primary-red: #f91f21;
  --color-primary-gold: #d5ad1f;

  --color-blue-soft: rgba(89, 94, 199, 0.14);
  --color-green-soft: rgba(40, 184, 78, 0.14);
  --color-red-soft: rgba(249, 31, 33, 0.14);
  --color-gold-soft: rgba(213, 173, 31, 0.14);

  --color-success: #28b84e;
  --color-warning: #f4b400;
  --color-danger: #f91f21;
  --color-info: #595ec7;
}
```

### Color rules

- The canvas remains dark.
- White and near-white carry the text hierarchy.
- Blue, green, red, and gold are event accents.
- Use color to signal meaning, not decoration.
- Avoid rainbow gradients.
- Avoid using every accent at full strength in the same section.
- Use gold for prestige, blue for structure, green for football energy, red for urgency or highlight moments.

### Recommended usage

- **Blue:** primary brand structure, links, headers, tournament framing
- **Green:** active states, live elements, CTA emphasis, pitch-related cues
- **Red:** important alert, live, goal, or breaking states
- **Gold:** hero highlights, prestige, trophies, spotlight elements

---

## Typography

### Preferred font pairing

- **Display:** Bebas Neue
- **Body:** Inter

Fallbacks are allowed, but the hierarchy must stay bold and editorial.

```css
:root {
  --font-display: 'Bebas Neue', 'Anton', 'Arial Narrow', sans-serif;
  --font-body: 'Inter', 'Helvetica Neue', sans-serif;

  --text-hero: clamp(64px, 9vw, 140px);
  --text-2xl: clamp(40px, 5vw, 80px);
  --text-xl: clamp(28px, 3.5vw, 52px);
  --text-lg: clamp(20px, 2.5vw, 32px);
  --text-base: 16px;
  --text-sm: 14px;
  --text-xs: 12px;
}
```

### Typography rules

- Hero headings should feel monumental.
- Use uppercase display type for main headlines and section labels.
- Keep body text calm, readable, and structured.
- Use tight tracking on hero type, not on long body copy.
- Labels, badges, nav items, and CTAs should feel compact and confident.
- Avoid soft, generic startup typography.
- Avoid mixing too many font personalities.

---

## Shape, Spacing, and Surfaces

```css
:root {
  --radius-none: 0px;
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-pill: 9999px;

  --space-xxs: 4px;
  --space-xs: 8px;
  --space-sm: 12px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 40px;
  --space-xxl: 64px;
  --space-section: 96px;

  --transition-fast: 180ms cubic-bezier(0.16, 1, 0.3, 1);
  --transition-medium: 320ms cubic-bezier(0.16, 1, 0.3, 1);
  --transition-slow: 520ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Shape rules

- Use sharp, structured rectangles as the default.
- Rounded corners should be controlled and minimal.
- Pill shapes are allowed for specific buttons and chips.
- Borders should be subtle, crisp, and intentional.
- Depth should come from contrast, layering, and image treatment rather than heavy shadows.

---

## Layout System

### Container

```css
.container {
  max-width: 1480px;
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

- Major sections should have breathing room.
- Section rhythm must vary.
- Use asymmetry where it improves energy.
- Let some sections break out full-bleed.
- Avoid repetitive stacked blocks with identical spacing.
- Avoid the default AI homepage pattern:
  centered hero → three cards → testimonials → CTA footer.
- Prefer editorial pacing with contrast between dense and spacious areas.

---

## Hero Direction

The hero is the most important brand signal.

### Hero rules

- Full viewport or near full viewport height.
- Strong first impression within one second.
- Full-bleed hero imagery or a powerful graphic treatment.
- Massive display headline.
- Minimal support copy.
- One primary CTA and one secondary CTA.
- Strong sense of depth, scale, and atmosphere.
- Must feel like a tournament opening screen.

### Hero composition

The hero may include:

- player photography
- stadium lights
- pitch markings
- a large geometric brand form
- scoreline / event chips
- a subtle animated background layer
- a strong CTA cluster

### Hero sample pattern

```css
.hero {
  position: relative;
  width: 100%;
  min-height: 100dvh;
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(10,10,10,0.20) 0%, rgba(10,10,10,0.75) 75%, rgba(10,10,10,0.95) 100%);
}

.hero__content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 100dvh;
  padding: var(--space-xxl);
}

.hero__headline {
  font-family: var(--font-display);
  font-size: var(--text-hero);
  text-transform: uppercase;
  line-height: 0.9;
  letter-spacing: 0.02em;
  color: var(--color-text);
  max-width: 10ch;
}
```

---

## Navigation

### Navigation rules

- Sticky.
- Compact.
- Premium.
- Football-branded.
- Responsive and motion-aware.
- Strong active state.
- Mobile nav should feel designed, not like a default drawer.

### Navigation style

- Transparent or low-chrome over hero
- Solid dark background after scroll
- Simple logo treatment
- Clear hierarchy for:
  - Home
  - Fixtures
  - Leagues
  - Teams
  - Trophies
  - News
- Optional match/live chip or tournament chip

### Mobile nav

- Must animate smoothly
- Should include active state and clear close behavior
- Use full-screen or near full-screen overlay only if it improves clarity

---

## Buttons

### Primary button

Use sparingly. It should feel decisive.

```css
.btn-primary {
  background: var(--color-primary-blue);
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
  transition: transform var(--transition-fast), background var(--transition-fast), box-shadow var(--transition-fast);
}
```

### Secondary button

Use for alternate actions.

```css
.btn-secondary {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-hairline-strong);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  border-radius: var(--radius-pill);
  padding: 16px 32px;
  height: 48px;
  cursor: pointer;
  transition: transform var(--transition-fast), border-color var(--transition-fast), background var(--transition-fast);
}
```

### Button rules

- One strong CTA per major section.
- Avoid cluttered action clusters.
- Avoid oversized floating pills.
- Avoid generic gradients.
- Hover states should be subtle but alive.

---

## Card Patterns

### Match cards

- Dark surface
- Sharp border
- Strong score typography
- Team names and metadata clearly separated
- Live / final / upcoming status chips
- Clean spacing and readable hierarchy

### League cards

- Tournament identity should feel structured and premium
- Include geometric framing or color segmentation
- Highlight standings, group labels, or competition badges

### Team cards

- Hero image or crest-led
- Clear identity treatment
- Hover should feel tactile
- Can include nation/club color strip or stat preview

### Trophy cards

- Premium, prestigious, museum-like
- Gold accent allowed
- Should feel special, not just another card

### News cards

- Editorial image-first layout
- Strong headline hierarchy
- Minimal metadata
- Better crop discipline than a generic blog grid

### Stats cards

- Strong numeric hierarchy
- Clean label system
- Minimal chrome
- Feels like sports data, not SaaS analytics

---

## Graphic System

### Direction

Use football-tournament graphics as a design layer, not decoration.

### Motifs to use

- circles and arcs
- quarter circles
- rings and outlines
- pitch-line overlays
- scoreboard frames
- bracket-like structures
- geometric blocks
- tournament badge shapes
- stripe patterns
- panel overlays

### Usage rules

- Patterns should support the content.
- Avoid noisy wallpaper backgrounds.
- Use motifs to frame sections, not overpower them.
- The graphics should feel like a World Cup identity system.

---

## Motion System

### Motion principles

- Motion must feel premium, not playful.
- Use motion to reveal hierarchy and depth.
- Keep timing smooth and confident.
- Avoid gimmicks.
- Respect `prefers-reduced-motion`.

### Good motion examples

- Hero content reveal
- Image entrance reveal
- Section fade/slide in
- Card hover lift
- Nav transition
- Ticker or live score transition
- Tournament graphic parallax at low intensity
- Count-up or score-flip moments when useful

### Motion feel

- Start soft
- End clean
- No bounce-heavy toy motion
- No excessive parallax
- No scroll-jacking
- No endless decorative motion without purpose

### Motion timing guidance

- Hover: 160–220ms
- Section reveal: 400–700ms
- Image reveal: 500–800ms
- Page transition: 250–500ms
- Use easing curves that feel smooth and precise

---

## Imagery Direction

Use football imagery and art direction deliberately.

### Preferred imagery

- stadium atmosphere
- match action
- players in motion
- floodlights
- crowd emotion
- turf texture
- broadcast-style closeups
- trophy moments
- high-contrast sports photography

### Art direction

- Strong crops
- Bold overlays
- Color treatment aligned with the palette
- Hero imagery should feel cinematic
- Use images to create emotional scale

### Avoid

- generic smiling team stock photos
- low-quality or blurry assets
- random abstract shapes pretending to be atmosphere
- unrelated decorative imagery

---

## Content Tone

Copy should feel:

- concise
- confident
- football-aware
- editorial
- specific
- event-led

Avoid generic filler like:

- Discover more
- Unlock your potential
- Transform your football journey
- Experience the future of sports

Prefer language grounded in:

- matches
- teams
- fixtures
- leagues
- trophies
- tournaments
- stadiums
- fan culture
- live moments

---

## Accessibility and Quality

Always maintain:

- semantic HTML
- proper heading structure
- visible focus states
- adequate contrast
- accessible button and link targets
- responsive layout behavior
- keyboard navigability
- sensible motion fallbacks

### Accessibility rules

- Never rely on color alone to communicate state
- Use meaningful alt text
- Provide visible focus rings
- Respect `prefers-reduced-motion`
- Ensure text remains readable on all surfaces
- Keep tap targets large enough on mobile

---

## Anti-Patterns

Do not ship these unless explicitly requested:

- purple AI gradients
- neon blobs
- over-rounded UI everywhere
- generic glassmorphism
- centered body text everywhere
- three identical cards with circle icons
- decorative floating shapes
- template SaaS section stacking
- random glows used as visual crutches
- fake demo-looking copy
- motion that exists only to look fancy
- layouts that do not feel football-first

If the work looks like a one-shot AI website builder, it has failed the brief.

---

## Agent Instructions

Any future coding or design agent working on CasaDeFootball should:

1. Read this DESIGN.md first.
2. Audit the current code before rewriting.
3. Preserve good implementation work.
4. Follow this file as the visual source of truth.
5. Remove template-like UI patterns.
6. Prefer refinement over unnecessary replacement.
7. Keep the site coherent across all sections.

If there is ambiguity, choose the direction that feels more:

- premium
- cinematic
- tournament-driven
- football-first
- editorial
- global

---

## Final Test

Before considering a page complete, ask:

- Does this feel like a World Cup-quality football experience?
- Does it feel premium and event-driven?
- Does it avoid looking AI-generated?
- Does typography carry enough authority?
- Are colors used with discipline?
- Does the page feel emotionally led by imagery and hierarchy?
- Would this stand next to professional sports branding?

If the answer is no, keep refining.
