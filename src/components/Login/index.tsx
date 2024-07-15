import { useNavigate } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import "../../styles.css";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { UserLoginDTO } from "../../models/IMUser";
import { IAlertProps } from "../../Alerts/Alert";
import AlertComponent from "../../Alerts/Alert";
import { Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [inputErrors, setInputErrors] = useState({
    email: "",
    password: "",
  });

  const [userLogin, setUserLogin] = useState<UserLoginDTO>({
    password: "",
    email: "",
  });

  const [alertProps, setAlertProps] = useState<IAlertProps>({
    message: "",
    severity: "info",
    title: "",
  });

  useEffect(() => {
    if (alertProps.message.length > 0) {
      setTimeout(() => {
        setAlertProps({
          message: "",
          severity: "info",
          title: "",
        });
      }, 1500);
    }
  }, [alertProps]);

  const handleOnSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const errors = {
        email: userLogin.email ? "" : "Requiere el email",
        password: userLogin.password ? "" : "Requiere la contraseña",
      };
      setInputErrors(errors);

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

    if (value.length === 0) {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `El campo ${name} no puede estar vacio`,
      }));
    } else {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  return (
    <>
      <div className=" h-screen w-screen">
        <div className="fondoLogin"></div>
        {alertProps.title ? (
          <>
            <div className="top-ever">
              <AlertComponent
                message={alertProps.message}
                severity={alertProps.severity}
                title={alertProps.title}
              />
            </div>
          </>
        ) : (
          ""
        )}
        <div className="bg-stone-900  text-white p-5 rounded-xl flex shadow-black shadow-xl centerLogin">
          <form
            onSubmit={handleOnSubmit}
            className="flex flex-col justify-between"
          >
            <h1 className="mb-4 text-3xl text-center text-white">Login</h1>
            <div className="mb-4">
              <label className="font-semibold text-xl text-white">Email</label>
              <input
                onChange={handleOnChange}
                value={userLogin.email}
                name="email"
                type="text"
                placeholder="Ingresar email"
                className="text-center w-full p-2 text-black text-lg rounded-md bg-gray-500  placeholder:text-black focus:outline-none "
              />
              {inputErrors.email ? (
                <label className="input-required">{inputErrors.email}</label>
              ) : (
                ""
              )}
            </div>
            <div className="mb-4">
              <label className="font-semibold text-xl text-white">
                Contraseña
              </label>
              <input
                onChange={handleOnChange}
                value={userLogin.password}
                name="password"
                type="password"
                placeholder="Ingresar contraseña"
                className="text-center w-full text-black p-2  text-lg rounded-md bg-gray-500  placeholder:text-black focus:outline-none"
              />
              {inputErrors.password ? (
                <label className="input-required">{inputErrors.password}</label>
              ) : (
                ""
              )}
            </div>
            <button
              type="submit"
              className=" bg-stone-800 p-2 rounded-lg text-center hover:bg-opacity-80 hover:text-black transition duration-500 ease-in-out"
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
        <div className="top-ever  h-full  p-5">
          <Tooltip
            title="Paisaje de Las Compuertas. Luján de Cuyo, provincia de Mendoza, Argentina"
            className="bg-slate-100 "
          >
            <InfoIcon
              sx={{ fontSize: 50 }}
              color="info"
              className="bg-black h-[55px] rounded-[100%]"
            />
          </Tooltip>
        </div>
      </div>
    </>
  );
};
