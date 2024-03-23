import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { Validate } from "./validate";
import "../../styles.css";
import axios from "axios";
export const Login = () => {
  const navigate = useNavigate();
  const [user, setUsers] = useState({
    email: "",
    password: "",
  });

  const handleOnSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (user.email.length > 0 && user.password.length > 0) {
        Validate(user);
        try {
          const response = await axios.post(
            "http://localhost:3000/users/login",
            user
          );
          if (response.data) {
            return navigate("/home");
          }
        } catch (error) {
          alert("no existe en db");
        }
      }
    },
    [user, navigate]
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUsers({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className=" h-screen w-screen bg-stone-700 pattern">
      <div className="bg-zinc-300 text-white p-5 rounded-xl flex shadow-black shadow-xl centerLogin">
        <form
          onSubmit={handleOnSubmit}
          className="flex flex-col justify-between"
        >
          <h1 className="mb-4 text-3xl text-center text-black">Login</h1>
          <div className="mb-4">
            <label className="font-semibold text-xl text-black">Email</label>
            <input
              onChange={handleOnChange}
              value={user.email}
              name="email"
              type="text"
              placeholder="Ingresar email"
              className="text-center w-full p-2 text-black text-lg rounded-md bg-zinc-200 focus:outline-double"
            />
          </div>
          <div className="mb-4">
            <label className="font-semibold text-xl text-black">
              Contraseña
            </label>
            <input
              onChange={handleOnChange}
              value={user.password}
              name="password"
              type="password"
              placeholder="ingresar contraseña"
              className="text-center w-full text-black p-2  text-lg rounded-md bg-zinc-200 focus:outline-double"
            />
          </div>
          <button
            type="submit"
            className=" bg-stone-800 p-2 rounded-lg text-center hover:bg-opacity-80 hover:text-white transition duration-500 ease-in-out"
            onClick={() => navigate("/home")}
          >
            Ingresar
          </button>
          <a
            // onClick={() => navigate("/register")}
            className="mt-28 hover:cursor-pointer p-2 rounded-lg bg-stone-800 text-white  transition duration-500 ease-in-out hover:bg-opacity-80 text-center"
          >
            Crear nuevo usuario
          </a>
        </form>
      </div>
    </div>
  );
};
