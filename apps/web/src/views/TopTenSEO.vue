<template>
    <v-container fluid class="pa-0 list-page-container">
        <v-container fluid class="pa-0">
            <v-row>
                <v-col cols="12" class="text-center d-flex justify-center mt-10 mb-12">
                    <h1 class="titleLightBlue">Mijn top 10 SEO-toepassingen</h1>
                </v-col>
            </v-row>
        </v-container>

        <v-container fluid :class="smAndDown ? 'pa-0' : 'pa-4'">


            <v-card :class="smAndDown ? 'w-100 rounded-0' : ''">
                <v-card-text>
                    <v-list lines="three">
                        <v-list-subheader class="text-title-large text-primary">Top 10
                            SEO-toepassingen</v-list-subheader>

                        <v-list-item title="1. HTTPS & SSL-certificaat">
                            Veiligheid staat op nummer 1. Het is belangrijk dat de connectie tussen de browser en de
                            webserver is beveiligd en gevoelige informatie niet onderschept kan worden. Beveiligde
                            websites
                            geven ook meer vertrouwen en een SSL-certificaat bewijst dat jouw site de officiële website
                            is.
                        </v-list-item>

                        <v-list-item title="2. Content optimalisatie en zoekintentie">
                            Het is belangrijk dat de content op je website aansluit bij wat de gebruiker zoekt en ook
                            waarom
                            die dat zoekt (de intentie). Denk aan informatie verkrijgen, dingen vergelijken met elkaar,
                            iets
                            kopen. De content is sterk als het zoekwoorden bevat die relevant zijn en het liefst niet te
                            algemeen (long tail zoekwoorden). Hierdoor heb je minder concurrentie en kan iemand precies
                            vinden wat hij wil. Ook is het belangrijk dat je content actueel is, logisch is opgebouwd en
                            volledig is.
                        </v-list-item>

                        <v-list-item title="3. Relevante zoekwoorden in title tags en gebruik van metabeschrijvingen">
                            Title tags en metabeschrijvingen kunnen bezoekers bezoekers aantrekken of afstoten. Een
                            goede
                            pakkende en kloppende titel die niet te lang is en het belangrijkste zoekwoord vooraan heeft
                            staan, is slim om in te zetten. Je wil dat de titel wel overeenkomt met de pagina waar het
                            naar
                            leidt, dus geen onzin of clickbait. Voor de zoekmachine helpt de titel tag om te begrijpen
                            waar
                            pagina over gaat.
                            De metabeschrijving is een samenvatting van de content op die pagina en is belangrijk voor
                            het
                            klikgedrag. Hiermee is het voor bezoekers duidelijk wat ze kunnen lezen op die pagina en of
                            dat
                            is wat ze zoeken. Als zoekwoorden in je metabeschrijving matchen met de zoekopdracht, worden
                            deze dikgedrukt en zal dat sneller de aandacht van mensen trekken.
                        </v-list-item>

                        <v-list-item title="4. Snelheid van de website">
                            Vind ik een belangrijk kenmerk, omdat een snelle website het gemak van de gebruiker
                            verhoogt.
                            Een trage website is erg irritant en ik zou zelf sneller afhaken bij een trage website.
                        </v-list-item>


                        <v-list-item title="5. Mobiel-friendly en responsive design">
                            Tegenwoordig gebruiken mensen vaak hun mobiel om websites te benaderen (meer dan 60% van al
                            het
                            websiteverkeer komt van mobiele apparaten). Hierdoor is het belangrijk dat je website ook op
                            mobiele apparaten goed te gebruiken is en er goed uitziet. Je wil niet dat mensen afhaken,
                            omdat
                            de website niet goed werkt op een mobiel.

                        </v-list-item>

                        <v-list-item title="6. Betrouwbare informatie op je website">
                            Voor zoekmachines is betrouwbaarheid van je website erg belangrijk: het wil dat gebruikers
                            juiste en nuttige informatie kunnen verkrijgen tijdens zoeken om het vertrouwen van de
                            bezoeker
                            te behouden. Het is van belang dat de informatie op je website klopt en je geen
                            desinformatie
                            verspreidt of aannames doet. Het helpt hierbij om citaten van betrouwbare bronnen aan je
                            pagina
                            toe te voegen.

                        </v-list-item>

                        <v-list-item title="7. Regelmatig boeinde/aantrekkelijke content publiceren">
                            Het is belangrijk om content van hoge waarde te hebben op je website (relevant, betrouwbaar,
                            duidelijk, geschreven door een ervaringsdeskundige of iemand die echt kennis over het
                            onderwerp
                            heeft etc.). Google indexeert je website dan sneller en je zult hoger gerankt worden.
                            Daarbij is
                            het slim om je content boeiend en aantrekkelijk te maken. Mensen zullen eerder terugkeren
                            naar
                            je website als ze het interessant vonden wat ze hebben gelezen/gezien.
                            Door betere content te plaatsen, zul je ook eerder inkomende links verkrijgen, wat ook weer
                            goed
                            is voor de ranking.

                        </v-list-item>

                        <v-list-item title="8. Interne linkstructuur">
                            Een zoekmachine snapt beter welke structuur je website heeft als je een goede linkstructuur
                            hebt
                            in je website. Ook is het voor bezoekers belangrijk dat ze goed kunnen navigeren in jouw
                            website. Het is slim om vaker naar belangrijke items te linken op je site, zodat deze
                            makkelijk
                            te bereiken zijn. Het is daarnaast belangrijk dat alle pagina’s via een link op je website
                            te
                            benaderen zijn (geen loshangende pagina’s die alleen via een zoekmachine te vinden zijn)

                        </v-list-item>

                        <v-list-item title="9. Inkomende links en externe links">
                            Inkomende links zijn links die andere websites op hun website hebben staan en die naar jouw
                            website leiden. Deze zijn van extra waarde als die website relevant is en de inhoud bij jouw
                            content past. Hierbij telt kwaliteit meer dan kwantiteit. Het is belangrijk dat de links
                            natuurlijk verkregen zijn (niet ingekocht of naar elkaar linken om elkaar te helpen).
                            Ook het linken naar andere websites kan bijdragen aan een hogere ranking wanneer je naar
                            betrouwbare bronnen linkt. Hiermee toon je dat je content relevant is.

                        </v-list-item>

                        <v-list-item title="10. Toegankelijkheid">
                            Het is belangrijk dat iedereen je website kan gebruiken en begrijpen, ook bijvoorbeeld
                            slechtzienden (schermlezer) of mensen met een andere beperking (daardoor bijv. geen muis
                            kunnen
                            gebruiken, kleuren niet goed kunnen onderscheiden, moeite hebben met lezen).
                            Uiteraard moeten zoekmachines ook je website begrijpen, want die kunnen ook niet zien of
                            raden
                            welke hiërarchie of structuur je bedoelt met een pagina zonder duidelijke en goed toegepaste
                            semantische html.
                            Het helpt dus zowel mensen als zoekmachines om jouw website beter te begrijpen en te kunnen
                            gebruiken.

                        </v-list-item>
                    </v-list>

                    <v-list lines="three">
                        <v-list-subheader class="text-title-large text-primary">Toegepaste SEO op deze
                            website</v-list-subheader>
                        <v-list-item title="1. HTTPS & SSL-certificaat">
                            In onze webapplicatie is dit uiteraard onmisbaar en dit hebben we dan ook toegepast. De
                            webhosting die we hebben afgenomen van de hosting provider Antagonist heeft dit er
                            automatisch in zitten, waardoor onze webapplicatie direct voorzien is van een Let’s Encrypt
                            SSL-certificaat.
                        </v-list-item>
                        <v-list-item title="2. Relevante zoekwoorden in title tags en gebruik van meta-beschrijvingen">
                            Toegepast door titel tags maximaal 60 karakters te laten hebben (de rest wordt afgeknipt) en
                            het belangrijkste zoekwoord vooraan te zetten. De title tag beschrijft de inhoud van de
                            pagina exact. Ook heb ik de naam van de applicatie er steeds achter gezet. De titel tag is
                            uniek per pagina.
                            <br><br>
                            De metabeschrijving heb ik tussen de 120 en 160 karakters lang gehouden en is een
                            samenvatting van de content op die pagina. Het beschrijft steeds wat je kunt doen of vinden
                            op de desbetreffende pagina en bevat het hoofdonderwerp. Ook deze is uniek per pagina.

                        </v-list-item>
                        <v-list-item title="3. Mobiel-friendly en responsive design">
                            In onze webapplicatie hebben we rekening gehouden met het goed weergeven van alles op elk
                            apparaat. Hierdoor kunnen mensen gemakkelijk gebruikmaken van de site vanaf hun mobiel,
                            tablet, laptop of desktop. Het is belangrijk dat dit iedereen op elk apparaat gemakkelijk
                            bij alle functionaliteit kan komen en een fijne gebruikservaring heeft.

                        </v-list-item>
                        <v-list-item title="4. Interne linkstructuur">
                            In onze webapplicatie kunnen gebruikers overal snel en duidelijk naartoe navigeren. We
                            hebben aan de link zijkant navigatie functionaliteit die uitklapt zodra je er met je muis
                            overheen gaat en inklapt als je er weggaat. Op de mobiel kun je hem openen en sluiten met
                            een toggle knop.
                            <br><br>
                            Op elke pagina die je vanaf het dashboard kunt bereiken, hebben we een kruimelpad waarmee je
                            gemakkelijk terug kunt navigeren. Op de profielpagina hebben we ook een navigatie aan de
                            zijkant.
                            <br><br>
                            In de header kun je gemakkelijk naar de inlogpagina of homepagina navigeren als je niet bent
                            ingelogd en als je bent ingelogd, navigeer je zo gemakkelijk naar het dashboard en de
                            profielpagina.
                            <br><br>
                            Op de homepagina linken we naar de contactpagina van de VKB wat tevens een externe
                            betrouwbare link is en ook bijdraagt aan SEO.
                            <br><br>
                            Onze webapplicatie heeft een duidelijke hiërarchie. Je kunt graven bijvoorbeeld vinden
                            binnen de gekoppelde begraafplaats. Alle pagina’s zijn bereikbaat via een knop of link.

                        </v-list-item>
                        <v-list-item title="5. Toegankelijkheid">
                            Dit heb ik gedaan door h-tags juist toe te passen. We hadden eerst overal h2 tags voor de
                            titel gebruikt en dat heb ik veranderd naar h1, zodat de zoekmachine begrijpt dat dat het
                            hoofdonderwerp is.
                            <br><br>
                            Ook heb ik bij elk plaatje een alt-tekst neergezet, zodat de zoekmachine de afbeelding kan
                            begrijpen en schermlezers het voor kunnen lezen aan blinden of slechtzienden, aangezien zij
                            het niet kunnen lezen. Zoekmachines snappen de context dan ook beter en kunnen mensen
                            plaatjes van jouw website tonen in Google Afbeeldingen. Als een plaatje niet kan laden,
                            wordt de alt-tekst getoond, dus ook daarvoor is het belangrijk deze te hebben. Hierbij
                            beschrijf ik wat er op het plaatje te zien is.
                            <br><br>
                            Daarnaast heb ik een duidelijke linktekst gebruikt op de homepagina, zodat het ook voor
                            zoekmachines duidelijk is waar de link naartoe gaat en waar de pagina over gaat waar naartoe
                            gelinkt wordt. Schermlezers lezen de link los voor en daarom moet het ook duidelijk zijn
                            waar je naartoe gelinkt wordt.
                            <br><br>
                            Ook zijn aan alle formulieren labels toegevoegd. Schermlezers weten door de label waar het
                            invoerveld voor is.

                        </v-list-item>
                    </v-list>
                </v-card-text>
            </v-card>

        </v-container>
    </v-container>
</template>




<script setup>
import { useDisplay } from 'vuetify'

const { smAndDown } = useDisplay()
</script>

<style scoped>
:deep(.v-list-subheader__text, .v-list-item-title),
:deep(.v-list-item-title) {
    overflow: visible;
    text-overflow: clip;
    white-space: normal;
}

:deep(.v-list-subheader__text) {
    color: #0d475a;
}

:deep(.v-list-item-title) {
    font-size: 1.1rem;
    font-weight: 700;
    color: #ea5a0b;
}
</style>