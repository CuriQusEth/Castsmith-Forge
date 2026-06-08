import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from './lib/wagmi';
import { useGameStore } from './store/gameStore';
import TitleScreen from './components/screens/TitleScreen';
import ForgeScreen from './components/screens/ForgeScreen';
import CombatScreen from './components/screens/CombatScreen';
import ArmoryScreen from './components/screens/ArmoryScreen';
import LeaderboardScreen from './components/screens/LeaderboardScreen';
import GameOverScreen from './components/screens/GameOverScreen';
import { AnimatePresence } from 'motion/react';
import { useAccount, useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { Sun } from 'lucide-react';

const queryClient = new QueryClient();

function GlobalOverlay() {
  const { isConnected } = useAccount();
  const { sendTransaction } = useSendTransaction();

  const sendGMTransaction = () => {
    sendTransaction({
      to: '0xcD0dd3716C5561De47a24949335dF8a8CD8F71a3',
      value: parseEther('0'),
      data: '0x474d' // "GM" in hex
    });
  };

  if (!isConnected) return null;

  return (
    <div className="absolute top-4 right-4 z-50">
      <button 
        onClick={sendGMTransaction}
        className="px-3 py-2 rounded-lg bg-[#E8A020]/20 hover:bg-[#E8A020]/30 border border-[#E8A020]/40 text-[#E8A020] transition-colors flex items-center gap-2 font-['Cinzel'] text-xs font-bold"
      >
        <Sun className="w-4 h-4" /> Say GM
      </button>
    </div>
  );
}

export default function App() {
  const currentScreen = useGameStore(state => state.currentScreen);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <div className="w-full h-full bg-[#0a0a0a] text-[#e0e0e0] overflow-hidden relative">
          <GlobalOverlay />
          <AnimatePresence mode="wait">

            {currentScreen === 'title' && <TitleScreen key="title" />}
            {currentScreen === 'forge' && <ForgeScreen key="forge" />}
            {currentScreen === 'combat' && <CombatScreen key="combat" />}
            {currentScreen === 'armory' && <ArmoryScreen key="armory" />}
            {currentScreen === 'leaderboard' && <LeaderboardScreen key="leaderboard" />}
            {currentScreen === 'gameover' && <GameOverScreen key="gameover" />}
          </AnimatePresence>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
