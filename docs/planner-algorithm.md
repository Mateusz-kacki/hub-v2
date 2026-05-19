# Planner Algorithm

## Cel
Automatyczne rozmieszczanie sklepów na magazynie.

---

# Wejście

## LP1
- godzina przyjazdu
- numer sklepu

## LP2
- godzina wydania
- ilość
- LP
- dolly / black quantity

---

# Proces planowania

## 1. Import danych
System importuje:
- LP1
- LP2

---

## 2. Łączenie danych
Dane są łączone po numerze sklepu.

---

## 3. Obliczanie zajętości
Planner oblicza:
- ilość miejsc potrzebnych dla sklepu
- ilość black positions
- przewidywany czas zajęcia miejsca

---

## 4. Wybór doku
Planner wybiera:
- 16
- 17
- 18

na podstawie:
- obciążenia czasowego
- liczby sklepów
- dostępności miejsc

---

## 5. Unikanie kolizji
Planner nie powinien:
- kierować wielu sklepów na ten sam dok
- przy podobnych godzinach wydania

---

## 6. Przydzielanie gridu
Planner:
- wybiera grid
- wybiera wolny wiersz
- przypisuje sklep

---

## 7. Aktualizacja planu
Frontend aktualizuje:
- kolory komórek
- statusy
- pozycje sklepów

---

## 8. Usuwanie sklepu
Po godzinie wydania:
- sklep znika z gridu
- miejsce zostaje zwolnione
