import React, { createContext, useContext, useState } from "react";

import { WalletInterface } from "consts/wallets";
import { useWalletsDb } from "hooks/useWalletsDb";
import { useNavigate } from "react-router-dom";

interface AuthenticationContextInterface {
  isSignedIn: boolean
  user: {username: string, wallet: WalletInterface}
  loginUser: (userId: string) => void | (() => void)
  logout: () => void
  updateUserWallet: (newWallet: WalletInterface) => void | (() => void)
}

const initialContext: AuthenticationContextInterface = {
  isSignedIn: false,
  user: {username: "", wallet: { currencies: {}}},
  loginUser: () => {},
  logout: () => {},
  updateUserWallet: () => {},
};

const AuthenticationContext = createContext(initialContext);

export function AuthenticationContextProvider({ children }: {children: React.ReactNode}) {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [user, setUser] = useState({username: "", wallet: { currencies: {}}});
  const { getUserWallet, setUserWallet } = useWalletsDb();
  const navigate = useNavigate();

  if (isSignedIn && !user.username) logout();

  function loginUser(userId: string) {
    const userWallet = getUserWallet({userId});
    setUser({ username: userId, wallet: { ...userWallet } });
    setIsSignedIn(true);
  }

  function logout() {
    setUser({username: "", wallet: { currencies: {}}});
    setIsSignedIn(false);
    navigate("/");
  }

  function updateUserWallet(newWallet: WalletInterface) {
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
