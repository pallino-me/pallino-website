# Pallino · sito web

Sito statico, in inglese, di Pallino: [pallino.me](https://pallino.me). HTML, CSS e JavaScript senza dipendenze, build, tracker o risorse esterne.

- `index.html`: la pagina principale. I pulsanti *Open the web app* / *Open Pallino* portano alla PWA, [cloud.pallino.me](https://cloud.pallino.me).
- `docs/index.html`: la documentazione di base, su [pallino.me/docs](https://pallino.me/docs). Pagina a sé, con lo stile dentro.

## Dominio

Il sito è pubblicato da GitHub Actions (`.github/workflows/pages.yml`). Con questo tipo di deploy il dominio è quello scritto in Settings → Pages del repository (`pallino.me`), non quello del file `CNAME`, che resta per memoria.

## Anteprima locale

Dalla cartella del progetto:

```sh
python3 -m http.server 8080
```

Apri http://localhost:8080. Puoi anche aprire direttamente `index.html`.

## Testi (strings)

Il copy statico è in `index.html`; tutto ciò che scrive JavaScript (nomi e colori degli spazi, le 4 schermate dello showcase, le 6 della webapp, etichette ARIA, pulsante animazioni) sta in `strings.js` (`window.STRINGS`), caricato prima di `script.js`.

## Contenuti e asset originali

Tutti gli asset grafici provengono da `~/Repositories/pallino`:

- **Icona e mascotte Notte**: `assets/app-icon.svg`, `assets/favicon.svg`, `assets/favicon.ico`, `assets/apple-touch-icon.png`, `assets/icon-192.png` e `assets/icon-512.png` da `pallino-icon/`.
- **Wordmark**: `assets/wordmark.svg` ricavato dal tracciato DM Sans Bold `pallino_wordmark.xml` e dal componente `PallinoWordmark` (`#2E2014` con il pallino `#CBAE8B` sulla «i»).
- **Schermate reali**: `assets/screenshots/`, rifatte il 23 novembre 2026 con i dati demo (la demo dell’app più due spazi, qualche nota e un profilo inventato):
  - **Android** (1080 × 2424): Pallino 0.15.0 sull’emulatore Pixel 10a.
    - Showcase a 4 tab: `capture-<colore>.webp` (una per colore di spazio), `tasks.webp`, `notes.webp`, `focus.webp`.
    - Galleria (12 schermate): `task-detail`, `review`, `filters`, `search`, `note-writing`, `note-preview`, `note-menu`, `space-invite`, `space-people`, `api-keys`, `profile`, `welcome-offline`.
  - **Webapp** (pallino-web `927501e`, quella servita da Pallino Cloud 0.5.0), sezione *On every screen* a 6 tab:
    - `web-*.webp` (2200 × 1375): sul computer, finestra 1440 × 900.
    - `pwa-*.webp` (1080 × 2424): la PWA installata da Chrome sull’emulatore.
- I pulsanti Google Play sono per ora «Coming soon» e bloccati (`.is-locked`, senza link). Quando l’app sarà pubblicata, sostituire gli `<span class="… is-locked">` con `<a href="https://play.google.com/store/apps/details?id=it.gabrielegroppo.pallino">`.

## Interazioni e accessibilità

Quattro viste interattive nella sezione *Inside the app* (Capture, Tasks, Notes, Focus), sei nella sezione *On every screen* (computer e telefono insieme), galleria di 12 schermate di dettaglio, lightbox `<dialog>` per ingrandire qualsiasi schermata, task dimostrativa spuntabile, FAQ espandibili, animazioni allo scorrimento. Le tab supportano frecce, Home ed End; i controlli sono accessibili da tastiera. Le animazioni rispettano `prefers-reduced-motion` e possono essere messe in pausa dal pulsante in basso a destra.
