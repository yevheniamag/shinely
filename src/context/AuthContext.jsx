import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const API_BASE_URL = import.meta.env.VITE_API_URL;
const USERS_API_URL = `${API_BASE_URL}/users`;

const CURRENT_USER_KEY = 'shinely-current-user';

const getInitialUser = () => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);

  useEffect(() => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const response = await fetch(
        `${USERS_API_URL}?email=${email}&password=${password}`
      );

      if (!response.ok) {
        return { success: false, message: 'Помилка сервера при вході.' };
      }

      const users = await response.json();
      const foundUser = users[0];

      if (foundUser) {
        setUser(foundUser);
        return { success: true };
      } else {
        return { success: false, message: 'Неправильний email або пароль' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: "Помилка з'єднання. Перевірте, чи запущено json-server.",
      };
    }
  };
  /* eslint-disable react-refresh/only-export-components */
  const register = async (email, password, firstName, lastName) => {
    try {
      const checkResponse = await fetch(`${USERS_API_URL}?email=${email}`);
      const existingUsers = await checkResponse.json();
      if (existingUsers.length > 0) {
        return { success: false, message: 'Цей email вже зареєстрований!' };
      }

      const newUser = { email, password, firstName, lastName, favorites: [] };

      const postResponse = await fetch(USERS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (postResponse.ok) {
        const createdUser = await postResponse.json();
        setUser(createdUser);
        return { success: true };
      } else {
        return { success: false, message: 'Помилка сервера при реєстрації.' };
      }
    } catch (error) {
      console.error('Register error:', error);
      return {
        success: false,
        message: "Помилка з'єднання. Перевірте, чи запущено json-server.",
      };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const toggleFavorite = async (productId) => {
    if (!user) return;
    const productIdStr = String(productId);
    const isFavorite = user.favorites.includes(productIdStr);
    const newFavorites = isFavorite
      ? user.favorites.filter((id) => id !== productIdStr)
      : [...user.favorites, productIdStr];

    const updatedUser = { ...user, favorites: newFavorites };

    try {
      const patchResponse = await fetch(`${USERS_API_URL}/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favorites: newFavorites }),
      });

      if (patchResponse.ok) {
        setUser(updatedUser);
      } else {
        alert('Помилка оновлення улюблених на сервері.');
      }
    } catch (error) {
      console.error('Favorite update error:', error);
      alert("Помилка з'єднання. Зміни не збережено.");
    }
  };

  const value = { user, login, register, logout, toggleFavorite };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
