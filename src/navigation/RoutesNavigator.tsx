import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAuthenticationContext } from "contexts/AuthenticationContext";
import { Dashboard, SignUp, Login } from "pages";
import { Home } from "pages/Home";
import { Transactions } from "pages/Transactions";
import { LandingPage } from "pages/LandingPage";
import { NotFound } from "pages/NotFound";

export function RoutesNavigator () {
  const { isSignedIn } = useAuthenticationContext();

  return (
    <>
      <Routes>
        {isSignedIn
          ? (
            <>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/" element={<Dashboard />}>
                <Route path="/home" element={<Home />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </>
          )
          : (
            <>
            
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/" element={<LandingPage />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </>
          )}
      </Routes>
    </>
  );
}
