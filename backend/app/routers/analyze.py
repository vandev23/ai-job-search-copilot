from fastapi import APIRouter
from app.schemas.analyze import AnalyzeRequest, AnalyzeResponse
from app.services.analyzer import analyze_cv

router = APIRouter(prefix="/analyze", tags=["Analyze"])

@router.post("/", response_model=AnalyzeResponse)
async def analyze(request: AnalyzeRequest):
    result = await analyze_cv(
        job_description=request.job_description,
        cv_text=request.cv_text
    )
    return AnalyzeResponse(**result)
