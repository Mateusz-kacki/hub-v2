# System Architecture

## Cel systemu
System do zarządzania rozmieszczeniem sklepów na magazynie.

## Źródła danych

### LP1
Godziny przyjazdu sklepów (wahadła).

### LP2
Godziny wydań sklepów oraz ilości.

## Główna logika

1. Import LP1 i LP2.
2. Łączenie danych po numerze sklepu.
3. Automatyczne przydzielanie sklepów do gridów.
4. Unikanie kolizji czasowych przy dokach.
5. Wizualizacja na planie magazynu.
6. Automatyczne usuwanie sklepu po wydaniu.

## Doki
- 16
- 17
- 18

## Technologie
Frontend:
- React

Backend:
- FastAPI

Baza danych:
- SQLite (start)
- PostgreSQL (docelowo)
