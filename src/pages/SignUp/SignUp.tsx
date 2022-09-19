import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useUsersDb } from "hooks/useUsersDb";
import { useWalletsDb } from "hooks/useWalletsDb";
import { useHistoryDb } from "hooks/useHistoryDb";

export function SignUp() {
  const [usernameInputValue, setUsernameInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [passwordValidationInputValue, setPasswordValidationInputValue] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { createUser } = useUsersDb();
  const { initializeUserWallet } = useWalletsDb();
  const { initializeUserHistory } = useHistoryDb();

  const passwordMinLength = 8;

  function handlePasswordInputChange(value: string) {
    setPasswordInputValue(value);
    if (value.length < passwordMinLength) {
      setSignUpError(`A senha deve conter no mínimo ${passwordMinLength}`);
    } else {
      setSignUpError("");
    }
  }

  function handlePasswordValidationInputChange(value: string) {
    setPasswordValidationInputValue(value);
    if (value !== passwordInputValue) {
      setSignUpError("As senhas devem ser iguais");
    } else if (value.length < passwordMinLength) {
      setSignUpError(`A senha deve conter no mínimo ${passwordMinLength}`);
    } else {
      setSignUpError("");
    }
  }

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          try {
            createUser({
              username: usernameInputValue,
              password: passwordInputValue,
              passwordValidation: passwordValidationInputValue,
            });
            initializeUserWallet({ userId: usernameInputValue });
            initializeUserHistory({ userId: usernameInputValue });
            toast.success("Usuário criado com sucesso!");
            navigate("/login");
          } catch (err) {
            if (err instanceof Error) {
              toast.error(err.message);
            }
            setUsernameInputValue("");
            setPasswordInputValue("");
            setPasswordValidationInputValue("");
          }
        }}
        className="flex w-full flex-col justify-center items-center mt-8 md:w-8/12"
      >
        <p className="text-sm mt-2 mb-2">Faça seu cadastro</p>
        <p className="mb-2 justify-self-start">Escolha um nome de Usuário</p>
        <input
          required
          value={usernameInputValue}
          onChange={(event) => setUsernameInputValue(event.target.value)}
          placeholder="Usuário"
          className={
            signUpError
              ? "rounded-lg mb-5 p-2 h-10 w-full border border-solid shadow-sm focus:border-red-400 focus:outline-none focus:shadow-sm focus:shadow-red-400"
              : "rounded-lg mb-5 p-2 h-10 w-full border border-solid shadow-sm focus:border-green-400 focus:outline-none focus:shadow-sm focus:shadow-green-400"
          }
        />
        <p className="justify-self-start">Escolha uma Senha</p>
        <p className="mb-2 text-xs justify-self-start font-extralight">Sua senha deve conter ao menos 8 dígitos</p>
        <div className="relative w-full">
          <input
            required
            type={showPassword ? "text" : "password"}
            value={passwordInputValue}
            onChange={(event) => handlePasswordInputChange(event.target.value)}
            placeholder="Senha"
            className={
              signUpError
                ? "rounded-t-lg m-t-2 p-2 h-10 w-full border border-solid shadow-sm focus:border-red-400 focus:outline-none focus:shadow-sm focus:shadow-red-400"
                : "rounded-t-lg m-t-2 p-2 h-10 w-full border border-solid shadow-sm focus:border-green-400 focus:outline-none focus:shadow-sm focus:shadow-green-400"
            }
          />
          <input
            required
            type={showPassword ? "text" : "password"}
            value={passwordValidationInputValue}
            onChange={(event) =>
              handlePasswordValidationInputChange(event.target.value)
            }
            placeholder="Confirme sua senha"
            className={
              signUpError
                ? "rounded-b-lg mb-2 p-2 h-10 w-full border border-solid shadow-sm focus:border-red-400 focus:outline-none focus:shadow-sm focus:shadow-red-400"
                : "rounded-b-lg mb-2 p-2 h-10 w-full border border-solid shadow-sm focus:border-green-400 focus:outline-none focus:shadow-sm focus:shadow-green-400"
            }
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-2 right-4"
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </button>
          <p className="text-red-500">{signUpError}</p>
        </div>
        <button
          type="submit"
          disabled={!!signUpError}
          className={signUpError ? "rounded-lg w-full bg-green-300 text-white py-1 mt-8 " : "rounded-lg w-full bg-green-500 text-white py-1 mt-8 hover:bg-green-600"}
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
    </>
  );
}
