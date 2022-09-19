import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useUsersDb } from "hooks/useUsersDb";

export function Login() {
  const { validateUser } = useUsersDb();
  const [usernameInputValue, setUsernameInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          try {
            validateUser({
              username: usernameInputValue,
              password: passwordInputValue,
            });
          } catch (err) {
            setLoginError(true);
            if (err instanceof Error) {
              toast.error(err.message);
            }
            setUsernameInputValue("");
            setPasswordInputValue("");
          } finally {
            navigate("/");
          }
        }}
        className="flex w-full flex-col justify-center items-center mt-8 md:w-8/12"
      >
        <p className="text-sm mt-2 mb-2">Entre com a sua conta</p>
        <input
          required
          value={usernameInputValue}
          onChange={(event) => setUsernameInputValue(event.target.value)}
          placeholder="Usuário"
          aria-label="username-input"
          className={
            loginError
              ? "rounded-t-lg p-2 h-10 w-full border border-solid shadow-sm focus:border-red-400 focus:outline-none focus:shadow-sm focus:shadow-red-400"
              : "rounded-t-lg p-2 h-10 w-full border border-solid shadow-sm focus:border-green-400 focus:outline-none focus:shadow-sm focus:shadow-green-400"
          }
        />
        <div className="relative w-full">
          <input
            required
            type={showPassword ? "text" : "password"}
            value={passwordInputValue}
            onChange={(event) => setPasswordInputValue(event.target.value)}
            placeholder="Senha"
            aria-label="password-input"
            className={
              loginError
                ? "rounded-b-lg p-2 h-10 w-full border border-solid shadow-sm focus:border-red-400 focus:outline-none focus:shadow-sm focus:shadow-red-400"
                : "rounded-b-lg p-2 h-10 w-full border border-solid shadow-sm focus:border-green-400 focus:outline-none focus:shadow-sm focus:shadow-green-400"
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
        </div>
        <button
          type="submit"
          className="rounded-lg w-full bg-green-500 text-white py-1 mt-8 hover:bg-green-600"
        >
              Login
        </button>
        <div className="flex flex-row w-full my-4 justify-center items-center">
          <hr className="w-5/12 mx-2" />
          <p>ou</p>
          <hr className="w-5/12 mx-2" />
        </div>
        <Link
          to="/signUp"
          className="text-green-400 hover:underline hover:decoration-solid hover:decoration-1 hover:text-green-500"
        >
              Cadastre-se
        </Link>
      </form>
    </>
  );
}
