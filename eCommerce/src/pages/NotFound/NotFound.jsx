import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Página no encontrada</p>
      <Link
        to="/"
        className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;
