import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthenticationContextProvider } from "./contexts/AuthenticationContext";
import { RoutesNavigator } from "./navigation/RoutesNavigator";

function App() {
  return (
    <BrowserRouter>
      <AuthenticationContextProvider>
        <h1>Digital Wallet</h1>
        <RoutesNavigator />
      </AuthenticationContextProvider>
    </BrowserRouter>
  );
}

export default App;
