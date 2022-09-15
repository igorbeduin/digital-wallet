import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuthentication } from "hooks/useAuthentication";
import { useWalletsDb } from "hooks/useWalletsDb";
import { useHistoryDb } from "hooks/useHistoryDb";

export function SignUp() {
  const [usernameInputValue, setUsernameInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [passwordValidationInputValue, setPasswordValidationInputValue] =
    useState("");
  const [signUpError, setSignUpError] = useState(false);

  const navigate = useNavigate();

  const { signUp } = useAuthentication();
  const { initializeUserWallet } = useWalletsDb();
  const { initializeUserHistory } = useHistoryDb();

  return (
    <>
      <div className="bg-slate-50 h-screen flex flex-row justify-center items-start py-32">
        <div className="h-fit-content w-8/12 max-w-screen-md flex flex-col justify-center items-center p-2">
          <div className="mb-2 flex flex-col justify-center items-center">
            <p className="text-5xl">LOGO</p>
            <p className="text-lg">Faça seu cadastro</p>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              try {
                signUp({
                  username: usernameInputValue,
                  password: passwordInputValue,
                  passwordValidation: passwordValidationInputValue,
                });
                initializeUserWallet({ userId: usernameInputValue });
                initializeUserHistory({ userId: usernameInputValue });
                toast.success("Usuário criado com sucesso!");
                navigate("/login");
              } catch (err) {
                setSignUpError(true);
                toast.error(err.message);
                setUsernameInputValue("");
                setPasswordInputValue("");
                setPasswordValidationInputValue("");
              }
            }}
            className="flex  w-8/12 flex-col justify-center items-center"
          >
            <input
              required
              value={usernameInputValue}
              onChange={(event) => setUsernameInputValue(event.target.value)}
              placeholder="Username"
              className={
                signUpError
                  ? "rounded-lg my-2 p-2 h-10 w-full border border-solid shadow-sm focus:border-red-400 focus:outline-none focus:shadow-sm focus:shadow-red-400"
                  : "rounded-lg my-2 p-2 h-10 w-full border border-solid shadow-sm focus:border-green-400 focus:outline-none focus:shadow-sm focus:shadow-green-400"
              }
            />
            <input
              required
              value={passwordInputValue}
              onChange={(event) => setPasswordInputValue(event.target.value)}
              placeholder="Senha"
              className={
                signUpError
                  ? "rounded-lg my-2 p-2 h-10 w-full border border-solid shadow-sm focus:border-red-400 focus:outline-none focus:shadow-sm focus:shadow-red-400"
                  : "rounded-lg my-2 p-2 h-10 w-full border border-solid shadow-sm focus:border-green-400 focus:outline-none focus:shadow-sm focus:shadow-green-400"
              }
            />
            <input
              required
              value={passwordValidationInputValue}
              onChange={(event) =>
                setPasswordValidationInputValue(event.target.value)
              }
              placeholder="Confirme sua senha"
              className={
                signUpError
                  ? "rounded-lg my-2 p-2 h-10 w-full border border-solid shadow-sm focus:border-red-400 focus:outline-none focus:shadow-sm focus:shadow-red-400"
                  : "rounded-lg my-2 p-2 h-10 w-full border border-solid shadow-sm focus:border-green-400 focus:outline-none focus:shadow-sm focus:shadow-green-400"
              }
            />
            <button
              type="submit"
              className="rounded-lg w-full bg-green-400 text-white py-1 mt-8 hover:bg-green-500"
            >
              Cadastrar
            </button>
            <Link
              to="/login"
              className="my-4 text-green-400 hover:underline hover:decoration-solid hover:decoration-1 hover:text-green-500"
            >
              Voltar para login
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
