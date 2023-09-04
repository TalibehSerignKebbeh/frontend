import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  // Store the authentication token in local storage and update the context state
  const storeAuthToken = (token) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
  };

  const clearAuthToken = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{
      authToken,
      storeAuthToken,
      clearAuthToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useContextHook = () => useContext(AuthContext);
