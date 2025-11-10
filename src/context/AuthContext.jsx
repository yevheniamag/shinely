import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const USERS_API_URL = 'http://localhost:3004/users';
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
      const response = await fetch(`${USERS_API_URL}?email=${email}`);

      if (!response.ok) {
        return { success: false, message: 'Помилка сервера при вході.' };
      }

      const users = await response.json();
      const foundUser = users[0];

      if (foundUser && foundUser.password === password) {
        setUser(foundUser);
        return { success: true };
      } else {
        return { success: false, message: 'Неправильний email або пароль' };
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(
        "Помилка з'єднання. Перевірте, чи запущено json-server (npm run server)."
      );
      return { success: false, message: "Помилка з'єднання." };
    }
  };

  /* eslint-disable react-refresh/only-export-components */
  const register = async (email, password, name) => {
    try {
      const checkResponse = await fetch(`${USERS_API_URL}?email=${email}`);
      const existingUsers = await checkResponse.json();
      if (existingUsers.length > 0) {
        return { success: false, message: 'Цей email вже зареєстрований!' };
      }

      const newUser = { email, password, name, favorites: [] };

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
      alert("Помилка з'єднання. Перевірте, чи запущено json-server.");
      return { success: false, message: "Помилка з'єднання." };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const toggleFavorite = async (productId) => {
    if (!user) return;

    const isFavorite = user.favorites.includes(productId);
    const newFavorites = isFavorite
      ? user.favorites.filter((id) => id !== productId)
      : [...user.favorites, productId];

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
