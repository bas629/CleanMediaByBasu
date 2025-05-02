import "./App.css";
import React, { useState, useContext } from "react";
import Imagefloder from "./components/Imagefloder.js";
import { Route, Routes } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import navbar from './components/navbar.png';
import Publicpost from "./components/Publicpost";
import AddFriend from "./AddFriend.js";
import Logine from "./components/Logine.js";
import UploadPost from "./components/UploadPost.js";
import SignInForm from "./components/SignInForm.js";
import PrivatePost from "./components/PrivatePost.js";
import Protected from "./components/Protected.js";
import { ContextApp } from './components/ContextApp';
import PrivFriend from "./components/PrivFriend.js";
import ProtecFriend from "./components/ProtecFriend.js";
import UltraPrivate from "./components/UltraPrivate.js";

function App() {
  const [navbarFlag, setNavbarFlag] = useState(false);
  const { userId, setUserId, Name } = useContext(ContextApp);

  function openNavbar() {
    setNavbarFlag(!navbarFlag);
  }

  function cleanUserId() {
    setUserId("");
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <NavLink 
              to='/' 
              className="flex-shrink-0 transition-transform duration-200 hover:scale-105"
            >
              <img 
                src="https://res.cloudinary.com/dw3gaixoh/image/upload/v1728476117/nao8eivc0ia2je7s4tgj.png" 
                className="h-36 p-5 w-auto" 
                alt="Logo"
              />
            </NavLink>
            
            <button
              onClick={openNavbar}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <img 
                src={navbar} 
                className="h-8 w-8" 
                alt="Menu"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Dropdown */}
      {navbarFlag && userId && (
        <div className="fixed right-0 mt-2 w-48 mr-4 z-50 transform transition-all duration-300 ease-in-out">
          <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden">
            <div className="py-2">
              <NavLink
                to="/privateFriend"
                className="block px-4 py-3 text-sm hover:bg-gray-700 transition-colors duration-200"
              >
                Protected Friend
              </NavLink>
              <NavLink
                to="/protectedFriend"
                className="block px-4 py-3 text-sm hover:bg-gray-700 transition-colors duration-200"
              >
              Private Friend
              </NavLink>
              <NavLink
                to={`/addFriend/${userId}`}
               
                className="block px-4 py-3 text-sm  hover:bg-gray-700 transition-colors duration-200"
              >
               Profile
              </NavLink>
              <NavLink
                to="/"
                onClick={cleanUserId}
                className="block px-4 py-3 text-sm text-red-400 hover:bg-gray-700 transition-colors duration-200"
              >
                Logout
              </NavLink>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Message */}
      {Name && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <p className="text-lg font-medium">
              Welcome, <span className="text-blue-400">{Name}</span>!
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Logine />} />
          <Route path="/publicPost" element={<Publicpost />} />
          <Route path="/upload" element={<UploadPost />} />
          <Route path="/addFriend/:id" element={<AddFriend />} />
          <Route path="/signIn" element={<SignInForm />} />
          <Route path="/privatePost" element={<PrivatePost />} />
          <Route path="/protectedPost" element={<Protected />} />
          <Route path="/privateFriend" element={<PrivFriend />} />
          <Route path="/protectedFriend" element={<ProtecFriend />} /> 
          <Route path="/ultraPrivate" element={<UltraPrivate />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;