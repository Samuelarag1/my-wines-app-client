import "../../styles.css";
import { LayoutDefault } from "../Layout";

export const Home = () => {
  return (
    <div>
      <LayoutDefault />
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
