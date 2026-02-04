import os
import json
from openai import AsyncOpenAI

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))


async def recommend_cv_improvements(
    cv_text: str,
    job_title: str,
    job_description: str,
):
    prompt = f"""
You are an expert technical recruiter and ATS optimization specialist.

Analyze the CV against the job offer.

Focus on:
- ATS keyword alignment
- Actionable improvements
- Concrete CV bullets

JOB TITLE:
{job_title}

JOB DESCRIPTION:
{job_description}

CANDIDATE CV:
{cv_text}

Return ONLY valid JSON with this structure:

{{
  "overall_advice": string,
  "priority_actions": [
    {{
      "title": string,
      "description": string
    }}
  ],
  "missing_skills": string[],
  "suggested_cv_bullets": string[],
  "ats_score_estimate": number
}}
"""

    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a strict JSON generator."},
            {"role": "user", "content": prompt},
        ],
        temperature=0.4,
    )

    raw_content = response.choices[0].message.content.strip()

    # 🔒 Limpieza defensiva
    if raw_content.startswith("```"):
        raw_content = raw_content.replace("```json", "").replace("```", "").strip()

    try:
        return json.loads(raw_content)
    except json.JSONDecodeError:
        raise ValueError(f"Invalid JSON returned by LLM: {raw_content}")
