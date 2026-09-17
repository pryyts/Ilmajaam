# Raudtee Disainisüsteem — v1.0

Karge, selge ja usaldusväärne visuaalne alus uute lehtede ja rakenduste arenduseks. Neli põhivärvi, teravad nurgad (radius 0), kindel struktuur.

---

## 1. Värvid

| Nimi | Hex | Kasutus |
|---|---|---|
| Navy 900 | `#0B1B33` | Bränd, pealkirjad, tumeteema alus |
| Navy 700 | `#16305A` | Päised, primaarne UI-taust |
| Navy 500 | `#2C4A7C` | Lingid, interaktiivsed elemendid |
| Navy 300 | `#7B93BD` | Tumeteema aktiivsed lingid |
| Gray 700 | `#4A5261` | Tekst, sekundaarne info |
| Gray 500 | `#6B7480` | Abitekst, sildid |
| Gray 300 | `#C6CBD3` | Rõhutatud piirjooned |
| Gray 100 | `#EFF1F4` | Alternatiivne taustapind |
| Off-white (bg) | `#F6F7FA` | Lehe põhitaust (pehmem kui puhas valge) |
| White | `#FFFFFF` | Kaardi- ja pindpinnad |
| **Aktsent** | `#17A9E0` | CTA-d, fookus, olulised märgid (elektriline hüatsindsinine) |
| Aktsent Dark | `#0F87B8` | Hover-seisund aktsendil |
| Aktsent Tint | `#DDF1FA` | Aktsendi taustatoon, valik/selection |

Semantilised olekuvärvid (staatus, mitte bränd):

| Olek | Hex |
|---|---|
| OK / õigeaegne | `#1E7A44` |
| Hoiatus / hilineb | `#A5680C` |
| Viga / tühistatud | `#C0392B` |

> Navy peaosad (hero, logo, sekundaarne nupp, näidisnavigatsioon) kasutavad **fikseeritud** navy-900 tausta + valget teksti alati — need on brändielemendid, mitte teemapõhised pinnad, ja ei muutu tume/hele režiimis.

---

## 2. Tüpograafia

| Roll | Font | Kaal | Kasutus |
|---|---|---|---|
| Display / pealkirjad | Archivo | 700–800 | H1–H3, tihe ja tehniline |
| Põhitekst | IBM Plex Sans | 400–600 | Lõiguteksti, vormid, nupud |
| Andmed / kood | IBM Plex Mono | 400–600 | Sildid, tabeliandmed, koodinäited, eyebrow-tekst |

Skaala:

- H1 — 40 / 44px, letter-spacing -0.01em
- H2 — 30 / 36px
- H3 — 22 / 28px
- Eyebrow — 12px, uppercase, letter-spacing 0.12em (Plex Mono 600)
- Body — 16 / 26px
- Small — 13px
- Data — 13px, tabular-nums (Plex Mono 500)

Google Fonts import:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@700;800&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap">
```

---

## 3. Ruum & alusvõrk

Baasühik: **8px**. Kõik vahed, polstrid ja marginaalid on selle kordsed.

- 4px · 0.5x
- 8px · 1x
- 16px · 2x
- 24px · 3x
- 40px · 5x
- 64px · 8x

Lehe konteiner: **12-veeruline alusvõrk**, 24px lõhedega.

---

## 4. Vorm

- **Radius: 0px alati** — teravad nurgad kõikjal, sh nupud, sisendid, kaardid.
- Eristumine käib äärise (`border`) ja pinnatooni abil, mitte varjuga.
- Kaardid/tabelid kasutavad 1px piirjooni võrgustikuna (background piirjoonevärvi, lahtrid pinnatoonis).

---

## 5. Komponendid

### Nupud
- `btn-primary` — täidis aktsent (`#17A9E0`), hover `#0F87B8`, tekst valge
- `btn-secondary` — täidis navy-900, tekst valge (fikseeritud, ei muutu teemas)
- `btn-outline` — läbipaistev, hallikas äär, hover tumeneb ääris
- `btn-ghost` — läbipaistev, ainult tekst
- disabled: opacity 0.4, cursor not-allowed
- `btn-sm` variant: 8px/16px padding, 12.5px font

### Vormid
- Sisendid: 1px piirjoon (`gray-300`), fookuses aktsendivärvi kontuur (`box-shadow` 1px aktsent)
- Silt: uppercase, 12.5px, semibold, `gray-700`
- Veaseisund: punane ääris (`#C0392B`) + selgitav abitekst
- Abitekst (hint): 12px, `text-faint`

### Kaardid
- Grid-paigutus, 1px vahed piirjoonevärvis, sisu 22px padding
- Sisu: pealkiri (16px/700), kirjeldus (13.5px), link nooltega (`→`), värvitud aktsendiga

### Sildid (badges)
- Formaat: uppercase, Plex Mono, 11px, `border: 1px solid currentColor`
- Variandid: ok (roheline), warn (kollakas-pruun), err (punane), info (navy/brand)

### Teated (alerts)
- Vasakul 3px värviline joon (border-left), taust `bg-alt`
- Variandid: info / ok / warn / err, ikoon + pealdis + kirjeldus

### Sakid & akordion
- Sakid: aktiivne märgitud 2px aktsendijoonega allservas, mitte täidisega
- Akordion (`<details>`): `+`/`–` märk paremal, Plex Mono

### Tabelid
- Päis: uppercase, Plex Mono, 11.5px, `text-faint`
- Andmelahtrid: `tabular-nums` numbritele, esimene veerg semibold
- Wrapperil `overflow-x: auto` laiade tabelite jaoks

### Navigatsioon
- Fikseeritud navy-900 taust, valge logo, lingid helehallis (`#C7D2E8`), aktiivne link valge + 2px aktsendijoon allservas

### Jalus
- `bg-alt` taust, `text-faint` tekst, madal kontrast, ülemine piirjoon

---

## 6. Täislehe näidised

**Sisuleht** — navigatsioon (fikseeritud navy) → hero (eyebrow + H1 max 16 tähemärki laiuselt + kirjeldus + 2 nuppu) → statistikarida (4 tulpa, suured Plex Mono numbrid + label) → jalus.

**Töölaud** — pealkiri + "uuendatud" info-silt → KPI-rida (4 plokki: label, suur number tabular-nums, delta roheline/punane) → andmetabel staatussildiga.

---

## 7. CSS muutujad (kopeeri otse projekti)

```css
:root {
  --navy-900: #0B1B33;
  --navy-700: #16305A;
  --navy-500: #2C4A7C;
  --gray-700: #4A5261;
  --gray-500: #6B7480;
  --gray-300: #C6CBD3;
  --gray-100: #EFF1F4;
  --bg:       #F6F7FA;   /* pehme off-white, mitte puhas valge */
  --white:    #FFFFFF;
  --accent:      #17A9E0;
  --accent-dark: #0F87B8;
  --accent-tint: #DDF1FA;

  /* Type */
  --font-display: "Archivo", sans-serif;      /* 700–800 */
  --font-body:    "IBM Plex Sans", sans-serif;
  --font-mono:    "IBM Plex Mono", monospace;

  /* Vorm */
  --radius: 0px;   /* alati terav nurk */
  --unit:   8px;   /* alusühik */
}
```

Tume teema puhul (`prefers-color-scheme: dark` või `[data-theme="dark"]`) muutuvad ainult pinna- ja tekstitokenid (`--bg`, `--surface`, `--text`, `--border` jms) — bränditokenid (`--brand-strong` / `--on-brand`, kasutusel navy-taustaga elementides) jäävad fikseerituks, et logo/hero/nupud ei kaotaks kontrasti.

---

*Täielik interaktiivne versioon koos live-näidistega: `style-guide.html`.*
