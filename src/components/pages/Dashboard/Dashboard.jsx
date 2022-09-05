import React from "react";
import { useAuthenticationContext } from "../../../contexts/AuthenticationContext";

export function Dashboard() {
  const { setIsSignedIn } = useAuthenticationContext();

  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={() => setIsSignedIn(false)}>SignOut</button>
    </>
  );
}
