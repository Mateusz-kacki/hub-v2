from fastapi import FastAPI

app = FastAPI(title="Warehouse Planner API")

@app.get("/")
def root():
    return {
        "status": "OK",
        "message": "Warehouse Planner backend is running"
    }
