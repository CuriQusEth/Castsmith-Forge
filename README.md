# CastSmith Forge Orchestrator

**CastSmith Forge** is an "Elegant Dark" fantasy forging-action web game where players experience the thrill of crafting legendary weapons. The platform is powered by an ERC-8004 compliant AI Agent orchestrator.

## Overview
As a master **CastSmith**, players use rare materials like Obsidian, Fire Ember, Aether, and Rune Steel to craft weapons (swords, hammers, staffs). Rarity (Common, Rare, Epic, Legendary) depends on striking the forge at the correct temperature sweet spot. Players then equip their weapons to battle enemy waves in the arena, scoring points through survival and strategy.

## Agent Orchestrator & MCP (Model Context Protocol)

This application hosts the **CastSmith Forge Orchestrator**, an active AI agent that automates various game mechanics via the Model Context Protocol (MCP) and ERC-8004 standards.

### Features & Capabilities:
- **Casting Mechanics**
- **Forging Operations**
- **Item Creation**
- **Craft Automation**
- **Multi-Craft Management**
- **MCP Command Execution**

### Agent Registration (ERC-8004)
The agent communicates via standard A2A (Agent-to-Agent) and MCP endpoints.
- **Agent Card:** `https://castsmith-forge.vercel.app/.well-known/agent-card.json`
- **MCP Endpoint:** `https://castsmith-forge.vercel.app/api/mcp` *(Use this endpoint for testing or client connections, NOT `/app/api/mcp`)*
- **Agent API:** `https://castsmith-forge.vercel.app/api/agent`
- **Supported Chains:** Base Mainnet (`eip155:8453`)

## Web3 Integration
- **Sign-In with Ethereum (SIWE):** Securely save arena high scores on-chain.
- **Base Integration:** Push simple transactions like "Say GM to Base".
- **Wagmi & Viem:** Powers the seamless Web3 integration layer.

## Architecture & Tech Stack
- **Frontend:** Next.js 14 App Router, React 19, Tailwind CSS v4, Zustand, Framer Motion, Lucide React.
- **Web3 Layer:** Wagmi & Viem.
- **Backend / Agent API:** App Router Serverless Functions (`app/api/*`).

## Local Development

To run the project locally:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server (runs the frontend alongside API routes):
   ```bash
   npm run dev
   ```
3. To build the application:
   ```bash
   npm run build
   ```
4. To run the compiled application:
   ```bash
   npm run start
   ```

*Note: Sensitive variables (e.g., placeholder tokens, third-party API keys) must be placed in your local `.env` and never pushed to source control. See `.env.example` if available.*
