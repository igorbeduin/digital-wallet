import React, { createContext, useContext, useState } from "react";

const AuthenticationContext = createContext({
  isSignedIn: false,
});

export function AuthenticationContextProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const contextValue = {
    isSignedIn,
    setIsSignedIn,
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
