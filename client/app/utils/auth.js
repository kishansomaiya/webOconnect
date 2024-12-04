import jwtDecode from 'jwt-decode';
import jwt from 'jsonwebtoken';

export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const decodeToken = () => {
  const token = getToken();  
  return token ? jwt.decode(token) : null;
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  
  try {
    // const decoded = jwtDecode(token);
    const decoded = jwt.decode(token);
    return decoded.exp * 1000 > Date.now();
  } catch (error) {
    // If token is invalid or cannot be decoded
    return false;
  }
};
