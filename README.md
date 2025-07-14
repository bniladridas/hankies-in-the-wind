# hankies-in-the-wind

[![vitest](https://img.shields.io/badge/vitest-tested-6e9f18?logo=vitest\&logoColor=white\&style=flat)](https://vitest.dev)

**hankies-in-the-wind** is a browser-based AI chat app that interfaces with the Gemini API. It includes a modular memory system for fact extraction and recall. Everything runs locally except API calls to Gemini.

> 📄 Memory system details: [docs/memory.md](docs/memory.md)

[![](https://github.com/user-attachments/assets/ba676ae4-8d14-4b09-8cc0-ada14d527dc7)](https://github.com/user-attachments/assets/ba676ae4-8d14-4b09-8cc0-ada14d527dc7)

## Setup

```sh
npm install
npm run dev
```

Open the local URL shown in your terminal.

## Bug reports

Use [GitHub issues](https://github.com/bniladridas/hankies-in-the-wind/issues) to report bugs or request features.

## Privacy

* Memory facts are stored in your browser (`localStorage`).
* Chat messages are sent to the Gemini API.
* No analytics or tracking code is included.
* No server-side logic; everything runs client-side.
* You can clear all memory by clearing your browser storage.

For Gemini API usage policies, see [Google’s terms](https://ai.google.dev/terms).
