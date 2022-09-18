import React from "react";
import { Outlet } from "react-router-dom";

import { Navbar } from "components/Navbar";
import { Header } from "components/Header";

export function Dashboard() {
  return (
    <>
      <div className="bg-slate-50 min-h-screen flex flex-col-reverse md:flex-row justify-start items-stretch px-4 md:px-0 md:pr-6">
        <div className="w-full h-12 md:w-72 md:min-h-screen flex justify-center items-start">
          <Navbar />
        </div>
        <div className="w-full min-h-screen flex flex-col justify-start items-center pb-10 md:pb-0">
          <header className="h-16 w-full ">
            <Header />
          </header>
          <div className="bg-slate-200 h-fit w-full p-6 rounded-lg">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
