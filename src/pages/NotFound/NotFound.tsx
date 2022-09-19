import React from "react";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-3xl text-center">Ops! Parece que essa página não existe.</p>
      <Link to="/" className="text-green-500 hover:underline hover:decoration-solid hover:decoration-1 hover:text-green-600 mt-2">Clique aqui para voltar</Link>
    </div>
  );
}
