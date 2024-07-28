import { useState } from "react";
import "cropperjs/dist/cropper.css";
import { LayoutDefault } from "../Layout";
import { IMWines } from "../../models/Wines";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

import { Result, Select } from "antd";

import { UploadOutlined } from "@ant-design/icons";
import Upload, { UploadProps } from "antd/es/upload";
import Button from "antd/es/button";
import { message } from "antd";

const props: UploadProps = {
  name: "image",
  action: "http://localhost:3001/users/api/upload",
  headers: {
    authorization: "multipart/form-data",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
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

      <div className="top-ever top-[25%] absolute left-[45%] rounded-md  shadow-lg shadow-black h-[600px] w-[500px] bg-stone-900 p-10 flex flex-col">
        <div className="m-0">
          <p className="text-4xl  text-center text-white">Nuevo vino</p>
        </div>
        <form
          onSubmit={handleOnSubmit}
          className="flex flex-col items-center gap-4"
        >
          <div>
            <span className="font-bold text-white">Nombre</span>
            <input
              name="name"
              value={wine.name}
              type="text"
              placeholder="Nombre del vino"
              onChange={handleOnChange}
              required={true}
              className="w-full p-2 focus:outline-none text-center text-lg text-black rounded-md  placeholder:text-black placeholder:opacity-50 "
              autoFocus
            />
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
                className="w-full p-2 focus:outline-none text-center text-lg text-black rounded-md  placeholder:text-black placeholder:opacity-50  "
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
                className="w-full p-2 focus:outline-none text-center text-lg text-black rounded-md  placeholder:text-black placeholder:opacity-50  "
              />
            </div>
          </div>
          <div>
            <div className="justify-between flex  gap-2">
              <div>
                <Select
                  showSearch
                  style={{ width: "200px", height: "40px" }}
                  placeholder={"Elegir.."}
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={[
                    {
                      value: "1",
                      label: "Tinto",
                    },
                    {
                      value: "2",
                      label: "Blanco",
                    },
                  ]}
                />
              </div>
              {wine.type === "Tinto" ? (
                <div>
                  <Select
                    showSearch
                    style={{ width: "200px", height: "40px" }}
                    placeholder="Buscar.."
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={[
                      {
                        value: "1",
                        label: "Cabernet Sauvignon",
                      },
                      {
                        value: "2",
                        label: "Merlot",
                      },
                      {
                        value: "3",
                        label: "Pinot Noir",
                      },
                      {
                        value: "4",
                        label: "Malbec",
                      },
                      {
                        value: "5",
                        label: "Syrah/Shiraz",
                      },
                    ]}
                  />
                </div>
              ) : (
                <div>
                  <Select
                    showSearch
                    placeholder="Tipo de uva.."
                    style={{ width: "200px", height: "40px" }}
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={[
                      {
                        value: "1",
                        label: "Sauvignon Blanc",
                      },
                      {
                        value: "2",
                        label: "Riesling",
                      },
                      {
                        value: "3",
                        label: "Pinot Grigio",
                      },
                      {
                        value: "4",
                        label: "Moscato",
                      },
                      {
                        value: "5",
                        label: "Chardonnay",
                      },
                    ]}
                  />
                </div>
              )}{" "}
            </div>
          </div>
          <textarea
            name="description"
            value={wine.description}
            placeholder="Descripcion"
            onChange={handleOnChangeDescription}
            className="w-full p-2 focus:outline-none text-center text-lg text-black rounded-md  placeholder:text-black placeholder:opacity-50  resize-none h-[160px]"
          />
          <div>
            <div className="relative  items-center text-white">
              <div className="items-center flex flex-col justify-center m-auto">
                <Upload
                  className="bg-gray-500 rounded-md"
                  {...props}
                  name="image"
                >
                  <Button icon={<UploadOutlined />}>Subir foto</Button>
                </Upload>
              </div>
            </div>
          </div>
          <button className=" hover:cursor-pointer p-2 rounded-lg bg-stone-800 text-white  transition duration-500 ease-in-out hover:bg-opacity-80 text-center mt-auto">
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
