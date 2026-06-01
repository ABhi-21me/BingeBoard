# BingeBoard

**Universal binge tracker and companion** – a Chrome extension that automatically detects your streaming activity across popular platforms, tracks binge‑watching streaks, awards gamified badges, and helps you manage your watchlist.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Cross‑platform detection** – Works with Netflix, Disney+, Hulu, Amazon Prime Video, YouTube, Twitch and more.
- **Automatic streak tracking** – Keeps a record of consecutive binge sessions and displays a progress bar.
- **Gamified badge system** – Earn badges for milestones (e.g., *First Binge*, *Marathon*, *All‑Day Binge*).
- **Watchlist manager** – Add titles directly from the extension to a persistent watchlist.
- **Brutalist UI** – Minimalistic, high‑contrast design with custom icon.
- **Persisted data** – All state saved in `chrome.storage.local`.
- **Lightweight** – No external dependencies, pure HTML/CSS/JS.

---

## Demo

![BingeBoard icon](/C:/Users/Abhis/.gemini/antigravity-ide/brain/f303c17a-5e0d-40cb-8122-775671a56d75/bingeboard_icon_1780310761263.png)

*The extension replaces the new‑tab page with a dashboard showing your current binge streak and badge collection.*

---

## Installation

1. Clone the repository or download the source code.
   ```bash
   git clone https://github.com/yourusername/bingeboard.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (top‑right toggle).
4. Click **Load unpacked** and select the `BingeBoard` directory.
5. The extension will appear in the toolbar and replace the default new‑tab page.

> **Note:** The extension is built for Manifest V3. Ensure you are using a recent version of Chrome/Edge.

---

## Usage

- Open a new tab – the BingeBoard dashboard loads automatically.
- When you start streaming on a supported platform, the background script detects the activity and updates the dashboard.
- Visit the **Badges** tab to view earned achievements.
- Use the **Watchlist** panel to add or remove titles.
- All data persists across browser sessions.

---

## Tech Stack

- **Chrome Extension (Manifest V3)**
- **HTML5 & CSS3** – Brutalist design with custom SVG icons.
- **Vanilla JavaScript** – No frameworks, pure ES6 modules.
- **chrome.storage.local** – Persistent client‑side storage.
- **Icon assets** – PNG (16×16, 48×48, 128×128) and inline SVG.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/awesome-feature`).
3. Make your changes and ensure the extension still loads without errors.
4. Run the provided lint script (if any) or manually verify.
5. Submit a Pull Request with a clear description of the changes.

---

## License

This project is licensed under the **MIT License** – see the `LICENSE` file for details.

---

*Enjoy tracking your binge‑watch adventures!*
