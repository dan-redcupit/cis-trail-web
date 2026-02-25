# CIS Benchmark Trail

A retro Oregon Trail-style game that gamifies the journey toward CIS (Center for Internet Security) compliance. Lead your team 2,000 miles through the treacherous path to security compliance while managing morale, answering cybersecurity questions, and avoiding compliance disasters.

## About

Instead of traversing the Oregon Trail in a covered wagon, you're leading a cybersecurity team through the challenges of achieving compliance certification. Answer real CIS framework questions, manage your team's morale, and navigate random events that can make or break your journey.

## Features

### Core Gameplay
- **2,000 Mile Journey**: Progress toward full compliance certification
- **Team Management**: Select and manage your compliance team members
- **Resource Management**: Manage your team's morale throughout your journey
- **50+ Real Questions**: Authentic CIS Controls framework questions
- **Multiple Difficulty Levels**:
  - **IG1 Starter**: +50% morale, -50% death chance (Easy)
  - **IG2 Professional**: Standard difficulty (Normal)
  - **Full Compliance**: +50% bad events, tougher questions (Hard)
  - **External Audit**: One wrong answer = game over (Nightmare)

### Game Elements
- **Trail Decisions**: Continue traveling, rest to restore morale, or collect evidence
- **Evidence Collection**: Mini-game to gather compliance evidence
- **River Crossings**: Classic Oregon Trail-style challenges adapted for compliance
- **Valley of Despair**: Convince leadership to continue funding your compliance journey
- **Supply Stores**: Purchase helpful items like pizza, training, consultants, and more
- **Random Events**: Both beneficial and catastrophic events that affect your journey
- **Achievement System**: Unlock 15+ achievements for various accomplishments
- **Leaderboard**: Compete for the highest scores with other players

### Easter Eggs & Secrets
- Konami code for God Mode (↑↑↓↓←→←→BA)
- Special character interactions (try naming a team member "Matt Lee")
- Hidden difficulty modes and secret achievements
- Multiple special endings based on your performance

### Technical Features
- Retro terminal-style UI with authentic command-line aesthetics
- Sound effects and audio feedback
- Persistent leaderboard using Vercel KV storage
- Achievement tracking in browser localStorage
- Fully responsive design
- Built with Next.js 14 and TypeScript

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React useReducer
- **Database**: Vercel KV (Redis)
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cis-trail-web
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (optional, for leaderboard):
Create a `.env.local` file in the root directory:
```bash
# Vercel KV (for leaderboard functionality)
KV_URL=your_kv_rest_api_url
KV_REST_API_URL=your_kv_rest_api_url
KV_REST_API_TOKEN=your_kv_rest_api_token
KV_REST_API_READ_ONLY_TOKEN=your_kv_rest_api_read_only_token
```

Note: The game works without Vercel KV, but the leaderboard will not persist scores.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploy to Vercel (Recommended)

This project is optimized for deployment on Vercel:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Import your repository to Vercel:
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your repository
   - Vercel will auto-detect Next.js settings

3. Set up Vercel KV for the leaderboard (optional):
   - In your Vercel project dashboard, go to the "Storage" tab
   - Create a new KV database
   - Connect it to your project
   - Environment variables will be automatically added

4. Deploy:
```bash
npm run build
```

Vercel will automatically build and deploy your application.

### Deploy to Other Platforms

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

The application will be available on port 3000 by default.

For static hosting platforms, you'll need a Node.js runtime as this uses Next.js API routes.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
cis-trail-web/
├── app/
│   ├── api/              # API routes for leaderboard
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main game component
├── components/           # React components for each game screen
│   ├── TitleScreen.tsx
│   ├── TrailScreen.tsx
│   ├── QuestionScreen.tsx
│   └── ...
├── lib/
│   ├── cisGameData.ts    # CIS questions and game data
│   ├── gameState.ts      # Game state management
│   ├── achievements.ts   # Achievement system
│   └── sounds.ts         # Audio playback
└── public/               # Static assets
```

## Game Data

The game includes:
- **50+ CIS Controls questions** covering safeguards like asset management, access control, data protection, and incident response
- **Random events** including good (compliance wins) and bad (security incidents, audits)
- **Death scenarios** for team members (burnout, security incidents, compliance failures)
- **Supply store items** with various effects on morale

## Contributing

Contributions are welcome! To add new questions, events, or features:

1. Questions: Edit `lib/cisGameData.ts`
2. Game mechanics: Modify `lib/gameState.ts`
3. UI components: Update files in `components/`
4. Achievements: Add to `lib/achievements.ts`

## License

This project is intended for educational and entertainment purposes to help teams learn about CIS Controls and CMMC compliance in a fun, engaging way.

## Acknowledgments

- Inspired by the classic Oregon Trail game
- Built on the CIS Controls Framework

---

**Ready to start your compliance journey?** Will your team make it to full certification, or will you succumb to scope creep, burnout, or a catastrophic security incident? There's only one way to find out.

*"You have died of dysentery... I mean, failed audit."*
