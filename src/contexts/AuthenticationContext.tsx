import React, { createContext, useContext, useState } from "react";
import { useWalletsDb } from "hooks/useWalletsDb";

const AuthenticationContext = createContext({
  isSignedIn: false,
});

// eslint-disable-next-line react/prop-types
export function AuthenticationContextProvider({ children }: {children: React.ReactNode}) {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [user, setUser] = useState({username: "", wallet: {}});
  const { getUserWallet, setUserWallet } = useWalletsDb();

  if (isSignedIn && !user.username) logout();

  function loginUser(userId: string) {
    const userWallet = getUserWallet({userId});
    setUser({ username: userId, wallet: { ...userWallet } });
    setIsSignedIn(true);
  }

  function logout() {
    setUser({username: "", wallet: {}});
    setIsSignedIn(false);
  }

  function updateUserWallet(newWallet: object) {
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
