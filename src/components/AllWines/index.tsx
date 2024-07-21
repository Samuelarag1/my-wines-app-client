import { useEffect, useState } from "react";

import axios from "axios";

import { CardWine } from "./Card";
import { IMWines } from "../../models/Wines";
import { useAuth } from "../../context/AuthContext";
import LateralBar from "../LateralBar";

export const AllWines = (): React.ReactNode => {
  const [wines, setWines] = useState<IMWines[]>([]);
  const { user } = useAuth();

  const getWines = async () => {
    const allWines = await axios.get("http://localhost:3001/wines");
    setWines(allWines.data);
  };

  useEffect(() => {
    getWines();
  }, []);

  return (
    <>
      <div>
        <div className="relative w-full h-5/6">
          <div>
            <div>
              <div className="allWines"></div>
              <div>
                <img
                  src={user?.image}
                  className="icon bg-black p-1"
                  alt={user?.name}
                />
              </div>
            </div>
          </div>
          <div className="top-ever left-[400px] top-48 w-[900px]  p-4 rounded-md bg-opacity-80  bg-slate-800">
            <div className="flex flex-row flex-wrap justify-between gap-5">
              {wines.map((wine, index) => (
                <CardWine wine={wine} key={index} />
              ))}
            </div>
          </div>
          {/* <div className="h-96 w-[600px]  bg-red-950 top-ever left-[60%]">
            <h1>Hola chaval</h1>
          </div> */}
          <div>
            <LateralBar />
          </div>
        </div>
      </div>
    </>
  );
};
