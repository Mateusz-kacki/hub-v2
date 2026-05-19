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

    return tasks
