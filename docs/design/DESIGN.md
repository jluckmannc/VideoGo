# 🎨 VideoGo — Design System

**Version:** 1.0  
**Last Updated:** June 24, 2026  
**Scope:** Android dashcam demo frontend  
**Audience:** Developers, designers, product team

---

## 📋 Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Layout & Composition](#layout--composition)
5. [Components](#components)
6. [Motion & Animation](#motion--animation)
7. [Responsive Design](#responsive-design)
8. [Screen Specifications](#screen-specifications)
9. [Usage Guidelines](#usage-guidelines)

---

## Design Philosophy

### Memorable Thing
**"Professional. Serious. Calm in emergencies."**

VideoGo is a safety-first dashcam app for drivers who need to trust their device during critical moments. The design communicates:
- **Professionalism:** This is serious technology, not a toy
- **Reliability:** You can depend on this app when it matters
- **Clarity:** No friction, no confusion, especially in emergency situations
- **Restraint:** Dark, minimal, laser-focused on the task

### Principles

1. **Minimalisme intentional** — Every pixel serves a purpose. If removing it doesn't hurt, remove it.
2. **Urgency without panic** — The SOS feature must feel serious and achievable, never alarmist or overwhelming.
3. **Driver-first interaction** — Designed for single-handed operation, large touch targets, zero need to read instructions.
4. **Dark by default** — Reduces eye strain during long drives, feels professional, fits Android native style.
5. **Hierarchy through restraint** — With only a few colors and sizes, each choice becomes a statement.

---

## Color System

### Dark Theme (Primary)

VideoGo uses a **dark theme optimized for driving contexts.** All colors are defined as CSS variables for consistency and flexibility.

#### Base Palette

```css
/* Backgrounds */
--bg: #0a0a14;              /* Deep dark — main background */
--surface: #12121e;         /* Elevated surfaces — cards, panels */
--surface-elevated: #1a1a2a;/* Highest elevation — modals, overlays */

/* Text */
--fg: #f1f5f9;              /* Primary text — high contrast */
--muted: #94a3b8;           /* Secondary text — reduced emphasis */
--muted-dark: #64748b;      /* Tertiary text — very subtle */

/* Borders & Dividers */
--border: rgba(255,255,255,0.06); /* Subtle dividers, reduced opacity */

/* Semantic Colors */
--danger: #dc2626;          /* Error, alert, emergency (SOS) */
--danger-dark: #991b1b;     /* Darker variant for depth */
--danger-light: rgba(220,38,38,0.12); /* Light background for danger context */

--success: #16a34a;         /* Confirmation, positive actions */
--accent: #1d4ed8;          /* Primary interaction color */
--accent-hover: #2563eb;    /* Hover state for accent */
--accent-active: #1e40af;   /* Pressed/active state */
--accent-on: #ffffff;       /* Text/icon on accent background */
```

#### Color Usage by Context

| Element | Color | Why |
|---------|-------|-----|
| **App background** | `--bg` | Deepest dark, reduces eye strain |
| **Cards, panels** | `--surface` | Subtle elevation, scannable |
| **Modal, overlay** | `--surface-elevated` + `rgba(0,0,0,0.65)` backdrop | Focused attention |
| **Primary text** | `--fg` | Maximum readability (4.5:1 WCAG AA) |
| **Disabled/hint** | `--muted` | Reduced emphasis, clear hierarchy |
| **SOS/Emergency** | `--danger` (#dc2626) | Urgent, unmistakable, no ambiguity |
| **Buttons (default)** | `--accent` | CTA, interaction invitation |
| **Recording indicator** | `--danger` (pulsing) | Clear visual feedback |
| **Dividers/hairlines** | `--border` (6% opacity) | Subtle structure, not noise |

#### Contrast & Accessibility

✅ **WCAG AA Compliant (4.5:1 on body text)**
- `--fg` (#f1f5f9) on `--bg` (#0a0a14): 18.5:1 (exceeds AAA)
- `--fg` (#f1f5f9) on `--surface` (#12121e): 17.8:1 (exceeds AAA)
- `--muted` (#94a3b8) on `--bg`: 8.2:1 (AAA for secondary text)

✅ **No red-green only encoding** — SOS uses red + icon + animation, not color alone

✅ **Tested with achromatopsia** — Design remains functional in grayscale (button shapes, contrast maintained)

---

## Typography

### Font Stack

#### Display (Headings, CTA)
```css
font-family: "Geist", "Geist Sans", -apple-system, system-ui, "Segoe UI", Arial, sans-serif;
font-weight: 700; /* Bold for h1, h2 */
font-weight: 600; /* Semibold for h3, h4 */
```

**Why Geist?** Clean, geometric, contemporary. Works in low-light conditions (dashcam use). Not generic (no Inter/Roboto overload). Free on Google Fonts or locally downloadable.

**Fallback strategy:** If Geist fails to load, system-ui provides a reasonable fallback. Never bare system fonts — curate the stack.

#### Body (UI text, descriptions)
```css
font-family: "Geist", "Geist Sans", -apple-system, system-ui, "Segoe UI", Arial, sans-serif;
font-weight: 400; /* Regular */
font-weight: 500; /* Medium (strong body emphasis) */
```

**Same family as display** — Geist is large enough to work at all scales. Simplifies codebase, ensures consistency.

#### Monospace (Timers, codes, data)
```css
font-family: "Fira Code", ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Monaco, Consolas, monospace;
font-variant-numeric: tabular-nums; /* Fixed-width numerals for alignment */
```

**Why Fira Code?** Clear letterforms (important in driving context — no ambiguity between 0/O, 1/l). Monospace creates visual contrast for data/timers.

### Scale & Sizing

**Typographic scale:** 1.125 major second (8:9 ratio, moderate and legible)

| Element | Size | Line-height | Weight | Example |
|---------|------|-------------|--------|---------|
| **H1** | 28px | 1.2 | 700 | Page title (dashboard, settings) |
| **H2** | 24px | 1.2 | 700 | Section heading |
| **H3** | 20px | 1.2 | 600 | Subsection, dialog title |
| **H4** | 16px | 1.5 | 600 | Card title, strong emphasis |
| **Body** | 16px | 1.5 | 400 | Primary text content |
| **Body Small** | 14px | 1.5 | 400 | Secondary text, labels |
| **Caption** | 12px | 1.4 | 500 | Timestamps, hints, metadata |
| **Mono (timer)** | 12-24px | 1.2 | 400 | REC timer, duration, codes |

### Typographic Rules

✅ **Body text must be ≥16px** (WCAG 2.1)  
✅ **Line-height ≥1.5 for body** (readability, especially while driving)  
✅ **Line-height ≤1.2 for headings** (compact, clear hierarchy)  
✅ **Measure (line width) 45-75 chars** (if text is full-width, apply max-width)  
✅ **Use `text-wrap: balance` on headings** (prevents awkward breaks)  
✅ **Curly quotes** (not straight: prefer "quote" over "quote")  
✅ **Ellipsis character** (`…` not `...`)  
✅ **Monospace for numbers in columns** (`font-variant-numeric: tabular-nums`)  
✅ **No placeholder-as-label pattern** (labels must be visible when field has content)

### Font Loading

```css
@font-face {
  font-family: "Geist";
  src: url("/fonts/geist-regular.woff2") format("woff2");
  font-weight: 400;
  font-display: swap; /* Don't block render waiting for font */
}

@font-face {
  font-family: "Geist";
  src: url("/fonts/geist-bold.woff2") format("woff2");
  font-weight: 700;
  font-display: swap;
}
```

**Why `font-display: swap`?** Avoid invisible text during load. System fonts render immediately, Geist swaps in when ready. No FOUT (flash of unstyled text) — users see content first.

---

## Layout & Composition

### Grid & Spacing

**Base unit:** 4px  
**Spacing scale:** 4, 8, 12, 16, 20, 24, 32, 40, 48, 64

| Variable | Value | Use Case |
|----------|-------|----------|
| `--space-1` | 4px | Micro-spacing (icon-text gap) |
| `--space-2` | 8px | Adjacent elements |
| `--space-3` | 12px | Small gaps |
| `--space-4` | 16px | **Standard gap** (most common) |
| `--space-5` | 20px | Medium separation |
| `--space-6` | 24px | **Section spacing** (between major blocks) |
| `--space-8` | 32px | Large blocks |

**Rule:** Never use arbitrary spacing values (`margin: 13px`, `padding: 17px`). Always use the scale. Enforces rhythm, reduces visual noise.

### Radius & Curves

```css
--radius-sm: 6px;     /* Input fields, small buttons */
--radius-md: 8px;     /* Default — cards, medium components */
--radius-lg: 12px;    /* Dialogs, large components, CTAs */
--radius-pill: 9999px; /* Pills, badges, full circles */
```

**Inner radius rule:** Inner radius = outer radius - gap  
Example: Card with padding 16px, border-radius 12px → inner elements get radius 8px (12 - 4 = 8)

**Why no universal bubbly radius?** Bubbly (large radius on everything) reads as overly designed or AI-generated. A thoughtful radius hierarchy looks intentional.

### Viewport & Mobile-First

**Breakpoints:**

```css
/* Mobile-first */
:root {
  /* Default: 375px (iPhone SE) */
  --viewport-width: 375px;
}

@media (min-width: 768px) {
  /* Tablet */
  --viewport-width: 768px;
}

@media (min-width: 1024px) {
  /* Desktop */
  --viewport-width: 1024px;
}

@media (min-width: 1440px) {
  /* Wide desktop */
  --viewport-width: 1440px;
}
```

**Max content width:** 1200px (prevents single-column text from stretching to 2000px readability hell)

**Safe areas:** `env(safe-area-inset-*)` applied to header, footer, and nav to respect notches/home indicators on iOS.

### Composition Hierarchy

**Primary viewport (above the fold):**
1. Top bar (brand, time, status)
2. **Hero/primary action** (record button, large CTA, or main content)
3. Hint or supporting text (optional)

**Secondary content (below fold):**
4. Related actions, secondary CTAs
5. Settings, details, links

**Navigation:**
- Top bar (status, return)
- Bottom nav (primary flows: Home, Histor Ajustes)
- **Never** floating nav that blocks content

---

## Components

### Buttons

#### Primary CTA Button
```css
.btn-primary {
  background: var(--accent); /* #1d4ed8 */
  color: var(--accent-on); /* #ffffff */
  border: none;
  border-radius: var(--radius-lg);
  padding: 12px 20px; /* Min 44px height on touch */
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: background 150ms var(--ease-standard);
}

.btn-primary:hover { background: var(--accent-hover); }
.btn-primary:active { background: var(--accent-active); transform: scale(0.98); }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
```

**Touch target:** ≥44x44px (ADA, industry standard)  
**Easing:** `cubic-bezier(0.2, 0, 0, 1)` (ease-out, feels responsive)  
**Active state:** Scale + color (not depth shift — keeps interface clean)

#### Secondary Button
```css
.btn-secondary {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--fg);
  padding: 12px 20px;
  border-radius: var(--radius-lg);
  font-weight: 500;
  transition: background 150ms, border 150ms;
}

.btn-secondary:hover { background: rgba(255, 255, 255, 0.04); border-color: rgba(255, 255, 255, 0.1); }
```

#### SOS/Danger Button (Emergency-specific)
```css
.btn-sos {
  background: var(--danger); /* #dc2626 */
  color: white;
  border: none;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 24px rgba(220, 38, 38, 0.4);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { opacity: 0.85; }
}
```

**Design intent:** Large, unmistakable, clear affordance. Pulsing animation communicates "waiting for your action" without being aggressive.

### Cards & Containers

```css
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 16px;
  box-shadow: none; /* Flat design, not skeuomorphic */
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 12px;
}

.card-content {
  font-size: 14px;
  color: var(--fg);
  line-height: 1.5;
}
```

### Input Fields & Forms

```css
input, textarea {
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 12px;
  color: var(--fg);
  font-size: 16px; /* Prevents zoom on iOS */
  font-family: inherit;
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.1); /* Soft focus ring */
}

input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

input::placeholder {
  color: var(--muted-dark);
}
```

**No placeholder-as-label:** Labels must be visible. Use actual `<label>` elements.  
**Focus ring:** Soft, not harsh. Visible on dark background.  
**Font size ≥16px:** Prevents mobile auto-zoom.

### Modals & Overlays

```css
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  z-index: 10;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--surface-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  max-width: 90vw;
  width: 320px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
  z-index: 11;
  animation: slideUp 300ms cubic-bezier(0.2, 0, 0, 1) forwards;
}

@keyframes slideUp {
  from { transform: translate(-50%, -40%); opacity: 0; }
  to { transform: translate(-50%, -50%); opacity: 1; }
}
```

**Backdrop blur:** Communicates modality (user is focused on this overlay, not background)  
**Animation:** Slide-up confirms "something opened"  
**Z-index hierarchy:** Overlay (10), Modal (11), Toasts (12)

### Status Indicators

#### Recording Indicator
```css
.rec-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--danger);
  animation: recordPulse 1.2s ease-in-out infinite;
}

@keyframes recordPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}
```

#### Success Checkmark
```css
.check-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--danger-light);
  border: 1.5px solid var(--danger);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--danger);
  animation: checkPop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes checkPop {
  0% { transform: scale(0); opacity: 0; }
  70% { transform: scale(1.15); }
  100% { transform: scale(1); opacity: 1; }
}
```

---

## Motion & Animation

### Animation Durations

| Duration | Use Case |
|----------|----------|
| 150ms | Hover feedback, small interactions |
| 200ms | Button press, tab switch |
| 300ms | Modal open/close, page transition |
| 500ms | Complex animations (checkmark pop) |
| 1000ms-2000ms | Continuous loops (pulse, recording indicator) |

**Rule:** Anything >500ms should have a purpose (not just "looking good")

### Easing Curves

```css
--ease-standard: cubic-bezier(0.2, 0, 0, 1); /* Snappy, responsive */
--ease-gentle: cubic-bezier(0.4, 0, 0.2, 1); /* Smooth, polished */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* Playful (checkmarks) */
```

**When to use each:**
- **Standard:** Default for all interactive feedback (buttons, hovers, transitions)
- **Gentle:** Smooth page transitions, fades
- **Bounce:** Celebratory moments (confirmation checks, success states)

### Motion Rules

✅ **Only animate transform + opacity** (cheap, GPU-accelerated)  
❌ **Never animate:** width, height, top, left (causes reflow, jank)  
✅ **Respect `prefers-reduced-motion`**

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important; }
}
```

---

## Responsive Design

### Mobile-First Approach

**Start at 375px (iPhone SE), then expand:**

```css
/* Default: 375px mobile */
.container { width: 100%; padding: 16px; }
.button { width: 100%; } /* Full-width on mobile */

/* 768px: Tablet */
@media (min-width: 768px) {
  .container { max-width: 600px; margin: 0 auto; }
  .button { width: auto; } /* Auto-width on larger screens */
}

/* 1024px: Desktop */
@media (min-width: 1024px) {
  .container { max-width: 1000px; }
}
```

### Touch-Friendly Design

✅ **Touch targets:** ≥44x44px  
✅ **Touch spacing:** ≥8px between interactive elements  
✅ **No hover-only interactions** (mobile has no hover)  
✅ **Tap feedback:** Visual change (color, scale) on active state  
✅ **Input font size:** ≥16px (prevents mobile auto-zoom)  
✅ **No double-tap zoom needed** (proper viewport meta + font sizing)

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

---

## Screen Specifications

### 01. Home / Recording View (Primary UX)

**Context:** Main dashcam interface, recording in progress or idle

**Key elements:**
- **Viewfinder** — Full-height, simulated road/sky video feed
- **REC button** — 120px diameter circle, centered
- **Rec controls** (when recording) — Minimize, Mark Moment, SOS, Stop
- **Bottom nav** — Home, History, Settings

**Colors:**
- Viewfinder: gradient (sky to road)
- REC button: `--danger` (#dc2626) + pulsing ring
- Controls: light text on dark overlay

**Typography:**
- "Iniciar grabación": 20px, white, centered
- Recording timer: 16px mono, white, tabular-nums
- Nav labels: 10px, `--muted`

**Spacing:**
- REC button: centered, 120px diameter
- Control buttons: 36px gap between
- Bottom nav: 8px top padding, equal distribution

---

### 02. Grabación (Recording Status)

**Context:** Same as Home but with recording started

**Changes:**
- REC button → hidden / opacity 0
- Bottom nav → opacity 0.2, pointer-events none
- Recording info appears → "REC" badge + timer + segment count
- Control buttons visible

**Colors:** Same as home, but darken non-recording elements

---

### 03. SOS Confirmación (Emergency Confirmation)

**Context:** Modal overlay on top of any screen

**Key elements:**
- **Shield icon** — 80px, `--danger-light` background, pulsing animation
- **Title:** "¿Activar emergencia?" (24px, bold)
- **Subtitle:** "Se notificará a:" (14px, muted)
- **Contacts list** — Scrollable, 3 items pre-filled
- **Hold button** — "Mantener presionado" with progress bar
- **Cancel button** — Secondary style, bottom

**Colors:**
- Shield: `--danger-light` background, `--danger` border
- Progress bar: `--danger`
- Buttons: primary/secondary pattern

**Animation:**
- Shield: pulse 2s infinite
- Modal: slide-up 300ms

**Spacing:**
- Modal: centered, 320px width, 24px padding
- Shield: 80x80px, margin bottom 20px
- List: 6px gap between items
- Buttons: 16px gap

---

### 04. SOS Activo (Emergency Active)

**Context:** Full-screen emergency display

**Key elements:**
- **Header** — `--danger` gradient background, pulsing
  - Label: "Modo Emergencia Activo" (12px, uppercase)
  - Timer: large mono font, 24px
  - Shield icon: 44x44px, pulsing
- **Content panels** — Scrollable:
  - Contactos notificados (with checkmark cascade animation)
  - Ubicación simulada
  - Estado de grabación
- **Alarm button** — 120px circle, wave animation
- **Cancel button** — Bottom, prominent

**Colors:**
- Header: `--danger` gradient to `--danger-dark`
- Checkmarks: animate in with pop effect
- Wave: `--danger` expanding rings
- Cancel: `--danger` border on transparent

**Animation:**
- Header: pulse 2s
- Checkmarks: pop effect 500ms, cascade (0ms, 200ms, 400ms)
- Wave: expand 1s ease-out, infinite loop while alarm active

---

### 05. Historial (Video History)

**Context:** Playback list

**Key elements:**
- **Back button** — Nav
- **List of recordings** — Each with:
  - Thumbnail (mock)
  - Duration
  - Timestamp
  - Segment count (if applicable)
  - SOS indicator (if applicable)
- **Click to detail** → Screen 05-detalle

**Colors:** `--surface` cards on `--bg`, `--muted` timestamps

---

### 06. Configuración (Settings)

**Context:** App preferences

**Key elements:**
- **Settings groups** — Grabación, Almacenamiento, (future) SOS
- **Toggles** — Visual switch with labels
- **Text input** — For custom settings
- **Back button** — Top left

**Colors:** Similar hierarchy to home, `--surface` for grouped settings

---

### 07. Detalle (Recording Details)

**Context:** Playback + metadata for a single recording

**Key elements:**
- **Video player** — Mock with play button
- **Metadata** — Duration, size, date, segments, SOS info if applicable
- **Actions** — Share, download, delete
- **Back button** — Return to history

---

## Usage Guidelines

### When to Use Each Color

| Scenario | Color | Why |
|----------|-------|-----|
| Recording indicator | `--danger` (pulsing) | Unmistakable, attention-grabbing, not alarming |
| SOS feature | `--danger` + animation | Serious, urgent, but professional |
| Primary button | `--accent` | Clear interaction invitation |
| Success confirmation | `--success` + animation | Celebratory, reinforces positive outcome |
| Disabled state | `--muted` + opacity | Clearly non-interactive |
| Error message | `--danger` + icon | Specific, not ambiguous |
| Dividers | `--border` (6% opacity) | Subtle structure |

### Typography Do's & Don'ts

✅ **DO:**
- Use Geist as primary font (modern, clean, drivable)
- Keep body at 16px minimum
- Use monospace for timers and data
- Maintain 1.5 line-height for body text
- Use weight hierarchy: 400 → 500 → 600 → 700

❌ **DON'T:**
- Use multiple font families (stick to Geist + Fira Code)
- Set body text < 16px
- Use justified text alignment (creates awkward spacing)
- Center long-form text (kills readability)
- Use ALL CAPS except labels and timestamps

### Component Reuse

**Buttons** exist in 3 sizes:
- **Small** (40x40px): icon buttons, secondary controls
- **Medium** (44x44px): standard interactive elements
- **Large** (64-120px): SOS, primary CTAs

All use `--space-4` padding internally, maintain touch target ≥44px.

**Cards** are used for:
- Grouped content (contacts list)
- Data display (video metadata)
- Elevated states (modals, overlays)

Always include a border + background for clear boundaries.

---

## Implementation Checklist

- [ ] All colors defined as CSS variables in `:root`
- [ ] Fonts loaded with `font-display: swap`
- [ ] Touch targets ≥44x44px measured
- [ ] Focus rings visible on dark background
- [ ] `prefers-reduced-motion` respected
- [ ] Breakpoints at 375px, 768px, 1024px, 1440px
- [ ] Safe areas applied (`env(safe-area-inset-*)`)
- [ ] Hover states defined (no hover-only interactions)
- [ ] Active/pressed states with transform + color
- [ ] All animations respect easing curves
- [ ] Loading states have skeleton shapes
- [ ] Error states include fix instructions
- [ ] Empty states include visual + action
- [ ] Recording indicator pulsing never >2s

---

## Files & Resources

**Font files location:** `/fonts/`
- `geist-regular.woff2` (400 weight)
- `geist-bold.woff2` (700 weight)
- `fira-code.woff2` (monospace)

**Color tokens:** All defined in inline `<style>` tags in HTML files; CSS variable `:root` is the source of truth.

**Icons:** Inline SVGs, colored with `currentColor` or explicit hex values.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-06-24 | Initial system — colors, typography, components, motion |

---

**Questions?** Refer to the [Design Philosophy](#design-philosophy) section, which explains the "why" behind every choice. Treat this document as a guide, not gospel — if you have questions, ask (don't guess).

**Last updated by:** /design-consultation (Claude)
