import { motion } from 'motion/react';
import { useGameStore } from '../../store/gameStore';
import { Flame, Hammer, Trophy } from 'lucide-react';
import { useAccount, useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export default function TitleScreen() {
  const setScreen = useGameStore(state => state.setScreen);
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#0a0a0a] relative z-10"
    >
      <div className="absolute inset-0 z-0 opacity-30 flex items-center justify-center pointer-events-none">
        <div className="w-[300px] h-[300px] rounded-full bg-[#f27d26]/20 blur-[100px] animate-pulse-glow" />
      </div>

      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="z-10 flex flex-col items-center mb-12"
      >
        <div className="w-16 h-16 bg-[#f27d26] rounded flex items-center justify-center shadow-[0_0_15px_rgba(242,125,38,0.4)] mb-4 animate-float">
          <Hammer className="w-8 h-8 text-black" />
        </div>
        <h1 className="text-6xl font-bold tracking-tighter uppercase italic text-white text-shadow-glow text-center">
          Cast<span className="text-[#f27d26]">smith</span>
        </h1>
        <p className="mt-2 text-white/40 font-mono tracking-widest text-sm uppercase">Master Blacksmith</p>
      </motion.div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="z-10 flex flex-col gap-4 w-full max-w-xs"
      >
        <button 
          onClick={() => setScreen('forge')}
          className="w-full relative group overflow-hidden rounded-sm bg-[#f27d26] transform -skew-x-12 hover:bg-white transition-colors"
        >
          <div className="px-6 py-4 flex items-center justify-center gap-3 transform skew-x-12">
            <Hammer className="w-5 h-5 text-black" />
            <span className="font-black text-black uppercase tracking-wider text-xl">Enter Forge</span>
          </div>
        </button>

        <button 
          onClick={() => setScreen('leaderboard')}
          className="w-full rounded-sm bg-black/40 border border-white/20 px-4 py-4 flex items-center justify-center gap-3 hover:bg-white/10 hover:border-white transition-all transform -skew-x-12"
        >
          <div className="flex items-center gap-3 transform skew-x-12">
            <Trophy className="w-5 h-5 text-[#f27d26]" />
            <span className="font-bold text-white uppercase tracking-wider text-xs">Hall of Fame</span>
          </div>
        </button>

        {!isConnected ? (
          <button 
            onClick={() => connect({ connector: injected() })}
            className="w-full rounded-sm bg-black/40 border border-[#f27d26]/30 px-4 py-3 flex items-center justify-center gap-2 mt-4 hover:bg-[#f27d26] hover:text-black transition-colors group transform -skew-x-12"
          >
            <div className="flex items-center gap-2 transform skew-x-12">
              <div className="w-2 h-2 rounded-full bg-[#f27d26] shadow-[0_0_8px_rgba(242,125,38,0.6)] group-hover:bg-black group-hover:shadow-none" />
              <span className="text-sm font-bold uppercase tracking-widest text-gray-300 group-hover:text-black">Connect Wallet</span>
            </div>
          </button>
        ) : (
          <div className="w-full text-center mt-4">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#f27d26] bg-[#f27d26]/10 border border-[#f27d26]/20 px-3 py-1.5 rounded-full uppercase">
              {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
