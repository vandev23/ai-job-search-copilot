"use client";
import React, { useState } from "react";
import { CompareButton } from "../../components/CompareButton";
import { ResultCard } from "../../components/ResultCard";
import { JobOfferInput } from "../../components/JobOfferInput";
import { CvInput } from "../../components/CVInput";
import { compareCvWithJobs } from "../../utils/api";
import { Spinner } from "../../components/Spinner";
import { AnimatePresence, motion } from "framer-motion";

/* -------------------- Types -------------------- */

interface JobOffer {
  title: string;
  description: string;
}

interface CompareResult {
  title: string;
  score: number;
  strengths: string[];
  gaps: string[];
  summary?: string;
}

interface CompareResponse {
  best_match: CompareResult;
  ranking: CompareResult[];
}

interface Recommendations {
  overall_advice: string;
  missing_skills: string[];
  improvements: string[];
  suggested_cv_bullets: string[];
}

/* -------------------- Page -------------------- */

export default function Page() {
  const [cvText, setCvText] = useState("");
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([
    { title: "", description: "" },
  ]);
  const [results, setResults] = useState<CompareResult[]>([]);
  const [bestMatch, setBestMatch] = useState<CompareResult | null>(null);

  const [loading, setLoading] = useState(false);
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  const [recommendations, setRecommendations] =
    useState<Recommendations | null>(null);

  /* -------------------- Handlers -------------------- */

  const updateOffer = (index: number, offer: JobOffer) => {
    const newOffers = [...jobOffers];
    newOffers[index] = offer;
    setJobOffers(newOffers);
  };

  const addOffer = () =>
    setJobOffers([...jobOffers, { title: "", description: "" }]);

  const removeOffer = (index: number) =>
    setJobOffers(jobOffers.filter((_, i) => i !== index));

  const handleCompare = async () => {
    if (
      jobOffers.length === 0 ||
      jobOffers.every((o) => !o.title && !o.description)
    )
      return;

    try {
      setLoading(true);
      setRecommendations(null);

      const data: CompareResponse = await compareCvWithJobs({
        cv_text: cvText,
        job_offers: jobOffers,
      });

      setBestMatch(data.best_match);
      setResults(data.ranking);
    } catch (error) {
      console.error("Compare error:", error);
      alert("Failed to fetch compare results");
    } finally {
      setLoading(false);
    }
  };

  const handleGetRecommendations = async () => {
    if (!bestMatch) return;

    const matchedJob = jobOffers.find(
      (offer) => offer.title === bestMatch.title,
    );

    if (!matchedJob) {
      alert("Job description not found for best match");
      return;
    }

    try {
      setLoadingAdvice(true);

      const res = await fetch("http://127.0.0.1:8000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cv_text: cvText,
          job_title: bestMatch.title,
          job_description: matchedJob.description,
        }),
      });

      const data: Recommendations = await res.json();
      setRecommendations(data);
    } catch (err) {
      console.error("Recommendation error", err);
    } finally {
      setLoadingAdvice(false);
    }
  };

  /* -------------------- UI -------------------- */

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          AI Job Search Copilot
        </h1>

        <CvInput cvText={cvText} setCvText={setCvText} />

        {/* Job Offers */}
        <div className="mb-6">
          {jobOffers.map((offer, idx) => (
            <JobOfferInput
              key={idx}
              index={idx}
              offer={offer}
              updateOffer={updateOffer}
              removeOffer={removeOffer}
            />
          ))}
          <button
            className="text-blue-600 hover:underline mt-2"
            onClick={addOffer}
          >
            + Add another job offer
          </button>
        </div>

        {/* Compare */}
        <div className="mb-8 flex items-center">
          <CompareButton
            onClick={handleCompare}
            disabled={
              loading || jobOffers.every((o) => !o.title && !o.description)
            }
          />
          {loading && (
            <div className="ml-4">
              <Spinner size={24} />
            </div>
          )}
        </div>

        {/* Best Match */}
        {bestMatch && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6 rounded-md"
          >
            <h2 className="text-xl font-semibold mb-2">Best Match</h2>
            <p className="font-medium">
              {bestMatch.title} — {bestMatch.score}%
            </p>
            <p className="mt-2">
              <strong>Strengths:</strong> {bestMatch.strengths.join(", ")}
            </p>
            <p className="mt-1">
              <strong>Gaps:</strong> {bestMatch.gaps.join(", ")}
            </p>
            {bestMatch.summary && (
              <p className="mt-2 text-gray-700">{bestMatch.summary}</p>
            )}

            <button
              onClick={handleGetRecommendations}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={loadingAdvice}
            >
              Improve my CV for this role
            </button>

            {loadingAdvice && (
              <div className="mt-4">
                <Spinner size={28} />
              </div>
            )}
          </motion.div>
        )}

        {/* Recommendations */}
        {recommendations && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-4 rounded shadow mb-6"
          >
            <h3 className="text-lg font-semibold mb-2">AI Recommendations</h3>

            <p className="mb-3">{recommendations.overall_advice}</p>

            <h4 className="font-semibold">Missing skills</h4>
            <ul className="list-disc ml-6">
              {recommendations.missing_skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>

            <h4 className="font-semibold mt-3">Suggested CV bullets</h4>
            <ul className="list-disc ml-6">
              {recommendations.suggested_cv_bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Ranking */}
        <AnimatePresence>
          {results.map((res, idx) => (
            <motion.div
              key={res.title + idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <ResultCard {...res} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
