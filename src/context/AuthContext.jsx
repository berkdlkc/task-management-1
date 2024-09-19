import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
      } else {
        dispatch({ type: 'LOGIN', payload: { user: decodedToken } });
      }
    }
  }, [navigate]);

  const login = (token) => {
    const decodedToken = jwtDecode(token);
    localStorage.setItem('token', token);
    dispatch({ type: 'LOGIN', payload: { user: decodedToken } });
    navigate(`/${decodedToken.role}`);
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
