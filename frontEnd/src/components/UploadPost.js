import React, { useState, useContext } from 'react';
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { NavLink, useNavigate } from 'react-router-dom';
import { ContextApp } from './ContextApp';
import { Upload, Globe, Users, Lock,Shield as ShieldLock } from 'lucide-react';

function UploadPost() {
  const [postType, setPostType] = useState("PublicPost");
  const [title, setTitle] = useState("");
  const [flag, setFlag] = useState(false);
  const [post, setPost] = useState([]);
  const { createEmployee } = useContext(ContextApp);

  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dw3gaixoh");
  const [uploadPreset] = useState("lsb1mfod");

  const [uwConfig] = useState({
    cloudName,
    uploadPreset
  });

  const cld = new Cloudinary({
    cloud: {
      cloudName
    }
  });

  const myImage = cld.image(publicId);

  function ok(event) {
    if (event.target.name === "post") {
      setPostType(event.target.value);
    }
    if (event.target.name === "title") {
      setTitle(event.target.value);
    }
  }

  function posted() {
    setFlag(true);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <div className="flex-grow p-6 md:p-8 max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Create New Post</h1>
        
        <div className="space-y-6 bg-gray-800 p-6 rounded-xl shadow-xl">
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-semibold text-gray-200">Post Title</label>
            <input
              type="text"
              name="title"
              onChange={ok}
              className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-200 placeholder-gray-400"
              placeholder="Enter title"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-lg font-semibold text-gray-200">Post Type</label>
            <select
              id="post"
              name="post"
              onChange={ok}
              className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-200 cursor-pointer"
            >
              <option value="PublicPost">Public Post</option>
              <option value="PrivatePost">Private Post</option>
              <option value="ProtectedPost">Protected Post</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-lg font-semibold text-gray-200">Upload (Image & Short-video only)</label>
            <div className="bg-gray-700 p-4 rounded-lg">
              <CloudinaryUploadWidget
                postType={postType}
                title={title}
                flag={flag}
                className="w-full"
                uwConfig={uwConfig}
                setPublicId={setPublicId}
              />
            </div>
          </div>

          <button
            onClick={() => (createEmployee(postType, title), posted())}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg 
              hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
              transition-all duration-300 transform hover:scale-[1.02] 
              font-semibold text-lg shadow-lg"
          >
            POST
          </button>

          {flag && (
            <div className="mt-4 p-4 bg-green-500 bg-opacity-20 border border-green-500 rounded-lg">
              <p className="text-green-400 text-center font-medium">Post Successfully Posted</p>
            </div>
          )}
        </div>
      </div>

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

export default UploadPost;