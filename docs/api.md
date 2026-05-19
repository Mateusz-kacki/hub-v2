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

## POST /upload/lp1

### Description
Upload pliku LP1 (przyjazdy / wahadła).

### Response

```json
{
  "filename": "LP1.xlsx",
  "rows": 120,
  "arrivals_count": 100,
  "arrivals": [
    {
      "arrival_time": "08:00",
      "store_number": "1234"
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
  "stores_count": 120,
  "stores": [
    {
      "departure_time": "12:00",
      "store_number": "1234",
      "black_quantity": 2,
      "total_quantity": 10,
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
- przydziela gridy,
- przydziela wiersze.

### Response

```json
{
  "lp1_filename": "LP1.xlsx",
  "lp2_filename": "LP2.xlsx",
  "tasks_count": 120,
  "tasks": [
    {
      "store_number": "1234",
      "arrival_time": "08:00",
      "departure_time": "12:00",
      "lp": "LP2",
      "total_quantity": 10,
      "black_quantity": 2,
      "blue_quantity": 8,
      "assigned_dock": 16,
      "assigned_grid_id": "dock16-A",
      "assigned_row": 3,
      "status": "assigned"
    }
  ]
}
## GET /layout

### Description
Zwraca layout magazynu, czyli listę gridów z przypisaniem do doków i pozycją na planie.

### Response

```json
{
  "grids": [
    {
      "id": "dock16-left",
      "dock": 16,
      "x": 10,
      "y": 20,
      "width": 12,
      "height": 25,
      "rows": 8,
      "columns": 8
    }
  ]
}
