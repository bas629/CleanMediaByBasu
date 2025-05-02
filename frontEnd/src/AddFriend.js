import { reverse } from '@cloudinary/url-gen/actions/effect';
import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ContextApp } from './components/ContextApp';
import { Users, UserCircle2, Heart } from 'lucide-react';


function AddFriend() {
  const location = useLocation();
  const id = location.pathname.split('/').at(-1);

  const { BASE_URL,userId } = useContext(ContextApp);
  const [account, setAccount] = useState({});
  const [flag, setFlag] = useState(false);

 
  async function getPublicPost() {
    try {
      const post = await fetch(`${BASE_URL}/findById`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: id }),
      });
      const data = await post.json();
      console.log('Fetched Data: ', data);

      setAccount(data);
      console.log(account);
      setFlag(true);
    } catch (e) {
      console.log(e);
    }
  } 

  const handleDelete = async (id,userId) => {
    console.log("Basu",id,userId);
  try
  { 

    const post = await fetch(`${BASE_URL}/publicPostDeleted`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id,userId: userId }),
    }); 
    
    await getPublicPost();





  }
  catch(e)
  {
    console.log(e);

  }




  }

  useEffect(() => {
    getPublicPost();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-6 md:p-8">
    <div className="container mx-auto max-w-6xl">
      {flag && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700">
          {/* Account Information */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <div className="relative">
              <img
                src={account.post.profile_url}
                alt="Profile"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover shadow-xl ring-4 ring-purple-500/30"
              />
              <div className="absolute bottom-0 right-0 bg-purple-500 p-2 rounded-full shadow-lg">
                <UserCircle2 className="w-5 h-5 text-white" />
              </div>
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">{account.post.name}</h1>
              <div className="flex items-center justify-center sm:justify-start gap-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">{account.post.followers} Protected Friend</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  <span className="font-medium">{account.post.follows} Private Friend</span>
                </div>
              </div>
            </div>
          </div>

          {/* Public Posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {account.post.public_Post.map((p) => (
              <div
                key={p.title}
                className="group relative bg-gray-700/50 rounded-xl overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-2xl"
              >  
                 {
                           
                  
                    userId == account.post._id && 
                 
                    <button 
                      onClick={() => handleDelete(p._id,userId)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors z-50"
                    >
                      Delete
                    </button>
                  
                 }
       

                <div className="aspect-square">
                  {p.post_url.includes('mp4') ? (
                    <video
                      src={p.post_url}
                      controls
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={p.post_url}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-lg font-semibold text-white">{p.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
  );
}

export default AddFriend;
