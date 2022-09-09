import React from "react";
import { Outlet } from "react-router-dom";

import { Sidebar } from "components/Sidebar";

export function Dashboard() {
  return (
    <>
      <div className="bg-slate-50 h-screen flex flex-row justify-start items-center">
        <nav className="w-80 h-full flex justify-center items-center p-2">
          <div className="bg-slate-100 h-full w-full rounded-lg">
            <Sidebar />
          </div>
        </nav>
        <main className="w-full h-screen flex justify-center items-center p-2">
          <div className="bg-slate-100 h-full w-full rounded-lg">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
