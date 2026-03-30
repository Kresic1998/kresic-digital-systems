# Privatni pravni HTML

Ovde **nalepiš** gotov HTML (npr. iz eRecht24 exporta). Fajlovi `*.html` **nisu u gitu** (vidi `.gitignore`).

## Kako koristiš

1. Kopiraj šablon: u istom folderu napravi fajl **bez** `.example` u imenu:

   | Šablon (u gitu) | Tvoj fajl (lokalno, ne u gitu) |
   |-----------------|--------------------------------|
   | `datenschutz.de.html.example` | `datenschutz.de.html` |
   | `datenschutz.en.html.example` | `datenschutz.en.html` |
   | `impressum.de.html.example` | `impressum.de.html` |
   | `impressum.en.html.example` | `impressum.en.html` |

2. Otvori npr. `datenschutz.de.html` i zalepi HTML fragment (samo sadržaj unutar stranice — naslovi, paragrafi; stilovi: klasa `legal-html` se dodaje u kodu oko tvog HTML-a).

3. Restartuj `npm run dev` ako ne vidiš promenu odmah.

## Ponašanje

- Ako **postoji** neprazan `*.html` za trenutni jezik (DE/EN), stranica prikazuje **samo** taj HTML (+ header + link „nazad“).
- Ako fajl **nema** ili je prazan, koristi se **ugrađeni tekst** iz `dictionaries/de.json` i `en.json`.

## Produkcija (Vercel)

Fajlovi u `private-legal/` **ne idu** na GitHub, pa ih Vercel **ne vidi** pri deployu — u produkciji će biti fallback na rečnike, osim ako ručno dodaš iste fajlove u build (npr. drugačiji pipeline) ili držiš tekst u rečnicima.
