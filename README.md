<h1 align="center">lowsbarrel.com</h1>
<p align="center">
  <b>Personal Portfolio of Alessandro Zucchiatti</b><br>
  CTO @ Quantivo • AI & Big Data • DevOps • Python • Fintech
</p>
<p align="center">
  <a href="https://lowsbarrel.com" target="_blank"><img src="https://lowsbarrel.com/alessandro-avatar.png" alt="Alessandro Zucchiatti" width="120" style="border-radius:50%"></a>
</p>
<p align="center">
  <a href="https://lowsbarrel.com" target="_blank">🌐 lowsbarrel.com</a> •
  <a href="https://github.com/lowsbarrel" target="_blank">GitHub</a> •
  <a href="mailto:alessandro@quantivo.com">Email</a> •
  <a href="https://linkedin.com/in/alessandro-zucchiatti" target="_blank">LinkedIn</a>
</p>

---

## 🚀 Overview

Portfolio personale di Alessandro Zucchiatti, CTO, AI & Big Data student, DevOps engineer.  
Specializzato in Python, Docker, CI/CD, fintech e soluzioni cloud.

- **Live:** [lowsbarrel.com](https://lowsbarrel.com)
- **Stack:** React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Radix UI
- **Features:** Spotify integration, Cal.com booking, responsive design, dark/light mode

---

## ✨ Features

- 🎵 **Spotify Integration**: Mostra la canzone attualmente in riproduzione e le top tracks
- 📅 **Cal.com Booking**: Prenota appuntamenti direttamente dal sito
- 💡 **Esperienza & Skills**: Timeline interattiva e skills visuali
- 🌗 **Dark/Light Mode**: UI moderna e accessibile
- ⚡ **Performance**: Build ottimizzata, SEO base, mobile-first

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite
- **UI/UX:** Tailwind CSS, shadcn/ui, Radix UI, Lucide Icons
- **API:** Spotify Web API, Cal.com Embed
- **Tooling:** ESLint, PostCSS, Bun/NPM

---

## 🖥️ Local Development

```bash
# Installa le dipendenze
bun install

# Avvia il server di sviluppo
bun run dev

# Build produzione
bun run build

# Preview produzione
bun run preview
```

> Puoi usare anche `npm` o `yarn` se preferisci.

---

## 🎧 Spotify Integration

Per visualizzare i tuoi dati Spotify reali:

1. Crea una app su [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Segui la guida in [`SPOTIFY_SETUP.md`](./SPOTIFY_SETUP.md) per ottenere i token
3. Crea un file `.env.local` nella root con queste variabili:

```env
VITE_SPOTIFY_CLIENT_ID=your_client_id
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret
VITE_SPOTIFY_REFRESH_TOKEN=your_refresh_token
VITE_SPOTIFY_USER_ID=your_user_id
```

> Se non imposti le variabili, il sito mostrerà dati di esempio/mock.

---

## 🌍 Deployment

Il sito è una **Single Page Application** statica.  
Puoi deployare la cartella `dist/` su qualsiasi provider statico:

- **Netlify** (drag & drop o collegamento repo)
- **Vercel**
- **GitHub Pages**
- **Cloudflare Pages**
- **Firebase Hosting**

Per mostrare i dati Spotify reali in produzione, aggiungi le stesse variabili d'ambiente nel pannello del provider.

---

## 📄 License

MIT License — vedi [LICENSE](./LICENSE)

---

<p align="center">
  <b>Made with ❤️ by Alessandro Zucchiatti</b>
</p>
