import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AuthenticationContextProvider } from "contexts/AuthenticationContext";
import { DashboardContextProvider } from "contexts/DashboardContext";
import { RoutesNavigator } from "navigation/RoutesNavigator";

import { useInitialConfiguration } from "hooks/useInitialConfiguration";

import "react-toastify/dist/ReactToastify.css";

function App() {
  useInitialConfiguration();

  return (
    <BrowserRouter>
      <ToastContainer />
      <DashboardContextProvider>
        <AuthenticationContextProvider>
          <RoutesNavigator />
        </AuthenticationContextProvider>
      </DashboardContextProvider>
    </BrowserRouter>
  );
}

export default App;
