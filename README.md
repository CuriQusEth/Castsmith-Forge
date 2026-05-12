# CastSmith Forge

**CastSmith Forge**, oyuncuya efsanevi silahlar dövme hissini yaşatan, oynaması keyifli ve karanlık bir fantezi temasına sahip ("Elegant Dark") bir "forging-action" web oyunudur.

## Oyunun Özeti
Bir usta **CastSmith** olarak, oyuncular Obsidian, Fire Ember, Aether ve Rune Steel gibi ender hammaddeleri ocağa atarak yeni silahlar (kılıçlar, balyozlar, asalar) yaratır. Silahların nadirliği (Common, Rare, Epic, Legendary), fırının doğru zamanda ve doğru sıcaklıkta vurulmasına bağlıdır. Oyuncu ardından bu yarattığı silahlarla arenalardaki düşman dalgalarına karşı savaşır ve hayatta kaldıkça puan toplar!

## Özellikler
- **Mobile First / Responsive Design:** Oynaması basit, tek tıkla/dokunma ile yönetilen pürüzsüz arayüz.
- **Canlı (Real-Time) Forging:** Doğru zamanda "Strike" butonuna basarak, ocaktaki ıssıyı "sweet spot'ta" (en verimli noktada) tutma mekaniği.
- **Weapon Armory (Silahhane):** Oyuna dahil olan her element ve materyal kombinasyonundan farklı hasarlara sahip kılıçlar doğurma ve kuşanma sistemi.
- **Arena (Wave Survival):** Her yeni dalgada daha güçlü yaratıklarla çarpışın ve kendi rekorunuzu kırın.
- **Base Mainnet Web3 Entegrasyonu:**
  - `SIWE` imzalama ile oyuncunun arenada kırdığı rekorları blokzircirine işleme seçeneği.
  - Sadece bir buton ile "GM" işlemini Base ağına kaydetme ("Say GM to Base").
  - Tam uyumlu **ERC-8004 Trustless Agents** Entegrasyonu &  **Model Context Protocol (MCP)** Destekli `A2A` hizmeti ile yapay zeka ajanı yönetimli oyun dinamikleri (Endpoint: `/.well-known/agent-card.json`).

## Mimari
- **Frontend:** React 19, Tailwind CSS v4, Zustand, Framer Motion (motion), ve Lucide React ikonları.
- **Web3 Layer:** Wagmi & Viem.
- **Server:** Express + Vite tabanlı Fullstack API entegrasyonu (Agent ve MCP modülleri için).

## Geliştirme (Local Development)

Projeyi yerel ortamınızda ayağa kaldırmak için:

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
2. Geliştirici sunucusunu başlatın (React + Express API aynı port üzerinden sunulur):
   ```bash
   npm run dev
   ```
3. Uygulamayı derlemek (build) için:
   ```bash
   npm run build
   ```
4. Derlenmiş uygulamayı çalıştırmak için:
   ```bash
   npm run start
   ```

*Not: Üçüncü taraf sağlayıcılardan edinilecek hassas `API_KEY` vb. değerler üretim (.env) dosyasına atılmalı, git geçmişine eklenmemelidir. Örnek yapı için inceleyin: `.env.example`.*
