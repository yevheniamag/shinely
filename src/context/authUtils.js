export const USERS_STORAGE_KEY = 'shinely-users';
export const CURRENT_USER_KEY = 'shinely-current-user';

export const INITIAL_USERS = [
  {
    id: 1,
    email: 'yev@gmail.com',
    password: '123',
    name: 'yev',
    favorites: [],
  },
  {
    id: 2,
    email: 'user@gmail.com',
    password: 'password',
    name: 'User',
    favorites: [],
  },
];

export const initializeUsers = () => {
  if (!localStorage.getItem(USERS_STORAGE_KEY)) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_USERS));
  }
};

export const getUsersFromStorage = () => {
  const users = localStorage.getItem(USERS_STORAGE_KEY);
  return users ? JSON.parse(users) : [];
};

export const getInitialUser = () => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const simulateFetchPost = (delay = 500) => {
  return new Promise((resolve) => setTimeout(resolve, delay)).then(() => {
    return { success: true };
  });
};
