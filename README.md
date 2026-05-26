Projekt umożliwia:
- upload LP1 i LP2,
- automatyczne planowanie sklepów,
- przydział doków,
- przydział alejek,
- wizualizację planu magazynu,
- monitorowanie obciążenia doków.

---

# Architektura

Frontend:
- React
- Vite

Backend:
- FastAPI
- Python

Docelowo:
- PostgreSQL
- hosting online
- live planner magazynowy

---

# Workflow systemu

```text
LP1 + LP2
↓
Parser Excel
↓
Merge danych
↓
Planner magazynowy
↓
Przydział doków
↓
Przydział alejek
↓
Render planu magazynu
```

---

# Doki magazynowe

System obsługuje:
- DOK 16
- DOK 17
- DOK 18

DOK 15:
- inbound only
- nie bierze udziału w dystrybucji sklepów

Priorytet doków:

```text
16 → 17 → 18
```

Planner zawsze próbuje:
1. najpierw DOK 16
2. potem DOK 17
3. potem DOK 18

---

# Model magazynu

Magazyn składa się z:
- alejek magazynowych,
- sektorów,
- doków dystrybucyjnych.

Planner korzysta wyłącznie z:
- podłużnych żółtych alejek magazynowych.

Alejka:
- może obsługiwać wiele doków,
- posiada limit pojemności,
- posiada limit sklepów,
- posiada maksymalnie 2 sklepy,
- każdy sklep może zajmować maksymalnie 16 jednostek.

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

# Zasady planera

Planner:
- unika przeciążania doków,
- balansuje ruch między dokami,
- pilnuje limitów alejek,
- pilnuje liczby sklepów,
- obsługuje współdzielone alejki,
- dynamicznie przydziela sklepy.

Planner pilnuje:
- maksymalnie 2 sklepów na alejkę,
- maksymalnie 16 jednostek na sklep,
- poprawnego przypisania doków,
- priorytetów doków 16 → 17 → 18.

---

# Frontend

Frontend wyświetla:
- plan magazynu,
- alejki,
- sklepy,
- statusy,
- quantity,
- obciążenie doków,
- legendę kolorów.

Kolory:
- niebieski → standard
- czarny → dolly / black
- żółty → wolne miejsce

---

# Backend API

Backend udostępnia:
- upload LP1
- upload LP2
- upload DAY
- layout magazynu
- planner API

Dokumentacja:
```text
docs/api.md
```

---

# Aktualny status projektu

DONE:
- React frontend
- FastAPI backend
- upload LP1
- upload LP2
- parser Excel
- planner
- render magazynu
- layout API
- dock planner
- merge LP1 + LP2

IN PROGRESS:
- planner alejek liniowych
- realistyczny layout magazynu
- hosting online
- testy magazynowe

TODO:
- deployment
- PostgreSQL
- live updates
- alerty
- realtime planner

---

# Deployment

Docelowy workflow:

```text
GitHub
↓
Auto deploy
↓
Hosting online
↓
Magazyn
```

Frontend:
- Vercel

Backend:
- Render

---

# Autor

Mateusz.K
