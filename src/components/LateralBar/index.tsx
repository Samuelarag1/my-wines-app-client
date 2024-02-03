import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const LateralBar = () => {
  const location = useLocation();

  return (
    <div className="w-96 absolute top-0 bg-zinc-200 properties  opacity-80 h-screen">
      <div>
        <h1 className="font-light m-2 text-4xl">Welcome Username</h1>

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
            <Link to="/login" className="exitLink">
              Salir
            </Link>
          </p>
        </div>
      </div>
      <p className="m-2 absolute bottom-0">
        © 2024 Samuel Aragon. All rights reserved
      </p>
    </div>
  );
};

export default LateralBar;
