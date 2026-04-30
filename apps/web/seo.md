# SEO – Toegepaste optimalisaties

## 1. Title tag + meta description per pagina

Elke pagina heeft een unieke `<title>` en `<meta name="description">`. Deze worden automatisch bijgewerkt via een `afterEach`-hook in de router zodra de gebruiker navigeert.

De title tag is een van de sterkste signalen voor Google. Een duidelijke, unieke titel per pagina helpt zoekmachines begrijpen waar de pagina over gaat en wordt getoond in de zoekresultaten.

---

## 2. Heading-structuur (één `<h1>` per pagina)

Elke pagina heeft nu precies één `<h1>` als hoofdkop. Google gebruikt de `<h1>` als het belangrijkste inhoudssignaal van een pagina. Meerdere `<h1>`-tags of het gebruik van `<h2>` als hoofdkop verzwakt dit signaal.

---

## 3. Taal ingesteld op Nederlands

De HTML-tag heeft nu `lang="nl"`. Google en andere zoekmachines gebruiken dit attribuut om de taal van de pagina te bepalen, wat bijdraagt aan correcte indexering voor Nederlandstalige zoekopdrachten.

---

## 4. Lazy-loaded routes (snellere laadtijd)

Alle pagina's worden nu lazy-loaded via dynamische imports (`() => import(...)`). Vite bundelt elke pagina als een apart bestand. De browser laadt alleen de pagina die op dat moment bezocht wordt, wat de initiële laadtijd verkort.

---

## 5. Alt-teksten op alle afbeeldingen

Alle `v-img`-componenten hebben een beschrijvend `alt`-attribuut. Zoekmachines kunnen afbeeldingen niet zien, maar lezen wel de alt-tekst. Dit helpt Google de inhoud van afbeeldingen te begrijpen en verbetert ook de toegankelijkheid van de site.

&nbsp;

---

&nbsp;

# SEO – Mijn top 10 keuze

## 1. Content-kwaliteit en relevantie

De allerbelangrijkste factor. Zonder goede, unieke en relevante content helpt al het andere weinig. Google's hele algoritme is erop gericht het beste antwoord op een zoekopdracht te vinden.

---

## 2. Title tag per pagina

Het sterkste on-page signaal. Google gebruikt de titel om te bepalen waar een pagina over gaat, en hij wordt direct getoond in de zoekresultaten.

---

## 3. Mobielvriendelijk / responsive design

Google gebruikt mobile-first indexing: de mobiele versie van je site bepaalt je ranking. Een niet-responsive site valt direct hard terug in de resultaten.

---

## 4. Laadsnelheid (Core Web Vitals)

Bevestigde rankingfactor sinds 2021. LCP, CLS en INP worden gemeten. Trage sites verliezen niet alleen rankings, maar ook bezoekers.

---

## 5. HTTPS (SSL-certificaat)

Bevestigde rankingfactor. Zonder HTTPS waarschuwt Chrome bezoekers, wat de bounce rate omhoog schiet.

---

## 6. Heading-structuur (één `<h1>` per pagina)

Sterk inhoudssignaal. Google gebruikt headings om de hiërarchie en het hoofdonderwerp van de pagina te begrijpen.

---

## 7. Meta description per pagina

Geen directe rankingfactor, maar beïnvloedt de click-through rate (CTR) sterk — en hoge CTR's verhogen indirect je ranking.

---

## 8. Alt-teksten op afbeeldingen

Belangrijk voor Google Afbeeldingen-zoekresultaten en voor toegankelijkheid. Levert extra organisch verkeer op via image search.

---

## 9. Semantische HTML5-structuur

Helpt Google de structuur van de pagina te begrijpen (waar is het menu, wat is hoofdinhoud, wat is footer). Indirecte maar consistente winst.

---

## 10. Taalinstelling (lang-attribuut)

Klein maar belangrijk: zorgt dat de site verschijnt bij Nederlandstalige zoekopdrachten en niet verkeerd wordt geclassificeerd. Eenvoudig toe te passen, lage impact maar wel een netjes detail.
