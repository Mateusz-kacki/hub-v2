# Excel Structure

## LP1 — przyjazdy / wahadła

Plik LP1 zawiera godziny przyjazdu sklepów na magazyn.

Dane używane przez system:
- numer sklepu
- godzina przyjazdu
- ewentualne dane pomocnicze

## LP2 — wydania

Plik LP2 zawiera godziny wydań sklepów oraz ilości.

Aktualnie używane kolumny:
- B — godzina wydania
- C — numer sklepu
- H — dolly / czarne
- J — ilość całkowita
- K — uwagi
- R — LP / numer karty

## Łączenie danych

System będzie łączył LP1 i LP2 po numerze sklepu.

Dzięki temu dla każdego sklepu będziemy mieć:
- godzinę przyjazdu,
- godzinę wydania,
- ilość,
- LP,
- status na magazynie.
