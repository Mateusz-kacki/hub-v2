# TODO

## Etap 1 — dokumentacja
- [x] README
- [x] architektura systemu
- [x] zasady plannera
- [x] struktura Excel
- [x] model danych
- [x] algorytm plannera
- [x] przepływ dnia
- [x] dokumentacja API

---

## Etap 2 — frontend
- [x] utworzyć React app
- [x] ekran główny
- [x] widok planu magazynu
- [x] upload LP1
- [x] upload LP2
- [x] render gridów
- [x] render sklepów
- [x] legenda kolorów
- [x] numeracja wierszy
- [x] statystyki doków
- [x] statusy sklepów
- [ ] przebudowa UI pod alejki liniowe
- [ ] realistyczny layout magazynu
- [ ] responsywność ekranu magazynowego
- [ ] live refresh planu
- [ ] panel błędów / alertów

---

## Etap 3 — backend
- [x] utworzyć FastAPI
- [x] endpoint upload LP1
- [x] endpoint upload LP2
- [x] endpoint upload DAY
- [x] parser LP1
- [x] parser LP2
- [x] merge LP1 + LP2
- [x] planner
- [x] layout API
- [ ] planner pojemności alejek
- [ ] planner max 2 sklepy
- [ ] planner priorytetów doków
- [ ] planner współdzielonych alejek
- [ ] walidacja danych Excel
- [ ] logika realtime
- [ ] logika wydanych sklepów

---

## Etap 4 — logika magazynu
- [x] doki 16/17/18
- [x] podstawowe gridy
- [x] automatyczne rozmieszczanie
- [x] podstawowe unikanie kolizji
- [ ] model alejek liniowych
- [ ] capacity_units = 16
- [ ] max_stores = 2
- [ ] przypisanie wielu doków do alejki
- [ ] dock priority 16 → 17 → 18
- [ ] realistyczne sektory magazynu
- [ ] logika sąsiednich doków
- [ ] balansowanie obciążenia doków
- [ ] dynamiczne zwalnianie alejek
- [ ] obsługa ręcznych zmian operatora

---

## Etap 5 — deployment i testy
- [ ] deployment frontend
- [ ] deployment backend
- [ ] podpięcie GitHub auto deploy
- [ ] pierwsze testy LP1/LP2
- [ ] testy magazynowe
- [ ] poprawki parserów
- [ ] poprawki UI
- [ ] optymalizacja planera
- [ ] przygotowanie demo
