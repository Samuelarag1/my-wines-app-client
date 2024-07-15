import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import "../../styles.css";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { UserLoginDTO } from "../../models/IMUser";
import { IAlertProps } from "../../Alerts/Alert";
import AlertComponent from "../../Alerts/Alert";

export const Login = () => {
  const { login } = useAuth();

  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState<UserLoginDTO>({
    password: "",
    email: "",
  });

  const [alertProps, setAlertProps] = useState<IAlertProps>({
    message: "",
    severity: "info",
    title: "",
  });

  const handleOnSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (userLogin.email.length > 0 && userLogin.password.length > 0) {
        try {
          const response = await axios.post(
            "http://localhost:3000/auth/login",
            userLogin
          );

          if (response.status === 200) {
            login(response.data);
            setAlertProps({
              message: "Login correcto",
              severity: "success",
              title: "REDIRIGIENDOTE",
            });
            setTimeout(() => {
              navigate("/home");
            }, 1500);
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch ({ response }: any) {
          setAlertProps({
            message: response.data.message,
            severity: "warning",
            title: "WARNING",
          });
        }
      }
    },
    [userLogin, login, navigate]
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserLogin({
      ...userLogin,
      [name]: value,
    });
  };

  return (
    <div className=" h-screen w-screen bg-stone-700 pattern">
      {alertProps.title ? (
        <AlertComponent
          message={alertProps.message}
          severity={alertProps.severity}
          title={alertProps.title}
        />
      ) : (
        ""
      )}
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
              value={userLogin.email}
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
              value={userLogin.password}
              name="password"
              type="password"
              placeholder="ingresar contraseña"
              className="text-center w-full text-black p-2  text-lg rounded-md bg-zinc-200 focus:outline-double"
            />
          </div>
          <button
            type="submit"
            className=" bg-stone-800 p-2 rounded-lg text-center hover:bg-opacity-80 hover:text-white transition duration-500 ease-in-out"
            onClick={() => handleOnSubmit}
          >
            Ingresar
          </button>
          <a
            onClick={() => navigate("/register")}
            className="mt-28 hover:cursor-pointer p-2 rounded-lg bg-stone-800 text-white  transition duration-500 ease-in-out hover:bg-opacity-80 text-center"
          >
            Crear nuevo usuario
          </a>
        </form>
      </div>
    </div>
  );
};
