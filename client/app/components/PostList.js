// 'use client';

// import { useState, useEffect } from 'react';
// import API from '../api/api';
// import jwt from 'jsonwebtoken';

// const PostList = () => {
//   const [posts, setPosts] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await API.get('/posts');
//         setPosts(response.data);
//         console.log(response.data, "posts");
        
//       } catch (err) {
//         setError(err.response?.data?.error || 'An error occurred.');
//       }
//     };

//     fetchPosts();
//   }, []);

//   const handleLike = async (postId) => {
//     try {
//       await API.post(`/posts/${postId}/like`);
//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post.id === postId ? { ...post, likes: post.likes + 1 } : post
//         )
//       );
//       console.log(posts, "posts");
      
//     } catch (err) {
//       alert('Error liking the post');
//     }
//   };

//   return (
//     <div>
//       <h2>Posts</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <ul>
//         {posts.map((post) => (
//           <li key={post.id} style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem' }}>
//             <p>{post.content}</p>
//             <p>
//               By: {post.username} | Likes: {post.likes}{' '}
//               <button onClick={() => handleLike(post.id)}>Like</button>
//             </p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PostList;


'use client';

import { useState, useEffect } from 'react';
import API from '../api/api';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await API.get('/posts');
        // Ensure likes is a number
        const postsWithLikes = response.data.map(post => ({
          ...post,
          likes: Number(post.likes || 0)
        }));
        setPosts(postsWithLikes);
      } catch (err) {
        setError(err.response?.data?.error || 'An error occurred.');
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      const response = await API.post(`/posts/${postId}/like`);
      
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId 
            ? { 
                ...post, 
                likes: response.data.liked 
                  ? post.likes + 1 
                  : post.likes - 1 
              } 
            : post
        )
      );
    } catch (err) {
      alert('Error liking the post');
    }
  };

  return (
    <div>
      <h2>Posts</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem' }}>
            <p>{post.content}</p>
            <p>
              By: {post.username} | Likes: {post.likes}{' '}
              <button onClick={() => handleLike(post.id)}>Like</button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;