from layout import AISLES, DOCK_PRIORITY


def merge_lp1_lp2(arrivals, departures):
    arrivals_by_store = {
        item["store_number"]: item
        for item in arrivals
    }

    tasks = []

    for dep in departures:
        store = dep["store_number"]
        arrival = arrivals_by_store.get(store)

        total_quantity = dep["total_quantity"]
        black_quantity = dep["black_quantity"]

        task = {
            "store_number": store,

            "arrival_time": arrival["arrival_time"] if arrival else None,
            "departure_time": dep["departure_time"],

            "lp": dep["lp"],

            "total_quantity": total_quantity,
            "black_quantity": black_quantity,
            "blue_quantity": max(0, total_quantity - black_quantity),

            "notes": dep["notes"],

            "assigned_dock": None,
            "assigned_aisle_id": None,
            "assigned_row": None,

            "status": determine_status(
                arrival["arrival_time"] if arrival else None,
                dep["departure_time"]
            )
        }

        tasks.append(task)

    tasks = assign_docks_and_aisles(tasks)

    return tasks


def determine_status(arrival_time, departure_time):
    if not arrival_time:
        return "waiting"

    return "assigned"


def assign_docks_and_aisles(tasks):
    aisle_usage = {}

    for aisle in AISLES:
        aisle_usage[aisle["id"]] = {
            "stores": 0,
            "rows": [False, False],
            "used_units": [0, 0]
        }

    sorted_tasks = sorted(
        tasks,
        key=lambda x: str(x.get("departure_time") or "")
    )

    for task in sorted_tasks:
        assigned = False

        for dock in DOCK_PRIORITY:
            if assigned:
                break

            possible_aisles = [
                aisle for aisle in AISLES
                if dock in aisle["docks"]
            ]

            possible_aisles.sort(
                key=lambda aisle: aisle.get("priority", 999)
            )

            for aisle in possible_aisles:
                usage = aisle_usage[aisle["id"]]

                if usage["stores"] >= aisle["maxStores"]:
                    continue

                quantity = task.get("total_quantity", 0)

                if quantity > aisle["capacityUnits"]:
                    continue

                for row_index in range(aisle["maxStores"]):
                    if not usage["rows"][row_index]:
                        usage["rows"][row_index] = True
                        usage["used_units"][row_index] = quantity
                        usage["stores"] += 1

                        task["assigned_dock"] = dock
                        task["assigned_aisle_id"] = aisle["id"]
                        task["assigned_row"] = row_index

                        assigned = True
                        break

                if assigned:
                    break

    return sorted_tasks
