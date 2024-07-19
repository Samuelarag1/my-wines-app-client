import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
const LateralBar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  console.log(user);

  const handleOnLogout = () => {
    logout();
  };

  return (
    <div className="w-96 absolute top-0 bg-stone-800 properties  opacity-80 h-screen">
      <div>
        <h1 className="font-light m-2 text-4xl text-white">
          Welcome {user?.name}
        </h1>

        <div className="flex flex-col text-2xl mt-72 ml-2 p-0 gap-2">
          <p>
            <Link
              to="/home"
              className={
                location.pathname === "/home" ? "active" : "propertiesLinks"
              }
            >
              Inicio
            </Link>
          </p>
          <p>
            <Link
              to="/AllWines"
              className={
                location.pathname === "/AllWines" ? "active" : "propertiesLinks"
              }
            >
              Todos los vinos
            </Link>
          </p>
          <p>
            <Link
              to="/NewWine"
              className={
                location.pathname === "/NewWine" ? "active" : "propertiesLinks"
              }
            >
              Agregar nuevo Vino
            </Link>
          </p>
          <p>
            <Link
              to="/Favorites"
              className={
                location.pathname === "/Favorites"
                  ? "active"
                  : "propertiesLinks"
              }
            >
              Mis vinos favoritos
            </Link>
          </p>
          <p>
            <Link to="/login" className="exitLink" onClick={handleOnLogout}>
              Salir
            </Link>
          </p>
        </div>
      </div>
      <p className="m-2 absolute bottom-0 text-white">
        © 2024 Samuel Aragon. All rights reserved
      </p>
    </div>
  );
};

export default LateralBar;
