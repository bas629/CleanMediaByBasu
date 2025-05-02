import { createContext, useEffect, useState,useContext } from "react";
import {useSelector,useDispatch} from 'react-redux'
import { ContextApp } from "./ContextApp";
import { useNavigate } from "react-router-dom";
// Create a context to manage the script loading state
 export const CloudinaryScriptContext = createContext();

export  default function CloudinaryUploadWidget({ uwConfig, setPublicId }) {
  const [loaded, setLoaded] = useState(false);
  const {Image,setImage}=useContext(ContextApp)

  const {cart}= useSelector((state)=> state)
  const navigate=useNavigate()
   console.log(cart[0]);

  
   



  
  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);







  const initializeCloudinaryWidget = () => {
    if (loaded) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            setPublicId(result.info.public_id);
            const image=result.info.secure_url;
            console.log("Image: ", image);
            

          //      if(postType === "creatAccount")
          //      {
          //         createAccount(image);
          //      }
          //   else
          //  { createEmployee(image)}
          setImage(image)
          
          }
        }
      );

      document.getElementById("upload_widget").addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={ {loaded} } >
      <button
        id="upload_widget"
        className="cloudinary-button"
        onClick={initializeCloudinaryWidget}
      >
        Upload
      </button>

    </CloudinaryScriptContext.Provider>
  );
}



