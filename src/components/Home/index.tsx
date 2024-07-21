import "../../styles.css";
import { LayoutDefault } from "../Layout";
export const Home = () => {
  return (
    <div>
      <div className="imgHome"></div>
      <LayoutDefault />
      <section>
        <div className=" bg-zinc-300 w-[800px] h-[200px] left-[50%] mt-auto rounded-[200px] absolute mb-auto top-[50%] border-4 border-black">
          <div className="flex justify-center">
            <p className="text-3xl font-bold">
              Comparte tu experiencia
              <br />
              <span className="ml-10"> descubre nuevas perspectivas...</span>
            </p>
          </div>

          <div className=" flex justify-around mt-10">
            <div className="bg-red-900 text-white p-2 rounded-[30px] hover:text-gray-200 transition-all hover:bg-black  hover:transition-all  hover:cursor-pointer">
              <button>Añadir nuevo vino</button>
            </div>
            <div className="bg-red-900 text-white p-2 rounded-[30px] hover:text-gray-200 transition-all hover:bg-black  hover:transition-all  hover:cursor-pointer">
              <button>Ver mis vinos agregados</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
