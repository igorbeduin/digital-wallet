import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { BrowserRouter } from "react-router-dom";
import { RoutesNavigator } from "./RoutesNavigator";

function TestEnvironment({children}: {children: React.ReactNode}) {
  return(
    <BrowserRouter>
      {children}
    </BrowserRouter>

  );
}

describe("RoutesNavigator", () => {
  it("should not login successfully", () => {
    render(<TestEnvironment><RoutesNavigator /></TestEnvironment>);
    
    const usernameInput = screen.getByLabelText("username-input") as HTMLInputElement;
    fireEvent.change(usernameInput, {target: {value: "admin"}});
    expect(usernameInput.value).toBe("admin");
    
    const passwordInput = screen.getByLabelText("password-input") as HTMLInputElement;
    fireEvent.change(passwordInput, {target: {value: "admin"}});
    expect(passwordInput.value).toBe("admin");

    const loginButton = screen.getByRole("button", {name: "Login"});
    userEvent.click(loginButton);

    expect(screen.queryByText("Entre com a sua conta")).toBeInTheDocument();
  });

  it("should navigate to signup", () => {
    render(<TestEnvironment><RoutesNavigator /></TestEnvironment>);
    
    expect(screen.queryByText("Entre com a sua conta")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Cadastre-se"));
    expect(screen.queryByText("Faça seu cadastro")).toBeInTheDocument();
  });
});