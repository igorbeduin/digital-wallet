import { useEffect } from "react";
import users from "consts/users";
import wallets from "consts/wallets";
import historyEntries from "consts/historyEntries";

export function useInitialConfiguration() {
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("wallets", JSON.stringify(wallets));
    localStorage.setItem("history", JSON.stringify(historyEntries));
  }, []);

  return null;
}
