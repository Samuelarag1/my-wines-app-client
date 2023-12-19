import React from "react";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to MyWines App</h1>
      <p>This is the home page of the app.</p>
      <button onClick={() => navigate("/Login")}>Login</button>
    </div>
  );
};
