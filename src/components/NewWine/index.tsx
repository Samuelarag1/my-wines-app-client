import { useState } from "react";
import "cropperjs/dist/cropper.css";
import { LayoutDefault } from "../Layout";
import { IMWines } from "../../models/Wines";

export const NewWine = () => {
  const [wine, setWine] = useState<IMWines>({
    id: "",
    name: "",
    variety: "",
    year: "",
    description: "",
    price: "",
    image: "",
  });

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      <LayoutDefault />

      <h1 className="text-4xl text-center text-zinc-200 header">
        Agregar nuevo vino
      </h1>
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
            name="variety"
            value={wine.variety}
            type="text"
            placeholder="Variedad del vino"
            onChange={handleOnChange}
            required={true}
            className="w-full p-2 focus:outline-double text-center text-lg text-black rounded-md "
          />
          <input
            name="year"
            value={wine.year}
            type="text"
            onChange={handleOnChange}
            placeholder="Año de cosecha"
            className="w-full p-2 focus:outline-double text-center text-lg text-black rounded-md "
          />
          <input
            name="price"
            value={wine.price}
            type="text"
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
              type="file"
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
    </div>
  );
};
