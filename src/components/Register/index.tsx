import axios from "axios";
import { validateRegister, validateEmail } from "./validateRegister";

import { useState } from "react";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    age: 0,
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateEmail(user) && validateRegister(user)) {
      try {
        axios.post("http://localhost:3001/users", user);
        return alert("Usuario Creado");
      } catch (error) {
        return alert("Error al crear Usuario");
      }
    } else {
      return alert("El campo Email o Password no son correctos");
    }
  };

  return (
    <div className="bg-gray-800 text-black w-60 h-96 p-5 inline-block align-middle rounded-xl  ">
      <h1>Cree su nuevo usuario</h1>
      <form onSubmit={handleOnSubmit}>
        <p>Nombre de usuario</p>
        <input
          value={user.username}
          name="username"
          type="text"
          placeholder="Ingrese un usuario"
          onChange={handleOnChange}
        />

        <p>Email</p>
        <input
          value={user.email}
          name="email"
          type="text"
          placeholder="Ingrese su mail"
          onChange={handleOnChange}
        />
        <p>Edad</p>

        <input
          type="number"
          name="age"
          value={user.age}
          placeholder="Ingrese su edad"
          onChange={handleOnChange}
        />

        <p>Contraseña</p>
        <input
          value={user.password}
          name="password"
          type="password"
          placeholder="Ingrese su Contraseña"
          onChange={handleOnChange}
        />

        <p>Repita la Contraseña</p>
        <input
          value={user.confirmPassword}
          name="confirmPassword"
          type="password"
          placeholder="Repita su Contraseña"
          onChange={handleOnChange}
        />

        <button type="submit">Crear</button>
      </form>
    </div>
  );
};
