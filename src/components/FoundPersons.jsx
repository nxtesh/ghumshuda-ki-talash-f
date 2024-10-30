import React, { useState, useEffect } from "react";
import axios from "axios";

const FoundPersons = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoundPersons = async () => {
      setLoading(true);
      try {
        // Correct API call to only fetch found persons
        const response = await axios.get("http://localhost:5000/found-persons");
        setPersons(response.data);
      } catch (error) {
        console.error("Error fetching found persons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoundPersons();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-semibold text-center text-gray-900 mb-8">Found Persons</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <p className="text-gray-500 text-center">Loading...</p>
        ) : persons.length > 0 ? (
          persons.map((person) => (
            <div
              key={person._id}
              className="bg-white p-4 rounded-lg shadow-lg border border-gray-300"
            >
              <img
                src={`http://localhost:5000/${person.picture}`}
                alt={person.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{person.name}</h3>
              {/* <a
                href={`/person/${person._id}`}
                className="block text-black hover:underline text-center mt-4"
              >
                View Details
              </a> */}
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No found persons yet.</p>
        )}
      </div>
    </div>
  );
};

export default FoundPersons;
