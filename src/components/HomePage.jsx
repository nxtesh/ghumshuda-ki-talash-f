import React, { useState, useEffect } from "react";
import axios from "axios";
import ViewPersons from "./ViewPersons";
import Typewriter from "typewriter-effect";

const HomePage = () => {
  const [statistics, setStatistics] = useState({
    totalCases: 0,
    foundPersons: 0,
  });
  const [recentCases, setRecentCases] = useState([]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get("http://localhost:5000/statistics");
      setStatistics(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const fetchRecentCases = async () => {
    try {
      const response = await axios.get("http://localhost:5000/recent-cases");
      setRecentCases(response.data);
    } catch (error) {
      console.error("Error fetching recent cases:", error);
    }
  };

  useEffect(() => {
    fetchStatistics();
    fetchRecentCases();
  }, []);

  return (
    <div className="w-full bg-white text-black">
      {/* Hero Section */}
      <section className="bg-black text-white py-20 w-full">
        <div className="container mx-auto text-center w-full">
          <h1 className="text-5xl font-bold mb-6">
            <Typewriter
              options={{
                strings: ["Find Missing Loved Ones"],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <p className="text-xl mb-10">
            Helping families reconnect with their missing loved ones.
          </p>
          <div>
            <a
              href="/add-person"
              className="bg-white text-black px-8 py-3 rounded-full mr-4 text-lg"
            >
              Add a Missing Person
            </a>
            <a
              href="/view-persons"
              className="bg-white text-black px-8 py-3 rounded-full text-lg"
            >
              View Missing Persons
            </a>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white w-full">
        <div className="container mx-auto text-center w-full">
          <h2 className="text-4xl font-bold mb-10">How It Works</h2>
          <p className="text-xl mb-6">
            1. Add a missing person with their details.
          </p>
          <p className="text-xl mb-6">
            2. View all missing persons listed on the platform.
          </p>
          <p className="text-xl mb-6">3. Mark a person as found to notify others.</p>
          <p className="text-xl">4. Check if the person is missing or not using Face Recognition.</p>
        </div>

      </section>

      <hr />

      {/* Success Stories/Testimonials */}
      <section className="py-20 bg-gray-100 w-full">
        <div className="container mx-auto text-center w-full">
          <h2 className="text-4xl font-bold mb-10">
            You do not have to wait 24 hours to report someone as missing.
          </h2>
          <p className="text-xl mb-10">
            If you have concerns for someone’s safety and welfare, and their
            whereabouts is unknown, you can file a missing person’s report at
            your local police station.
          </p>
        </div>
      </section>

      <hr />

      {/* Statistics Section */}
      <section className="py-20 w-full">
        <div className="container mx-auto text-center w-full">
          <h2 className="text-4xl font-bold mb-10">Platform Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 w-full">
            <div>
              <h3 className="text-3xl font-bold">{statistics.totalCases}+</h3>
              <p className="text-gray-700">Cases Listed</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">{statistics.foundPersons}+</h3>
              <p className="text-gray-700">Found Persons</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">
                {statistics.totalCases - statistics.foundPersons}+
              </h3>
              <p className="text-gray-700">Ongoing Cases</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-10 bg-gray-100 text-black text-center w-full">
        <div className="container mx-auto w-full">
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-xl">
            For inquiries or reporting, contact us at 987654321 or
            email ghumshudakitalash@gmail.com
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
