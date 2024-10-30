import React, { useState } from "react";
import axios from "axios";
import { statesWithCities } from "../constants"; // Ensure this file has the states and cities listed correctly

const AddPerson = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [lastSeen, setLastSeen] = useState("");
  const [details, setDetails] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [nameOfPolice, setNameOfPolice] = useState("");
  const [FIRDate, setFIRDate] = useState("");
  const [FIRCaseNumber, setFIRCaseNumber] = useState("");
  const [officerInChargeNumber, setOfficerInChargeNumber] = useState("");
  const [picture, setPicture] = useState(null);

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setState(selectedState);
    setCity(""); // Reset city when state changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("lastSeen", lastSeen);
    formData.append("details", details);
    formData.append("phoneNumber", phoneNumber);
    formData.append("address", address);
    if (email) formData.append("email", email);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("nameOfPolice", nameOfPolice);
    formData.append("FIRDate", FIRDate);
    formData.append("FIRCaseNumber", FIRCaseNumber);
    formData.append("officerInChargeNumber", officerInChargeNumber);
    if (picture) formData.append("picture", picture);

    try {
      await axios.post("https://ghumshuda-ki-talash-b.onrender.com/add-person", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // Reset form fields
      setName("");
      setAge("");
      setLastSeen("");
      setDetails("");
      setPhoneNumber("");
      setAddress("");
      setEmail("");
      setState("");
      setCity("");
      setNameOfPolice("");
      setFIRDate("");
      setFIRCaseNumber("");
      setOfficerInChargeNumber("");
      setPicture(null);
      alert("Person added successfully");
    } catch (error) {
      alert("Error adding person");
    }
  };

  return (
    <div className="mx-auto bg-white p-10 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-black mb-8 text-center">
        Add Missing Person
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-wrap -mx-3">
        {/* Left Column */}
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <div className="mb-4">
            <label className="block text-sm font-medium text-black">Name</label>
            <input
              type="text"
              value={name}
              maxLength={50}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-black">Age</label>
            <input
              type="number"
              value={age}
              min={1}
              max={110}
              onChange={(e) =>
                setAge(Math.max(1, Math.min(110, e.target.value)))
              }
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-black">
              Last Seen
            </label>
            <input
              type="date"
              value={lastSeen}
              onChange={(e) => setLastSeen(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-black">
              Details(Clothing & Appearance)
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-black">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              pattern="[0-9]*"
              maxLength="10"
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/\D/g, ""))
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-black">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-black">
              Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPicture(e.target.files[0])}
              className="mt-1 block w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"
            />
          </div>
        </div>

        {/* Right Column */}

        <div className="w-full md:w-1/2 px-3">
          <div className="mb-4">
            <label className="block text-sm font-medium text-black">
              State
            </label>
            <select
              value={state}
              onChange={handleStateChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            >
              <option value="" disabled>
                Select a state
              </option>
              {Object.keys(statesWithCities).map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-black">City</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            >
              <option value="" disabled>
                Select a city
              </option>
              {state &&
                statesWithCities[state].map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>
          
<div className="mb-4">
<i>Optional Details:</i>
</div>
          
          

          <div className="mb-4">
            <label className="block text-sm font-medium text-black">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-black">
              Name of Police
            </label>
            <input
              type="text"
              value={nameOfPolice}
              onChange={(e) => setNameOfPolice(e.target.value)}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-black">
              FIR Date
            </label>
            <input
              type="date"
              value={FIRDate}
              onChange={(e) => setFIRDate(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-black">
              FIR Case Number
            </label>
            <input
              type="text"
              value={FIRCaseNumber}
              onChange={(e) => setFIRCaseNumber(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-black">
              Officer in Charge Number
            </label>
            <input
              type="tel"
              value={officerInChargeNumber}
              onChange={(e) => setOfficerInChargeNumber(e.target.value)}
              pattern="[0-9]*"
              maxLength="10"
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/\D/g, ""))
              } // Replace non-numeric characters
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md text-lg font-medium shadow-md hover:bg-gray-800"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPerson;
