import "../../styles.css";
import LateralBar from "../LateralBar/index";

export const Home = () => {
  return (
    <div className="bg-stone-700 w-screen h-screen">
      <div className="relative w-full h-5/6  ">
        <div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1920 329"
              fill="none"
            >
              <path
                d="M0 0H1920C1920 0 1809.5 153.5 1800.5 175C1791.5 196.5 1593.5 322 1500.5 328C1407.5 334 1277.5 155 1203 136C1128.5 117 1093.5 110.5 1062 119C1030.5 127.5 961.5 227 911.5 216C861.5 205 753 241.5 717 272C681 302.5 337 153.5 284.5 119C232 84.5 0 175 0 175V0Z"
                fill="#D9D9D9"
              />
            </svg>
            <div className=" ">
              <img
                src="bottle.jpg"
                className="icon bg-black p-1"
                alt="no se encontro la imagen"
              />
            </div>
          </div>
        </div>
        <div>
          <LateralBar />
        </div>
      </div>
      <section>
        <h1 className=" text-4xl text-center text-zinc-200 header">
          Ultimo vino agregado
        </h1>
        <div className=" bg-zinc-200 mySquare border-4 border-black">
          <h1 className="text-xl">Nombre</h1>
          <img
            src="bottle.jpg"
            alt=""
            className="image rounded-md  shadow-md shadow-black m-2"
          />

          <p>
            Año: <span>2010</span>
          </p>
          <p>Pequeña descripcion</p>
        </div>
      </section>
    </div>
  );
};
