// Create a new context for the authentication token
import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

// Create a new provider component for the authentication token context
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  // Store the authentication token in local storage and update the context state
  const storeAuthToken = (token) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
  };

  // Remove the authentication token from local storage and update the context state
  const clearAuthToken = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
  };

  // Return the provider with the authentication token state and store/clear functions
  return (
    <AuthContext.Provider value={{ authToken, storeAuthToken, clearAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to access the authentication token context
export const useContextHook = () => useContext(AuthContext);
