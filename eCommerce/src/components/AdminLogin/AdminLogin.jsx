import React, { useState } from "react";
import { login } from "../../utils/api";
import { useNavigate, useLocation } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      if (location.pathname === "/login") {
        navigate("/admin");
      } else {
        window.location.reload();
      }
    } catch (err) {
      setError("Datos incorrectos, ingresa de vuelta tu usuario y contraseña.");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col py-8">
        <h2 className="text-2xl text-pink-600">Ingresar a Sitio Sports</h2>
        <form onSubmit={handleLogin}
        className="space-y-2"
        >
          <div>
            <label
            className="mr-1"
            >Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-auto px-2 py-1 border border-pink-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-700"
            />
          </div>
          <div>
            <label
                        className="mr-1"
            >Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-auto px-2 py-1 border border-pink-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-700"
            />
          </div>
          {error && <p>{error}</p>}
          <button type="submit"
          className="border-[1px] px-2 py-1 rounded-xl border-gray-700 bg-gray-100 hover:bg-pink-600 duration-300 text-gray-900 hover:text-gray-100"
          >Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
