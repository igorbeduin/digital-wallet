import { useEffect } from "react";
import users from "consts/users";

export function useInitialConfiguration() {
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, []);

  return null;
}
