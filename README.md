# Aadressiotsing

Minimaalne veebirakendus (MVP), mis otsib Eesti aadresse ja kuvab nende koordinaadid, kasutades Maa- ja Ruumiameti **aadressiandmete süsteemi (AKS)** geokodeerimisteenust.

Puhas HTML/CSS/JS — build-sammu ei ole, sobib otse GitHub Pagesi jaoks.

## Kuidas see töötab

1. Kasutaja sisestab aadressi ja vajutab "Otsi" (või Enter).
2. Rakendus saadab `POST` päringu AKS-i geokodeerija API-le:
   ```
   POST https://aks.geoportaal.ee/inaks-geocoder-api/api/plain
   Content-Type: application/json

   { "address": "Tartu mnt 1, Tallinn" }
   ```
3. Vastusest loetakse välja esimene (parim) vaste ja kuvatakse:
   - normaliseeritud aadress
   - WGS84 laius-/pikkuskraad (väljad `l` ja `b` vastuses — AKS kasutab need vastupidises tähenduses tavapärasest B/L-tähistusest: `l` on **laiuskraad**, `b` on **pikkuskraad**)
   - L-EST97 X/Y koordinaadid (`lestx`, `lesty`)
   - link OpenStreetMapile

Kui vastet ei leita, tuleb vastuses rida kvaliteediga `"EILEITUD"`.

## ⚠️ Oluline API kohta

See endpoint **ei ole ametlikult dokumenteeritud avalik API** — see on AKS-i enda veebirakenduse (geokodeerija.geoportaal.ee frontend) sisemine liides, mille leidsin brauseri võrguliikluse analüüsimisel. See:

- **Töötab hetkel ja lubab CORS-i** teiste domeenide pealt (testitud), seega töötab otse brauserist ka GitHub Pagesilt.
- **Võib muutuda või katkeda ette teatamata**, sest see pole ametlik lepinguline API.
- Kui vajad tootmiskeskkonda või SLA-d, uuri Maa- ja Ruumiameti ametlikke integratsioonivõimalusi:
  - AKS-i "In-AKS" komponent (valmis manustatav aadressiotsingu vidin): https://aks.geoportaal.ee/aks/inaks
  - Maa-ameti XGIS/avaandmete teenused ja WFS/WMS liidesed: https://geoportaal.maaamet.ee/
  - Pöördu vajadusel Maa- ja Ruumiameti poole ametliku API kasutuslepingu asjus.

Kui hakkad seda tootmises kasutama, kaalu:
- oma backend-proxy lisamist (peidab päringu logi, võimaldab rate limitingut, kaitseb muudatuste eest),
- ametliku dokumenteeritud liidese otsimist/küsimist Maa- ja Ruumiametilt.

## Kohalik käivitamine

Kuna rakendus teeb `fetch()` päringu, tuleb see avada läbi HTTP-serveri (mitte otse `file://`, sest brauser blokeerib mõnel juhul faili-URL-idelt tehtavaid päringuid).

Kõige lihtsam variant, kui arvutis on Python:

```bash
cd Aadressiotsing
python -m http.server 8000
```

Seejärel ava brauseris `http://localhost:8000/`.

Kui Pythonit ei ole, sobib ka mistahes muu staatiline server (nt VS Code laiendus "Live Server", `npx serve`, jne).

## GitHubi üleslaadimine

```bash
cd Aadressiotsing
git init
git add .
git commit -m "Aadressiotsingu MVP"
git branch -M main
git remote add origin https://github.com/<sinu-kasutajanimi>/<repo-nimi>.git
git push -u origin main
```

### GitHub Pages seadistamine

1. Mine oma GitHubi repos **Settings → Pages**.
2. Vali "Source": **Deploy from a branch**.
3. Vali haru **main** ja kaust **/ (root)**.
4. Salvesta — mõne minuti pärast on rakendus saadaval aadressil
   `https://<sinu-kasutajanimi>.github.io/<repo-nimi>/`.

## Failid

- `index.html` — struktuur ja vorm
- `style.css` — kujundus (kasutab projekti `NavyDisain.md` värve/fonte)
- `app.js` — päringu loogika ja tulemuse kuvamine
