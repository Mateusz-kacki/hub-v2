from fastapi import APIRouter, UploadFile, File
import pandas as pd
from parsers import parse_lp1, parse_lp2

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
