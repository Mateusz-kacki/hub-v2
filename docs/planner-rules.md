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

Planner korzysta wyłącznie z:
- podłużnych żółtych alejek magazynowych.

Każda alejka:
- posiada maksymalną pojemność,
- posiada limit sklepów,
- może obsługiwać wiele doków.

---

# Model alejki

Każda alejka może obsłużyć:
- maksymalnie 2 sklepy,
- maksymalnie 16 jednostek na sklep.

Przykład wizualny:

```text
| S16-8 | [########....] | sklep 1 |
| S16-8 | [######......] | sklep 2 |
```

Przykład modelu:

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
- maksymalnie 2 sklepy,
- maksymalnie 16 jednostek na sklep.

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
- najmniej przeciążony dok,
- najlepszą dostępną alejkę.

---

# Collision Prevention

Planner:
- unika przeciążenia doków,
- unika konfliktów godzin wydania,
- balansuje obciążenie magazynu,
- pilnuje capacityUnits,
- pilnuje maxStores.

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

# Store Slot Assignment

Każda alejka posiada:
- slot sklepu 1
- slot sklepu 2

Każdy sklep:
- zajmuje dokładnie jeden slot,
- może mieć maksymalnie 16 jednostek.

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
- slot alejki zostaje zwolniony,
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

Alejki renderowane są jako:

```text
| ID ALEJKI | wykorzystanie jednostek | sklep |
| ID ALEJKI | wykorzystanie jednostek | sklep |
```
