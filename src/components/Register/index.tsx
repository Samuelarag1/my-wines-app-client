import axios from "axios";
import { validateRegister, validateEmail } from "./validateRegister";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    username: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    let newValue;

    if (name === "age") {
      newValue = /^\d*$/.test(value) ? value : "";
    } else {
      newValue = value;
    }
    setUser({
      ...user,
      [name]: newValue,
    });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateEmail(user) && validateRegister(user)) {
      try {
        axios.post("http://localhost:3001/users", user);
        // navigate("/login");
        console.log(user);
        return alert("Usuario Creado");
      } catch (error) {
        return alert("Error al crear Usuario");
      }
    } else {
      return alert("El campo Email o Password no son correctos");
    }
  };

  return (
    <div className="bg-stone-700 h-screen w-screen">
      <div className="bg-zinc-300 text-white centerRegister p-5 rounded-xl flex shadow-xl shadow-black ">
        <form onSubmit={handleOnSubmit}>
          <div className="flex flex-col justify-between items-center gap-2">
            <h1 className="mb-4 text-3xl text-black text-center">
              Crear nuevo usuario
            </h1>
            <div className="w-full text-center grid grid-cols-2 gap-2">
              <div>
                <p className="font-semibold text-lg text-black">Nombre</p>
                <input
                  value={user.name}
                  name="name"
                  type="text"
                  placeholder="Ingrese su nombre"
                  onChange={handleOnChange}
                  className="text-center w-full p-2 rounded-md  bg-zinc-200 focus:outline-double text-black"
                />
              </div>
              <div>
                <p className="font-semibold text-lg text-black">Apellido</p>
                <input
                  value={user.lastname}
                  name="lastname"
                  type="text"
                  placeholder="Ingrese su apellido"
                  onChange={handleOnChange}
                  className="text-center w-full p-2 rounded-md  bg-zinc-200 focus:outline-double text-black"
                />
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-2 text-center">
              <div>
                <p className="font-semibold text-lg text-black">
                  Nombre de usuario
                </p>
                <input
                  value={user.username}
                  name="username"
                  type="text"
                  placeholder="Ingrese un usuario"
                  onChange={handleOnChange}
                  className="text-center w-full p-2 rounded-md  bg-zinc-200 focus:outline-double text-black"
                />
              </div>
              <div>
                <p className="font-semibold text-lg text-black">Edad</p>
                <input
                  type="text"
                  name="age"
                  value={user.age}
                  pattern="[0-9]*"
                  placeholder="Ingrese su edad"
                  onChange={handleOnChange}
                  className=" bg-zinc-200 text-center focus:text-black p-2 w-full rounded-md focus:outline-double text-gray-400"
                />
              </div>
            </div>
            <p className="font-semibold text-lg text-black">Email</p>
            <input
              value={user.email}
              name="email"
              type="text"
              placeholder="Ingrese su mail"
              onChange={handleOnChange}
              className="text-center w-full p-2 rounded-md focus:outline-double bg-zinc-200 text-black"
            />

            <p className="font-semibold text-lg text-black">Contraseña</p>
            <input
              value={user.password}
              name="password"
              type="password"
              placeholder="Ingrese su Contraseña"
              onChange={handleOnChange}
              className="p-2 w-full rounded-md text-center focus:outline-double bg-zinc-200 text-black"
            />

            <p className="font-semibold text-lg text-black">
              Repita la Contraseña
            </p>
            <input
              value={user.confirmPassword}
              name="confirmPassword"
              type="password"
              placeholder="Repita su Contraseña"
              onChange={handleOnChange}
              className="p-2 w-full bg-zinc-200 rounded-md text-center focus:outline-double text-black"
            />

            <button
              type="submit"
              className="mt-10 bg-stone-800 p-2 rounded-lg hover:bg-stone-500 focus:ease-in-out transition duration-500 ease-in-out text-white text-center "
            >
              Crear Nuevo Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
