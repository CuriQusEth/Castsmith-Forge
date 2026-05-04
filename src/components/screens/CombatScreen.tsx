import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useGameStore } from '../../store/gameStore';
import { ShieldAlert, Crosshair, Heart } from 'lucide-react';

export default function CombatScreen() {
  const setScreen = useGameStore(state => state.setScreen);
  const addScore = useGameStore(state => state.addScore);
  const wave = useGameStore(state => state.wave);
  const setWave = useGameStore(state => state.setWave);
  const weapons = useGameStore(state => state.weapons);
  const equippedWeaponId = useGameStore(state => state.equippedWeaponId);
  const resetGame = useGameStore(state => state.resetGame);

  const activeWeapon = weapons.find(w => w.id === equippedWeaponId) || weapons[weapons.length - 1];

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playerHp, setPlayerHp] = useState(100);
  const [enemyHp, setEnemyHp] = useState(100 + wave * 50);
  const enemyMaxHp = 100 + wave * 50;

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    
    // Resize
    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const render = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Enemy
      const enemyX = canvas.width / 2;
      const enemyY = canvas.height / 3 + Math.sin(time / 500) * 20;
      
      ctx.fillStyle = '#f00';
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#f00';
      ctx.beginPath();
      ctx.arc(enemyX, enemyY, 40, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        if (p.life <= 0) particles.splice(i, 1);
      });

      // Simple enemy attack logic (visual only for now)
      if (Math.random() < 0.02) {
         setPlayerHp(prev => Math.max(0, prev - (wave * 2)));
         // add spark
         particles.push({
           x: canvas.width / 2, y: canvas.height - 50,
           vx: (Math.random() - 0.5) * 10, vy: (Math.random() - 0.5) * 10,
           life: 1, size: Math.random() * 4, color: '#ff0000'
         });
      }

      animationFrameId = requestAnimationFrame(render);
    };
    
    render(0);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [wave]);

  // Win / Loss condition
  useEffect(() => {
    if (playerHp <= 0) {
      setScreen('gameover');
    }
    if (enemyHp <= 0) {
      addScore(wave * 100);
      setWave(wave + 1);
      setScreen('armory'); // To choose next step
    }
  }, [playerHp, enemyHp, wave]);

  const handleAttack = () => {
    if (!activeWeapon) return;
    const dmg = activeWeapon.damage + Math.floor(Math.random() * 10);
    setEnemyHp(prev => Math.max(0, prev - dmg));
    
    // Add Attack Juice / Particles in the canvas if needed (we are doing it simply via React states for now)
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="w-full h-full flex flex-col bg-[#0a0a0a] relative"
    >
      {/* HUD */}
      <div className="absolute top-0 w-full p-6 z-10 flex justify-between items-start pointer-events-none">
        <div className="bg-black/40 px-4 py-2 rounded border border-white/10">
          <h3 className="text-xl font-bold font-mono tracking-tighter uppercase italic text-white">ARENA <span className="text-[#f27d26]">WAVE {wave}</span></h3>
          <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest">Score: {useGameStore.getState().score}</p>
        </div>
        
        {/* Enemy HP */}
        <div className="w-40 text-right bg-black/40 p-3 rounded border border-white/10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-red-500 mb-2">Enemy Status</p>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] transition-all" style={{ width: `${(enemyHp/enemyMaxHp)*100}%` }} />
          </div>
        </div>
      </div>

      <canvas 
        ref={canvasRef} 
        className="w-full flex-1"
      />

      {/* Player Section */}
      <div className="h-[40%] bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent absolute bottom-0 w-full p-6 flex flex-col justify-end pointer-events-auto z-20">
        
        {/* Player Stats */}
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl mb-4">
          <div className="flex justify-between items-start mb-4">
             <h2 className="text-xs font-bold uppercase tracking-widest text-white/60 italic">Vitals</h2>
             {activeWeapon && <span className="text-[10px] px-2 py-1 bg-white/10 rounded font-mono text-[#f27d26] font-bold">DMG {activeWeapon.damage}</span>}
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-[10px] uppercase font-bold tracking-tight">
              <span>Health</span>
              <span className="text-green-400">{playerHp}%</span>
            </div>
             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] transition-all" style={{ width: `${playerHp}%` }} />
             </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button 
            onClick={handleAttack}
            className="flex-1 py-4 bg-[#f27d26] text-black font-black uppercase tracking-widest rounded-sm transform -skew-x-12 hover:bg-white active:scale-95 transition-all shadow-[0_0_15px_rgba(242,125,38,0.4)]"
          >
            <div className="flex items-center justify-center gap-2 transform skew-x-12">
               <Crosshair className="w-5 h-5 text-black" />
               <span className="text-sm">Strike</span>
            </div>
          </button>
          <button 
            onClick={() => setScreen('forge')}
            className="flex-1 py-4 bg-black/40 border border-[#f27d26]/30 text-white font-bold uppercase tracking-widest rounded-sm transform -skew-x-12 hover:bg-[#f27d26] hover:text-black active:scale-95 transition-all"
          >
            <div className="flex items-center justify-center gap-2 transform skew-x-12">
               <ShieldAlert className="w-5 h-5" />
               <span className="text-sm">Live Forge</span>
            </div>
          </button>
        </div>
      </div>

    </motion.div>
  );
}
