from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from excel_routes import router as excel_router
from layout import GRIDS

app = FastAPI(title="Warehouse Planner API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(excel_router)


@app.get("/")
def root():
    return {
        "status": "OK",
        "message": "Warehouse Planner backend is running"
    }


@app.get("/layout")
def get_layout():
    return {
        "grids": GRIDS
    }
