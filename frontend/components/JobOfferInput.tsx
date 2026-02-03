import React from "react";

interface JobOffer {
  title: string;
  description: string;
}

interface JobOfferInputProps {
  offer: JobOffer;
  index: number;
  updateOffer: (index: number, offer: JobOffer) => void;
  removeOffer: (index: number) => void;
}

export const JobOfferInput: React.FC<JobOfferInputProps> = ({
  offer,
  index,
  updateOffer,
  removeOffer,
}) => {
  return (
    <div className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <input
        className="w-full border p-1 mb-1 rounded"
        placeholder="Job Title"
        value={offer.title}
        onChange={(e) => updateOffer(index, { ...offer, title: e.target.value })}
      />
      <textarea
        className="w-full border p-1 rounded"
        placeholder="Job Description"
        value={offer.description}
        onChange={(e) =>
          updateOffer(index, { ...offer, description: e.target.value })
        }
      />
      <button
        className="mt-1 text-red-500 hover:underline"
        onClick={() => removeOffer(index)}
      >
        Remove
      </button>
    </div>
  );
};
