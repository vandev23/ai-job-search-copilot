from pydantic import BaseModel
from typing import List


class JobOffer(BaseModel):
    title: str
    description: str


class CompareRequest(BaseModel):
    cv_text: str
    job_offers: List[JobOffer]


class JobComparisonResult(BaseModel):
    title: str
    score: int
    strengths: List[str]
    gaps: List[str]
    summary: str


class CompareResponse(BaseModel):
    best_match: JobComparisonResult
    ranking: List[JobComparisonResult]
