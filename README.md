# AI Job Search Copilot 🚀

AI Job Search Copilot is a web-based application designed to help job seekers optimize their job applications using AI.
It analyzes a candidate's CV against one or multiple job descriptions and provides a match score, strengths, gaps,
and actionable recommendations.

This project is designed both as a **real product** and a **portfolio-grade AI system**.

---

## ✨ Features

- 📄 CV vs Job Description analysis
- 📊 Match score per job offer
- 🥇 Ranking of multiple job offers
- 💡 Strengths & gaps detection
- 🧠 AI-powered recommendations
- 🔒 API-key based LLM integration

---

## 🧱 Tech Stack

### Frontend
- Next.js (React)
- TypeScript
- TailwindCSS

### Backend
- FastAPI (Python)
- Pydantic
- Async / parallel processing

### AI
- LLM via API (OpenAI-compatible)
- Prompt-based structured outputs

---

## 📁 Project Structure

```
ai-job-search-copilot/
│
├── frontend/
│   └── Next.js application
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routers/
│   │   │   ├── analyze.py
│   │   │   └── compare.py
│   │   ├── schemas/
│   │   ├── services/
│   │   └── core/
│   └── venv/
│
└── README.md
```

---

## 🔑 LLM API Key Setup

This project requires an API key to interact with a Large Language Model (LLM).

### Local Development

Create a `.env` file in the backend folder:

```
OPENAI_API_KEY=your_api_key_here
```

The backend will load this key securely using environment variables.

⚠️ **Never commit real API keys to the repository.**

---

## 🚀 Running the Project Locally

### Backend

```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

API Docs available at:
```
http://localhost:8000/docs
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend available at:
```
http://localhost:3000
```

---

## 🔁 API Example – Compare CV with Multiple Jobs

### Endpoint
```
POST /compare
```

### Request Body
```json
{
  "cv_text": "Backend engineer with 4 years of experience in Python and APIs.",
  "job_offers": [
    {
      "title": "Backend Developer",
      "description": "Looking for Python and API experience."
    },
    {
      "title": "Senior Python Engineer",
      "description": "Senior role with cloud experience."
    }
  ]
}
```

---

## 💰 Monetization Strategy (Production)

In production, users **do NOT provide their own API keys**.

### Recommended Approaches:

#### 1. Credit-based system (recommended)
- Users buy credits (e.g. 10 analyses)
- Each request consumes credits
- Backend manages LLM usage

#### 2. Subscription model
- Free tier (limited analyses)
- Pro plan (unlimited or high limits)

#### 3. Pay-per-analysis
- Fixed price per CV analysis

LLM costs are absorbed by the platform and priced into the plans.

---

## 🛡️ Security & Cost Control

- Rate limiting per user
- Daily usage caps
- Prompt size validation
- Async processing to reduce latency

---

## 🗺️ Roadmap

- [ ] CV improvement suggestions
- [ ] Cover letter generation
- [ ] LinkedIn job ingestion
- [ ] User authentication
- [ ] Stripe payments
- [ ] Public launch

---

## 🎯 Why This Project Matters

This project demonstrates:
- Real-world AI integration
- Product-oriented backend design
- Async & scalable architecture
- Clear monetization thinking

Perfect for:
- Portfolios
- Startup MVPs
- AI product case studies

---

## 📄 License

MIT License (can be adjusted for commercial use)
