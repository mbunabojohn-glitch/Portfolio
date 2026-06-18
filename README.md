# Mbunabo John — Portfolio

React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion

---

## Quick Start

```bash
npm install
npm run dev
```

---

## 1. Add Your Photo

Place your photo at:
```
public/me.jpg
```
Recommended: 400×500px, portrait. Falls back to "MJ" initials if missing.

---

## 2. Add Project Screenshots

```
public/projects/invade.png
public/projects/eagle.png
public/projects/aaronic.png
public/projects/pivot.png
```

**Capture tips:**
- Use Loom (free) or OBS for screen recordings → export first frame as PNG
- Browser DevTools → Cmd+Shift+P → "Capture screenshot" works well
- Target 1200×630px for good proportions

---

## 3. Wire Up EmailJS (contact form)

Your Service ID (`service_1trebt7`) is already in the code.

### Fix the "insufficient authentication scopes" error:
This happens when you used **Gmail API** instead of the regular Gmail OAuth.

1. Go to **emailjs.com → Email Services**
2. Delete or disconnect the current Gmail API service
3. Click **Add New Service** → choose **Gmail** (the one with the Google logo, NOT "Gmail API")
4. Click **Connect Account** → sign in with Google → allow permissions
5. Your Service ID `service_1trebt7` will still work, or use the new one

### Create your Template:
1. Go to **Email Templates → Create New Template**
2. Set **To Email** = your Gmail address
3. Template body (copy this exactly):
   ```
   Subject: Portfolio Contact from {{from_name}}

   Name: {{from_name}}
   Email: {{from_email}}

   Message:
   {{message}}
   ```
4. Click **Save** → copy the **Template ID** (looks like `template_abc1234`)

### Add to the code:
Open `src/components/Contact.tsx` and replace:
```ts
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // e.g. "template_abc1234"
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";  // Account → API Keys
```

That's it — emails land straight in your Gmail, no backend needed.

---

## 4. Update Your Links

In `src/components/Contact.tsx`:
```ts
{ label: "LinkedIn", url: "https://linkedin.com/in/YOUR_HANDLE" }
{ label: "Email",    url: "mailto:YOUR_EMAIL@gmail.com" }
```

In `src/components/About.tsx`:
```html
href="/John_CV.pdf"   <!-- place your CV at public/John_CV.pdf -->
```

---

## 5. Game Scores

Scores persist in **localStorage** per browser automatically:
- Tic Tac Toe: tracks X wins and O wins separately
- Catch the Bug: saves all-time high score
- Snake: saves all-time high score

Users can reset via "Reset All Scores" button in the Games section.

---

## 6. Deploy to Vercel

```bash
npm run build
vercel --prod
```

Or just push to GitHub and connect the repo on vercel.com — it auto-detects Vite.

---

## Project Structure

```
src/
├── components/
│   ├── games/
│   │   ├── TicTacToe.tsx
│   │   ├── CatchBug.tsx
│   │   └── Snake.tsx
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Games.tsx
│   └── Contact.tsx
├── hooks/
│   └── useScores.ts     ← localStorage score persistence
├── data.ts              ← edit your projects and skills here
├── types.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## Customise Projects

Edit the `PROJECTS` array in `src/data.ts` as you ship more work.
