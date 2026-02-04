from pydantic import BaseModel
from typing import List

class RecommendRequest(BaseModel):
    cv_text: str
    job_title: str
    job_description: str

class PriorityAction(BaseModel):
    title: str
    description: str

class RecommendResponse(BaseModel):
    overall_advice: str
    priority_actions: List[PriorityAction]
    missing_skills: List[str]
    suggested_cv_bullets: List[str]
    ats_score_estimate: int
