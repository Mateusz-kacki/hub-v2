# Planner Rules

## Cel systemu

System automatycznie:
- przydziela sklepy do doków,
- przydziela sklepy do alejek,
- balansuje obciążenie magazynu,
- unika kolizji czasowych,
- optymalizuje wykorzystanie przestrzeni.

---

# Doki dystrybucyjne

Planner obsługuje:
- DOK 16
- DOK 17
- DOK 18

DOK 15:
- inbound only
- ignorowany przez planner dystrybucji

---

# Priorytet doków

Priorytet:

```text
16 → 17 → 18
```

Planner:
1. najpierw próbuje DOK 16
2. potem DOK 17
3. potem DOK 18

---

# Alejki magazynowe

Każda alejka:
- posiada maksymalną pojemność,
- posiada limit sklepów,
- może obsługiwać wiele doków.

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

# Capacity Rules

Jedna alejka:
- maksymalnie 16 jednostek,
- maksymalnie 2 sklepy.

Planner pilnuje:
- capacityUnits,
- maxStores.

---

# Shared Aisles

Niektóre alejki mogą obsługiwać wiele doków.

Przykład:

```text
S16-8
→ DOK 16
→ DOK 17
```

Planner wybiera:
- najbliższy możliwy dok,
- najmniej przeciążony dok.

---

# Collision Prevention

Planner:
- unika zbyt wielu sklepów na jednym doku,
- unika konfliktów godzin wydania,
- balansuje obciążenie.

---

# Store Assignment

Proces przydziału:

```text
LP1 + LP2
↓
Merge danych
↓
Przydział doku
↓
Wybór alejki
↓
Sprawdzenie capacity
↓
Sprawdzenie maxStores
↓
Przypisanie sklepu
```

---

# Status sklepu

Możliwe statusy:
- waiting
- assigned
- ready
- departed

---

# Dynamic Release

Po wydaniu sklepu:
- alejka zostaje zwolniona,
- capacity wraca,
- planner może użyć alejki ponownie.

---

# Frontend

Frontend pokazuje:
- plan magazynu,
- alejki,
- doki,
- sklepy,
- quantity,
- statusy,
- obciążenie doków.
