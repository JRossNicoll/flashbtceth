import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { AlertCircle, ChevronUp, ChevronDown, Activity, Settings, Lock, FileKey, Share2, CircleDollarSign, BarChart3, ArrowUpDown, Shield, Users, Code, Twitter, Mail, Github } from 'lucide-react';

// Info Modal Component
const InfoModal = ({ content, title, isVisible, onClose }) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-black p-6 rounded-lg border border-orange-500/50 w-full max-w-2xl transform animate-slide-up" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-bold text-orange-500 mb-4 font-mono">{title}</h3>
        <div className="text-gray-300 leading-relaxed whitespace-pre-line font-mono text-sm space-y-2">
          {content}
        </div>
        <button 
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-black text-sm font-medium rounded transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Main Component
const AnimatedForm = () => {
  const [activeInfoBox, setActiveInfoBox] = useState(null);
  const [paymentAddressTimer, setPaymentAddressTimer] = useState(180);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [stats, setStats] = useState({
    tvl: 1250000,
    volume24h: 450000,
    trades24h: 1200,
    activeUsers: 850
  });

  const infoContent = {
    architecture: {
      title: "1. Architecture",
      content: `• Blockchain Base: Ethereum ERC-20 token with cross-chain compatibility.
• Oracles: Decentralized price feeds (e.g., Chainlink, Pyth) for real-time BTC price tracking.
• Smart Contracts: Automated execution of arbitrage trades when pre-set thresholds are met.
• Bridges: Secure connections to Bitcoin and centralized exchanges (CEXs) via wrapped BTC (WBTC).
• Liquidity Pools: Used for trade execution and slippage mitigation.`
    },
    process: {
      title: "2. Process Flow",
      content: `1. Data Aggregation – BTC price feeds from multiple sources (DEXs, CEXs, and Oracles).
2. Arbitrage Opportunity Detection – Smart contracts identify price discrepancies.
3. Execution Automation – Token holders can trigger or stake in arbitrage execution pools.
4. Settlement – Profits are distributed to liquidity providers and token stakers in ETH or WBTC.`
    },
    risk: {
      title: "3. Risk Management",
      content: `• Slippage Protection – Order execution via MEV-resistant routing.
• Price Discrepancy Validation – Oracles must confirm deviations above a set threshold.
• Liquidity Constraints – Dynamic trade sizing to avoid price impact.
• Smart Contract Audits – Periodic security assessments to prevent exploits.`
    },
    token: {
      title: "4. Token Utility",
      content: `• Governance – Token holders vote on arbitrage parameters (e.g., profit-sharing ratios).
• Staking Rewards – Earn BTC-ARB tokens by staking to liquidity pools.
• Fee Discounts – Holders receive reduced fees on arbitrage executions.
• Yield Generation – Token-backed liquidity pools generate passive income.`
    },
    enhancements: {
      title: "5. Enhancements",
      content: `• Layer-2 Scaling – Optimistic/ZK rollup compatibility for cheaper arbitrage execution.
• AI Optimization – Machine learning algorithms enhance trade execution strategies.
• Cross-Chain Arbitrage – Future expansion to Solana, Arbitrum, and BSC for wider arbitrage spreads.`
    },
    security: {
      title: "6. Security Framework",
      content: `• Multi-Sig & DAO-Based Fund Management – Prevents unauthorized fund access.
• Time-Locked Transactions – Ensures delay before execution for critical protocol changes.
• Anti-Flash Loan Mechanisms – Protects against price manipulation attacks.
• On-Chain Monitoring – Real-time analytics dashboard for transaction security.`
    },
    governance: {
      title: "7. Protocol Governance",
      content: `• Decentralized Autonomous Organization (DAO) – BTC-ARB holders vote on upgrades.
• Proposal Mechanism – Community-driven parameter adjustments (e.g., arbitrage spreads).
• Treasury Fund Management – DAO controls protocol-generated fees for future development.`
    },
    integration: {
      title: "8. Integration Methods",
      content: `• CEX API Access – Secure integration with Binance, Coinbase, and Kraken for arbitrage trades.
• DEX Aggregators – Smart routing through 1inch, Uniswap, and SushiSwap for best execution.
• Cross-Chain Bridges – BTC Layer-2 integrations (e.g., Rootstock, ThorChain).
• Institutional-Grade SDKs – Plug-and-play APIs for arbitrage bots and automated trading desks.`
    }
  };

  // Timer effects
  useEffect(() => {
    // Update time every second
    const timeTimer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // Payment address timer
    const paymentTimer = setInterval(() => {
      setPaymentAddressTimer((prev) => (prev > 0 ? prev - 1 : 180));
    }, 1000);

    return () => {
      clearInterval(timeTimer);
      clearInterval(paymentTimer);
    };
  }, []);

  // Stats update effect
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        tvl: prev.tvl + (Math.random() > 0.5 ? 1 : -1) * Math.random() * 10000,
        volume24h: prev.volume24h + (Math.random() > 0.5 ? 1 : -1) * Math.random() * 5000,
        trades24h: prev.trades24h + (Math.random() > 0.5 ? 1 : -1) * Math.random() * 10,
        activeUsers: prev.activeUsers + (Math.random() > 0.5 ? 1 : -1) * Math.random() * 5
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}K`;
    }
    return `$${num.toFixed(0)}`;
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-500 mb-4 font-mono tracking-tighter">
            FlashBTC
            <span className="text-sm ml-2 text-orange-500/50 tracking-wider">v1.0.4</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Advanced <span className="text-orange-500">automated Flash Loan arbitrage protocol</span> leveraging real-time price discrepancies across centralized and decentralized exchanges to generate optimal returns.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[
            { id: 'architecture', label: '1. Architecture', icon: Settings },
            { id: 'process', label: '2. Process Flow', icon: Activity },
            { id: 'risk', label: '3. Risk Management', icon: Lock },
            { id: 'token', label: '4. Token Utility', icon: CircleDollarSign },
            { id: 'enhancements', label: '5. Enhancements', icon: ArrowUpDown },
            { id: 'security', label: '6. Security Framework', icon: Shield },
            { id: 'governance', label: '7. Protocol Governance', icon: Users },
            { id: 'integration', label: '8. Integration Methods', icon: Code }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveInfoBox(id)}
              className="flex items-center gap-2 h-9 px-5 text-sm font-medium bg-black border border-orange-500/50 text-orange-500 hover:bg-orange-500/10 transition-all duration-200 hover:scale-105"
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Modal */}
        <InfoModal
          title={activeInfoBox ? infoContent[activeInfoBox].title : ''}
          content={activeInfoBox ? infoContent[activeInfoBox].content : ''}
          isVisible={!!activeInfoBox}
          onClose={() => setActiveInfoBox(null)}
        />

        {/* System Status */}
        <div className="mb-12 bg-black/30 border border-orange-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h3 className="text-orange-500 font-bold font-mono text-lg tracking-wider">SYSTEM STATUS</h3>
              <div className="px-2 py-1 bg-green-500/10 border border-green-500/20 rounded">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-500 text-xs font-mono tracking-wider">ALL SYSTEMS OPERATIONAL</span>
                </div>
              </div>
            </div>
            <span className="text-orange-500/50 text-xs font-mono">Last updated: {currentTime}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'FLASH LOAN ENGINE', status: 'OPTIMAL', icon: Activity },
              { name: 'SMART CONTRACTS', status: 'OPERATIONAL', icon: Code },
              { name: 'PRICE ORACLE', status: 'SYNCED', icon: BarChart3 },
              { name: 'CROSS-CHAIN BRIDGE', status: 'ACTIVE', icon: ArrowUpDown }
            ].map((system) => (
              <div key={system.name} className="flex items-center justify-between bg-black/20 p-3 rounded border border-orange-500/20">
                <div className="flex items-center gap-2">
                  <system.icon className="w-4 h-4 text-orange-500/50" />
                  <span className="text-gray-300 text-xs font-mono tracking-widest">{system.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-500 text-xs font-mono tracking-wider">{system.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Footer */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm border-t border-orange-500/20">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            {/* Left - Website Title */}
            <div className="text-orange-500 font-mono tracking-tighter">
              <span className="font-bold">FlashBTC</span>
              <span className="text-orange-500/50 text-sm ml-2">v1.0.4</span>
            </div>

            {/* Center - Social Icons */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-orange-500 hover:text-orange-400 transition-colors p-2 border border-orange-500/50 rounded hover:bg-orange-500/10">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="text-orange-500 hover:text-orange-400 transition-colors p-2 border border-orange-500/50 rounded hover:bg-orange-500/10">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-4 h-4"
                >
                  <path d="M21.93 7.07A10 10 0 0 0 14.07.07a1 1 0 0 0-1.25 1.24 6.4 6.4 0 0 1 .53 2.69A6.5 6.5 0 0 1 6.85 10.5 6.4 6.4 0 0 1 4.16 10a1 1 0 0 0-1.24 1.25 10 10 0 0 0 7 7.85A10 10 0 0 0 22 12c0-1.8-.5-3.47-1.35-4.93z" />
                  <path d="M4.5 19.5c4.15 0 8.75-1 11.25-4.5" />
                </svg>
              </a>
              <a href="#" className="text-orange-500 hover:text-orange-400 transition-colors p-2 border border-orange-500/50 rounded hover:bg-orange-500/10">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="text-orange-500 hover:text-orange-400 transition-colors p-2 border border-orange-500/50 rounded hover:bg-orange-500/10">
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Right - Legal Links */}
            <div className="flex items-center gap-4 text-sm">
              <a href="#" className="text-orange-500/70 hover:text-orange-500 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-orange-500/70 hover:text-orange-500 transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes trace {
          0% { transform: translate(0, 0); }
          25% { transform: translate(calc(100% - 2px), 0); }
          50% { transform: translate(calc(100% - 2px), calc(100% - 2px)); }
          75% { transform: translate(0, calc(100% - 2px)); }
          100% { transform: translate(0, 0); }
        }

        .animate-trace {
          animation: trace 4s linear infinite;
        }

        @keyframes slide-up {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .animate-slide-up {
          animation: slide-up 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AnimatedForm;
