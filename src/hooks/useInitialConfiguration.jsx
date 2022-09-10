import { useEffect } from "react";
import users from "consts/users";
import wallets from "consts/wallets";

export function useInitialConfiguration() {
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("wallets", JSON.stringify(wallets));
  }, []);

  return null;
}
