import { createContext, useContext, useState, useEffect } from 'react';
import * as AuthUtils from './authUtils.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  AuthUtils.initializeUsers();

  const [user, setUser] = useState(AuthUtils.getInitialUser);

  const isLoggedIn = user !== null;

  useEffect(() => {
    if (user) {
      localStorage.setItem(AuthUtils.CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AuthUtils.CURRENT_USER_KEY);
    }
  }, [user]);

  const login = async (email, password) => {
    await AuthUtils.simulateFetchPost();

    const currentUsers = AuthUtils.getUsersFromStorage();
    const foundUser = currentUsers.find((u) => u.email === email);

    if (foundUser && foundUser.password === password) {
      setUser(foundUser);
      return { success: true };
    } else {
      return { success: false, message: 'Неправильний email або пароль' };
    }
  };

  const register = async (email, password, name) => {
    await AuthUtils.simulateFetchPost();

    const currentUsers = AuthUtils.getUsersFromStorage();
    const isEmailTaken = currentUsers.some((u) => u.email === email);

    if (isEmailTaken) {
      return { success: false, message: 'Цей email вже зареєстрований!' };
    }

    const newUser = {
      id: Date.now(),
      email,
      password,
      name,
      favorites: [],
    };

    const newUsersList = [...currentUsers, newUser];
    localStorage.setItem(
      AuthUtils.USERS_STORAGE_KEY,
      JSON.stringify(newUsersList)
    );

    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const toggleFavorite = async (productId) => {
    if (!user) return;

    await AuthUtils.simulateFetchPost(100);

    const isFavorite = user.favorites.includes(productId);
    let newFavorites;

    if (isFavorite) {
      newFavorites = user.favorites.filter((id) => id !== productId);
    } else {
      newFavorites = [...user.favorites, productId];
    }

    const updatedUser = { ...user, favorites: newFavorites };
    setUser(updatedUser);

    const users = AuthUtils.getUsersFromStorage();
    const userIndex = users.findIndex((u) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem(AuthUtils.USERS_STORAGE_KEY, JSON.stringify(users));
    }
  };

  const value = {
    user,
    isLoggedIn,
    login,
    register,
    logout,
    toggleFavorite,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
