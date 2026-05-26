# Data Model

## WarehouseLayout

Stały układ magazynu.

Zawiera:
- background planu magazynu
- lista doków
- lista alejek magazynowych

Przykład:

```python
{
  "docks": [],
  "aisles": []
}
```

---

## Dock

Dok załadunkowy.

Pola:
- dockNumber
- name
- priority

Przykład:

```python
{
  "dockNumber": 16,
  "name": "DOK 16",
  "priority": 1
}
```

Planner obsługuje:
- DOK 16
- DOK 17
- DOK 18

DOK 15:
- inbound only
- ignorowany przez planner dystrybucji

Priorytet doków:

```text
16 → 17 → 18
```

---

## Aisle

Alejka magazynowa.

Alejka:
- może obsługiwać wiele doków,
- posiada limit pojemności,
- posiada limit sklepów.

Planner korzysta wyłącznie z:
- podłużnych żółtych alejek magazynowych.

Każda alejka może obsłużyć:
- maksymalnie 2 sklepy,
- maksymalnie 16 jednostek na sklep.

Struktura renderu:

```text
| S16-8 | [########....] | sklep 1 |
| S16-8 | [######......] | sklep 2 |
```

Pola:
- id
- docks
- capacityUnits
- maxStores
- x
- y
- width
- height
- priority

Przykład:

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

# Capacity Rules

Jedna alejka:
- maksymalnie 2 sklepy,
- maksymalnie 16 jednostek na sklep.

Planner pilnuje:
- capacityUnits,
- maxStores.

---

# Shared Aisles

Niektóre alejki mogą być współdzielone między dokami.

Przykład:

```text
S16-8
→ DOK 16
→ DOK 17
```

---

## StoreTask

Sklep z danego dnia.

Pola:
- storeNumber
- arrivalTime
- departureTime
- lp
- totalQuantity
- blackQuantity
- blueQuantity
- assignedDock
- assignedAisleId
- assignedRow
- status

Przykład:

```python
{
  "storeNumber": "1234",

  "arrivalTime": "08:00",
  "departureTime": "12:00",

  "lp": "LP2",

  "totalQuantity": 10,
  "blackQuantity": 2,
  "blueQuantity": 8,

  "assignedDock": 16,

  "assignedAisleId": "S16-8",

  "assignedRow": 0,

  "status": "assigned"
}
```

---

## Status sklepu

Możliwe statusy:
- waiting
- assigned
- ready
- departed

---

# Planner

Planner:
- przydziela sklepy do doków,
- przydziela sklepy do alejek,
- pilnuje capacityUnits,
- pilnuje maxStores,
- unika przeciążenia doków,
- balansuje ruch,
- obsługuje współdzielone alejki.

---

# Frontend Layout

Frontend renderuje:
- alejki magazynowe,
- sklepy,
- quantity,
- statusy,
- obciążenie doków.

Każda alejka renderowana jest jako:

```text
| ID ALEJKI | wykorzystanie jednostek | sklep |
| ID ALEJKI | wykorzystanie jednostek | sklep |
```

Czyli:
- maksymalnie 2 sklepy,
- maksymalnie 16 jednostek na sklep.
