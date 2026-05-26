# Warehouse Layout

## Cel layoutu

Layout odwzorowuje:
- rzeczywisty układ magazynu,
- doki dystrybucyjne,
- alejki magazynowe,
- sektory magazynu.

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

# Alejki magazynowe

Planner korzysta wyłącznie z:
- podłużnych żółtych alejek z oznaczeniem X.

Inne sektory magazynu:
- nie biorą udziału w dystrybucji sklepów,
- są ignorowane przez planner.

---

# Model alejki

Każda alejka posiada:

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

# Capacity Rules

Jedna alejka:
- maksymalnie 16 jednostek,
- maksymalnie 2 sklepy.

Planner pilnuje:
- capacityUnits,
- maxStores.

---

# Frontend Rendering

Frontend renderuje:
- alejki,
- sklepy,
- quantity,
- statusy,
- obciążenie doków.

Pozycjonowanie opiera się o:
- x
- y
- width
- height

---

# Dynamic Layout

Layout jest:
- dynamiczny,
- renderowany z API,
- możliwy do edycji bez zmian frontendowych.

Frontend pobiera layout z:

```text
GET /layout
```

---

# Future Improvements

Planowane:
- realistyczne odwzorowanie całego magazynu,
- zoom layoutu,
- live updates,
- drag & drop sklepów,
- ręczne korekty operatora.
