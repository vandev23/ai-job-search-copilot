import asyncio
from app.services.analyzer import analyze_cv


async def compare_offers(cv_text: str, job_offers: list):
    tasks = []

    for offer in job_offers:
        task = analyze_cv(
            job_description=offer["description"],
            cv_text=cv_text
        )
        tasks.append(task)

    analyses = await asyncio.gather(*tasks)

    results = []

    for offer, analysis in zip(job_offers, analyses):
        results.append({
            "title": offer["title"],
            **analysis
        })

    ranking = sorted(results, key=lambda x: x["score"], reverse=True)

    return {
        "best_match": ranking[0],
        "ranking": ranking
    }
