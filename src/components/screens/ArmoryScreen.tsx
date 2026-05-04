import { motion } from 'motion/react';
import { useGameStore } from '../../store/gameStore';
import { ChevronLeft, Swords, ArrowRight } from 'lucide-react';

export default function ArmoryScreen() {
  const setScreen = useGameStore(state => state.setScreen);
  const weapons = useGameStore(state => state.weapons);
  const equippedWeaponId = useGameStore(state => state.equippedWeaponId);
  const equipWeapon = useGameStore(state => state.equipWeapon);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="w-full h-full flex flex-col p-6 bg-[#0a0a0a]"
    >
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
        <div className="flex items-center gap-4">
          <button onClick={() => setScreen('title')} className="w-10 h-10 bg-[#f27d26] rounded flex items-center justify-center shadow-[0_0_15px_rgba(242,125,38,0.4)] transition-transform active:scale-95 text-black">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold tracking-tighter uppercase italic text-white">Castsmith <span className="text-[#f27d26]">Armory</span></h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pb-24">
        {weapons.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-white/40 font-mono text-xs uppercase tracking-widest gap-4">
            <Swords className="w-12 h-12 opacity-50" />
            <p>Your armory is empty.</p>
            <button onClick={() => setScreen('forge')} className="text-[#f27d26] underline mt-4 hover:text-white transition-colors">Go to Forge</button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {weapons.map(w => (
              <div 
                key={w.id} 
                onClick={() => equipWeapon(w.id)}
                className={`p-4 rounded-xl flex flex-col gap-3 transition-all cursor-pointer ${
                  equippedWeaponId === w.id 
                    ? 'bg-[#f27d26]/10 border border-[#f27d26]/30 shadow-[0_0_15px_rgba(242,125,38,0.1)]' 
                    : 'bg-white/5 border border-white/10 opacity-70 hover:opacity-100 hover:border-white/20'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`font-bold uppercase tracking-widest text-sm ${w.rarity === 'legendary' ? 'text-amber-400' : 'text-white'}`}>
                    {w.name}
                  </span>
                  {equippedWeaponId === w.id && <span className="text-[10px] bg-[#f27d26] px-2 py-1.5 rounded-sm text-black font-black uppercase tracking-widest">Equipped</span>}
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-[10px] uppercase font-bold tracking-tight text-white/60">
                    <span>Power</span>
                    <span className="text-white">{w.damage}</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-white/40" style={{ width: `${Math.min(100, (w.damage / 100) * 100)}%` }} />
                  </div>
                  
                  <div className="flex gap-4 mt-2 font-mono text-[10px] text-white/40 uppercase tracking-widest">
                    <span>{w.rarity}</span>
                    {w.element && <span className="text-blue-400">{w.element} Element</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <button 
          onClick={() => setScreen('combat')}
          disabled={weapons.length === 0}
          className="w-full py-4 bg-[#f27d26] text-black font-black uppercase tracking-widest rounded-sm transform -skew-x-12 disabled:opacity-50 disabled:grayscale transition-all shadow-[0_0_15px_rgba(242,125,38,0.4)] flex justify-center items-center hover:bg-white active:scale-95"
        >
          <div className="flex items-center gap-2 transform skew-x-12">
            Next Wave <ArrowRight className="w-5 h-5" />
          </div>
        </button>
      </div>

    </motion.div>
  );
}
