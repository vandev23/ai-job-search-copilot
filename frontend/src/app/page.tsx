"use client";
import React, { useState } from "react";
import { CompareButton } from "../../components/CompareButton";
import { ResultCard } from "../../components/ResultCard";
import { JobOfferInput } from "../../components/JobOfferInput";
import { CvInput } from "../../components/CVInput";
import { compareCvWithJobs } from "../../utils/api";
import { Spinner } from "../../components/Spinner";
import { AnimatePresence, motion } from "framer-motion";

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

export default function Page() {
  const [cvText, setCvText] = useState("");
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([{ title: "", description: "" }]);
  const [results, setResults] = useState<CompareResult[]>([]);
  const [bestMatch, setBestMatch] = useState<CompareResult | null>(null);
  const [loading, setLoading] = useState(false);

  const updateOffer = (index: number, offer: JobOffer) => {
    const newOffers = [...jobOffers];
    newOffers[index] = offer;
    setJobOffers(newOffers);
  };

  const addOffer = () => setJobOffers([...jobOffers, { title: "", description: "" }]);
  const removeOffer = (index: number) => setJobOffers(jobOffers.filter((_, i) => i !== index));

  const handleCompare = async () => {
    if (jobOffers.length === 0 || jobOffers.every(offer => !offer.title && !offer.description)) return;

    try {
      setLoading(true);
      const data: CompareResponse = await compareCvWithJobs({ cv_text: cvText, job_offers: jobOffers });
      setBestMatch(data.best_match);
      setResults(data.ranking);
    } catch (error) {
      console.error("Compare error:", error);
      alert("Failed to fetch compare results");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">AI Job Search Copilot</h1>

        {/* CV Input */}
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

        {/* Compare Button */}
        <div className="mb-8 flex items-center">
  <CompareButton
    onClick={handleCompare}
    disabled={jobOffers.length === 0 || jobOffers.every(offer => !offer.title && !offer.description) || loading}
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
    key="best-match"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6 rounded-md"
  >
    <h2 className="text-xl font-semibold text-gray-900 mb-2">Best Match</h2>
    <p className="text-gray-800 font-medium">{bestMatch.title} — Score: {bestMatch.score}%</p>
    <p className="text-gray-700 mt-2"><strong>Strengths:</strong> {bestMatch.strengths.join(", ")}</p>
    <p className="text-gray-700 mt-1"><strong>Gaps:</strong> {bestMatch.gaps.join(", ")}</p>
    {bestMatch.summary && <p className="text-gray-700 mt-2">{bestMatch.summary}</p>}
  </motion.div>
)}

        {/* Results */}
        <div>
          <AnimatePresence>
    {results.map((res, idx) => (
      <motion.div
        key={res.title + idx}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3, delay: idx * 0.05 }}
      >
        <ResultCard
          title={res.title}
          score={res.score}
          strengths={res.strengths}
          gaps={res.gaps}
        />
      </motion.div>
    ))}
  </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
