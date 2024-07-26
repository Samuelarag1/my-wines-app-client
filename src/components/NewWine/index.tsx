import { useState } from "react";
import "cropperjs/dist/cropper.css";
import { LayoutDefault } from "../Layout";
import { IMWines } from "../../models/Wines";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export const NewWine = () => {
  const { user } = useAuth();
  console.log(user);
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
        console.log(response);
      }
    } catch (error) {
      // throw new Error(error);
    }
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
      <div className="">
        <h1 className="text-4xl text-center text-black header">
          Agregar nuevo vino
        </h1>
      </div>
      <div className="bg-zinc-200 h-390px w-96 rounded-md mySquareAdding">
        <form
          onSubmit={handleOnSubmit}
          className="flex flex-col items-center gap-4"
        >
          <input
            name="name"
            value={wine.name}
            type="text"
            placeholder="Nombre del vino"
            onChange={handleOnChange}
            required={true}
            className="w-full p-2 focus:outline-double text-center text-lg text-black rounded-md "
          />
          <input
            name="type"
            value={wine.type}
            type="text"
            placeholder="Variedad del vino"
            onChange={handleOnChange}
            required={true}
            className="w-full p-2 focus:outline-double text-center text-lg text-black rounded-md "
          />
          <input
            name="year"
            value={wine.year}
            type="number"
            onChange={handleOnChange}
            placeholder="Año de cosecha"
            className="w-full p-2 focus:outline-double text-center text-lg text-black rounded-md "
          />
          <input
            name="price"
            value={wine.price}
            type="number"
            placeholder="Precio"
            onChange={handleOnChange}
            required={true}
            className="w-full p-2 focus:outline-double text-center text-lg text-black rounded-md "
          />
          <textarea
            name="description"
            value={wine.description}
            placeholder="Descripcion"
            onChange={handleOnChangeDescription}
            className="w-full p-2 focus:outline-double text-center text-lg text-black rounded-md resize-none"
          />
          <div>
            <input
              name="image"
              value={wine.image}
              type="text"
              onChange={handleOnChange}
            />
          </div>
          <button
            // onClick={}
            className=" hover:cursor-pointer p-2 rounded-lg bg-stone-800 text-white  transition duration-500 ease-in-out hover:bg-opacity-80 text-center"
          >
            Agregar
          </button>
        </form>
      </div>

      <LayoutDefault />
    </div>
  );
};
