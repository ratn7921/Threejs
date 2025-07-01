



// File: src/main.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// DOM & Canvas
const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();
const loader = new THREE.TextureLoader();

// Texture loading (relative to /public folder)
const textures = {
  earth: loader.load('/textures/8k_earth_daymap.jpg'),
  earthNight: loader.load('/textures/8k_earth_nightmap.jpg'),
  mars: loader.load('/textures/8k_mars.jpg'),
  venus: loader.load('/textures/8k_venus_surface.jpg'),
  jupiter: loader.load('/textures/8k_jupiter.jpg'),
  saturn: loader.load('/textures/8k_saturn.jpg'),
  mercury: loader.load('/textures/8k_mercury.jpg'),
  clouds: loader.load('/textures/8k_earth_daymap.jpg'),
  galaxy: loader.load('/textures/8k_stars_milky_way.jpg'),
  stars: loader.load('/textures/8k_stars.jpg'),
};

// Planet Info
const planetInfo = {
  earth: {
    title: "🌍 Earth",
    snippet: "4.543 billion years old • Formed by accretion of dust/gas in the solar nebula • Oldest crustal rocks ~4.16 Ga.",
    deepLink: "/src/pages/earth.html"
  },
  mars: {
    title: "🪐 Mars",
    snippet: "4.603 billion years old • Dry valleys, icy poles, and potential for past microbial life.",
    deepLink: "#"
  },
  venus: {
    title: "🔥 Venus",
    snippet: "4.503 billion years old • Dense CO₂ atmosphere • Surface hotter than Mercury due to greenhouse effect.",
    deepLink: "#"
  },
  jupiter: {
    title: "☄ Jupiter",
    snippet: "Gas giant • Over 300x Earth's mass • Massive storms and over 90 moons.",
    deepLink: "#"
  },
  saturn: {
    title: "💫 Saturn",
    snippet: "Famous for its rings • Mostly hydrogen and helium • Winds over 1,800 km/h.",
    deepLink: "#"
  },
  mercury: {
    title: "🧊 Mercury",
    snippet: "Closest to the Sun • No atmosphere to retain heat • Huge day-night temperature swings.",
    deepLink: "#"
  }
};

// Skybox
const starGeo = new THREE.SphereGeometry(90, 64, 64);
starGeo.scale(-1, 1, 1);
const starMat = new THREE.MeshBasicMaterial({ map: textures.galaxy, side: THREE.BackSide });
const starMesh = new THREE.Mesh(starGeo, starMat);
scene.add(starMesh);

// Planet setup
const planetGeo = new THREE.SphereGeometry(6, 64, 64);
const planetMat = new THREE.MeshStandardMaterial({ map: textures.earth });
const planet = new THREE.Mesh(planetGeo, planetMat);
scene.add(planet);

// Clouds
const cloudGeo = new THREE.SphereGeometry(6.05, 64, 64);
const cloudMat = new THREE.MeshLambertMaterial({ map: textures.clouds, transparent: true });
const clouds = new THREE.Mesh(cloudGeo, cloudMat);
scene.add(clouds);

// Lighting
scene.add(new THREE.AmbientLight(0x222222));
const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
scene.add(sunLight);

// Time-based lighting
function updateSunPositionByTime() {
  const now = new Date();
  const utcHours = now.getUTCHours() + now.getUTCMinutes() / 60;
  const angle = (utcHours / 24) * Math.PI * 2;
  const radius = 100;
  const x = radius * Math.cos(angle + Math.PI);
  const z = radius * Math.sin(angle + Math.PI);
  sunLight.position.set(x, 0, z);
}
updateSunPositionByTime();
setInterval(updateSunPositionByTime, 60000);

// Camera + controls
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 20;
scene.add(camera);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 1;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation
function animate() {
  requestAnimationFrame(animate);
  updateSunPositionByTime();
  planet.rotation.y += 0.001;
  clouds.rotation.y += 0.0012;
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Toggle day/night
const toggleBtn = document.getElementById('toggleMode');
let isDay = true;
toggleBtn?.addEventListener('click', () => {
  isDay = !isDay;
  planetMat.map = isDay ? textures.earth : textures.earthNight;
  planetMat.needsUpdate = true;
  toggleBtn.textContent = isDay ? 'Switch to Night' : 'Switch to Day';
});

// Switching planets
function selectPlanet(name) {
  if (!textures[name]) return;

  planetMat.map = textures[name];
  planetMat.needsUpdate = true;

  const info = planetInfo[name];
  const infoBox = document.getElementById('planetInfo');

  if (infoBox && info) {
    infoBox.innerHTML = `
      <h2>${info.title}</h2>
      <p>${info.snippet}</p>
      <a href="${info.deepLink}" target="_blank">Read the deep dive →</a>
    `;
  }

  if (name === 'earth') {
    scene.add(clouds);
    starMat.map = textures.galaxy;
  } else {
    scene.remove(clouds);
    starMat.map = textures.stars;
  }
  starMat.needsUpdate = true;
}
window.selectPlanet = selectPlanet;

// Attach click handlers
document.querySelectorAll('.planet-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const planet = btn.getAttribute('data-planet');
    if (planet) selectPlanet(planet);
  });
});

// Set default planet
selectPlanet('earth');
