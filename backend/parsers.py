def parse_lp2(df):
    stores = []

    for _, row in df.iterrows():
        store = str(row.iloc[2]).strip() if len(row) > 2 else ""
        if not store or store == "nan":
            continue

        stores.append({
            "departure_time": str(row.iloc[1]) if len(row) > 1 else None,
            "store_number": store,
            "black_quantity": int(row.iloc[7]) if len(row) > 7 and not is_nan(row.iloc[7]) else 0,
            "total_quantity": int(row.iloc[9]) if len(row) > 9 and not is_nan(row.iloc[9]) else 0,
            "notes": str(row.iloc[10]) if len(row) > 10 else "",
            "lp": str(row.iloc[17]) if len(row) > 17 else ""
        })

    return stores


def is_nan(value):
    return value != value

def parse_lp1(df):
    arrivals = []

    for _, row in df.iterrows():
        store = str(row.iloc[2]).strip() if len(row) > 2 else ""
        if not store or store == "nan":
            continue

        arrivals.append({
            "arrival_time": str(row.iloc[1]) if len(row) > 1 else None,
            "store_number": store
        })

    return arrivals
