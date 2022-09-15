import React from "react";
import { Outlet } from "react-router-dom";

import { Sidebar } from "components/Sidebar";
import { Header } from "components/Header";

export function Dashboard() {
  return (
    <>
      <div className="bg-slate-50 flex flex-row justify-start items-center">
        <nav className="w-72 h-screen flex justify-center items-center">
          <div className="h-full w-full">
            <Sidebar />
          </div>
        </nav>
        <div className="w-full h-screen mr-4 flex flex-col justify-start items-center">
          <header className="min-h-fit h-16 w-full ">
            <Header />
          </header>
          <div className="bg-slate-200  h-screen w-full p-6 rounded-lg">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
