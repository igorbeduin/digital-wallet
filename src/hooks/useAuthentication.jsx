import { useAuthenticationContext } from "contexts/AuthenticationContext";

export function useAuthentication() {
  const { setIsSignedIn } = useAuthenticationContext();
  function login({ username, password }) {
    const users = JSON.parse(localStorage.getItem("users"));
    const userFound = !!users.find(
      (user) => user.username === username && user.password === password
    );
    if (userFound) setIsSignedIn(true);
    else throw new Error("User not found");
  }

  function signUp({ username, password, passwordValidation }) {
    const users = JSON.parse(localStorage.getItem("users"));
    const userFound = !!users.find(
      (user) => user.username === username && user.password === password
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
