import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { useAuthenticationContext } from "contexts/AuthenticationContext";

import pages from "consts/pages";
import { Logo } from "components/Logo";

export function Navbar() {
  const { logout } = useAuthenticationContext();

  return (
    <nav className="fixed bottom-0 md:static flex bg-slate-50 py-4 md:p-0 md:flex-col justify-center items-center w-full shadow md:shadow-none">
      <div className="flex justify-center items-center">
        <Logo />
      </div>
      <ul className="w-full h-full flex md:flex-col gap-10 md:gap-0 justify-center items-start">
        {pages.map((page, index) => (
          <div className="w-24" key={`sidebar-item-${index}`}>
            <Link
              className="flex flex-col md:flex-row justify-start items-center text-gray-800 hover:text-green-500 md:py-2 md:pl-6"
              to={page.id}
            >
              <FontAwesomeIcon icon={page.icon} />
              <p className="md:pl-3 text-center">{page.name}</p>
            </Link>
          </div>
        ))}
        <button
          className="md:mt-6 w-24 flex flex-col md:flex-row justify-start items-center text-gray-800 hover:text-red-500 md:py-2 md:pl-6"
          onClick={logout}
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          <p className="md:pl-3 text-center">Sair</p>
        </button>
      </ul>
    </nav>
  );
}
