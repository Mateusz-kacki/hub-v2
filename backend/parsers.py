from datetime import datetime, time


def parse_lp2(df):
    stores = []

    current_departure = ""
    current_lp = ""

    for _, row in df.iterrows():
        departure = safe_time(row, 1)
        lp = safe_str(row, 17)

        if departure:
            current_departure = departure

        if lp:
            current_lp = lp

        store = safe_store(row, 2)

        if not store:
            continue

        total_quantity = safe_int(row, 9)
        black_quantity = safe_int(row, 7)

        if total_quantity <= 0:
            continue

        stores.append(
            {
                "departure_time": current_departure,
                "store_number": store,
                "black_quantity": black_quantity,
                "total_quantity": total_quantity,
                "notes": safe_str(row, 10),
                "lp": current_lp,
            }
        )

    return stores


def parse_lp1(df):
    arrivals = []
    current_arrival_time = None

    for _, row in df.iterrows():
        route_arrival = safe_time(row, 8)

        if route_arrival:
            current_arrival_time = route_arrival
            continue

        store = safe_store(row, 0)

        if not store:
            continue

        if not current_arrival_time:
            continue

        arrivals.append({"arrival_time": current_arrival_time, "store_number": store})

    return arrivals


def safe_store(row, index):
    if len(row) <= index:
        return ""

    value = row.iloc[index]

    if is_nan(value):
        return ""

    text = str(value).strip()

    if not text or text.lower() == "nan":
        return ""

    if text.lower() in ["sklep", "nr karty trasy", "data zał.", "data zal.", "nan"]:
        return ""

    try:
        number = int(float(text))
        return str(number)
    except Exception:
        return text


def safe_time(row, index):
    if len(row) <= index:
        return ""

    value = row.iloc[index]

    if is_nan(value):
        return ""

    if isinstance(value, datetime):
        return value.strftime("%H:%M")

    if isinstance(value, time):
        return value.strftime("%H:%M")

    text = str(value).strip()

    if not text or text.lower() == "nan":
        return ""

    if " " in text:
        try:
            parsed = datetime.fromisoformat(text)
            return parsed.strftime("%H:%M")
        except Exception:
            text = text.split(" ")[-1]

    if ":" in text:
        parts = text.split(":")
        return f"{parts[0].zfill(2)}:{parts[1].zfill(2)}"

    return ""


def safe_str(row, index):
    if len(row) <= index:
        return ""

    value = row.iloc[index]

    if is_nan(value):
        return ""

    text = str(value).strip()

    if text.lower() == "nan":
        return ""

    return text


def safe_int(row, index):
    try:
        if len(row) <= index:
            return 0

        value = row.iloc[index]

        if is_nan(value):
            return 0

        return int(float(value))
    except Exception:
        return 0


def is_nan(value):
    try:
        return value != value
    except Exception:
        return True
