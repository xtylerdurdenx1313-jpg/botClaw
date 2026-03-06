'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, ArrowDownRight, Activity, TrendingUp } from 'lucide-react'

interface Agent {
  name: string
  status: string
  equity: number
  pnl: number
  positions: number
  lastUpdate: string
}

const API_URL = 'https://discreditable-nonpertinently-dulcie.ngrok-free.dev'

export default function Dashboard() {
  const [agents, setAgents] = useState<Agent[]>([
    { name: 'Polybit (15m Bitcoin)', status: 'OFFLINE', equity: 0, pnl: 0, positions: 0, lastUpdate: 'Loading...' },
    { name: 'Prophet-Copier', status: 'LOADING', equity: 5012.89, pnl: 13.08, positions: 12, lastUpdate: 'Syncing...' },
    { name: 'Prophet (Meta)', status: 'LOADING', equity: 4999.95, pnl: 0, positions: 2, lastUpdate: 'Syncing...' },
    { name: 'HyperSOL (Solana)', status: 'LOADING', equity: 5007.24, pnl: 7.24, positions: 0, lastUpdate: 'Syncing...' },
    { name: 'Raydium Degen', status: 'LOADING', equity: 500, pnl: 0, positions: 0, lastUpdate: 'Syncing...' },
  ])
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [lastSync, setLastSync] = useState(new Date())

  useEffect(() => {
    const auth = localStorage.getItem('botclaw_auth')
    if (auth === 'true') {
      setAuthenticated(true)
      fetchAgents()
    }
  }, [])

  const fetchAgents = async () => {
    try {
      const res = await fetch(`${API_URL}/api/agents`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        }
      })
      if (!res.ok) throw new Error('API failed')
      const data = await res.json()
      setAgents(data)
      setLastSync(new Date())
    } catch (error) {
      console.error('Failed to fetch agents:', error)
      // Agents stay with default/cached values
    }
  }

  useEffect(() => {
    if (authenticated) {
      fetchAgents()
      const interval = setInterval(fetchAgents, 5000)
      return () => clearInterval(interval)
    }
  }, [authenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'trading2026') {
      localStorage.setItem('botclaw_auth', 'true')
      setAuthenticated(true)
      fetchAgents()
    } else {
      alert('Invalid password')
      setPassword('')
    }
  }

  // Portfolio metrics
  const totalEquity = agents.reduce((sum, a) => sum + a.equity, 0)
  const totalPnL = agents.reduce((sum, a) => sum + a.pnl, 0)
  const totalPositions = agents.reduce((sum, a) => sum + a.positions, 0)
  const pnlPercent = totalEquity > 0 ? ((totalPnL / totalEquity) * 100).toFixed(2) : '0.00'
  const operationalCount = agents.filter(a => a.status === 'OPERATIONAL').length

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Login card */}
        <form
          onSubmit={handleLogin}
          className="relative w-full max-w-md animate-slideIn"
        >
          <div className="glassmorphism rounded-2xl p-8 shadow-2xl">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center font-bold text-xl">
                  ⚡
                </div>
                <h1 className="text-3xl font-bold gradient-text">botClaw</h1>
              </div>
              <p className="text-slate-400">Trading Command Center</p>
            </div>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className="w-full px-4 py-3 rounded-lg bg-slate-900 text-white placeholder-slate-500 border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 mb-6 transition"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition shadow-lg hover:shadow-xl"
            >
              Access Dashboard
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Background elements */}
      <div className="fixed inset-0 opacity-30 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-slate-700/50 glassmorphism sticky top-0">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center font-bold">
              ⚡
            </div>
            <h1 className="text-2xl font-bold">Trading Command Center</h1>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('botclaw_auth')
              setAuthenticated(false)
              setPassword('')
            }}
            className="px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition text-sm font-medium border border-slate-700"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 py-12">
        {/* Portfolio Overview */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8">Portfolio Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Equity */}
            <div className="glassmorphism rounded-xl p-6 hover:border-blue-500/50 transition group">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Total Equity</p>
                <TrendingUp className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-4xl font-bold mb-2">${totalEquity.toFixed(2)}</p>
              <p className="text-slate-400 text-sm">{operationalCount}/{agents.length} agents active</p>
            </div>

            {/* Total P&L */}
            <div className={`rounded-xl p-6 transition group ${
              totalPnL >= 0
                ? 'border border-emerald-500/30 bg-emerald-950/20'
                : 'border border-red-500/30 bg-red-950/20'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <p className={`text-sm font-semibold uppercase tracking-wider ${
                  totalPnL >= 0 ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  Unrealized P&L
                </p>
                {totalPnL >= 0 ? (
                  <ArrowUpRight className="w-5 h-5 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="w-5 h-5 text-red-500" />
                )}
              </div>
              <p className={`text-4xl font-bold mb-2 ${
                totalPnL >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
              </p>
              <p className={`text-sm ${totalPnL >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {pnlPercent}% return
              </p>
            </div>

            {/* Open Positions */}
            <div className="glassmorphism rounded-xl p-6 hover:border-purple-500/50 transition group">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Positions</p>
                <Activity className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-4xl font-bold mb-2">{totalPositions}</p>
              <p className="text-slate-400 text-sm">{totalPositions === 0 ? 'Ready to trade' : 'Active trades'}</p>
            </div>

            {/* Last Sync */}
            <div className="glassmorphism rounded-xl p-6 hover:border-slate-500/50 transition group">
              <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Last Sync</p>
              <p className="text-2xl font-bold mb-2">{lastSync.toLocaleTimeString()}</p>
              <p className="text-slate-400 text-sm">Real-time updates</p>
            </div>
          </div>
        </section>

        {/* Trading Agents */}
        <section>
          <h2 className="text-4xl font-bold mb-8">Trading Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, idx) => (
              <div
                key={agent.name}
                className="glassmorphism rounded-xl p-6 hover:border-blue-500/50 transition group animate-slideIn"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-blue-400 transition mb-1">
                      {agent.name}
                    </h3>
                    <p className="text-slate-500 text-xs">
                      {agent.lastUpdate}
                    </p>
                  </div>
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold ${
                    agent.status === 'OPERATIONAL'
                      ? 'bg-emerald-900/50 text-emerald-400'
                      : agent.status === 'LOADING'
                      ? 'bg-blue-900/50 text-blue-400'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      agent.status === 'OPERATIONAL' ? 'bg-emerald-400 animate-pulse' : agent.status === 'LOADING' ? 'bg-blue-400 animate-pulse' : 'bg-slate-600'
                    }`}></span>
                    <span>{agent.status}</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <p className="text-slate-500 text-xs font-semibold mb-2 uppercase tracking-wider">Equity</p>
                    <p className="text-2xl font-bold">${agent.equity.toFixed(2)}</p>
                  </div>
                  <div className={`rounded-lg p-4 ${
                    agent.pnl >= 0
                      ? 'bg-emerald-900/20'
                      : 'bg-red-900/20'
                  }`}>
                    <p className={`text-xs font-semibold mb-2 uppercase tracking-wider ${
                      agent.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      P&L
                    </p>
                    <p className={`text-2xl font-bold ${
                      agent.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {agent.pnl >= 0 ? '+' : ''}${agent.pnl.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Positions */}
                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-4">
                  <p className="text-blue-400 text-xs font-semibold mb-2 uppercase tracking-wider">Positions</p>
                  <div className="flex items-end justify-between">
                    <p className="text-3xl font-bold text-blue-300">{agent.positions}</p>
                    <span className="text-3xl opacity-50">📊</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-700/50 text-center text-slate-400 text-sm">
          <p>Professional Trading Dashboard • Real-time agent monitoring • {operationalCount} operational agents</p>
        </footer>
      </main>
    </div>
  )
}
