import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { statesWithCities } from "../constants"; // Adjust the path as necessary

const ViewPersons = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [searchAge, setSearchAge] = useState("");
  const [searchState, setSearchState] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [cities, setCities] = useState([]);
  const [viewType, setViewType] = useState("gallery"); // New state for view type

  const fetchPersons = async (name = "", age = "", state = "", city = "") => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/persons", {
        params: { name, age, state, city },
      });
      setPersons(response.data);
    } catch (error) {
      console.error("Error fetching persons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  const handleSearch = () => {
    fetchPersons(searchName, searchAge, searchState, searchCity);
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSearchState(selectedState);
    setCities(statesWithCities[selectedState] || []);
    setSearchCity("");
  };

  const toggleView = () => {
    setViewType(viewType === "gallery" ? "table" : "gallery");
  };

  return (
    <div className="mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-black mb-8 text-center">
        Missing Persons
      </h2>

      <div className="mb-8 flex flex-col sm:flex-row justify-center space-x-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          maxLength={50}
          onChange={(e) => setSearchName(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
        />
        {/* <input
          type="number"
          placeholder="Search by age"
          value={searchAge}
          onChange={(e) =>
            setSearchAge(Math.max(1, Math.min(110, e.target.value)))
          }
          min="1"
          max="110"
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
        /> */}

        <select
          value={searchState}
          onChange={handleStateChange}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
        >
          <option value="">Select State</option>
          {Object.keys(statesWithCities).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <select
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
          disabled={!searchState}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          className="bg-black text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-800"
        >
          Search
        </button>
        <button
          onClick={toggleView}
          className="bg-black text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-800"
        >
          Toggle View
        </button>
      </div>

      <div className="mb-8 text-center">
        
      </div>

      {loading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : persons.length > 0 ? (
        viewType === "gallery" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {persons.map((person) => (
              <div
                key={person._id}
                className="text-center bg-white rounded-lg shadow-md"
              >
                <Link to={`/person/${person._id}`}>
                  <img
                    src={`https://ghumshuda-ki-talash-b.onrender.com/${person.picture}`}
                    alt={person.name}
                    className="w-full h-80 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-black mb-2">
                      {person.name}
                    </h3>
                    <Link to={`/person/${person._id}`}>
                      <button className="bg-black text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-800">
                        View Details
                      </button>
                    </Link>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Age</th>
                <th className="border border-gray-300 px-4 py-2">State</th>
                <th className="border border-gray-300 px-4 py-2">City</th>
                <th className="border border-gray-300 px-4 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {persons.map((person) => (
                <tr key={person._id}>
                  <td className="border border-gray-300 px-4 py-2  text-center">
                    {person.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {person.age}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {person.state}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {person.city}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex items-center justify-center">
                    <Link to={`/person/${person._id}`}>
                      <button className="bg-black text-white py-2 px-4  rounded-md shadow-md hover:bg-gray-800">
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      ) : (
        <p className="text-gray-500 text-center">No persons found.</p>
      )}
    </div>
  );
};

export default ViewPersons;
