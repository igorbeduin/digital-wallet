import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAuthenticationContext } from "contexts/AuthenticationContext";
import { Dashboard, SignUp, Login } from "pages";
import { Home } from "pages/Home";
import { Negotiate } from "pages/Negotiate";
import { Transactions } from "pages/Transactions";

export function RoutesNavigator () {
  const { isSignedIn } = useAuthenticationContext();

  return (
    <>
      <Routes>
        {isSignedIn
          ? (
            <>
              <Route path="*" element={<Navigate to="/home" />} />
              <Route path="/" element={<Dashboard />}>
                <Route path="home" element={<Home />} />
                <Route path="negotiate" element={<Negotiate />} />
                <Route path="transactions" element={<Transactions />} />
              </Route>
            </>
          )
          : (
            <>
              <Route path="*" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </>
          )}
      </Routes>
    </>
  );
}
