const LateralBar = () => {
  return (
    <div className="w-96 absolute top-0 bg-zinc-200 properties  opacity-80 h-screen">
      <div>
        <h1 className="font-light m-2 text-4xl">Welcome Username</h1>

        <div className="flex flex-col text-2xl mt-72 ml-2 p-0 gap-2">
          <p>
            <a href="#" className="propertiesLinks">
              Todos los vinos
            </a>
          </p>
          <p>
            <a href="#" className="propertiesLinks">
              Agregar nuevo Vino
            </a>
          </p>
          <p>
            <a href="#" className="propertiesLinks">
              Mis vinos favoritos
            </a>
          </p>
          <p>
            <a href="#" className="exitLink">
              Salir
            </a>
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
