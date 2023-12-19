import { Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Register } from "./components/Register";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path={"/register"} element={<Register />} />
    </Routes>
  );
};

export default App;
