# ⚡ SpeedBattle

A viral mini-game platform for Instagram sharing — Reaction Speed Test + Typing Speed Challenge.

---

## 🚀 Quick Setup

### Prerequisites
- Node.js 16+ installed
- Yarn installed (`npm install -g yarn`)

### 1. Install dependencies
```bash
cd speedbattle
yarn install
```

### 2. Start development server
```bash
yarn start
```
Opens at **http://localhost:3000**

### 3. Build for production
```bash
yarn build
```
Output in `/build` folder — ready to deploy.

---

## 🌐 Deploy

### Vercel (recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
yarn build
# Drag the /build folder to netlify.com/drop
```

### Cloudflare Pages
Connect your GitHub repo in the Cloudflare Pages dashboard.
Build command: `yarn build`  
Build output: `build`

---

## 📁 Project Structure

```
speedbattle/
├── public/
│   └── index.html              # HTML shell + Google Fonts
├── src/
│   ├── index.js                # React entry point
│   ├── App.jsx                 # Router + global state
│   │
│   ├── styles/
│   │   └── global.css          # CSS variables, resets, keyframes
│   │
│   ├── data/
│   │   ├── words.js            # Word pool for typing game
│   │   └── leaderboard.js      # Seed leaderboard data
│   │
│   ├── hooks/
│   │   ├── useLeaderboard.js   # Leaderboard state management
│   │   └── useToast.js         # Toast notification hook
│   │
│   ├── utils/
│   │   ├── rankingLogic.js     # Rank/percentile calculations
│   │   ├── shareHelpers.js     # Clipboard + download helpers
│   │   └── canvasCard.js       # Canvas result card generator
│   │
│   ├── games/
│   │   ├── ReactionGame.jsx    # Reaction speed game logic + UI
│   │   ├── ReactionGame.module.css
│   │   ├── TypingGame.jsx      # Typing speed game logic + UI
│   │   └── TypingGame.module.css
│   │
│   ├── components/
│   │   ├── Header.jsx          # Logo + tagline
│   │   ├── BottomNav.jsx       # Fixed bottom navigation
│   │   ├── AdSlot.jsx          # Advertisement placeholders
│   │   ├── Toast.jsx           # Toast notification
│   │   ├── Confetti.jsx        # Confetti animation
│   │   ├── ResultCard.jsx      # Score display card
│   │   ├── ShareBox.jsx        # Copy + download share box
│   │   └── Leaderboard.jsx     # Tabbed leaderboard component
│   │
│   └── pages/
│       ├── Home.jsx            # Landing / game picker
│       ├── Home.module.css
│       ├── ReactionPage.jsx    # Reaction game screen
│       ├── ReactionResult.jsx  # Reaction results + sharing
│       ├── TypingPage.jsx      # Typing game screen
│       ├── TypingResult.jsx    # Typing results + sharing
│       ├── LeaderboardPage.jsx # Leaderboard screen
│       └── GamePage.module.css # Shared page styles
│
├── package.json
└── README.md
```

---

## 🔌 Adding a Real Backend (Firebase)

1. `yarn add firebase`
2. Create `src/firebase.js`:
```js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp({ /* your config */ });
export const db = getFirestore(app);
```
3. In `useLeaderboard.js`, replace `useState` with Firestore reads/writes.

---

## 📱 Ad Integration

Replace `<AdSlot />` divs with your ad provider script:
- **Google AdSense**: Replace `.adSlot` div with AdSense unit
- **Adsterra**: Drop their banner code into AdSlot.jsx
- **PropellerAds**: Use their native banner API

---

## 🎨 Customization

All design tokens live in `src/styles/global.css` under `:root`.
Change `--accent`, `--bg`, fonts etc. to rebrand instantly.
