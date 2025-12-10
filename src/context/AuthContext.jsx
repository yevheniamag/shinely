import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3004';

const TOKEN_KEY = 'shinely-auth-token';
const USER_KEY = 'shinely-current-user';

const getInitialUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

const getInitialToken = () => {
  return localStorage.getItem(TOKEN_KEY) || null;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);
  const [token, setToken] = useState(getInitialToken);

  useEffect(() => {
    if (user && token) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [user, token]);

  const fetchWithAuth = async (url, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return fetch(url, { ...options, headers });
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.message || 'Помилка сервера',
        };
      }

      const { token: newToken, user: userData } = await response.json();

      setUser(userData);
      setToken(newToken);

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: "Помилка з'єднання." };
    }
  };

  /* eslint-disable react-refresh/only-export-components */
  const register = async (email, password, firstName, lastName) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.message || 'Помилка сервера',
        };
      }

      const { token: newToken, user: userData } = await response.json();

      setUser(userData);
      setToken(newToken);

      return { success: true };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, message: "Помилка з'єднання." };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  const toggleFavorite = async (productId) => {
    if (!user) return;

    const productIdStr = String(productId);
    const isFavorite = user.favorites.includes(productIdStr);
    const newFavorites = isFavorite
      ? user.favorites.filter((id) => id !== productIdStr)
      : [...user.favorites, productIdStr];

    const oldUser = user;
    const updatedUser = { ...user, favorites: newFavorites };
    setUser(updatedUser);

    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/users/favorites`, {
        method: 'PATCH',
        body: JSON.stringify({ favorites: newFavorites }),
      });

      if (!response.ok) {
        setUser(oldUser);
        alert('Помилка оновлення улюблених на сервері.');
      } else {
        const actualUser = await response.json();
        setUser(actualUser);
      }
    } catch (error) {
      console.error('Favorite update error:', error);
      setUser(oldUser);
      alert("Помилка з'єднання. Зміни не збережено.");
    }
  };

  const value = { user, login, register, logout, toggleFavorite };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
