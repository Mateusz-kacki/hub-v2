# Planner Algorithm

## Cel

Automatyczne rozmieszczanie sklepów na magazynie HUB Lublin.

Planner odpowiada za:
- połączenie danych LP1 i LP2,
- wybór właściwego okna czasowego,
- przydział sklepu do doku,
- przydział sklepu do alejki,
- kontrolę pojemności,
- kontrolę konfliktów czasowych,
- dynamiczne zwalnianie alejek.

---

# Wejście

## LP1

LP1 zawiera:
- godzinę przyjazdu wahadła,
- numer sklepu,
- grupę sklepów przypisaną do danej dostawy.

## LP2

LP2 zawiera:
- godzinę wydania,
- numer sklepu,
- ilość jednostek,
- LP / trasę,
- dolly / black quantity.

---

# Proces planowania

## 1. Import danych

System importuje:
- LP1,
- LP2.

---

## 2. Parsowanie danych

Parser:
- czyta dane z Excela,
- pomija puste wiersze,
- obsługuje wiersze nagłówkowe,
- obsługuje scalone komórki,
- dziedziczy brakującą godzinę / LP z poprzedniego wiersza.

---

## 3. Łączenie danych

Dane są łączone po numerze sklepu.

Dzięki temu jeden rekord sklepu zawiera:
- godzinę przyjazdu,
- godzinę wydania,
- quantity,
- black quantity,
- LP,
- status.

---

## 4. Filtrowanie czasu

Planner pokazuje tylko sklepy aktywne w oknie:

```text
arrival_time - 1h <= teraz <= departure_time
```

Czyli:
- sklep pojawia się godzinę przed przyjazdem,
- sklep znika po wydaniu,
- alejka zostaje zwolniona po departure_time.

---

## 5. Obliczanie zajętości

Planner oblicza:
- total_quantity,
- black_quantity,
- blue_quantity,
- overflow_units.

Zasady:
- maksymalnie 16 jednostek na sklep,
- maksymalnie 2 sklepy na alejkę,
- jednostki powyżej 16 są oznaczane jako overflow.

Przykład:

```text
17 jednostek → +1
18 jednostek → +2
```

---

## 6. Grupowanie po LP

Planner grupuje sklepy według LP / trasy.

Zasady:
- sklepy z tej samej trasy LP mogą współdzielić alejkę,
- różne LP nie mogą współdzielić alejki, jeśli ich okna czasowe się nakładają,
- single-store routes mogą być obsługiwane osobno.

---

## 7. Wybór doku

Planner korzysta z priorytetu:

```text
16 → 17 → 18
```

DOK 15:
- inbound only,
- ignorowany przez planner dystrybucji.

Planner wybiera tylko doki dostępne dla danej alejki.

---

## 8. Wybór alejki

Planner:
- sprawdza alejki dostępne dla danego doku,
- sortuje alejki według priority,
- sprawdza wolne sloty,
- sprawdza capacityUnits,
- sprawdza maxStores,
- sprawdza konflikty LP,
- sprawdza konflikty czasowe.

---

## 9. Przydzielenie sklepu

Po znalezieniu wolnej alejki planner ustawia:
- assigned_dock,
- assigned_aisle_id,
- assigned_row,
- overflow_units,
- status = assigned.

---

## 10. Unikanie kolizji

Planner unika:
- przeciążenia doków,
- przekroczenia capacity,
- przekroczenia maxStores,
- mieszania różnych LP przy konflikcie czasowym,
- przypisywania sklepów do niedostępnych alejek.

---

## 11. Aktualizacja planu

Frontend aktualizuje:
- overlay magazynu,
- alejki,
- sklepy,
- quantity,
- overflow,
- statusy,
- statystyki doków.

---

## 12. Auto refresh

Frontend cyklicznie przelicza plan.

Dzięki temu:
- nowe sklepy pojawiają się automatycznie,
- wydane sklepy znikają,
- alejki są zwalniane,
- plan działa jak live dashboard magazynowy.

## 8. Usuwanie sklepu
Po godzinie wydania:
- sklep znika z gridu
- miejsce zostaje zwolnione
