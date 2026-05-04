import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useGameStore } from '../../store/gameStore';
import { ChevronLeft, Flame, Zap, Droplets, Gem, Hammer } from 'lucide-react';

const MATERIALS = [
  { id: 'obsidian', name: 'Obsidian', icon: Gem, color: 'text-purple-500', bg: 'bg-purple-900/30', border: 'border-purple-500/30', dot: 'bg-purple-500' },
  { id: 'ember', name: 'Dragon Vein', icon: Flame, color: 'text-red-500', bg: 'bg-red-900/30', border: 'border-red-500/30', dot: 'bg-red-500' },
  { id: 'aether', name: 'Aether', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-900/30', border: 'border-blue-500/30', dot: 'bg-blue-500' },
  { id: 'rune', name: 'Rune Steel', icon: Zap, color: 'text-[#f27d26]', bg: 'bg-zinc-700/30', border: 'border-zinc-500/30', dot: 'bg-[#f27d26]' },
];

export default function ForgeScreen() {
  const setScreen = useGameStore(state => state.setScreen);
  const addWeapon = useGameStore(state => state.addWeapon);
  
  const [temperature, setTemperature] = useState(0);
  const [isForging, setIsForging] = useState(false);
  const [materialsInForge, setMaterialsInForge] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(10);
  
  // Game Loop
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isForging && timeRemaining > 0) {
      interval = setInterval(() => {
        setTemperature(prev => Math.max(0, prev - 2)); // Heat decays
        setTimeRemaining(prev => +(prev - 0.1).toFixed(1));
      }, 100);
    } else if (isForging && timeRemaining <= 0) {
      finishForging();
    }
    return () => clearInterval(interval);
  }, [isForging, timeRemaining]);

  const addMaterial = (matId: string) => {
    if (materialsInForge.length < 3) {
      setMaterialsInForge([...materialsInForge, matId]);
    }
  };

  const strikeAnvil = () => {
    if (!isForging) return;
    setTemperature(prev => Math.min(100, prev + 15));
    // Optional: add visual juice here (spark particles)
  };

  const startForging = () => {
    if (materialsInForge.length === 0) return;
    setIsForging(true);
    setTemperature(50);
    setTimeRemaining(10);
  };

  const finishForging = () => {
    setIsForging(false);
    
    // Evaluate quality based on temperature when time ran out
    let rarity: 'common' | 'rare' | 'epic' | 'legendary' = 'common';
    let baseDamage = 10;
    
    if (temperature > 80 && temperature < 95) {
      rarity = 'legendary';
      baseDamage = 50;
    } else if (temperature >= 60) {
      rarity = 'epic';
      baseDamage = 35;
    } else if (temperature >= 40) {
      rarity = 'rare';
      baseDamage = 20;
    }
    
    // Determine Element based on materials
    let element: 'fire' | 'lightning' | 'void' | 'ice' | undefined;
    if (materialsInForge.includes('ember')) element = 'fire';
    else if (materialsInForge.includes('rune')) element = 'lightning';
    else if (materialsInForge.includes('aether')) element = 'ice';
    else if (materialsInForge.includes('obsidian')) element = 'void';
    
    const weaponName = `${rarity === 'legendary' ? 'Godly' : 'Forged'} ${materialsInForge.includes('obsidian') ? 'Blade' : 'Hammer'}`;
    
    const newWeapon = {
      id: `w-${Date.now()}`,
      name: weaponName,
      rarity,
      element,
      damage: baseDamage + (materialsInForge.length * 5)
    };
    
    addWeapon(newWeapon);
    // Move to Combat!
    setScreen('combat');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="w-full h-full flex flex-col p-6 bg-[#0a0a0a]"
    >
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
        <div className="flex items-center gap-4">
          <button onClick={() => setScreen('title')} className="w-10 h-10 bg-[#f27d26] rounded flex items-center justify-center shadow-[0_0_15px_rgba(242,125,38,0.4)] transition-transform active:scale-95 text-black">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold tracking-tighter uppercase italic text-white">Castsmith <span className="text-[#f27d26]">Forge</span></h1>
        </div>
      </header>

      <div className="flex-1 flex flex-col gap-6">
        
        {/* Materials Selection */}
        {!isForging && (
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#f27d26] mb-4">Raw Materials</h2>
            <div className="grid grid-cols-2 gap-3">
              {MATERIALS.map(m => {
                const Icon = m.icon;
                return (
                  <button 
                    key={m.id} 
                    onClick={() => addMaterial(m.id)}
                    className="flex justify-between items-center p-3 bg-black/40 rounded border border-white/5 active:scale-95 transition-transform"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${m.bg} border ${m.border} rounded flex items-center justify-center`}>
                        <Icon className={`w-4 h-4 ${m.color}`} />
                      </div>
                      <div className="text-left hidden sm:block">
                        <p className="text-sm font-semibold">{m.name}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Forge Area */}
        <div className="relative flex-1 bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col group">
          <div className="absolute inset-0 bg-radial-gradient from-[#f27d26]/10 to-transparent pointer-events-none"></div>

          <div className="absolute top-4 right-4 flex gap-1 z-10 bg-black/40 px-3 py-1.5 rounded-full border border-white/10">
            {materialsInForge.map((m, i) => (
              <div key={i} className="flex items-center justify-center">
                <div className={`w-2.5 h-2.5 rounded-full ${MATERIALS.find(mat => mat.id === m)?.dot} shadow-[0_0_8px_${MATERIALS.find(mat => mat.id === m)?.color?.replace('text-', '')}]`} />
              </div>
            ))}
          </div>

          {!isForging ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 w-full">
              <div className="w-48 h-48 rounded-full border border-white/10 flex items-center justify-center bg-black mb-8 text-center text-white/40 font-mono text-xs shadow-[inset_0_0_50px_rgba(242,125,38,0.1)] flex-col">
                <Hammer className="w-8 h-8 text-white/20 mb-2" />
                <span>Add up to</span>
                <span>3 Materials</span>
              </div>
              <button 
                onClick={startForging}
                disabled={materialsInForge.length === 0}
                className="px-8 py-4 bg-[#f27d26] text-black font-black uppercase tracking-widest text-lg rounded-sm transform -skew-x-12 disabled:opacity-50 disabled:grayscale transition-colors box-shadow-glow hover:bg-white"
              >
                <div className="transform skew-x-12">Ignite Forge</div>
              </button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center relative w-full h-full">
              {/* Top Temperature Info */}
              <div className="absolute top-10 flex flex-col items-center z-10">
                <span className="text-[10px] font-mono tracking-widest text-[#f27d26] uppercase animate-pulse mb-1">Heat level: {temperature}°C</span>
                <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#f27d26] transition-all max-w-full duration-100 ease-linear shadow-[0_0_10px_#f27d26]"
                    style={{ width: `${temperature}%` }}
                  />
                </div>
              </div>

              {/* Time Remaining */}
              <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                <p className="text-[10px] font-bold text-white/40 uppercase rotate-90 mb-6 tracking-[0.3em] whitespace-nowrap -ml-4">Stability</p>
                <div className="w-1.5 h-32 bg-white/10 relative rounded-full">
                  <div 
                     className="absolute bottom-0 w-full bg-blue-500 shadow-[0_0_10px_#3b82f6] rounded-full transition-all"
                     style={{ height: `${(timeRemaining / 10) * 100}%` }}
                  />
                </div>
              </div>

              {/* Anvil Button */}
              <div className="relative">
                <div className="w-56 h-56 bg-black rounded-full border border-white/10 flex items-center justify-center shadow-[inset_0_0_50px_rgba(242,125,38,0.2)]">
                  <Hammer className="w-32 h-32 text-[#f27d26] opacity-90 drop-shadow-[0_0_30px_rgba(242,125,38,0.8)]" />
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-4 w-full justify-center">
                  <button 
                    onClick={strikeAnvil}
                    className="px-8 py-4 bg-[#f27d26] text-black font-black uppercase tracking-widest rounded-sm transform -skew-x-12 hover:bg-white active:scale-95 transition-all shadow-[0_0_15px_rgba(242,125,38,0.4)] whitespace-nowrap"
                  >
                    <div className="transform skew-x-12">STRIKE ANVIL</div>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </motion.div>
  );
}
