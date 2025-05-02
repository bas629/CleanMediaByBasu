import React, { useState, useContext } from 'react';
import { ContextApp } from './ContextApp';
import { useSelector, useDispatch } from 'react-redux';
import { add } from '../redux/slice/SaveId';
import { NavLink, useNavigate } from 'react-router-dom';
 import   "../App.css"
function Logine() {
  
  const navigate=useNavigate();

  
  const {setUserId,setPrivateFriend, setProtectedFriend,changeHandler,email,password,setEmail,setPassword } = useContext(ContextApp);
  const [flag, setFlag] = useState(false);
 

 
  return (
    <div className="flex flex-col w-full h-screen bg-gray-900 gap-8 justify-center items-center p-4">
    <p className="text-4xl font-bold text-white">SignIn</p>
  
    {/* Email Field */}
    <div className="w-full max-w-xs">
      <label className="block text-white text-lg font-semibold mb-2">Email</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 text-black text-lg rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter email"
      />
    </div>
  
    {/* Password Field */}
    <div className="w-full max-w-xs">
      <label className="block text-white text-lg font-semibold mb-2">Password</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 text-black text-lg rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter password"
      />
    </div>
  
    {/* Login Button */}
{ (flag)  ? (
          <div className="flex justify-center items-center w-full">
            <span className="loader flex justify-center scale-105"></span>
          </div>
        ):(<button
      className="w-full max-w-xs py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
      onClick={() =>( changeHandler(true),setFlag(true))}
    >
      Login
    </button>)}
  
    {/* Sign In Link */}
    <NavLink
      className="text-white text-lg font-bold hover:underline"
      to="/signIn"
    >
      Create Account? SignUp
    </NavLink>
  </div>
  
  );
}

export default Logine;
