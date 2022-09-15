import { useWalletsDb } from "hooks/useWalletsDb";
import { isEmpty } from "lodash";
import React, { createContext, useContext, useState } from "react";

const AuthenticationContext = createContext({
  isSignedIn: false,
});

// eslint-disable-next-line react/prop-types
export function AuthenticationContextProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [user, setUser] = useState({});
  const { getUserWallet, setUserWallet } = useWalletsDb();

  if (isSignedIn && isEmpty(user)) logout();

  function loginUser(userId) {
    const userWallet = getUserWallet(userId);
    setUser({ username: userId, wallet: { ...userWallet } });
    setIsSignedIn(true);
  }

  function logout() {
    setUser({});
    setIsSignedIn(false);
  }

  function updateUserWallet(newWallet) {
    setUser((prev) => ({ ...prev, wallet: newWallet }));
    setUserWallet({ userId: user.username, newWallet });
  }

  const contextValue = {
    isSignedIn,
    user,
    loginUser,
    logout,
    updateUserWallet,
  };

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthenticationContext() {
  return useContext(AuthenticationContext);
}
