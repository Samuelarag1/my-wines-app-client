import { useState } from "react";
import "cropperjs/dist/cropper.css";
import { LayoutDefault } from "../Layout";
import { IMWines } from "../../models/Wines";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

import { Button, Result } from "antd";

const wines = {
  wine: {
    tinto: [
      "Cabernet Sauvignon",
      "Merlot",
      "Pinot Noir",
      "Malbec",
      "Syrah/Shiraz",
    ],
    blanco: [
      "Sauvignon Blanc",
      "Riesling",
      "Pinot Grigio",
      "Moscato",
      "Chardonnay",
    ],
  },
};

export const NewWine = () => {
  const { user } = useAuth();

  const [status, setStatus] = useState("");
  const [wine, setWine] = useState<IMWines>({
    name: "",
    type: "",
    year: undefined,
    description: "",
    price: undefined,
    image: "",
    userId: user?.id,
  });

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (wine) {
        const response = await axios.post("http://localhost:3001/wines", wine);
        if (response.status === 201) {
          setStatus("OK");
        } else if (response.status === 500) {
          setStatus("FAIL");
        }
      }
    } catch (error) {
      // throw new Error(error);
    }
    setWine({
      name: "",
      type: "",
      year: 0,
      description: "",
      price: 0,
      image: "",
      userId: user?.id,
    });
    setTimeout(() => {
      setStatus("");
    }, 1500);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setWine({
      ...wine,
      type: value,
    });
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { name, value } = e.target;
    setWine({
      ...wine,
      [name]: value,
    });
  };
  const handleOnChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setWine({
      ...wine,
      description: e.target.value,
    });
  };

  return (
    <div>
      <div className="addWine"></div>

      <div className="top-ever top-[35%] absolute left-[55%] rounded-md  shadow-lg shadow-black h-[500px] w-[300px] bg-stone-900 p-10 flex justify-center flex-col">
        <div className="mt-4">
          <p className="text-4xl  text-center text-white">Nuevo vino</p>
        </div>
        <form
          onSubmit={handleOnSubmit}
          className="flex flex-col items-center gap-4"
        >
          <div className="mt-4">
            <span className="font-bold text-white">Nombre</span>
            <input
              name="name"
              value={wine.name}
              type="text"
              placeholder="Nombre del vino"
              onChange={handleOnChange}
              required={true}
              className="w-full p-2 focus:outline-none text-center text-lg text-black rounded-md bg-slate-200 placeholder:text-black placeholder:opacity-50 "
              autoFocus
            />
          </div>
          <div>
            <div className="flex gap-2">
              <div>
                <select
                  value={wine.type}
                  onChange={handleSelectChange}
                  className="p-2 rounded-lg"
                >
                  <option value="Tinto" className="text-[12px]">
                    Tinto
                  </option>
                  <option
                    accessKey="select"
                    value="Blanco"
                    className="text-[12px]"
                  >
                    Blanco
                  </option>
                </select>
              </div>
              {wine.type === "Tinto" ? (
                <div>
                  <select name="type" className="p-2 rounded-lg">
                    {wines.wine.tinto.map((variedad, index) => (
                      <option
                        key={index}
                        value={variedad}
                        className="text-[12px]"
                      >
                        {variedad}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <select name="type" className="p-2 rounded-lg">
                    {wines.wine.blanco.map((variedad, index) => (
                      <option
                        key={index}
                        value={variedad}
                        className="text-[12px]"
                      >
                        {variedad}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
          <div className="flex  gap-2">
            <div>
              <span className="text-white">
                <p>Año de cosecha</p>
              </span>
              <input
                name="year"
                value={wine.year}
                type="number"
                onChange={handleOnChange}
                placeholder="Ej.. 1999"
                className="w-full p-2 focus:outline-none text-center text-lg text-black rounded-md bg-slate-200 placeholder:text-black placeholder:opacity-50  "
              />
            </div>
            <div>
              <span>
                <p className="text-white">Precio</p>
              </span>
              <input
                name="price"
                value={wine.price}
                type="number"
                placeholder="$$$"
                onChange={handleOnChange}
                required={true}
                className="w-full p-2 focus:outline-none text-center text-lg text-black rounded-md bg-slate-200 placeholder:text-black placeholder:opacity-50  "
              />
            </div>
          </div>
          <textarea
            name="description"
            value={wine.description}
            placeholder="Descripcion"
            onChange={handleOnChangeDescription}
            className="w-full p-2 focus:outline-none text-center text-lg text-black rounded-md bg-slate-200 placeholder:text-black placeholder:opacity-50  resize-none"
          />
          <div>
            <div className="relative left-[20%] items-center text-white ">
              <input
                name="image"
                value={wine.image}
                type="file"
                onChange={handleOnChange}
              />
            </div>
          </div>
          <button className=" hover:cursor-pointer p-2 rounded-lg bg-stone-800 text-white  transition duration-500 ease-in-out hover:bg-opacity-80 text-center">
            Agregar
          </button>
        </form>
      </div>
      <div className="bg-white top-ever absolute top-[30%] left-[40%] rounded-md">
        {status === "OK" ? (
          <Result
            status="success"
            title="Vino creado correctamente"
            subTitle={`Muy bien ${user?.name}, uno mas para la coleccion!`}
          />
        ) : (
          ""
        )}
      </div>
      <LayoutDefault />
    </div>
  );
};
