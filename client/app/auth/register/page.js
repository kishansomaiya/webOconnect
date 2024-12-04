// 'use client';

// import { useState } from 'react';
// import API from '../../api/api';

// export default function Register() {
//   const [formData, setFormData] = useState({ username: '', email: '', password: '' });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await API.post('/users/register', formData);
//       alert(response.data.message);
//     } catch (err) {
//       setError(err.response?.data?.error || 'An error occurred.');
//     }
//   };

//   return (
//     <div>
//       <h1>Register</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//         />
//         <button type="submit">Register</button>
//         {error && <p>{error}</p>}
//       </form>
//     </div>
//   );
// }

'use client';
import { useState } from 'react';
import API from '../../api/api';
import { saveToken } from '../../utils/auth';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/users/register', formData);
      // If registration is successful, save the token and redirect to posts
      if (response.data.token) {
        saveToken(response.data.token);
        router.push('/posts');
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred.');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}