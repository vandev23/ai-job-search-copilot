import json
from openai import AsyncOpenAI
from app.core.config import OPENAI_API_KEY


SYSTEM_PROMPT = """
You are an expert technical recruiter.

You MUST return ONLY valid JSON.
Do not include explanations or extra text.
The JSON schema is:

{
  "score": number (0-100),
  "strengths": string[],
  "gaps": string[],
  "summary": string
}
"""

client = AsyncOpenAI(api_key=OPENAI_API_KEY)


async def analyze_cv(job_description: str, cv_text: str) -> dict:
    user_prompt = f"""
Compare the following CV with the job description.

Job Description:
{job_description}

CV:
{cv_text}
"""

    try:
        response = await client.chat.completions.create(
            model="gpt-4o-mini",
            temperature=0.2,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
            ],
        )

        content = response.choices[0].message.content

        if not content:
            raise ValueError("Empty response from LLM")

        return json.loads(content)

    except json.JSONDecodeError:
        raise ValueError("LLM returned invalid JSON")

    except Exception as e:
        raise RuntimeError(f"Error analyzing CV: {str(e)}")
