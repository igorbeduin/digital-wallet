import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAuthenticationContext } from "../contexts/AuthenticationContext";
import { Dashboard, Login, SignUp } from "../components/pages";

export function RoutesNavigator() {
  const { isSignedIn } = useAuthenticationContext();

  return (
    <>
      <button onClick={() => console.log("isSignedIn", isSignedIn)}>
        isSignedIn
      </button>
      <Routes>
        {isSignedIn ? (
          <Route path="/" element={<Dashboard />} />
        ) : (
          <>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
      </Routes>
    </>
  );
}
