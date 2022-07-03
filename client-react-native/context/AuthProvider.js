import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: (email, password) => {
          // TODO: Communicate with the backend and store token in SecureStore.
          setUser('roks');
        },
        logout: () => {
          setUser(null);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
