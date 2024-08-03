import axios from "axios";
import { IMWines } from "../../../models/Wines";
import { useEffect, useState } from "react";

interface winesProps {
  wine: IMWines;
}

export const CardWine = ({ wine }: winesProps) => {
  const [idWine, setIdWine] = useState<number>();
  const [isOpened, setIsOpened] = useState(false);
  const [winePic, setWinePic] = useState("");

  const getImage = async () => {
    const image = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}${wine.image}`
    );
    setWinePic(image?.config?.url);
  };

  useEffect(() => {
    getImage();
  }, [idWine]);

  const handleOnClick = (id: number) => {
    setIsOpened(!isOpened);
    setIdWine(id);
  };

  return (
    <>
      <div className="border-gray-300 hover:cursor-pointer border-4 rounded-[50%] h-fit w-fit flex items-center m-2 shadow-black shadow-xl hover:scale-110 transition-transform hover:border-black">
        <img
          src={winePic}
          alt={wine.name}
          className="rounded-[100%] object-contain h-[70px] w-[70px]"
          onClick={() => handleOnClick(wine?.id)}
        />
      </div>

      <div
        className={`${
          idWine && isOpened ? "" : "hidden"
        } h-[400px] bg-slate-800 opacity-90 flex items-center rounded-lg w-[700px] justify-between absolute mt-[280px]`}
      >
        <img src={winePic} alt={wine.name} className="h-full rounded-s-lg" />
        <div className="flex flex-col justify-around mr-auto ml-auto text-center gap-2 h-full text-white">
          <div className="">
            <div className="mb-24">
              <div className="absolute right-1 top-1 hover:bg-violet-900 rounded-[50px] ">
                <button
                  className="rounded-full p-2 "
                  onClick={() => setIsOpened(false)}
                >
                  ❌
                </button>
              </div>
              <p className="text-4xl font-bold mt-0">{wine.name}</p>
              <p className="text-2xl font-bold">{wine.year}</p>
            </div>
          </div>
          <div className="h-full">
            <span>{wine.description}</span>
          </div>
        </div>
      </div>
    </>
  );
};
