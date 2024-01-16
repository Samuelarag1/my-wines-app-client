import React from "react";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center m-0 p-0 ">
      <h1 className="">Welcome to MyWines App</h1>
      <p>This is the home page of the app.</p>
      <button
        className="bg-cyan-950 p-2 w-20 text-white rounded-lg hover:text-gray-400 hover:bg-cyan-900 shadow-black shadow-md ease-in-out transition"
        onClick={() => navigate("/Login")}
      >
        Login
      </button>
    </div>
  );
};
