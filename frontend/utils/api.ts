interface CompareRequest {
  cv_text: string;
  job_offers: { title: string; description: string }[];
}

export const compareCvWithJobs = async (data: CompareRequest) => {
  const res = await fetch("/api/compare", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch compare results");
  }

  return res.json();
};
