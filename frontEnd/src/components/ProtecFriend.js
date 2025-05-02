import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Upload, Globe, Users, Lock, Shield as ShieldLock } from 'lucide-react';
import { ContextApp } from './ContextApp';

function ProtectFriend() {
  const [pPost, setPpost] = useState([]);
  const [flag, setFlag] = useState(false);
  const { savePost, changeHandler, ProtectedFriend, userId, getPublicPost } = useContext(ContextApp);
  const navigate = useNavigate();

  const sortRecentPosts = (posts) => {
    return posts.sort((a, b) => {
      const dateA = new Date(a.search);
      const dateB = new Date(b.search);

      if (dateA.toDateString() === dateB.toDateString()) {
        return dateA.getTime() - dateB.getTime();
      }
      return dateA - dateB;
    });
  };

  function renderPost() {
    if (userId === "") {
      navigate("/");
      return;
    }

    const newObjects = [];
    const idSet = new Set(); // To avoid duplicates
    savePost.forEach((element) => {
      if (ProtectedFriend.includes(element._id) && !idSet.has(element._id)) {
        
          idSet.add(element._id);
        const t = {
          name: element.name,
          _id: element._id,
          profile_url: element.profile_url,
        };
        newObjects.push(t);
      }
    });

    const sortedPosts = sortRecentPosts(newObjects);
    const reversePosts = sortedPosts.reverse();
    setPpost([...reversePosts]);
    setFlag(true);
  }

  useEffect(() => {
    getPublicPost();
    renderPost();
  }, [savePost]);

  async function refresh() {
    setFlag(false);
    await getPublicPost();
    await changeHandler();
    renderPost();
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header with refresh button */}
      <div className="  top-0  shadow-md flex gap-20 flex-wrap p-4 bg-gray-900 border-b border-gray-700">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg 
                     transition-colors duration-200 ease-in-out transform hover:scale-105 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={refresh}
        >
          Refresh
        </button>
        <div className="text-3xl font-semibold">Private Friends</div>
      </div>

      {/* Main content */}
      <div className="flex-grow p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pPost.map((p) => (
            <div key={p._id} 
                 className="bg-gray-800  rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
              <div className="p-6 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 ring-4 ring-blue-500">
                  <img
                    src={p.profile_url}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{p.name}</h3>
                <div className="space-y-3 w-full">
                  <NavLink
                    to={`/addFriend/${p._id}`}
                    className="block w-full text-center bg-blue-500 text-white py-2 rounded-lg 
                             hover:bg-blue-600 transition-colors duration-200"
                  >
                    More Details
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation bar */}
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
  );
}

export default ProtectFriend;