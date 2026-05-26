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
- limity sklepów.

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
- przydziela doki,
- przydziela alejki,
- sprawdza capacity,
- sprawdza maxStores,
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

      "totalQuantity": 10,

      "blackQuantity": 2,

      "blueQuantity": 8,

      "assignedDock": 16,

      "assignedAisleId": "S16-8",

      "assignedRow": 0,

      "status": "assigned"
    }
  ]
}
```

---

# Store Slot Model

Każda alejka posiada:
- slot sklepu 1
- slot sklepu 2

Każdy sklep:
- zajmuje jeden slot,
- może mieć maksymalnie 16 jednostek.

Przykład renderu:

```text
| S16-8 | [########....] | sklep 1 |
| S16-8 | [######......] | sklep 2 |
```

---

# Store Status

Możliwe statusy:
- waiting
- assigned
- ready
- departed
