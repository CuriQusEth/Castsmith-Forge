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

const queryClient = new QueryClient();

export default function App() {
  const currentScreen = useGameStore(state => state.currentScreen);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <div className="w-full h-full bg-[#0a0a0a] text-[#e0e0e0] overflow-hidden relative">
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
