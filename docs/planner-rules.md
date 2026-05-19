# Planner Rules

## Główne zasady planowania

### 1. Jeden sklep = jeden wiersz
Każdy sklep zajmuje jeden wiersz w gridzie.

---

### 2. Grid należy do konkretnego doku
Każdy grid posiada przypisany dok:
- 16
- 17
- 18

---

### 3. LP2 określa ilość zajętych miejsc
Na podstawie:
- ilości całkowitej,
- dolly/czarnych miejsc,
system koloruje komórki.

---

### 4. LP1 określa czas przyjazdu sklepu
Sklep pojawia się na magazynie według godziny przyjazdu.

---

### 5. LP2 określa czas wydania sklepu
Po godzinie wydania:
- sklep zostaje usunięty z gridu,
- miejsce zostaje zwolnione.

---

### 6. Unikanie kolizji czasowych
System nie powinien umieszczać zbyt wielu sklepów:
- przy tym samym doku,
- w podobnym czasie wydania.

---

### 7. Priorytet doków
Planner powinien:
1. równomiernie rozkładać ruch,
2. minimalizować korki,
3. unikać przeciążenia jednego doku.

---

### 8. Codzienny reset danych
Każdy dzień:
- nowy LP1,
- nowy LP2,
- nowe przydziały sklepów.

Layout magazynu pozostaje stały.
