import { jwtDecode } from 'jwt-decode';

/**
 * Extracts user details from the JWT token stored in localStorage.
 * @returns {Object|null} Decoded user details or null if token is invalid/missing.
 */
export const getUserDetails = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decodedToken = jwtDecode(token);
    const { id, role, name, email } = decodedToken;

    return {
      id,
      role,
      name: name || 'Guest',
      email: email || 'guest@example.com',
      contact: '9999999999',
    };
  } catch (err) {
    console.error('Error decoding JWT token:', err.message);
    return null;
  }
};