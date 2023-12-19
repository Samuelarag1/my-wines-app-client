import { useNavigate } from "react-router-dom";
export const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-800 text-white w-60 h-96 p-5 inline-block align-middle rounded-xl  ">
      <form className="flex flex-col justify-between">
        <div className="mb-4">
          <label className="block text-sm font-medium text-white text-center">
            Email
          </label>
          <input
            type="text"
            placeholder="Ingresar email"
            className="text-center w-full p-2 rounded-md bg-gray-700 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label>Contrasenia</label>
          <input
            type="password"
            placeholder="ingresar contrasena"
            className="text-center w-full p-2 rounded-md bg-gray-700 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className=" bg-black p-2 rounded-md text-center hover:bg-white hover:text-black transition duration-500 ease-in-out "
        >
          Ingresar
        </button>
        <a onClick={() => navigate("/register")} className="mt-28">
          Crear nuevo usuario
        </a>
      </form>
    </div>
  );
};
