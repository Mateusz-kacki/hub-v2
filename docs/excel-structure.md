# Excel Structure

## LP1 — przyjazdy / wahadła

Plik LP1 zawiera godziny przyjazdu sklepów na magazyn.

Dane używane przez system:
- numer sklepu,
- godzina przyjazdu wahadła,
- grupa sklepów przypisana do tej samej dostawy.

System obsługuje:
- sklepy przypisane do jednej godziny przyjazdu,
- nagłówki tras,
- puste wiersze,
- dane pomocnicze.

LP1 służy do określenia:
- kiedy sklep może pojawić się na planie,
- kiedy może zostać przypisany do alejki.

---

## LP2 — wydania

Plik LP2 zawiera godziny wydań sklepów oraz ilości.

Aktualnie używane kolumny:
- B — godzina wydania,
- C — numer sklepu,
- H — dolly / czarne,
- J — ilość całkowita,
- K — uwagi,
- R — LP / numer karty / trasa.

System obsługuje:
- puste wiersze,
- wiersze nagłówkowe,
- scalone komórki,
- dziedziczenie godziny wydania z poprzedniego wiersza,
- dziedziczenie LP z poprzedniego wiersza.

---

## Łączenie danych

System łączy LP1 i LP2 po numerze sklepu.

Dzięki temu dla każdego sklepu powstaje rekord zawierający:
- godzinę przyjazdu,
- godzinę wydania,
- ilość całkowitą,
- ilość black / dolly,
- LP / trasę,
- status na magazynie,
- przypisany dok,
- przypisaną alejkę.

---

## Okno czasowe

Sklep pojawia się na planie:

```text
1 godzina przed arrival_time
```

Sklep znika z planu:

```text
po departure_time
```
