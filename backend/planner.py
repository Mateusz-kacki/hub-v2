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

    tasks = assign_docks(tasks)
    tasks = assign_grids(tasks)
    return tasks

def assign_docks(tasks):
    docks = [16, 17, 18]

    dock_schedule = {
        16: [],
        17: [],
        18: []
    }

    sorted_tasks = sorted(
        tasks,
        key=lambda x: str(x.get("departure_time") or "")
    )

    for task in sorted_tasks:
        departure = str(task.get("departure_time") or "")

        best_dock = None
        best_score = None

        for dock in docks:
            same_time_count = dock_schedule[dock].count(departure)
            total_load = len(dock_schedule[dock])

            score = same_time_count * 10 + total_load

            if best_score is None or score < best_score:
                best_score = score
                best_dock = dock

        task["assigned_dock"] = best_dock

        dock_schedule[best_dock].append(departure)

    return sorted_tasks


def assign_grids(tasks):
    grids = [
        {"id": "dock16-A", "dock": 16, "rows": 8},
        {"id": "dock17-A", "dock": 17, "rows": 8},
        {"id": "dock18-A", "dock": 18, "rows": 8},
    ]

    used_rows = {}

    for task in tasks:
        dock = task["assigned_dock"]

        available_grids = [
            grid for grid in grids
            if grid["dock"] == dock
        ]

        for grid in available_grids:
            key = grid["id"]

            if key not in used_rows:
                used_rows[key] = 0

            if used_rows[key] < grid["rows"]:
                task["assigned_grid_id"] = grid["id"]
                task["assigned_row"] = used_rows[key]
                used_rows[key] += 1
                break

    return tasks
