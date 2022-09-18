import React from "react";
import pages from "consts/pages";
import { useLocation } from "react-router-dom";
import { useAuthenticationContext } from "contexts/AuthenticationContext";

export function Header() {
  const { pathname } = useLocation();
  const { user } = useAuthenticationContext();

  return (
    <>
      <div className="flex flex-row justify-between items-center h-full pr-4">
        <p className="text-3xl font-semibold text-gray-800">
          {pages.find((page) => page.id === pathname)?.name ?? ""}
        </p>
        <p className="text-gray-800">Olá, {user.username}!</p>
      </div>
    </>
  );
}
