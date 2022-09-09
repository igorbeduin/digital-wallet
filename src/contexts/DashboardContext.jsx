import React, { createContext, useContext, useReducer } from "react";
import {
  faHouse,
  faMoneyBill,
  faMoneyCheck,
} from "@fortawesome/free-solid-svg-icons";

const DashboardContext = createContext({});

const pages = [
  {
    name: "Início",
    id: "home",
    icon: faHouse,
  },
  {
    name: "Negociar",
    id: "negotiate",
    icon: faMoneyBill,
  },
  {
    name: "Extrato de transações",
    id: "transactions",
    icon: faMoneyCheck,
  },
];

const reducerInitialState = {
  pages,
  currentPage: {
    name: "Início",
    id: "home",
    icon: faHouse,
  },
};

function dashboardReducer(prevState, action) {
  switch (action.type) {
    default:
      break;
  }
}

// eslint-disable-next-line react/prop-types
export function DashboardContextProvider({ children }) {
  const [state, dispatch] = useReducer(dashboardReducer, reducerInitialState);

  const contextValue = {
    dashboardPages: state.pages,
    dispatch,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  return useContext(DashboardContext);
}
