# botClaw Trading Command Center

Professional trading dashboard for monitoring multiple trading agents in real-time.

## Features

- 🎨 Modern, professional dark theme UI
- 📊 Real-time portfolio metrics
- ⚡ Live agent status tracking
- 📈 P&L monitoring (color-coded)
- 🔐 Password-protected dashboard
- 📱 Fully responsive design
- ✨ Smooth animations & glassmorphism effects

## Tech Stack

- **Frontend:** Next.js 14 + React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Deployment:** Vercel

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Deploy

```bash
npm run build
npm start
```

## Dashboard Features

### Portfolio Overview
- Total Equity across all agents
- Unrealized P&L (real-time)
- Open Positions count
- Last sync timestamp

### Agent Cards
- Agent name & operational status
- Real-time equity value
- P&L with color coding (green/red)
- Open positions
- Last update timestamp

## Authentication

Default password: `trading2026`

Change this in `src/app/page.tsx` for production use.

## API Endpoints

### GET `/api/agents`
Returns current status of all trading agents.

Response:
```json
[
  {
    "name": "Agent Name",
    "status": "OPERATIONAL",
    "equity": 5000,
    "pnl": 100,
    "positions": 2,
    "lastUpdate": "2026-03-06 13:00:00"
  }
]
```

## Customization

Edit `tailwind.config.ts` for theme customization.
Edit `src/app/globals.css` for animations & effects.

## License

Proprietary - Trading Dashboard
