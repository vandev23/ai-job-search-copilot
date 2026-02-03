from fastapi import FastAPI
from app.routers.analyze import router as analyze_router
from app.routers.compare import router as compare_router


app = FastAPI(
    title="AI Job Search Copilot API",
    version="0.1.0"
)

app.include_router(analyze_router)
app.include_router(compare_router)

@app.get("/health")
def health_check():
    return {"status": "ok"}
