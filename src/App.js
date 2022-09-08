import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AuthenticationContextProvider } from "./contexts/AuthenticationContext";
import { RoutesNavigator } from "./navigation/RoutesNavigator";

import { useInitialConfiguration } from "hooks/useInitialConfiguration";

import "react-toastify/dist/ReactToastify.css";

function App() {
  useInitialConfiguration();

  return (
    <BrowserRouter>
      <ToastContainer />
      <AuthenticationContextProvider>
        <RoutesNavigator />
      </AuthenticationContextProvider>
    </BrowserRouter>
  );
}

export default App;
