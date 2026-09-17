# Ilmajaam

Üheleheline veebirakendus (MVP): sisesta Eesti aadress, saad selle koha praeguse ilma (temperatuur, tuule suund/tugevus, sademed) ja asukoha Leaflet-kaardil.

Puhas HTML/CSS/JS — build-sammu ei ole, sobib otse GitHub Pagesi jaoks. Kujundust ei ole hetkel tehtud (MVP).

## Kuidas see töötab

1. Kasutaja sisestab aadressi ja vajutab "Otsi".
2. Rakendus saadab `POST` päringu Maa- ja Ruumiameti **aadressiandmete süsteemi (AKS)** geokodeerijale:
   ```
   POST https://aks.geoportaal.ee/inaks-geocoder-api/api/plain
   Content-Type: application/json

   { "address": "Tartu mnt 1, Tallinn" }
   ```
   Vastusest võetakse esimene (parim) vaste. Koordinaadid on väljadel `l` (laiuskraad) ja `b` (pikkuskraad) — AKS kasutab neid tähti vastupidises tähenduses tavapärasest B/L-tähistusest, kontrollitud tegelike väärtuste põhjal. Kui vastet ei leita, on vastuses `"quality": "EILEITUD"`.
3. Saadud koordinaatidega küsitakse **Open-Meteo** käest praegust ilma:
   ```
   GET https://api.open-meteo.com/v1/forecast
     ?latitude=<lat>&longitude=<lon>
     &current=temperature_2m,precipitation,wind_speed_10m,wind_direction_10m
     &wind_speed_unit=ms&timezone=auto
   ```
4. Tulemus kuvatakse:
   - normaliseeritud aadress
   - temperatuur (°C)
   - tuule kiirus (m/s) ja suund (ilmakaar + kraadid)
   - sademed (mm)
   - asukoht Leaflet-kaardil OpenStreetMapi kaartidega, koos markeri ja hüpikaknaga

## ⚠️ Oluline API kohta

AKS-i geokodeerimise endpoint **ei ole ametlikult dokumenteeritud avalik API** — see on AKS-i enda veebirakenduse sisemine liides, mille leidsin brauseri võrguliikluse analüüsimisel. See:

- **Töötab hetkel ja lubab CORS-i** teiste domeenide pealt (testitud), seega töötab otse brauserist ka GitHub Pagesilt.
- **Võib muutuda või katkeda ette teatamata**, sest see pole ametlik lepinguline API.
- Kui vajad tootmiskeskkonda või SLA-d, uuri Maa- ja Ruumiameti ametlikke integratsioonivõimalusi:
  - AKS-i "In-AKS" komponent (valmis manustatav aadressiotsingu vidin): https://aks.geoportaal.ee/aks/inaks
  - Maa-ameti XGIS/avaandmete teenused ja WFS/WMS liidesed: https://geoportaal.maaamet.ee/
  - Pöördu vajadusel Maa- ja Ruumiameti poole ametliku API kasutuslepingu asjus.

Open-Meteo (https://open-meteo.com/) on avalik, dokumenteeritud ja CORS-iga API, mis on tasuta mitteäriliseks kasutuseks.

Kui hakkad seda tootmises kasutama, kaalu:
- oma backend-proxy lisamist (peidab päringu logi, võimaldab rate limitingut, kaitseb AKS-i liidese muudatuste eest),
- ametliku dokumenteeritud AKS-i liidese otsimist/küsimist Maa- ja Ruumiametilt.

## Kohalik käivitamine

Kuna rakendus teeb `fetch()` päringuid, tuleb see avada läbi HTTP-serveri (mitte otse `file://`, sest brauser blokeerib faili-URL-idelt tehtavaid päringuid).

Kõige lihtsam variant, kui arvutis on Python:

```bash
python -m http.server 8000
```

Seejärel ava brauseris `http://localhost:8000/`.

Kui Pythonit ei ole, sobib ka mistahes muu staatiline server (nt VS Code laiendus "Live Server", `npx serve`, jne).

## GitHubi üleslaadimine

```bash
git remote add origin https://github.com/<sinu-kasutajanimi>/<repo-nimi>.git
git branch -M main
git push -u origin main
```

### GitHub Pages seadistamine

1. Mine oma GitHubi repos **Settings → Pages**.
2. Vali "Source": **Deploy from a branch**.
3. Vali haru **main** ja kaust **/ (root)**.
4. Salvesta — mõne minuti pärast on rakendus saadaval aadressil
   `https://<sinu-kasutajanimi>.github.io/<repo-nimi>/`.

## Failid

- `index.html` — struktuur, vorm ja Leaflet-kaardi konteiner
- `style.css` — minimaalne (ainult kaardi kõrgus), kujundust pole veel tehtud
- `app.js` — geokodeerimine, ilmapäring ja kaardi uuendamine
