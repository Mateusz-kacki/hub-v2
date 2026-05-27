# Warehouse Layout

## Cel layoutu

Layout odwzorowuje:
- rzeczywisty układ magazynu,
- doki dystrybucyjne,
- alejki magazynowe,
- sektory magazynu,
- rzeczywiste pozycje alejek względem planu magazynu.

Frontend renderuje layout dynamicznie na podstawie:

```text
backend/layout.py
```

---

# Doki

System obsługuje:
- DOK 16
- DOK 17
- DOK 18

DOK 15:
- inbound only
- ignorowany przez planner dystrybucji

---

# Priorytet doków

Priorytet doków:

```text
16 → 17 → 18
```

Planner:
1. najpierw próbuje DOK 16
2. potem DOK 17
3. potem DOK 18

---

# Alejki magazynowe

Planner korzysta wyłącznie z:
- podłużnych żółtych alejek z oznaczeniem X.

Inne sektory magazynu:
- nie biorą udziału w dystrybucji sklepów,
- są ignorowane przez planner.

---

# Model alejki

Każda alejka:
- może obsługiwać wiele doków,
- posiada limit pojemności,
- posiada limit sklepów,
- może obsłużyć maksymalnie 2 sklepy,
- każdy sklep może zajmować maksymalnie 16 jednostek,
- może obsługiwać overflow.

Przykład modelu:

```python
{
  "id": "S16-8",

  "docks": [16, 17],

  "capacityUnits": 16,

  "maxStores": 2,

  "x": 45,
  "y": 20,

  "width": 10,
  "height": 30,

  "priority": 1
}
```

---

# Wizualizacja alejki

Frontend renderuje alejkę jako dwa sloty sklepowe:

```text
| S16-8 | [########....] | sklep 1 |
| S16-8 | [######......] | sklep 2 |
```

Czyli:
- maksymalnie 2 sklepy,
- maksymalnie 16 jednostek na sklep.

Overflow:

```text
17 jednostek → +1
18 jednostek → +2
```

---

# Shared Aisles

Niektóre alejki mogą być współdzielone między dokami.

Przykład:

```text
S16-8
→ DOK 16
→ DOK 17
```

Planner wybiera:
- najlepszy możliwy dok,
- najmniej przeciążony dok,
- najbliższą dostępną alejkę.

---

# Capacity Rules

Jedna alejka:
- maksymalnie 2 sklepy,
- maksymalnie 16 jednostek na sklep.

Planner pilnuje:
- capacityUnits,
- maxStores,
- konfliktów czasowych,
- konfliktów tras LP.

---

# Frontend Rendering

Frontend renderuje:
- alejki,
- sklepy,
- quantity,
- overflow,
- statusy,
- obciążenie doków,
- realistyczny overlay magazynu.

Pozycjonowanie opiera się o:
- x
- y
- width
- height

Overlay:
- automatycznie skaluje się do ekranu,
- zachowuje proporcje magazynu,
- wspiera responsive layout.

---

# Dynamic Layout

Layout jest:
- dynamiczny,
- renderowany z API,
- możliwy do edycji bez zmian frontendowych,
- automatycznie odświeżany.

Frontend pobiera layout z:

```text
GET /layout
```

---

# Live Visibility

Sklepy:
- pojawiają się godzinę przed arrival_time,
- znikają po departure_time.

Planner:
- dynamicznie zwalnia alejki,
- dynamicznie aktualizuje widoczność sklepów.

---

# Future Improvements

Planowane:
- realistyczne odwzorowanie całego magazynu,
- zoom layoutu,
- drag & drop sklepów,
- ręczne korekty operatora,
- alerty przeciążenia,
- monitoring realtime,
- operator dashboard.
