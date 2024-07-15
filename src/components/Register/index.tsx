import axios from "axios";
import { validateRegister, validateEmail } from "./validateRegister";
import { IMUser } from "../../models/IMUser";

import "react-notifications-component/dist/theme.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertComponent, { IAlertProps } from "../../Alerts/Alert";

export const Register = () => {
  const [user, setUser] = useState<IMUser>({
    name: "",
    email: "",
    age: undefined,
    password: "",
    image: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertProps, setAlertProps] = useState<IAlertProps>({
    message: "",
    severity: "info",
    title: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
    setUser({
      ...user,
      [name]: name === "age" ? parseInt(value) : value,
    });
  };

  const crearUsuario = async () => {
    try {
      await axios.post("http://localhost:3000/users", user, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAlertProps({
        message: "Usuario creado correctamente",
        severity: "success",
        title: "Redirigiendo al Login",
      });
      setTimeout(() => {
        navigate("/login");
      }, 500);
      setUser({
        name: "",
        email: "",
        age: undefined,
        password: "",
        image: "",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.response.data.message);
      const mensaje = error.response.data.message.split(" ");
      const subArray = mensaje.slice(0, 5); // Esto tomará los elementos del 0 al 4
      const mensajeDefinitivo = subArray.join(" ");

      setAlertProps({
        message: mensajeDefinitivo,
        severity: "error",
        title: "Algo salio mal",
      });
    }
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (validateEmail(user) && validateRegister(user)) {
        await crearUsuario();
      } else {
        setAlertProps({
          message: "El campo Email o Password no son correctos",
          severity: "error",
          title: "Algo salio mal",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="bg-stone-700 h-screen w-screen pattern overflow-hidden">
      {alertProps.message.length > 0 ? (
        <AlertComponent
          message={alertProps.message}
          severity={alertProps.severity}
          title={alertProps.title}
        ></AlertComponent>
      ) : (
        ""
      )}
      <div className="bg-zinc-300 text-white centerRegister p-10 rounded-xl flex shadow-xl shadow-black ">
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
                <p className="font-semibold text-lg text-black">Edad</p>
                <input
                  type="number"
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
              value={confirmPassword}
              name="confirmPassword"
              type="password"
              placeholder="Repita su Contraseña"
              onChange={handleOnChange}
              className="p-2 w-full bg-zinc-200 rounded-md text-center focus:outline-double text-black"
            />

            <input
              type="file"
              name="image"
              className="text-black"
              value={user.image}
              onChange={handleOnChange}
            />
            <div className="grid grid-cols-2 items-center gap-2">
              <button
                type="submit"
                className=" bg-stone-800 p-2 mt-6 rounded-lg hover:bg-stone-500 focus:ease-in-out transition duration-500 ease-in-out text-white text-center "
              >
                Crear Usuario
              </button>
              <button
                className="bg-stone-800 p-2 mt-6 rounded-lg hover:bg-stone-500 focus:ease-in-out transition duration-500 ease-in-out text-white text-center "
                onClick={() => navigate("/login")}
              >
                Tengo un usuario
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
