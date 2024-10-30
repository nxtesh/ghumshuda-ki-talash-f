import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CheckFace = () => {
  const [picture, setPicture] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('picture', picture);

    try {
      const res = await axios.post('https://ghumshuda-ki-talash-b.onrender.com/check-face', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(res.data);
    } catch (error) {
      console.error('Error uploading the file', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto bg-white p-10 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-black mb-8 text-center">
        Check Face Recognition
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-black">Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md text-lg font-medium shadow-md hover:bg-gray-800"
          >
            Check Face
          </button>
        </div>
      </form>

      {loading && (
        <div className="flex flex-col items-center mt-8">
          <div className="w-16 h-16 border-4 border-black border-t-transparent border-solid rounded-full animate-spin"></div>
          <p className="mt-4 text-sm italic text-gray-600">
            This might take some time. Search manually instead?{' '}
            <Link to="/view-persons" className="text-blue-500 hover:underline">
              Click Here.
            </Link>
          </p>
        </div>
      )}

      {result && (
        <div className="mt-8">
          {result.match ? (
            <div>
              <p className="text-green-500">Match Found!</p>
              <p>Name: {result.person.name}</p>
              <p>Age: {result.person.age}</p>
              {/* <img src={result.person.picture}/> */}
              <p>Last Seen: {new Date(result.person.lastSeen).toLocaleDateString()}</p>
            </div>
          ) : (
            <p className="text-red-500">No match found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckFace;
