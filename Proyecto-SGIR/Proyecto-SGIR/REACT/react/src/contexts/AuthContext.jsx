import React, { createContext, useContext, useState, useEffect } from 'react';
import api from './api'; // Ajusta la ruta si es necesario

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    roles: [],
    user: null,
  });

  useEffect(() => {
    const token = auth.token;
    if (token) {
      const payload = decodeTokenPayload(token);
      if (payload) {
        setAuth({ token, roles: payload.roles || [], user: payload });
      } else {
        logout();
      }
    }
  }, []);

  const decodeTokenPayload = (token) => {
    try {
      const base64Payload = token.split('.')[1];
      const jsonPayload = decodeURIComponent(
        atob(base64Payload)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  };

  const login = (token) => {
    localStorage.setItem('token', token);
    const payload = decodeTokenPayload(token);
    if (payload) {
      setAuth({ token, roles: payload.roles || [], user: payload });
    }
  };

  const logout = () => {
    localStorage.clear();
    setAuth({ token: null, roles: [], user: null });
  };

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        login,
        logout,
        isAuthenticated: !!auth.token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
