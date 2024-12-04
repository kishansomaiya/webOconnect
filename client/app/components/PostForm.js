'use client';

import { useState } from 'react';
import API from '../api/api';

const PostForm = ({ onPostAdded }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/posts', { content });
      setContent('');
      if (onPostAdded) onPostAdded(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred.');
    }
  };

  return (
    <div>
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="3"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <button type="submit">Post</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default PostForm;
