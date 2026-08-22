# Chioma Ezeofor — Personal Portfolio

**Live Site**: *(deploy to Vercel — see below)*
**Positioning**: Product Builder · Entrepreneur · CS Student · Community Organizer

---

## 🗂️ Project Structure

```
MyPortfolio/
├── index.html                    ← Main portfolio page
├── assets/
│   ├── css/styles.css            ← Full design system & all styles
│   ├── js/main.js                ← Navigation, gallery, lightbox, animations
│   └── images/
│       └── chioma-profile.png    ← Your profile photo (replace this)
│   └── events/
│       ├── games-day/            ← Add GDG Games Day photos here
│       ├── x-space/              ← Add X Space photos here
│       ├── hack4coou/            ← Add Hack4COOU photos here
│       └── ai-events/            ← Add AI/Gemini event photos here
└── README.md
```

---

## 📸 How to Add Event Photos

Drop image files (`.jpg`, `.png`, `.webp`) into the relevant folder:

| Event | Folder |
|---|---|
| GDG Games Day | `assets/events/games-day/` |
| X Space | `assets/events/x-space/` |
| Hack4COOU | `assets/events/hack4coou/` |
| AI / Gemini Events | `assets/events/ai-events/` |

Then open `index.html` and find the event card you want to update.
Inside each `.event-gallery-slides` div, add image slides like this:

```html
<div class="event-gallery-slide">
  <img
    src="assets/events/games-day/photo1.jpg"
    alt="GDG Games Day — student participants competing"
    loading="lazy"
  />
</div>
```

Add as many slides as you like (2–5 recommended per event).
The gallery will automatically enable next/prev navigation and dots when there are multiple slides.
Clicking any photo opens it in a full-screen lightbox.

---

## 🔗 How to Update Social Links

Open `index.html` and search for `href="#"` — replace each `#` with the real URL:

| Element ID | What to update |
|---|---|
| `hero-linkedin` | Your LinkedIn profile URL |
| `hero-github` | Your GitHub profile URL |
| `hero-x` | Your X (Twitter) profile URL |
| `hero-email` | `mailto:your@email.com` |
| `contact-linkedin` | Same LinkedIn URL |
| `contact-github` | Same GitHub URL |
| `contact-x` | Same X URL |
| `contact-email` | Same email |

---

## 🖼️ How to Replace the Profile Photo

Replace `assets/images/chioma-profile.png` with your actual professional photo.
Keep the same filename, or update all `src="assets/images/chioma-profile.png"` references in `index.html`.

**Recommended**: Square crop, minimum 600×600px, `.jpg` or `.webp` for best performance.

---

## 🚀 Deploying to Vercel

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Framework: **Other** (static site)
4. Root directory: `./`
5. Build command: *(leave blank)*
6. Output directory: `./`
7. Click **Deploy**

Your portfolio will be live in under a minute.

---

## ✏️ Content Updates

All content lives in `index.html`. Key sections:

| Section | Find by |
|---|---|
| Hero text | `id="hero"` |
| About bio | `id="about"` |
| DOVI case study | `aria-label="DOVI project"` |
| Community events | `id="community"` |
| Experience timeline | `id="experience"` |
| Skills | `id="skills"` |
| Contact | `id="contact"` |

---

*Built with HTML, CSS, and Vanilla JavaScript. No frameworks, no backend, no build step required.*
