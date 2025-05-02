import React, { useState,useContext } from 'react';
import UploadPost from './UploadPost';
import CloudinaryUploadWidget,{ CloudinaryScriptContext } from "./CloudinaryUploadWidget";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { useNavigate } from 'react-router-dom'; 
import { ContextApp } from './ContextApp';

function SignInForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
   const[flag, setFlag] = useState(false);
  const[post,setPost] = useState([]);
  const nevigate=useNavigate();
 const{createAccount}=useContext(ContextApp)
  const [publicId, setPublicId] = useState("");
  // Replace with your own cloud name
  const [cloudName] = useState("dw3gaixoh");
  // Replace with your own upload preset
  const [uploadPreset] = useState("lsb1mfod");

  // Upload Widget Configuration
  // Remove the comments from the code below to add
  // additional functionality.
  // Note that these are only a few examples, to see
  // the full list of possible parameters that you
  // can add see:
  //   https://cloudinary.com/documentation/upload_widget_reference

  const [uwConfig] = useState({
    cloudName,
    uploadPreset
    // cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    // multiple: false,  //restrict upload to a single file
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  });

  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName
    }
  });

  const myImage = cld.image(publicId);
   

 











  // State to handle errors and success messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!name || !email || !password || !image) {
      setError("All fields are required");
      return;
    }

    try {
      // Create FormData to send the image along with text fields
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("image", image);

      // Send the data to the server (Replace with your API URL)
      const response = await fetch("http://localhost:2000/signin", {
        method: "POST",
        body: formData, // Send formData (not JSON)
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess("Sign in successful!");
        setError("");
        // Reset the form fields after successful submission
        setName("");
        setEmail("");
        setPassword("");
        setImage(null);
      } else {
        setError(result.message || "Sign in failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen  text-white flex justify-center items-center">
    <div className=" p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Sign UP Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>
  
        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
  
        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>
  
        {/* Cloudinary Widget */}
        <div className="mb-4">
          <CloudinaryUploadWidget 
            postType="creatAccount" 
            name={name} 
            email={email} 
            password={password}  
            className="h-10 w-11" 
            uwConfig={uwConfig} 
            setPublicId={setPublicId} 
          />
        </div>
  
        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
         onClick={()=>createAccount(name, password,email)}
       >
          Sign UP
        </button>
         
        {/* Error and Success Messages */}
        {error && <p className="text-red-500 mt-3">{error}</p>}
        {success && <p className="text-green-500 mt-3">{success}</p>}
      </form>
    </div>
  </div>
  
  );
}

export default SignInForm;
