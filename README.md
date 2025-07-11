# 🌌 Three.js Galactic Explorer

Welcome to **Three.js Galactic Explorer**, a stunning 3D web application that lets you explore the solar system’s planets in real time and dive deep into Earth’s evolutionary history with dynamic API-driven timelines.

---

## 🚀 Features

* **Interactive 3D Planets**
  Rotate, pan, and zoom your view of Earth, Mars, Venus, Jupiter, Saturn, and Mercury using mouse or touch.

* **Day / Night Cycle**
  The sun’s position and lighting update in real time based on your local clock.

* **Rich Planet Info**
  Click any planet in the footer to instantly load a beautiful info panel:

  * Title & snippet
  * “Read the deep dive” link to a dedicated page

* **Earth Deep Dive**
  A separate page powered by the TimeTree API shows:

  * Human–Chimp divergence (pairwise estimate)
  * Evolutionary timeline of *Homo sapiens*
  * Clean, card‑style layout with header image

* **Responsive Design**
  Works on desktop, tablet, and mobile with full-screen WebGL canvas and overlay UIs.

---

## 📁 Folder Structure

```
Threejs/
├── public/
│   └── textures/          # All high‑res planet & sky textures
│
├── src/
│   ├── api.js             # API helper (fetchDivergence)
│   ├── main.js            # Three.js scene & UI logic
│   ├── style.css          # Global styling & theme
│   └── pages/             # “Deep dive” pages for each planet
│       ├── earth.html
│       ├── mars.html
│       ├── venus.html
│       ├── jupiter.html
│       ├── saturn.html
│       └── mercury.html
│
├── server/
│   └── server.js          # Express proxy for TimeTree API
│
├── index.html             # Entry point (loads src/main.js)
├── package.json
├── vite.config.js
└── README.md
```

---

## 🔧 Installation & Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/ratn7921/Threejs.git
   cd Threejs
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the backend server**

   ```bash
   npm run start-server
   ```

   This runs Express on port `3000`, proxying `/api/pairwise` and `/api/timeline`.

4. **Start the frontend (Vite)**

   ```bash
   npm run dev
   ```

5. **Open in browser**

   Visit 👉 `http://localhost:5173`

---

## 🎨 Screenshots

<div align="center">
  <img src="https://raw.githubusercontent.com/ratn7921/Threejs/main/docs/screenshot-planet.png" alt="Planet View" width="400" />&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/ratn7921/Threejs/main/docs/screenshot-earth-dive.png" alt="Earth Deep Dive" width="400" />
</div>

---

## 📘 Usage

* **Switch Planets**
  Click the **circular icons** in the footer to change the main sphere’s texture and info.

* **Toggle Day/Night**
  Use the **Switch to Night** / **Switch to Day** button to flip between day and night textures on Earth.

* **Interact**
  Click & drag to rotate, scroll or pinch to zoom, and press & drag to pan the view.

* **Deep Dive**
  On the info panel, click **Read the deep dive →** to explore the full page for that planet (e.g. `/src/pages/earth.html`).

---

## 🔗 External Links

* **TimeTree API**
  [https://timetree.org](https://timetree.org)
  Fetches evolutionary divergence and timelines.

* **Three.js Documentation**
  [https://threejs.org/docs/](https://threejs.org/docs/)

* **Vite**
  [https://vitejs.dev/](https://vitejs.dev/)

---

## 🤝 Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

We welcome all improvements—animations, performance tweaks, new planet pages, or UI enhancements!

---

## 📝 License

This project is released under the [MIT License](LICENSE). Feel free to use, modify, and distribute.

---

Made with ❤️ by Ratna — explore the cosmos one line of code at a time!
