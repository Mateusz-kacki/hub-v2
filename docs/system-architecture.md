# System Architecture

## Cel systemu

System do zarządzania rozmieszczeniem sklepów na magazynie HUB Lublin.

System automatyzuje:
- import danych LP1 i LP2,
- łączenie danych po numerze sklepu,
- przydział sklepów do doków,
- przydział sklepów do alejek,
- wizualizację sklepów na realnym planie magazynu,
- monitorowanie obciążenia doków,
- dynamiczne zwalnianie alejek po wydaniu.

---

## Źródła danych

### LP1

LP1 zawiera:
- godziny przyjazdu wahadeł,
- sklepy przypisane do danej dostawy.

### LP2

LP2 zawiera:
- godziny wydań sklepów,
- ilości jednostek,
- ilości black / dolly,
- trasę LP.

---

## Główna logika

1. Import LP1 i LP2.
2. Parsowanie danych Excel.
3. Łączenie danych po numerze sklepu.
4. Filtrowanie sklepów według okna czasu.
5. Automatyczne przydzielanie sklepów do doków.
6. Automatyczne przydzielanie sklepów do alejek.
7. Kontrola capacity alejki.
8. Kontrola max 2 sklepów na alejkę.
9. Grupowanie sklepów według tras LP.
10. Unikanie konfliktów czasowych.
11. Wizualizacja na planie magazynu.
12. Automatyczne zwalnianie alejki po wydaniu.

---

## Okno czasowe sklepu

Sklep pojawia się:
```text
1 godzina przed arrival_time
```

Sklep znika:
```text
po departure_time
```

---

## Doki

System obsługuje:
- DOK 16
- DOK 17
- DOK 18

DOK 15:
- inbound only

Priorytet doków:

```text
16 → 17 → 18
```

---

## Alejki

Alejka:
- może obsługiwać wiele doków,
- posiada limit 2 sklepów,
- posiada limit 16 jednostek na sklep,
- może być współdzielona między dokami.

Przykład:

```python
{
  "id": "S16-8",
  "docks": [16, 17],
  "capacityUnits": 16,
  "maxStores": 2
}
```

---

## Frontend

Frontend:
- React
- Vite
- responsive warehouse overlay
- realny layout magazynu jako tło
- alejki nakładane na plan magazynu
- automatyczne odświeżanie planu

---

## Backend

Backend:
- FastAPI
- Python
- parser LP1
- parser LP2
- planner magazynowy
- layout API

---

## Baza danych

Aktualnie:
- dane przeliczane są z uploadu LP1 i LP2.

Docelowo:
- PostgreSQL
- historia planów,
- statusy realtime,
- ręczne zmiany operatora.
