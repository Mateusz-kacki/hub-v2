from fastapi import APIRouter, UploadFile, File
import pandas as pd

from parsers import parse_lp1, parse_lp2
from planner import merge_lp1_lp2
router = APIRouter()

@router.post("/upload/lp1")
async def upload_lp1(file: UploadFile = File(...)):
    df = pd.read_excel(file.file)

    return {
        "filename": file.filename,
        "rows": len(df),
        "columns": list(df.columns)
    }

@router.post("/upload/lp1")
async def upload_lp1(file: UploadFile = File(...)):
    df = pd.read_excel(file.file)
    arrivals = parse_lp1(df)

    return {
        "filename": file.filename,
        "rows": len(df),
        "arrivals_count": len(arrivals),
        "arrivals": arrivals[:10]
    }

@router.post("/upload/day")
async def upload_day(
    lp1: UploadFile = File(...),
    lp2: UploadFile = File(...)
):
    df_lp1 = pd.read_excel(lp1.file)
    df_lp2 = pd.read_excel(lp2.file)

    arrivals = parse_lp1(df_lp1)
    departures = parse_lp2(df_lp2)

    tasks = merge_lp1_lp2(arrivals, departures)

    return {
        "lp1_filename": lp1.filename,
        "lp2_filename": lp2.filename,
        "tasks_count": len(tasks),
        "tasks": tasks[:20]
    }
