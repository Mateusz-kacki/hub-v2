def parse_lp2(df):
    stores = []

    for _, row in df.iterrows():
        store = safe_str(row, 2)
        if not store:
            continue

        total_quantity = safe_int(row, 9)
        black_quantity = safe_int(row, 7)

        if total_quantity <= 0:
            continue

        stores.append({
            "departure_time": safe_str(row, 1),
            "store_number": store,
            "black_quantity": black_quantity,
            "total_quantity": total_quantity,
            "notes": safe_str(row, 10),
            "lp": safe_str(row, 17)
        })

    return stores


def parse_lp1(df):
    arrivals = []

    for _, row in df.iterrows():
        store = safe_str(row, 2)
        if not store:
            continue

        arrival_time = safe_str(row, 1)
        if not arrival_time:
            continue

        arrivals.append({
            "arrival_time": arrival_time,
            "store_number": store
        })

    return arrivals


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
    if len(row) <= index:
        return 0

    value = row.iloc[index]

    if is_nan(value):
        return 0

    try:
        return int(float(value))
    except (ValueError, TypeError):
        return 0


def is_nan(value):
    return value != value
