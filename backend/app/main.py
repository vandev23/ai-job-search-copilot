from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.analyze import router as analyze_router
from app.routers.compare import router as compare_router
from app.routers.recommend import router as recommend_router


app = FastAPI(
    title="AI Job Search Copilot API",
    version="0.1.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(analyze_router)
app.include_router(compare_router)
app.include_router(recommend_router)

@app.get("/health")
def health_check():
    return {"status": "ok"}
