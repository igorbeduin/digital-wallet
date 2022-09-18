import React from "react";
import { Outlet } from "react-router-dom";

import { Logo } from "components/Logo";


export function LandingPage() {
  return (
    <>
      <div className="bg-slate-50 min-h-screen h-fit flex flex-row justify-center items-start">
        <div className="h-fit-content w-9/12 max-w-screen-md flex flex-col justify-center items-center p-2">
          <div className="mb-2 flex flex-col justify-center items-center">
            <Logo size="big"/>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
