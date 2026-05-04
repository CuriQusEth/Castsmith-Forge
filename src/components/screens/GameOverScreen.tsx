import { motion } from 'motion/react';
import { useGameStore } from '../../store/gameStore';
import { Skull, Trophy, Loader2 } from 'lucide-react';
import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';
import { getERC8021AttributionData } from '../../lib/erc8021';

export default function GameOverScreen() {
  const resetGame = useGameStore(state => state.resetGame);
  const score = useGameStore(state => state.score);
  const wave = useGameStore(state => state.wave);
  
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitScore = async () => {
    if (!isConnected || !address) return;
    setIsSubmitting(true);
    try {
      const attribution = getERC8021AttributionData();
      const message = `CASTSMITH\nRecord Score On-Chain\nWave: ${wave}\nScore: ${score}\nBuilder: ${attribution.builderCode}`;
      
      const signature = await signMessageAsync({ account: address as `0x${string}`, message });
      console.log('Signature:', signature);
      
      // Simulate on-chain submission
      await new Promise(res => setTimeout(res, 1500));
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#0a0a0a]"
    >
      <Skull className="w-24 h-24 text-[#f27d26] mb-6 animate-pulse-glow" />
      <h1 className="text-5xl font-black tracking-tighter uppercase italic text-white mb-2">YOU DIED</h1>
      <p className="font-mono text-[10px] uppercase text-white/40 mb-8 tracking-[0.2em]">The Forge Grows Cold</p>

      <div className="bg-white/5 p-6 rounded-xl w-full max-w-xs mb-8 flex flex-col items-center border border-white/10">
        <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1 italic">Score</span>
        <span className="text-4xl font-black text-[#f27d26] mb-6">{score}</span>
        
        <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1 italic">Waves Survived</span>
        <span className="text-2xl font-bold font-mono text-white">{wave}</span>
      </div>

      <div className="w-full max-w-xs flex flex-col gap-4">
        {isConnected && !submitted ? (
          <button 
            onClick={handleSubmitScore}
            disabled={isSubmitting}
            className="w-full py-4 bg-black/40 border border-white/20 text-white font-bold uppercase tracking-widest rounded-sm transform -skew-x-12 hover:bg-white hover:text-black transition-all flex justify-center items-center gap-2 text-xs"
          >
            <div className="flex items-center gap-2 transform skew-x-12">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trophy className="w-4 h-4" />}
              {isSubmitting ? 'Recording...' : 'Record On-Chain'}
            </div>
          </button>
        ) : submitted ? (
          <div className="w-full py-4 bg-[#f27d26]/10 border border-[#f27d26]/30 text-[#f27d26] font-bold uppercase tracking-widest text-center text-xs rounded-sm transform -skew-x-12">
            <div className="transform skew-x-12">Score Recorded!</div>
          </div>
        ) : (
          <div className="text-center text-[10px] text-white/40 uppercase font-mono mb-2 tracking-wider">Connect wallet to record score</div>
        )}

        <button 
          onClick={resetGame}
          className="w-full py-4 bg-[#f27d26] text-black font-black uppercase tracking-widest text-xs rounded-sm transform -skew-x-12 hover:bg-white transition-all shadow-[0_0_15px_rgba(242,125,38,0.4)]"
        >
          <div className="transform skew-x-12">Return to Title</div>
        </button>
      </div>
    </motion.div>
  );
}
