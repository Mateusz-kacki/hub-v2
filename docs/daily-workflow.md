# Daily Workflow

## Początek dnia

### 1. Operator uruchamia system

System ładuje:
- layout magazynu,
- realistyczny plan magazynu,
- alejki,
- doki,
- konfigurację pojemności.

---

### 2. Import LP1

Operator importuje LP1.

LP1 zawiera:
- godziny przyjazdu wahadeł,
- sklepy przypisane do dostaw.

---

### 3. Import LP2

Operator importuje LP2.

LP2 zawiera:
- godziny wydań,
- ilości jednostek,
- ilości black / dolly,
- LP / trasę.

---

### 4. Planner uruchamia obliczenia

System:
- łączy LP1 i LP2 po numerze sklepu,
- analizuje arrival_time i departure_time,
- sprawdza aktualne okno czasowe,
- rozdziela sklepy po dokach,
- przydziela sklepy do alejek,
- pilnuje capacityUnits,
- pilnuje maxStores,
- sprawdza konflikty LP,
- sprawdza konflikty czasowe.

---

## W trakcie dnia

### 5. Monitoring magazynu

Na ekranie widoczne są:
- realny layout magazynu,
- alejki,
- sklepy,
- doki,
- statusy,
- zajętość miejsc,
- overflow,
- obciążenie doków.

---

### 6. Live visibility

Sklep pojawia się na planie:

```text
1 godzina przed arrival_time
```

Sklep znika z planu:

```text
po departure_time
```

Dzięki temu plan pokazuje tylko aktualne i najbliższe operacje magazynowe.

---

### 7. Automatyczne odświeżanie

Frontend cyklicznie odświeża plan.

System:
- aktualizuje widoczne sklepy,
- usuwa sklepy po wydaniu,
- zwalnia alejki,
- przelicza obciążenie doków.

---

### 8. Przypomnienia i alerty

Docelowo system będzie:
- pokazywał alerty,
- informował o przeciążeniach,
- sygnalizował konflikty,
- wspierał operatora w decyzjach.

---

## Koniec dnia

### 9. Nowy dzień pracy

Operator:
- importuje nowe LP1,
- importuje nowe LP2.

Layout magazynu pozostaje bez zmian.

System przelicza nowy plan dnia na podstawie nowych plików.
