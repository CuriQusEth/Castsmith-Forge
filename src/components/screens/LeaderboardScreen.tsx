import { motion } from 'motion/react';
import { useGameStore } from '../../store/gameStore';
import { ChevronLeft, Trophy, MessageSquare } from 'lucide-react';
import { useAccount, useSendTransaction } from 'wagmi';

const MOCK_LEADERBOARD = [
  { rank: 1, address: '0x12...3456', score: 15400, wave: 32 },
  { rank: 2, address: '0xab...cdef', score: 12200, wave: 25 },
  { rank: 3, address: '0x99...8877', score: 9800, wave: 19 },
  { rank: 4, address: '0x44...3322', score: 7500, wave: 14 },
];

export default function LeaderboardScreen() {
  const setScreen = useGameStore(state => state.setScreen);
  const { isConnected } = useAccount();
  const { sendTransaction } = useSendTransaction();

  const sayGM = () => {
    if (!isConnected) return;
    // Sending a 0 value transaction as a simple "on-chain" action
    sendTransaction({
      to: '0x0000000000000000000000000000000000000000', // Burn address or contract
      value: BigInt(0),
      data: '0x474d' // 'GM' in hex
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="w-full h-full flex flex-col p-6 bg-[#0a0a0a]"
    >
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
        <div className="flex items-center gap-4">
          <button onClick={() => setScreen('title')} className="w-10 h-10 bg-black/40 border border-white/20 rounded flex items-center justify-center hover:bg-white/10 transition-colors text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold tracking-tighter uppercase italic text-white">Hall of <span className="text-[#f27d26]">Fame</span></h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="bg-white/5 rounded-xl border border-white/10 p-4 mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#f27d26] mb-4 italic">Global Leaders</h2>
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-white/40 uppercase tracking-widest border-b border-white/5">
                <th className="pb-3 text-left w-12">Rank</th>
                <th className="pb-3 text-left">Player</th>
                <th className="pb-3 text-right">Score</th>
                <th className="pb-3 text-right w-16">Wave</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_LEADERBOARD.map((entry, idx) => (
                <tr key={idx} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                  <td className={`py-4 font-bold ${idx === 0 ? 'text-[#f27d26]' : idx === 1 ? 'text-gray-300' : idx === 2 ? 'text-orange-900' : 'text-white/40'}`}>
                    #{entry.rank}
                  </td>
                  <td className="py-4 text-blue-400 font-bold">{entry.address}</td>
                  <td className="py-4 text-right font-black text-white">{entry.score.toLocaleString()}</td>
                  <td className="py-4 text-right text-white/40">{entry.wave}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-[#f27d26]/5 rounded-xl border border-[#f27d26]/20 p-5 flex flex-col items-center text-center">
          <MessageSquare className="w-8 h-8 text-[#f27d26] mb-3" />
          <h3 className="text-xs font-bold mb-2 uppercase tracking-widest text-white">On-Chain Actions</h3>
          <p className="text-[10px] text-white/40 font-mono mb-6 max-w-[250px]">Send an on-chain "GM" via Base Mainnet to verify your presence to other players.</p>
          <button 
            onClick={sayGM}
            disabled={!isConnected}
            className="w-full py-4 bg-black/40 border border-[#f27d26]/30 text-xs font-bold uppercase tracking-widest hover:bg-[#f27d26] hover:text-black transition-all disabled:opacity-50 disabled:grayscale"
          >
            Say "GM" to Base
          </button>
        </div>
      </div>
    </motion.div>
  );
}
