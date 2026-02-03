from pydantic import BaseModel

class AnalyzeRequest(BaseModel):
    job_description: str
    cv_text: str


class AnalyzeResponse(BaseModel):
    score: int
    strengths: list[str]
    gaps: list[str]
    summary: str
