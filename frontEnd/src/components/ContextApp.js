import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ContextApp = createContext();

export default function AppContextProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [PrivateFriend, setPrivateFriend] = useState([]);
  const [ProtectedFriend, setProtectedFriend] = useState([]);
  const [savePost, setSavePost] = useState([]);
  const [pPost, setPpost] = useState([]);
  const [flag, setFlag] = useState(false);
  const [Name, setName] = useState("");
  const [Image, setImage] = useState("");
  const[privatePost, setPrivatePost] = useState([]);
  const[protectedPost, setProtectedPost] = useState([]);
  const[ultraPost, setultraPost] = useState([]); 
  const [ultraPrivateFriend, setUltraPrivateFriend] = useState([]);

  const navigate = useNavigate();

 
  const BASE_URL = "http://localhost:5000";
  // Function to convert date to a unique string
  function dateToUniqueIntString(dateStr) {
    const date = new Date(dateStr);
    const year = date.getUTCFullYear();
    const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
    const day = ("0" + date.getUTCDate()).slice(-2);
    const hours = ("0" + date.getUTCHours()).slice(-2);
    const minutes = ("0" + date.getUTCMinutes()).slice(-2);
    const seconds = ("0" + date.getUTCSeconds()).slice(-2);
    const milliseconds = ("00" + date.getUTCMilliseconds()).slice(-3);
    return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
  }

  // Function to sort posts by date and time (most recent first)
  const sortRecentPosts = (posts) => {
    return posts.sort((a, b) => {
      const dateA = new Date(a.search);
      const dateB = new Date(b.search);
  
      // Compare by date first (earlier date first)
      if (dateA.toDateString() === dateB.toDateString()) {
        // If the same day, compare by time (earlier time first)
        return dateA.getTime() - dateB.getTime(); // Ascending order by time
      }
  
      // If different days, sort by date (earlier date first)
      return dateA - dateB; // Ascending order by date
    });
  };

  async function changeHandler(log = false) {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/userAccount`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok && result.post && result.post._id) {
        setUserId(result.post._id);
        setName(result.post.name);
        setPrivateFriend([...result.post.private_friends]);
        setProtectedFriend([...result.post.protected_friends]);
        
        if (log) navigate("/publicPost");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function AddFriend(id) {
    if (!userId) {
      navigate("/");
      return;
    }

    try {
      const post = await fetch(`${BASE_URL}/PrivateFriend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: userId, id: id }),
      });

      const t= await post.json();
      setProtectedFriend((prev) => [...prev, id]);
    }
     catch (e) {
      console.log(e);
    }
  }



  async function getPublicPost() {
    if (!userId) {
      navigate("/");
      return;
    }

    try {
      const post = await fetch(`${BASE_URL}/publicPost`, {
        method: "GET",
      });
      const data = await post.json();
      setSavePost([...data.post]);
      setPpost([...data.post]);
      setFlag(true);
    } catch (e) {
      console.log(e);
    }
  }

  async function createAccount(name, Password, Email) {
    try {
      const account = await fetch(`${BASE_URL}/creatAccount`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password: Password, email: Email, profile_url: Image || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930" }),
      });

      setImage("");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  const createEmployee = async (postType, title) => {
    try {
      const saved = await fetch(`${BASE_URL}/${postType}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: userId,
          title: title,
          descp: "dfkjjkf",
          post_url: Image || "https://res.cloudinary.com/dw3gaixoh/image/upload/v1728890070/aggsjincaz5jkhreuxtc.png",
        })

      
      }
     
    
    );
    
    setImage("");
    } catch (err) {
      console.error(err);
    }
  };  

   const PrivatePost = async() => {
  try{
   const  post=await fetch(`${BASE_URL}/privatePost`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    });
    const data = await post.json();
    setPrivatePost([...data.post]);
    
   
  

  }
   catch (err) {
     console.error(err);
   }


  }
  const ProtectedtPost = async() => {
    try{
     const  post=await fetch(`${BASE_URL}/protectedPost`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });
      const data = await post.json();
      setProtectedPost([...data.post]);
      
     
    
  
    }
     catch (err) {
       console.error(err);
     }
  
  
    }  
      const ultraPrivatePost = async() => { 
      try{
       const  post=await fetch(`${BASE_URL}/ultraPrivatePost`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email }),
        });
        const data = await post.json();
        setultraPost([...data.post]);
        
       
      
    
      }
       catch (err) {
         console.error(err);
       }






      }



    const Unfriend=async (id) => {
      try {
        const post = await fetch(`${BASE_URL}/unfriend`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: userId, _id: id }),
        });
  
        const data = await post.json();
        setProtectedFriend((prev) => prev.filter((friend) => friend !== id));
      } catch (e) {
        console.log(e);
      }
    }
   
    const AddUltraPrivatePost=async (up_id) => {
   
      try {
        const post = await fetch(`${BASE_URL}/ultraPrivateFriend`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: userId,up_id }),
        });
  
        const data = await post.json();
       console.log(data);
      } catch (e) {
        console.log(e);
      }





    } 

    const removeUltraPrivateFriend=async (up_id) => {
    
      try {
        const post = await fetch(`${BASE_URL}/ultraUnFriendPrivate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: userId,up_id }),
        });
  
        const data = await post.json();
        
      } catch (e) {
        console.log(e);
      }
    
    
    
    
    
    } 
    const getUltaPrivateFriend=async () => {
   
      try{



        const post = await fetch(`${BASE_URL}/getUltaPrivateFriend`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: userId }),
        });
  
        const data = await post.json();
        setUltraPrivateFriend(data.ultraFriend);
      }

      catch (err) {
        console.log(err);
      }




    }



  const value = {
    userId,
    setUserId,
    PrivateFriend,
    setPrivateFriend,
    savePost,
    setSavePost,
    ProtectedFriend,
    setProtectedFriend,
    changeHandler,
    AddFriend,
    getPublicPost,
    pPost,
    flag,
    email,
    password,
    setPassword,
    setEmail,
    BASE_URL,
    Name,
    setFlag,
    createAccount,
    createEmployee,
    Image,
    setImage,
    privatePost,
    setPrivatePost,
    PrivatePost,
    ProtectedtPost,
    protectedPost,
    setProtectedPost,
    Unfriend,
    ultraPrivatePost,
    setultraPost,
    ultraPost,
    AddUltraPrivatePost,
    removeUltraPrivateFriend,
    ultraPrivateFriend,
    getUltaPrivateFriend
  };

  return <ContextApp.Provider value={value}>{children}</ContextApp.Provider>;
}
