import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Home } from "./components/Home";
import { NewWine } from "./components/NewWine";
import { AllWines } from "./components/AllWines";
import { Favorites } from "./components/Favorites";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";

export const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  return (
    <>
      <AuthProvider>
        {location.pathname === "/" && (
          <div className="flex flex-col h-screen w-screen">
            <nav className="h-32 bg-stone-700 flex items-center">
              <h1 className="text-white ml-20 text-3xl w-full ">
                Mi coleccion de vinos
              </h1>
              <div className="flex justify-end m-auto h-full items-center w-full">
                <a
                  onClick={() => navigate("/login")}
                  className="hover:cursor-pointer p-2 rounded-md text-xl bg-stone-800 text-white m-2 transition duration-500 ease-in-out hover:bg-opacity-80 text-center hover:bg-zinc-200 hover:text-black"
                >
                  Ingresar
                </a>
                <a
                  onClick={() => navigate("/register")}
                  className="hover:cursor-pointer p-2 rounded-md text-xl bg-zinc-200 text-black m-2 transition duration-500 ease-in-out hover:bg-opacity-80 text-center hover:bg-stone-800 hover:text-white"
                >
                  Crear Cuenta
                </a>
              </div>
            </nav>
            <div className="imgInicio"></div>
            <footer className="bg-stone-700 opacity-80 bottom-0 absolute w-full text-center p-2">
              <p className="text-white text-lg">
                © 2024 Samuel Aragon. All rights reserved
              </p>
            </footer>
          </div>
        )}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/newWine" element={<NewWine />} />
          <Route path="/AllWines" element={<AllWines />} />
          <Route path="/Favorites" element={<Favorites />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
