import { useAuthenticationContext } from "contexts/AuthenticationContext";

export function useAuthentication() {
  const { loginUser } = useAuthenticationContext();

  interface UserInterface {
    username: string,
    password: string,
  }

  function login({ username, password }: {username: string, password: string}) {
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    const userFound = !!users.find(
      (user: UserInterface) => user.username === username && user.password === password
    );
    if (userFound) loginUser(username);
    else throw new Error("User not found");
  }

  function signUp({ username, password, passwordValidation }: { username: string, password: string, passwordValidation: string }) {
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    const userFound = !!users.find(
      (user: UserInterface) => user.username === username && user.password === password
    );
    if (userFound) throw new Error("Ops! Parece que esse usuário já existe");
    else if (password !== passwordValidation)
      throw new Error("As senhas devem ser iguais");
    else {
      users.push({
        username,
        password,
      });
      localStorage.setItem("users", JSON.stringify(users));
    }
  }

  function signOut() {}

  return { login, signUp, signOut };
}
