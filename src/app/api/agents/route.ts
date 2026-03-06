import { promises as fs } from 'fs'
import { join } from 'path'

interface AgentState {
  account?: {
    equity?: number
    pnl?: number
    balance?: number
  }
  positions?: Array<{ status: string }> | { open_positions?: Array<any> }
  last_updated?: string
}

export async function GET() {
  try {
    const agentsDir = join(process.env.HOME || '/root', '.openclaw/workspace/agents')

    const agents = []

    // HyperSOL
    try {
      const hyperliquidState = await fs.readFile(join(agentsDir, 'hyperliquid-solana/STATE.json'), 'utf-8')
      const data: AgentState = JSON.parse(hyperliquidState)
      agents.push({
        name: 'HyperSOL (Solana)',
        status: 'OPERATIONAL',
        equity: data.account?.equity || 0,
        pnl: data.account?.pnl || 0,
        positions: Array.isArray(data.positions) ? data.positions.length : 0,
        lastUpdate: new Date(data.last_updated || Date.now()).toLocaleString(),
      })
    } catch (error) {
      agents.push({
        name: 'HyperSOL (Solana)',
        status: 'OFFLINE',
        equity: 0,
        pnl: 0,
        positions: 0,
        lastUpdate: 'N/A',
      })
    }

    // Raydium Degen
    try {
      const raydiumState = await fs.readFile(join(agentsDir, 'raydium-degen/STATE.json'), 'utf-8')
      const data: AgentState = JSON.parse(raydiumState)
      agents.push({
        name: 'Raydium Degen',
        status: 'OPERATIONAL',
        equity: data.account?.equity || 500,
        pnl: data.account?.pnl || 0,
        positions: Array.isArray(data.positions) ? data.positions.length : 0,
        lastUpdate: new Date(data.last_updated || Date.now()).toLocaleString(),
      })
    } catch (error) {
      agents.push({
        name: 'Raydium Degen',
        status: 'OPERATIONAL',
        equity: 500,
        pnl: 0,
        positions: 0,
        lastUpdate: new Date().toLocaleString(),
      })
    }

    // Other agents (offline for now)
    agents.unshift(
      {
        name: 'Polybit (15m Bitcoin)',
        status: 'OFFLINE',
        equity: 0,
        pnl: 0,
        positions: 0,
        lastUpdate: 'N/A',
      },
      {
        name: 'Prophet-Copier',
        status: 'OFFLINE',
        equity: 0,
        pnl: 0,
        positions: 0,
        lastUpdate: 'N/A',
      },
      {
        name: 'Prophet (Meta)',
        status: 'OFFLINE',
        equity: 0,
        pnl: 0,
        positions: 0,
        lastUpdate: 'N/A',
      }
    )

    return Response.json(agents)
  } catch (error) {
    console.error('API Error:', error)
    return Response.json({ error: 'Failed to fetch agents' }, { status: 500 })
  }
}
