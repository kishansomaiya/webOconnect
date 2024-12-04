// 'use client';

// import Link from 'next/link';
// import { useState, useEffect } from 'react';
// import { decodeToken, isAuthenticated } from '../utils/auth';

// const Navbar = () => {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [username, setUsername] = useState('');

//   useEffect(() => {
//     if (isAuthenticated()) {
//       const user = decodeToken();
//       setLoggedIn(true);
//       setUsername(user.username);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setLoggedIn(false);
//   };

//   return (
//     <nav style={{ padding: '1rem', backgroundColor: '#4CAF50', color: 'white' }}>
//       <Link href="/">Home</Link> |{' '}
//       {loggedIn ? (
//         <>
//           <span>Welcome, {username}</span> | <Link href="/posts">Posts</Link> |{' '}
//           <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
//             Logout
//           </button>
//         </>
//       ) : (
//         <>
//           <Link href="/auth/login">Login</Link> | <Link href="/auth/register">Register</Link>
//         </>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { decodeToken, getToken, isAuthenticated } from '../utils/auth';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (isAuthenticated()) {
      const user = decodeToken();
      setLoggedIn(true);
      setUsername(user.username);
    } else {
      setLoggedIn(false);
      setUsername('');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUsername('');
    router.push('/auth/login');
  };

  return (
    <nav style={{ padding: '1rem', backgroundColor: '#4CAF50', color: 'white' }}>
      <Link href="/">Home</Link> |{' '}
      {loggedIn ? (
        <>
          <span>Welcome, {username}</span> | <Link href="/posts">Posts</Link> |{' '}
          <button 
            onClick={handleLogout} 
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href="/auth/login">Login</Link> | <Link href="/auth/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;