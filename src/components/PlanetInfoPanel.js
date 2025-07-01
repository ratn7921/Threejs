export function updatePlanetInfo(name, data) {
  const infoBox = document.getElementById('planetInfo');
  infoBox.innerHTML = `
    <h2>${data.title}</h2>
    <p>${data.snippet}</p>
    <a href="${data.deepLink}" target="_blank">Read the deep dive →</a>
  `;
}
