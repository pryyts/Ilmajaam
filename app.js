const GEOCODER_URL = 'https://aks.geoportaal.ee/inaks-geocoder-api/api/plain';

const form = document.getElementById('search-form');
const input = document.getElementById('address');
const button = document.getElementById('search-btn');
const statusEl = document.getElementById('status');
const resultEl = document.getElementById('result');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const address = input.value.trim();
  if (!address) return;

  setLoading(true);
  resultEl.hidden = true;

  try {
    const response = await fetch(GEOCODER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address }),
    });

    if (!response.ok) {
      throw new Error(`Teenus vastas veaga (${response.status})`);
    }

    const data = await response.json();
    const match = data?.group?.rows?.[0];

    if (!match || match.quality === 'EILEITUD' || match.l == null || match.b == null) {
      showStatus('Aadressi ei leitud. Proovi täpsemat kirjeldust.', 'error');
      return;
    }

    showResult(match);
    setStatus('');
  } catch (err) {
    showStatus('Päring ebaõnnestus: ' + err.message, 'error');
  } finally {
    setLoading(false);
  }
});

function setLoading(isLoading) {
  button.disabled = isLoading;
  if (isLoading) {
    showStatus('Otsin...', 'loading');
  }
}

function showStatus(message, kind) {
  statusEl.textContent = message;
  statusEl.className = 'status' + (kind ? ' ' + kind : '');
}

function setStatus(message) {
  statusEl.textContent = message;
  statusEl.className = 'status';
}

function showResult(match) {
  const lat = match.l;
  const lon = match.b;

  document.getElementById('result-address').textContent = match.normaddress || match.input;
  document.getElementById('result-lat').textContent = lat.toFixed(6);
  document.getElementById('result-lon').textContent = lon.toFixed(6);
  document.getElementById('result-x').textContent = match.lestx?.toFixed(1) ?? '—';
  document.getElementById('result-y').textContent = match.lesty?.toFixed(1) ?? '—';

  const mapLink = document.getElementById('result-map-link');
  mapLink.href = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=18/${lat}/${lon}`;

  resultEl.hidden = false;
}
