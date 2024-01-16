import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { Validate } from "./validate";

export const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleOnSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.email.length > 0 && user.password.length > 0) {
      Validate(user);
    }
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };
  return (
    <div className="bg-gray-800 text-white w-60 h-96 p-5 inline-block align-middle rounded-xl  ">
      <form onSubmit={handleOnSubmit} className="flex flex-col justify-between">
        <div className="mb-4">
          <label className="block text-sm font-medium text-white text-center">
            Email
          </label>
          <input
            onChange={handleOnChange}
            value={user.email}
            name="email"
            type="text"
            placeholder="Ingresar email"
            className="text-center w-full p-2 rounded-md bg-gray-700 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label>Contraseña</label>
          <input
            onChange={handleOnChange}
            value={user.password}
            name="password"
            type="password"
            placeholder="ingresar contraseña"
            className="text-center w-full p-2 rounded-md bg-gray-700 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className=" bg-black p-2 rounded-lg text-center hover:bg-white hover:text-black transition duration-500 ease-in-out "
        >
          Ingresar
        </button>
        <a
          onClick={() => navigate("/register")}
          className="mt-28 hover:cursor-pointer p-2 rounded-lg bg-white text-black  hover:text-white  transition duration-500 ease-in-out hover:bg-black"
        >
          Crear nuevo usuario
        </a>
      </form>
    </div>
  );
};
