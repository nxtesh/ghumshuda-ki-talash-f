import React, { useState } from "react";
import axios from "axios";

const FeedbackForm = ({ personId, onFeedbackAdded }) => {
  const [feedbackText, setFeedbackText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/persons/${personId}/feedback`, {
        text: feedbackText,
      });
      setFeedbackText("");
      onFeedbackAdded(response.data.feedback.slice(-1)[0]); // Pass the latest feedback
      alert("Feedback added successfully");
    } catch (error) {
      alert("Error adding feedback");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
      <textarea
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
        placeholder="Write your feedback here..."
        required
        className="w-full p-4 border border-gray-300 rounded-md bg-gray-100 text-gray-800 placeholder-gray-500 focus:ring-black focus:border-black"
      />
      <button
        type="submit"
        className="bg-black text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-800 mt-4"
      >
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
