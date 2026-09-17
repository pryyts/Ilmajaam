const GEOCODER_URL = 'https://aks.geoportaal.ee/inaks-geocoder-api/api/plain';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

const form = document.getElementById('search-form');
const input = document.getElementById('address');
const button = document.getElementById('search-btn');
const statusEl = document.getElementById('status');
const resultEl = document.getElementById('result');

let map = null;
let marker = null;

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const address = input.value.trim();
  if (!address) return;

  setLoading(true);
  resultEl.hidden = true;

  try {
    const location = await geocode(address);
    if (!location) {
      showStatus('Aadressi ei leitud. Proovi täpsemat kirjeldust.');
      return;
    }

    const weather = await getWeather(location.lat, location.lon);
    showResult(location, weather);
    showStatus('');
  } catch (err) {
    showStatus('Päring ebaõnnestus: ' + err.message);
  } finally {
    setLoading(false);
  }
});

async function geocode(address) {
  const response = await fetch(GEOCODER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address }),
  });

  if (!response.ok) {
    throw new Error(`Aadressiotsingu teenus vastas veaga (${response.status})`);
  }

  const data = await response.json();
  const match = data?.group?.rows?.[0];

  if (!match || match.quality === 'EILEITUD' || match.l == null || match.b == null) {
    return null;
  }

  return {
    address: match.normaddress || match.input,
    lat: match.l,
    lon: match.b,
  };
}

async function getWeather(lat, lon) {
  const url = `${WEATHER_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,wind_speed_10m,wind_direction_10m&wind_speed_unit=ms&timezone=auto`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Ilmateenus vastas veaga (${response.status})`);
  }

  const data = await response.json();
  return data.current;
}

function setLoading(isLoading) {
  button.disabled = isLoading;
  if (isLoading) {
    showStatus('Otsin...');
  }
}

function showStatus(message) {
  statusEl.textContent = message;
}

function showResult(location, weather) {
  document.getElementById('result-address').textContent = location.address;
  document.getElementById('weather-temp').textContent = `${weather.temperature_2m} °C`;
  document.getElementById('weather-wind').textContent =
    `${weather.wind_speed_10m} m/s, ${windDirectionLabel(weather.wind_direction_10m)} (${weather.wind_direction_10m}°)`;
  document.getElementById('weather-precip').textContent = `${weather.precipitation} mm`;

  updateMap(location, weather);

  resultEl.hidden = false;
}

function updateMap(location, weather) {
  if (!map) {
    map = L.map('map').setView([location.lat, location.lon], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);
  } else {
    map.setView([location.lat, location.lon], 15);
  }

  if (marker) {
    marker.remove();
  }
  marker = L.marker([location.lat, location.lon]).addTo(map);
  marker.bindPopup(popupContent(weather)).openPopup();

  // Leaflet needs a size recalculation when its container was hidden during init.
  setTimeout(() => map.invalidateSize(), 0);
}

function popupContent(weather) {
  return `<ul>
    <li>Temperatuur: ${weather.temperature_2m} °C</li>
    <li>Tuul: ${weather.wind_speed_10m} m/s, ${windDirectionLabel(weather.wind_direction_10m)} (${weather.wind_direction_10m}°)</li>
    <li>Sademed: ${weather.precipitation} mm</li>
  </ul>`;
}

function windDirectionLabel(degrees) {
  const directions = ['Põhi', 'Kirre', 'Ida', 'Kagu', 'Lõuna', 'Edel', 'Lääs', 'Loode'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}
