# Data Model

## WarehouseLayout
Stały układ magazynu.

Zawiera:
- background planu magazynu
- lista doków
- lista gridów

## Dock
Dok załadunkowy.

Pola:
- dockNumber: 16 / 17 / 18
- name
- position

## Grid
Obszar na planie magazynu.

Pola:
- id
- dockNumber
- x
- y
- width
- height
- rows
- columns
- priority

## StoreTask
Sklep z danego dnia.

Pola:
- storeNumber
- arrivalTime
- departureTime
- lp
- totalQuantity
- blackQuantity
- blueQuantity
- assignedGridId
- assignedRow
- status

## Status sklepu
- waiting
- assigned
- ready
- departed
