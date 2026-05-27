from datetime import datetime, time
from zoneinfo import ZoneInfo

from layout import AISLES, DOCK_PRIORITY


TIMEZONE = ZoneInfo("Europe/Warsaw")


def merge_lp1_lp2(arrivals, departures):
    arrivals_by_store = {item["store_number"]: item for item in arrivals}

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
            "overflow_units": 0,
            "status": "waiting",
        }

        tasks.append(task)

    tasks = filter_visible_tasks(tasks)
    tasks = assign_docks_and_aisles(tasks)

    return tasks


def filter_visible_tasks(tasks):
    now = datetime.now(TIMEZONE)
    now_minutes = now.hour * 60 + now.minute

    visible_tasks = []

    for task in tasks:
        arrival_minutes = parse_time_to_minutes(task.get("arrival_time"))
        departure_minutes = parse_time_to_minutes(task.get("departure_time"))

        if departure_minutes is None:
            continue

        if now_minutes > departure_minutes:
            continue

        if arrival_minutes is None:
            visible_tasks.append(task)
            continue

        show_from = arrival_minutes - 60

        if now_minutes >= show_from and now_minutes <= departure_minutes:
            visible_tasks.append(task)

    return visible_tasks


def assign_docks_and_aisles(tasks):
    aisle_usage = {}

    for aisle in AISLES:
        aisle_usage[aisle["id"]] = {"rows": [None, None], "used_units": [0, 0]}

    sorted_tasks = sorted(tasks, key=lambda x: str(x.get("departure_time") or ""))

    grouped_by_lp = {}

    for task in sorted_tasks:
        lp = str(task.get("lp") or "").strip()

        if not lp:
            lp = f"SINGLE-{task['store_number']}"

        if lp not in grouped_by_lp:
            grouped_by_lp[lp] = []

        grouped_by_lp[lp].append(task)

    batches = []

    for lp, group in grouped_by_lp.items():
        index = 0

        while index + 1 < len(group):
            batches.append(
                {"mode": "route", "lp": lp, "tasks": [group[index], group[index + 1]]}
            )
            index += 2

        if index < len(group):
            batches.append({"mode": "single", "lp": lp, "tasks": [group[index]]})

    for batch in batches:
        assigned = False

        for dock in DOCK_PRIORITY:
            if assigned:
                break

            possible_aisles = [aisle for aisle in AISLES if dock in aisle["docks"]]

            possible_aisles.sort(key=lambda aisle: aisle.get("priority", 999))

            for aisle in possible_aisles:
                usage = aisle_usage[aisle["id"]]

                free_rows = [
                    row_index
                    for row_index, row_value in enumerate(usage["rows"])
                    if row_value is None
                ]

                if len(free_rows) < len(batch["tasks"]):
                    continue

                if has_time_conflict_with_different_lp(usage["rows"], batch["tasks"]):
                    continue

                for task, row_index in zip(batch["tasks"], free_rows):
                    quantity = task.get("total_quantity", 0)

                    overflow_units = max(0, quantity - aisle["capacityUnits"])

                    display_units = min(quantity, aisle["capacityUnits"])

                    usage["rows"][row_index] = task
                    usage["used_units"][row_index] = display_units

                    task["overflow_units"] = overflow_units
                    task["assigned_dock"] = dock
                    task["assigned_aisle_id"] = aisle["id"]
                    task["assigned_row"] = row_index
                    task["status"] = "assigned"

                assigned = True
                break

    return sorted_tasks


def has_time_conflict_with_different_lp(existing_tasks, new_tasks):
    for existing_task in existing_tasks:
        if existing_task is None:
            continue

        existing_lp = str(existing_task.get("lp") or "").strip()

        for new_task in new_tasks:
            new_lp = str(new_task.get("lp") or "").strip()

            if existing_lp == new_lp:
                continue

            if tasks_overlap(existing_task, new_task):
                return True

    return False


def tasks_overlap(task_a, task_b):
    a_start = parse_time_to_minutes(task_a.get("arrival_time"))
    a_end = parse_time_to_minutes(task_a.get("departure_time"))

    b_start = parse_time_to_minutes(task_b.get("arrival_time"))
    b_end = parse_time_to_minutes(task_b.get("departure_time"))

    if a_start is None:
        a_start = 0

    if b_start is None:
        b_start = 0

    if a_end is None or b_end is None:
        return True

    return a_start < b_end and b_start < a_end


def parse_time_to_minutes(value):
    if value is None:
        return None

    if isinstance(value, time):
        return value.hour * 60 + value.minute

    if isinstance(value, datetime):
        return value.hour * 60 + value.minute

    text = str(value).strip()

    if not text or text.lower() == "nan":
        return None

    if " " in text:
        text = text.split(" ")[-1]

    if ":" not in text:
        return None

    parts = text.split(":")

    try:
        hour = int(parts[0])
        minute = int(parts[1])
        return hour * 60 + minute
    except Exception:
        return None
