import axios from "axios";
import { validateEmail } from "./validateRegister";
import { IMUser } from "../../models/IMUser";
import "react-notifications-component/dist/theme.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertComponent, { IAlertProps } from "../../Alerts/Alert";
import { Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

import { UploadOutlined } from "@ant-design/icons";
import Upload, { UploadProps } from "antd/es/upload";
import Button from "antd/es/button";
import { message } from "antd";

export const Register = () => {
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");

  const [user, setUser] = useState<IMUser>({
    name: "",
    email: "",
    age: "",
    password: "",
    image: "", // Puede ser opcional
  });
  const [alertProps, setAlertProps] = useState<IAlertProps>({
    message: "",
    severity: "info",
    title: "",
  });

  const [inputErrors, setInputErrors] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
    image: "",
    confirmPassword: "",
  });

  const [file, setFile] = useState<File | null>(null);

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

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    if (name === "confirmPassword") {
      setConfirmPassword(value);
      if (value === "") {
        setInputErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `Necesita completar este campo`,
        }));
      }
    } else {
      setUser({
        ...user,
        [name]: name === "age" ? parseInt(value) : value,
      });
    }

    if (value.length === 0) {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `Necesita completar este campo`,
      }));
    } else {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = {
      name: user.name ? "" : "Requiere este campo",
      age: user.age ? "" : "Requiere este campo",
      email: user.email ? "" : "Requiere este campo",
      password: user.password ? "" : "Requiere este campo",
      image: user.image ? "" : "Requiere este campo",
      confirmPassword: confirmPassword ? "" : "Requiere este campo",
    };
    setInputErrors(errors);
    try {
      if (validateEmail(user.email)) {
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

  const crearUsuario = async () => {
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("age", user.age.toString());
    formData.append("password", user.password);

    if (file) {
      formData.append("image", file);
    }

    try {
      await axios.post("http://localhost:3001/users", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAlertProps({
        message: "Usuario creado correctamente",
        severity: "success",
        title: "Redirigiendo al Login",
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);

      setUser({
        name: "",
        email: "",
        age: "",
        password: "",
        image: "",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.response.data.message);
      const mensaje = error.response.data.message.split(" ");
      const subArray = mensaje.slice(0, 5);
      const mensajeDefinitivo = subArray.join(" ");

      setAlertProps({
        message: mensajeDefinitivo,
        severity: "error",
        title: "Algo salio mal",
      });
    }
  };

  const props: UploadProps = {
    beforeUpload(file) {
      setFile(file);
      return false; // Prevent upload
    },
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="bg-stone-700 h-screen w-screen pattern overflow-hidden">
      <div className="registerBg"></div>
      {alertProps.message.length > 0 ? (
        <div className="top-ever">
          <AlertComponent
            message={alertProps.message}
            severity={alertProps.severity}
            title={alertProps.title}
          ></AlertComponent>
        </div>
      ) : (
        ""
      )}
      <div className="bg-stone-900  text-white centerRegister p-10 rounded-xl flex shadow-xl shadow-black">
        <form onSubmit={handleOnSubmit}>
          <div className="flex flex-col justify-between items-center gap-1">
            <h1 className="mb-4 text-3xl text-white text-center">
              Crear nuevo usuario
            </h1>
            <div className="w-full text-center grid grid-cols-2 gap-2">
              <div>
                <p className="font-semibold text-lg text-white">Nombre</p>
                <input
                  value={user.name}
                  name="name"
                  type="text"
                  placeholder="Ingrese su nombre"
                  onChange={handleOnChange}
                  className="text-center w-full p-2 rounded-md  bg-gray-500  placeholder:text-black focus:outline-none  text-black"
                />
                {inputErrors.name ? (
                  <label className="input-required">{inputErrors.name}</label>
                ) : (
                  ""
                )}
              </div>
              <div>
                <p className="font-semibold text-lg text-white">Edad</p>
                <input
                  type="number"
                  name="age"
                  value={user.age}
                  pattern="[0-9]*"
                  placeholder="Ingrese su edad"
                  onChange={handleOnChange}
                  className=" text-center focus:text-white p-2 w-full rounded-md bg-gray-500  placeholder:text-black focus:outline-none  text-black"
                />
                {inputErrors.age ? (
                  <label className="input-required">{inputErrors.age}</label>
                ) : (
                  ""
                )}
              </div>
            </div>
            <p className="font-semibold text-lg text-white">Email</p>
            <input
              value={user.email}
              name="email"
              type="text"
              placeholder="Ingrese su mail"
              onChange={handleOnChange}
              className="text-center w-full p-2 rounded-md bg-gray-500  placeholder:text-black focus:outline-none  text-black"
            />
            {inputErrors.email ? (
              <label className="input-required">{inputErrors.email}</label>
            ) : (
              ""
            )}
            <p className="font-semibold text-lg text-white">Contraseña</p>
            <input
              value={user.password}
              name="password"
              type="password"
              placeholder="Ingrese su Contraseña"
              onChange={handleOnChange}
              className="p-2 w-full rounded-md text-center bg-gray-500  placeholder:text-black focus:outline-none  text-black"
            />
            {inputErrors.password ? (
              <label className="input-required">{inputErrors.password}</label>
            ) : (
              ""
            )}
            <p className="font-semibold text-lg text-white">
              Repita la Contraseña
            </p>

            <input
              value={confirmPassword}
              name="confirmPassword"
              type="password"
              placeholder="Repita su Contraseña"
              onChange={handleOnChange}
              className="p-2 w-full rounded-md text-center bg-gray-500  placeholder:text-black focus:outline-none  text-black"
            />
            {inputErrors.confirmPassword ? (
              <label className="input-required">
                {inputErrors.confirmPassword}
              </label>
            ) : (
              ""
            )}
            <div className="items-center flex flex-col justify-center m-auto">
              <span>
                <p className="font-bold">Foto de perfil</p>
              </span>
              <Upload
                className="bg-gray-500 rounded-md"
                {...props}
                name="image"
              >
                <Button icon={<UploadOutlined />}>Subir foto</Button>
              </Upload>
            </div>
            <div className="grid grid-cols-2 items-center gap-2 mt-auto">
              <button
                type="submit"
                className=" bg-gray-300 p-2 mt-6 rounded-lg hover:bg-violet-950 focus:ease-in-out hover:text-white transition duration-500 ease-in-out text-black text-center "
              >
                Crear Usuario
              </button>
              <button
                className="bg-violet-950 p-2 mt-6 rounded-lg hover:bg-purple-950 focus:ease-in-out transition duration-500 ease-in-out text-white text-center "
                onClick={() => navigate("/login")}
              >
                Tengo un usuario
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="top-ever  h-full  p-5">
        <Tooltip
          title="No hay datos sobre esta ubicacion. Provincia de Mendoza, Argentina"
          className="bg-slate-100 "
        >
          <InfoIcon
            sx={{ fontSize: 50 }}
            color="inherit"
            className="bg-black h-[55px] rounded-[100%]"
          />
        </Tooltip>
      </div>
    </div>
  );
};
