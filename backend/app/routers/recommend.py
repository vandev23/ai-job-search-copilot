from fastapi import APIRouter
from app.schemas.recommend import RecommendRequest, RecommendResponse
from app.services.recommender import recommend_cv_improvements

router = APIRouter(prefix="/recommend", tags=["recommend"])

@router.post("", response_model=RecommendResponse)
async def recommend(request: RecommendRequest):
    return await recommend_cv_improvements(
        request.cv_text,
        request.job_title,
        request.job_description
    )
