# API

## GET /

### Description

Sprawdza czy backend działa.

### Response

```json
{
  "status": "OK",
  "message": "Warehouse Planner backend is running"
}
```

---

## GET /layout

### Description

Zwraca layout magazynu:
- alejki,
- przypisane doki,
- pozycje frontendowe,
- capacity,
- limity sklepów,
- realistyczne pozycjonowanie overlayu.

### Response

```json
{
  "aisles": [
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
  ]
}
```

---

## POST /upload/lp1

### Description

Upload pliku LP1 (przyjazdy / wahadła).

System:
- parsuje arrival_time,
- przypisuje sklepy do dostaw,
- przygotowuje dane dla planner'a.

### Response

```json
{
  "filename": "LP1.xlsx",

  "rows": 120,

  "arrivalsCount": 100,

  "arrivals": [
    {
      "arrivalTime": "08:00",

      "storeNumber": "1234"
    }
  ]
}
```

---

## POST /upload/lp2

### Description

Upload pliku LP2 (wydania sklepów).

System:
- parsuje departure_time,
- parsuje quantity,
- parsuje LP / trasę,
- obsługuje scalone komórki,
- obsługuje dziedziczenie LP i departure_time.

### Response

```json
{
  "filename": "LP2.xlsx",

  "rows": 150,

  "storesCount": 120,

  "stores": [
    {
      "departureTime": "12:00",

      "storeNumber": "1234",

      "blackQuantity": 2,

      "totalQuantity": 10,

      "notes": "",

      "lp": "LP2"
    }
  ]
}
```

---

## POST /upload/day

### Description

Upload LP1 i LP2 jednocześnie.

System:
- łączy dane,
- filtruje aktywne sklepy,
- przydziela doki,
- przydziela alejki,
- sprawdza capacity,
- sprawdza maxStores,
- sprawdza konflikty LP,
- sprawdza konflikty czasowe,
- przypisuje slot sklepu.

### Response

```json
{
  "lp1Filename": "LP1.xlsx",

  "lp2Filename": "LP2.xlsx",

  "tasksCount": 120,

  "tasks": [
    {
      "storeNumber": "1234",

      "arrivalTime": "08:00",

      "departureTime": "12:00",

      "lp": "LP2",

      "totalQuantity": 18,

      "blackQuantity": 2,

      "blueQuantity": 16,

      "overflowUnits": 2,

      "assignedDock": 16,

      "assignedAisleId": "S16-8",

      "assignedRow": 0,

      "status": "assigned"
    }
  ]
}
```

---

# Time Visibility Rules

Sklep pojawia się:

```text
1 godzina przed arrival_time
```

Sklep znika:

```text
po departure_time
```

Planner:
- dynamicznie aktualizuje widoczność sklepów,
- dynamicznie zwalnia alejki.

---

# Store Slot Model

Każda alejka posiada:
- slot sklepu 1,
- slot sklepu 2.

Każdy sklep:
- zajmuje jeden slot,
- może mieć maksymalnie 16 jednostek,
- może generować overflow.

Przykład renderu:

```text
| S16-8 | [########....] | sklep 1 |
| S16-8 | [######......] | sklep 2 |
```

Overflow:

```text
17 jednostek → +1
18 jednostek → +2
```

---

# Store Status

Możliwe statusy:
- waiting
- assigned
- ready
- departed
