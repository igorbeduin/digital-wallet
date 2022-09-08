import React from "react";
import { useAuthenticationContext } from "contexts/AuthenticationContext";

export function Dashboard() {
  const { setIsSignedIn } = useAuthenticationContext();

  return (
    <>
      <div className="bg-slate-50 h-screen flex flex-row justify-start items-center">
        <nav className="w-80 h-full flex justify-center items-center">
          <div className="bg-red-200 h-5/6 w-11/12 rounded-lg">
            <button onClick={() => setIsSignedIn(false)}>Logout</button>
          </div>
        </nav>
        <main className="w-full h-screen flex justify-center items-center">
          <div className="bg-green-200 h-5/6 w-11/12 rounded-lg"></div>
        </main>
      </div>
    </>
  );
}
