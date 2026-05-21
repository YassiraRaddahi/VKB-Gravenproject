# Stijl- & componentengids

Korte gids voor wie nieuw is in deze frontend. Twee dingen om te kennen: de **stijlbibliotheek** (kleuren, typografie, en andere ontwerpwaardes) en de **componentenbibliotheek** (herbruikbare Vue-bouwstenen). Samen zorgen ze ervoor dat de app een consistente huisstijl heeft zonder dat je die elke keer opnieuw hoeft te bouwen.

---

## 1. Stijlbibliotheek

Locatie: `src/assets/css/`

### `tokens.css` — de bron van waarheid

Bevat *design tokens*: de kleinste herbruikbare ontwerpwaardes. Geen layout, geen component-styling — alleen de ruwe waardes. Je vindt er:

- **Kleuren** uit de huisstijl (`--color-darkBlue`, `--color-orange`, `--color-lightBlue`, …).
- **Semantische aliassen** die naar de huisstijlkleuren wijzen (`--color-text`, `--color-link`, `--color-bg`).
- **Typografie** (font-families, font-weights, font-sizes, line-heights).
- **Element-specifieke tokens** (bv. de dikte van de titel-onderstreping).

Alle tokens staan op `:root`, dus ze zijn overal in de app beschikbaar zonder import.

### `main.css` — globale regels & utility-classes

Consumeert de tokens en biedt herbruikbare classes (titel met onderstreping, link-decoratie, page-container, etc.). Hier vind je dingen die je rechtstreeks op een element kunt zetten via `class="..."`.

### Hoe gebruik je het in een view?

Drie patronen, van meest naar minst gebruikt:

**A. Een bestaande utility-class plakken**

```vue
<h1 class="title underlineOrange">Onze begraafplaatsen</h1>
<a href="/contact" class="anchor-decoration">Contact</a>
```

Pak deze als de class al bestaat in `main.css`. Geen extra werk nodig.

**B. CSS-variabele in een `<style>`-blok**

```vue
<style scoped>
.card {
  background-color: var(--color-lightBlue);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: var(--font-size-body);
}
</style>
```

Geen import nodig — tokens zijn globaal beschikbaar. Gebruik dit voor styling die specifiek is voor één component.

**C. Inline override van een token**

```vue
<span class="title" :style="{ '--title-underline-thickness': '12pt' }">
  Actieve tab
</span>
```

Handig voor dynamische waardes per instance.

### Wat doe je **niet**?

- Geen hardcoded hex-waardes (`#0d475a`) in views of components — gebruik altijd een token.
- Geen nieuwe kleur "spontaan" toevoegen — eerst als token definiëren in `tokens.css`, dan consumeren.

---

## 2. Componentenbibliotheek

Locatie: `src/components/`

- `ui/` → herbruikbare UI-bouwstenen (knoppen, kaarten, inputs, …).
- `layout/` → app-shell (header, footer, navigatie).
- *Feature-mappen* → componenten die maar in één feature zinvol zijn.

Voor een actueel overzicht: kijk in de map zelf. De inhoud groeit mee met de app.

### Een component gebruiken

Importeer en plaats:

```vue
<script setup>
import SomeComponent from '@/components/ui/SomeComponent.vue'
</script>

<template>
  <SomeComponent>Inhoud</SomeComponent>
</template>
```

### Aanpassen werkt via **props**

Componenten zijn gebouwd om herbruikbaar te zijn. Je past hun gedrag of uiterlijk aan door **props** mee te geven — *niet* door het component zelf te wijzigen voor één specifiek gebruik.

Een prop is een waarde die het component van buitenaf ontvangt. Voorbeelden van wat een prop kan zijn:

- Een **variant** (welke stijl of kleur):
  ```vue
  <SomeButton kind="darkOrange">Verwijderen</SomeButton>
  ```
- Een **inhoudswaarde** (label, titel, count):
  ```vue
  <SomeCard title="Welkom" :count="3" />
  ```
- Een **boolean-toggle** (aan/uit-gedrag):
  ```vue
  <SomeCard embedded fluid>…</SomeCard>
  ```
- **Route- of event-informatie**, doorgegeven aan een onderliggend element.

> **Tip:** zet een `:` voor de prop-naam zodra de waarde géén platte string is (number, boolean, object, expressie). Zonder `:` wordt de waarde altijd als string doorgegeven — `count="3"` is de tekst `"3"`, `:count="3"` is het getal `3`.

### Welke props accepteert een component?

Open het component en zoek `defineProps({ ... })` bovenin het `<script setup>`-blok. Daar staan alle props met hun type en default-waarde.

Voorbeeld:

```js
const props = defineProps({
  bgColor:  { type: String,  default: 'darkBlue' },
  padding:  { type: String,  default: 'pa-8' },
  embedded: { type: Boolean, default: false },
})
```

Daarmee weet je: deze component kun je aanroepen met `bgColor`, `padding`, en `embedded`, en welke waardes standaard worden gebruikt als je niets meegeeft.

### Inhoud via `<slot>`

Veel componenten accepteren ook inhoud tussen openings- en sluitingstag. Dat heet een *slot*:

```vue
<SomeCard bgColor="darkBlue">
  <h2>Inloggen</h2>
  <p>Vul je gegevens in.</p>
</SomeCard>
```

Alles tussen de tags wordt op de plek van `<slot />` binnen het component geplaatst. Zo blijft het component generiek terwijl de inhoud per gebruik anders is.

### Wanneer maak je een nieuw component?

- Hetzelfde stukje markup komt op ≥ 2 plekken terug → component.
- Een stukje heeft eigen state of complexe logica → component.
- Anders: laat het gewoon in de view staan.

Base-UI (herbruikbaar door de hele app) zet je in `src/components/ui/` en geef je een naam met prefix `App…` (bv. `AppCard`, `AppDialog`).

---

## 3. Verband met Vuetify

Vuetify is de UI-library onder de motorkap. Zijn theme (zie `main.js`) gebruikt **dezelfde kleurnamen** als de tokens (`darkBlue`, `darkOrange`, `lightBlue`, …). Dat betekent dat je in twee contexten met dezelfde naamgeving werkt:

| Voor | Gebruik |
|---|---|
| Eigen HTML-elementen / Vue-templates | CSS-variabele (`var(--color-darkBlue)`) of een utility-class |
| Vuetify-componenten (`v-btn`, `v-card`, …) | Vuetify props (`color="darkBlue"`, `class="bg-darkBlue text-white"`) |

Vermijd het mengen van beide stijlen voor hetzelfde element.

---

## 4. Snelle vuistregels

- **Kleur nodig** → token uit `tokens.css`, geen hex.
- **Bestaande UI hergebruiken** → kijk eerst in `src/components/ui/`.
- **Component aanpassen** → bekijk de `defineProps` en gebruik die props.
- **Nieuwe variant nodig** die niet via een bestaande prop kan → het component uitbreiden met een nieuwe prop, niet rond het component heen gaan stylen.
- **Hardcoded hex tegenkomen** → vervangen door de bijbehorende token.
