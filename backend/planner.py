def merge_lp1_lp2(arrivals, departures):
    arrivals_by_store = {
        item["store_number"]: item
        for item in arrivals
    }

    tasks = []

    for dep in departures:
        store = dep["store_number"]
        arrival = arrivals_by_store.get(store)

        tasks.append({
            "store_number": store,
            "arrival_time": arrival["arrival_time"] if arrival else None,
            "departure_time": dep["departure_time"],
            "lp": dep["lp"],
            "total_quantity": dep["total_quantity"],
            "black_quantity": dep["black_quantity"],
            "blue_quantity": max(0, dep["total_quantity"] - dep["black_quantity"]),
            "notes": dep["notes"],
            "assigned_dock": None,
            "assigned_grid_id": None,
            "assigned_row": None,
            "status": "waiting"
        })

    return assign_docks(tasks)


def assign_docks(tasks):
    dock_load = {
        16: 0,
        17: 0,
        18: 0
    }

    sorted_tasks = sorted(
        tasks,
        key=lambda x: str(x.get("departure_time") or "")
    )

    for task in sorted_tasks:
        best_dock = min(dock_load, key=dock_load.get)

        task["assigned_dock"] = best_dock
        dock_load[best_dock] += task.get("total_quantity", 0)

    return sorted_tasks
