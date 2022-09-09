import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { useAuthenticationContext } from "contexts/AuthenticationContext";
import { useDashboardContext } from "contexts/DashboardContext";

export function Sidebar() {
  const { setIsSignedIn } = useAuthenticationContext();
  const { dashboardPages } = useDashboardContext();

  return (
    <>
      <div className="flex justify-center items-center my-4">
        <p className="text-5xl">LOGO</p>
      </div>
      <div className="p-4">
        <hr />
      </div>
      <ul>
        {dashboardPages.map((page, index) => (
          <div key={`sidebar-item-${index}`}>
            <Link
              className="flex hover:text-lg justify-start items-center hover:text-green-500 rounded-lg py-2 pl-6"
              to={page.id}
            >
              <FontAwesomeIcon icon={page.icon} />
              <p className="pl-3">{page.name}</p>
            </Link>
          </div>
        ))}
      </ul>
      <div className="p-4">
        <hr />
      </div>
      <button
        className="flex w-full hover:text-lg justify-start items-center hover:text-red-500 rounded-lg py-2 pl-6"
        onClick={() => setIsSignedIn(false)}
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
        <p className="pl-3">Sair</p>
      </button>
    </>
  );
}
