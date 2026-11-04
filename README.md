# Pallino · sito web

Single page statica, in inglese, per l’app Android Pallino. HTML, CSS e JavaScript senza dipendenze, build, tracker o risorse esterne.

## Anteprima locale

Dalla cartella del progetto:

```sh
python3 -m http.server 8080
```

Apri http://localhost:8080. Puoi anche aprire direttamente `index.html`.

## Testi (strings)

Il copy statico è in `index.html`; tutto ciò che scrive JavaScript (nomi e colori degli spazi, le 4 schermate dello showcase, etichette ARIA, pulsante animazioni) sta in `strings.js` (`window.STRINGS`), caricato prima di `script.js`.

## Contenuti e asset originali

Tutti gli asset grafici provengono da `~/Repositories/pallino`:

- **Icona e mascotte Notte**: `assets/app-icon.svg`, `assets/favicon.svg`, `assets/favicon.ico`, `assets/apple-touch-icon.png`, `assets/icon-192.png` e `assets/icon-512.png` da `pallino-icon/`.
- **Wordmark**: `assets/wordmark.svg` ricavato dal tracciato DM Sans Bold `pallino_wordmark.xml` e dal componente `PallinoWordmark` (`#2E2014` con il pallino `#CBAE8B` sulla «i»).
- **Schermate reali**: `assets/screenshots/` contiene le schermate reali (1080 × 2400, e 1080 × 2424 per le più recenti) da `docs/preview/`:
  - Showcase interattivo a 4 tab: `capture.webp` (Cattura), `tasks.webp` (Task), `notes.webp` (Note), `focus.webp` (Focus).
  - Galleria di dettaglio (8 schermate): `task-detail.webp`, `filters.webp`, `search.webp`, `welcome-offline.webp`, `note-writing.webp`, `note-preview.webp`, `review.webp`, `profile.webp`.
- I pulsanti Google Play sono per ora «Coming soon» e bloccati (`.is-locked`, senza link). Quando l’app sarà pubblicata, sostituire gli `<span class="… is-locked">` con `<a href="https://play.google.com/store/apps/details?id=it.gabrielegroppo.pallino">`.

## Interazioni e accessibilità

Quattro viste interattive nella sezione *Dentro l’app* (Cattura, Task, Note, Focus), galleria di 4 schermate di dettaglio, lightbox `<dialog>` per ingrandire qualsiasi schermata a 1080 × 2400, task dimostrativa spuntabile, FAQ espandibili, animazioni allo scorrimento. Le tab supportano frecce, Home ed End; i controlli sono accessibili da tastiera. Le animazioni rispettano `prefers-reduced-motion` e possono essere messe in pausa dal pulsante in basso a destra.
