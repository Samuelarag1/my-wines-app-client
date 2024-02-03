import { Routes, Route } from "react-router-dom";
import React from "react";

import { Login } from "./components/Login";
import { Landing } from "./components/Landing";
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
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/newWine" element={<NewWine />} />
      <Route path="/AllWines" element={<AllWines />} />
      <Route path="/Favorites" element={<Favorites />} />
    </Routes>
  );
};

export default App;
