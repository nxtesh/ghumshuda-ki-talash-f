import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddPerson from "./components/AddPerson";
import ViewPersons from "./components/ViewPersons";
import PersonDetail from "./components/PersonDetail";
import HomePage from "./components/HomePage";
import FoundPersons from "./components/FoundPersons";
import CheckFace from "./components/CheckFace";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
  return (
    <Router>
      <div className="bg-white min-h-screen pt-12">
        <nav className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 w-full z-10 bg-black backdrop-blur-sm shadow-md ">
          <div className="flex items-center">
            <Link to="/" className="text-3xl font-bold text-white">
              गुमशुदा की <span className="text-red-500">तलाश</span>
            </Link>
          </div>
          <div className="flex space-x-6">
            <Link
              to="/add-person"
              className="text-white text-lg font-medium hover:text-gray-300 transition-colors"
            >
              Add Person
            </Link>
            <Link
              to="/view-persons"
              className="text-white text-lg font-medium hover:text-gray-300 transition-colors"
            >
              View Persons
            </Link>

            <Link
              to="/found-persons"
              className="text-white text-lg font-medium hover:text-gray-300 transition-colors"
            >
              Found Persons
            </Link>
            <Link
              to="/check-face"
              className="text-white text-lg font-medium hover:text-gray-300 transition-colors"
            >
              Check Face
            </Link>

            {isAuthenticated && (
              <div className="flex gap-2 ">
                <h2 className="text-white text-lg font-medium">
                  Welcome, {user.name}
                </h2>
                {/* <img
                  className="rounded-full h-8 w-8"
                  src={user.picture}
                  alt={user.name}
                /> */}
              </div>
            )}

            {isAuthenticated ? (
              <button
                className="text-white text-lg font-medium hover:text-red-500"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Log Out
              </button>
            ) : (
              <button
                className="text-white text-lg font-medium hover:text-gray-300"
                onClick={() => loginWithRedirect()}
              >
                Log In
              </button>
            )}
          </div>
        </nav>
        <div className="max-w-full mx-auto space-y-12">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/view-persons" element={<ViewPersons />} />
            <Route path="/add-person" element={<AddPerson />} />
            <Route path="/person/:id" element={<PersonDetail />} />
            <Route path="/found-persons" element={<FoundPersons />} />
            <Route path="/check-face" element={<CheckFace />} />
          </Routes>
        </div>
      </div>
      <footer className="py-5 bg-black text-white w-full">
        <div className="container mx-auto text-center w-full">
          <p>
            &copy; 2024 Ghumshuda ki Talash. Team: Nitesh, Veer, Uday, Vinit.{" "}
          </p>
        </div>
      </footer>
    </Router>
  );
}

export default App;
