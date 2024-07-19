import { IMWines } from "../../../models/Wines";
import { useState } from "react";

interface winesProps {
  wine: IMWines;
}

export const CardWine = ({ wine }: winesProps) => {
  const [idWine, setIdWine] = useState<number>();
  const [isOpened, setIsOpened] = useState(false);

  const handleOnClick = (id: number) => {
    setIsOpened(!isOpened);

    setIdWine(id);
  };
  return (
    <>
      <div className="border-gray-300 hover:cursor-pointer border-4 rounded-[50%] h-20 w-20 flex items-center justify-center shadow-black shadow-xl hover:scale-y-105 hover:scale-x-105 transition-transform ">
        <img
          src="public/luigi 1.jpg"
          alt={wine.name}
          className="rounded-[100%] object-contain h-[70px] w-[70px] hover:cursor-pointer"
          onClick={() => handleOnClick(wine.id)}
        />
      </div>
      <div
        className={`${
          idWine && isOpened ? "" : "hidden"
        } h-[400px] bg-blue-800 flex items-center rounded-lg w-[700px] justify-between absolute mt-72`}
      >
        <img
          src={"public/luigi 2.png"}
          alt={wine.name}
          className="h-full rounded-s-lg"
        />
        <div className="flex flex-col text-center gap-2 h-full">
          <div className="flex justify-between">
            <button className="rounded-full p-2">🤍</button>
            <p className="text-4xl font-bold mt-0">{wine.name}</p>
            <button
              className=" rounded-full p-2"
              onClick={() => setIsOpened(false)}
            >
              ❌
            </button>
          </div>
          <p className="font-semibold text-2xl">{wine.year}</p>
          <div className="mt-10">
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus labore sunt rerum illum, fugit quae dicta esse
              reiciendis harum voluptates est. Iusto necessitatibus quae fuga
              odit minima, adipisci facere velit?
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
