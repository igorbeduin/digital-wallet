import React from "react";
import { Outlet } from "react-router-dom";

import { Sidebar } from "components/Sidebar";
import { Header } from "components/Header";

export function Dashboard() {
  return (
    <>
      <div className="bg-slate-50 min-h-screen flex flex-row justify-start items-stretch pr-6">
        <nav className="w-72 min-h-screen flex justify-center items-start">
          <div className="h-full w-full">
            <Sidebar />
          </div>
        </nav>
        <div className="w-full min-h-screen flex flex-col justify-start items-center">
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
