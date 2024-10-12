import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/api/profile', { withCredentials: true }) // Ensure cookies are sent with the request
      .then(({ data }) => setUser(data)) // Set user on successful profile fetch
      .catch(() => setUser(null)); // Set to null on failure
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
