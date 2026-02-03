from fastapi import APIRouter
from app.schemas.compare import CompareRequest, CompareResponse
from app.services.comparator import compare_offers

router = APIRouter(
    prefix="/compare",
    tags=["Compare"]
)

@router.post("/", response_model=CompareResponse)
async def compare(request: CompareRequest):
    return await compare_offers(
        cv_text=request.cv_text,
        job_offers=[job.model_dump() for job in request.job_offers]
    )
