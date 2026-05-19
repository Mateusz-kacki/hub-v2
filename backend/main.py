from fastapi import FastAPI
from excel_routes import router as excel_router

app = FastAPI(title="Warehouse Planner API")

app.include_router(excel_router)

@app.get("/")
def root():
    return {
        "status": "OK",
        "message": "Warehouse Planner backend is running"
    }
