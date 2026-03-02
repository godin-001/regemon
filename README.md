# ⚔️ REGEMON

> VibeCoding Bootcamp Frutero · Sesión 2 — IA Chat

Mascota virtual estilo Pokémon/Tamagotchi con chat de IA.

## Stack
- React 19 + TypeScript + Vite
- NES.css (retro pixel UI)
- OpenAI API (gpt-4o-mini)

## Features
### Sesión 1
- 4 tipos de Regemon: Fuego, Agua, Tierra, Aire
- Stats: Hambre, Felicidad, Energía
- Ciclo de vida: Huevo → Bebé → Adulto → Muerte por negligencia
- Persistencia en localStorage

### Sesión 2
- 💬 Chat con tu Regemon usando OpenAI
- 🧠 Sistema de memorias (aprende tu nombre y gustos)
- 📊 Stats afectadas por el chat (+5 felicidad, -2 energía por mensaje)
- ✍️ Indicador "Escribiendo..." mientras responde
- 🔥 Modo furioso cuando hambre < 10%
- 💾 Conversación persistida (max 20 mensajes)
- ✨ Texto flotante "+5 Felicidad" en cada mensaje

## Setup
```bash
npm install
```

Crea un archivo `.env`:
```
VITE_OPENAI_API_KEY=tu_api_key_aqui
```

```bash
npm run dev
```
