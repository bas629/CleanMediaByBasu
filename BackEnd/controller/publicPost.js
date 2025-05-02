const account= require('../models/accountpost');

let setPost=[];
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

function renderPost(post) {
     
    
    const newObjects = [];
    post.forEach((element) => {
      element.public_Post.forEach((Post) => {
        const dateString = new Date(Post.date).toISOString().split("T")[0];
        const t = {
          name: element.name,
          _id: element._id,
          post_id: Post._id,
          title: Post.title,
          image_url: Post.post_url,
          profile_url: element.profile_url,
          date: dateString,
          search: Post.date, // Use this for sorting by date and time
        };
        newObjects.push(t);
      });
    });
     
    const sortedPosts = sortRecentPosts(newObjects);
    const reversePosts =  sortedPosts.reverse();
;
      setPost=reversePosts;
  }






exports.publicPost=async (req, res)=>{

try{ 
    const post = await account.find();
     renderPost(post);

 




   return  res.status(200).json({
        post:setPost,
    });





}

 catch(err)
 {  
        console.log(err);
        return res.status(500).json({
            error: err,
            
        });
 }




}