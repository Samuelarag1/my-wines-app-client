import { Routes, Route } from "react-router-dom";
import React from "react";

import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Home } from "./components/Home";
import { NewWine } from "./components/NewWine";
import { AllWines } from "./components/AllWines";
import { Favorites } from "./components/Favorites";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  return (
    <>
      {location.pathname === "/" ? (
        <div className=" h-screen w-screen bg-stone-700 pattern ">
          <nav className="h-32 bg-zinc-300 shadow-lg shadow-black rounded-sm ">
            <div className="flex  justify-end ">
              <a
                onClick={() => navigate("/login")}
                className=" hover:cursor-pointer p-2 rounded-lg bg-stone-800 text-white m-2  transition duration-500 ease-in-out hover:bg-opacity-80 text-center"
              >
                Ingresar
              </a>
              <a
                onClick={() => navigate("/register")}
                className=" hover:cursor-pointer p-2 rounded-lg bg-stone-800 text-white m-2 transition duration-500 ease-in-out hover:bg-opacity-80 text-center"
              >
                Crear Cuenta
              </a>
            </div>
          </nav>

          <footer className="bg-zinc-200 opacity-80 bottom-0 absolute w-full text-center p-2">
            <p className="text-black text-lg">
              © 2024 Samuel Aragon. All rights reserved
            </p>
          </footer>
        </div>
      ) : (
        ""
      )}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/newWine" element={<NewWine />} />
        <Route path="/AllWines" element={<AllWines />} />
        <Route path="/Favorites" element={<Favorites />} />
      </Routes>
    </>
  );
};

export default App;
