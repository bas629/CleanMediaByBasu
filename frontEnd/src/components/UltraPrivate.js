import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ContextApp } from './ContextApp';
import { Upload, Globe, Users, Lock, RefreshCw,Shield as ShieldLock } from 'lucide-react';
import "../App.css";

  
  function UltraPrivate() {
    
      const [pPost, setPpost] = useState([]);
      const [flag, setFlag] = useState(false);
      const { savePost, changeHandler, PrivateFriend, AddFriend, ProtectedFriend, userId, getPublicPost, privatePost, PrivatePost,ultraPost,ultraPrivatePost} = useContext(ContextApp);
      const navigate = useNavigate();
    
      useEffect(() => {
        ultraPrivatePost();
        setFlag(true);
      }, []);
    
      async function refresh() {
        setFlag(false);
        await ultraPrivatePost();
        setFlag(true);
      }





    return (
        <div className="flex flex-col min-h-screen bg-gray-900">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 shadow-sm z-40 p-4">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            <h1 className="text-xl font-bold text-white">UltraPrivate Page</h1>
            <button
              className="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-full text-white hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              onClick={refresh}
            >
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
  
        {/* Main content area */}
        <div className="flex-grow p-4 max-w-4xl mx-auto w-full">
          {flag ? (
            <div className="space-y-6">
              {ultraPost.map((p) => (
                <div key={p._id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl border border-gray-700">
                  {/* Post header */}
                  <div className="p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={p.profile_url}
                          alt={p.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop";
                          }}
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
                      </div>
                      <div>
                        <NavLink
                          to={`/addFriend/${p._id}`}
                          className="font-semibold text-white hover:text-blue-400 transition-colors duration-200"
                        >
                          {p.name}
                        </NavLink>
                        <p className="text-sm text-gray-400">{p.date}</p>
                      </div>
                    </div>
                    {ProtectedFriend?.includes(p._id) ? (
                      <button className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 transition-colors duration-200">
                        Friends
                      </button>
                    ) : (
                      <button
                        onClick={() => AddFriend(p._id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
                      >
                        Add Friend
                      </button>
                    )}
                  </div>
  
                  {/* Post content */}
                  <div className="px-4 py-2">
                    <p className="text-gray-200 whitespace-pre-wrap">{p.title}</p>
                  </div>
  
                  {/* Media content */}
                  <div className="mt-2">
                    {p.image_url.includes("mp4") ? (
                      <div className="aspect-video">
                        <video
                          src={p.image_url}
                          className="w-full h-full object-cover"
                          controls
                          preload="metadata"
                        />
                      </div>
                    ) : (
                      <img
                        className="w-full h-auto object-cover"
                        src={p.image_url}
                        alt={p.title}
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1600&auto=format&fit=crop";
                        }}
                      />
                    )}
                  </div>
  
                  {/* Post footer */}
                  <div className="px-4 py-3 border-t border-gray-700">
                    <div className="flex items-center space-x-4 text-gray-400">
                      <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-200">
                        <span>❤️</span>
                        <span className="text-sm">Like</span>
                      </button>
                      <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-200">
                        <span>💬</span>
                        <span className="text-sm">Comment</span>
                      </button>
                      <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-200">
                        <span>🔗</span>
                        <span className="text-sm">Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          )}
        </div>
  
        {/* Bottom navigation */}
        <div className="sticky bottom-0 bg-gray-900 border-t border-gray-700 shadow-lg z-40">
          <nav className="max-w-4xl mx-auto px-4">
            <ul className="flex justify-around items-center h-16">
              <NavLink
                to="/upload"
                className={({ isActive }) =>
                  `flex flex-col items-center space-y-1 ${
                    isActive ? 'text-blue-400' : 'text-gray-400 hover:text-blue-400'
                  }`
                }
              >
                <Upload size={24} />
                <span className="text-xs">Upload</span>
              </NavLink>
              
              <NavLink
                to="/publicPost"
                className={({ isActive }) =>
                  `flex flex-col items-center space-y-1 ${
                    isActive ? 'text-blue-400' : 'text-gray-400 hover:text-blue-400'
                  }`
                }
              >
                <Globe size={24} />
                <span className="text-xs">Public</span>
              </NavLink>
  
              <NavLink
                to="/privatePost"
                className={({ isActive }) =>
                  `flex flex-col items-center space-y-1 ${
                    isActive ? 'text-blue-400' : 'text-gray-400 hover:text-blue-400'
                  }`
                }
              >
                <Users size={24} />
                <span className="text-xs">Private</span>
              </NavLink>
  
              <NavLink
                to="/protectedPost"
                className={({ isActive }) =>
                  `flex flex-col items-center space-y-1 ${
                    isActive ? 'text-blue-400' : 'text-gray-400 hover:text-blue-400'
                  }`
                }
              >
                <Lock size={24} />
                <span className="text-xs">Protected</span>
              </NavLink>
              
              <NavLink
                          to="/ultraPrivate"
                          className={({ isActive }) =>
                            `flex flex-col items-center space-y-1 ${
                              isActive ? 'text-blue-400' : 'text-gray-400 hover:text-blue-400'
                            }`
                          }
                        >
                          <ShieldLock size={24} />
                          <span className="text-xs">UltraPrivate</span>
                        </NavLink>



            </ul>
          </nav>
        </div>
      </div>
    )
  }
  
  export default UltraPrivate
