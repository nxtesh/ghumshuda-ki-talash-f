import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import FeedbackForm from "./FeedbackForm";

const PersonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/persons/${id}`);
        setPerson(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching person details:", error);
        setLoading(false);
      }
    };

    fetchPerson();
  }, [id]);

  const handleMarkAsFound = async () => {
    const confirmMarkAsFound = window.confirm(
      "Are you sure you want to mark this person as found?"
    );
    if (!confirmMarkAsFound) return;

    try {
      await axios.post(`http://localhost:5000/persons/${id}/mark-as-found`);
      alert("Person marked as found successfully");
      navigate("/found-persons");
    } catch (error) {
      alert("Error marking person as found");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this person?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/persons/${id}`);
      alert("Person deleted successfully");
      navigate("/");
    } catch (error) {
      alert("Error deleting person");
    }
  };

  const handleFeedbackAdded = (newFeedback) => {
    setPerson((prevPerson) => ({
      ...prevPerson,
      feedback: [...prevPerson.feedback, newFeedback],
    }));
  };

  return (
    <div className="mx-auto p-8 rounded-lg shadow-lg max-w-5xl">
      {loading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : person ? (
        <>
          <div className="flex flex-row items-start space-x-8">
            {/* Left section: Image, Name, and Mark as Found Button */}
            <div className="w-1/2 flex flex-col items-center">
              <img
                src={`http://localhost:5000/${person.picture}`}
                alt={person.name}
                className="w-64 h-64 object-cover rounded-full shadow-lg mb-4 border border-gray-300"
              />
              <h2 className="text-3xl font-semibold text-black mb-4">
                {person.name}
              </h2>
              <button
                onClick={handleMarkAsFound}
                className="bg-black text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-800"
              >
                Mark as Found
              </button>
            </div>

            {/* Right section: Person details */}
            <div className="w-1/2 flex flex-col items-start text-left">
              <p className="text-gray-700 mb-2">
                <strong>Age:</strong> {person.age}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Last Seen:</strong>{" "}
                {new Date(person.lastSeen).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Details:</strong> {person.details}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Phone Number:</strong> {person.phoneNumber}
              </p>

              {/* New fields for Address, Email, State, and City */}
              <p className="text-gray-700 mb-4">
                <strong>Address:</strong> {person.address || "N/A"}
              </p>
              {person.email && (
                <p className="text-gray-700 mb-4">
                  <strong>Email:</strong> {person.email}
                </p>
              )}
              <p className="text-gray-700 mb-4">
                <strong>State:</strong> {person.state}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>City:</strong> {person.city}
              </p>

              {/* New fields for FIR and police information */}
              <p className="text-gray-700 mb-4">
                <strong>Name of Police:</strong> {person.nameOfPolice || "N/A"}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>FIR Date:</strong>{" "}
                {person.FIRDate
                  ? new Date(person.FIRDate).toLocaleDateString()
                  : "N/A"}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>FIR Case Number:</strong> {person.FIRCaseNumber || "N/A"}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Officer In Charge Number:</strong>{" "}
                {person.officerInChargeNumber || "N/A"}
              </p>
            </div>
          </div>

          <hr className="my-6 border-gray-300" />

          {/* Feedback Section */}
          <h3 className="text-2xl font-semibold text-black mb-4">Feedback</h3>
          {person.feedback && person.feedback.length > 0 ? (
            <ul className="space-y-4">
              {person.feedback.map((feedback, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-4 rounded-md shadow-md border border-gray-300"
                >
                  <p className="text-gray-800">{feedback.text}</p>
                  <p className="text-gray-600 text-sm">
                    {new Date(feedback.date).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No feedback yet.</p>
          )}

          <hr className="my-6 border-gray-300" />

          <FeedbackForm personId={id} onFeedbackAdded={handleFeedbackAdded} />
        </>
      ) : (
        <p className="text-gray-600 text-center">Person not found.</p>
      )}
    </div>
  );
};

export default PersonDetail;
