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

export const NewWine = () => {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const userId = user?.id;

  const [wine, setWine] = useState<IMWines>({
    name: "",
    type: "",
    year: "",
    description: "",
    grape: "",
    price: "",
    image: "",
    userId: user?.id,
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", wine.name);
      formData.append("type", wine.type);
      formData.append("year", wine.year);
      formData.append("description", wine.description);
      formData.append("price", wine.price);
      formData.append("grape", wine.grape);

      formData.append("userId", user?.id);

      if (file) {
        formData.append("image", file);
      }

      console.log(formData);
      const response = await axios.post(
        "http://localhost:3001/wines",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
        setStatus("OK");
      } else if (response.status === 500) {
        setStatus("FAIL");
      }
    } catch (error) {
      console.error("Error creating wine:", error);
      setStatus("FAIL");
    }

    setWine({
      name: "",
      type: "",
      year: "",
      grape: "",
      description: "",
      price: "",
      image: "",
      userId: userId,
    });
    setTimeout(() => {
      setStatus("");
    }, 1500);
  };

  const props: UploadProps = {
    beforeUpload(file) {
      setFile(file);
      return false; // Prevent upload
    },
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <div className="addWine"></div>
      <div className="top-ever top-[25%] absolute left-[45%] rounded-md  shadow-lg shadow-black h-[600px] w-[500px] bg-stone-900 p-10 flex flex-col">
        <div className="m-0">
          <p className="text-4xl text-center text-white">Nuevo vino</p>
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
          <div className="flex gap-2">
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
            <div className="justify-between flex gap-2">
              <div>
                <Select
                  showSearch
                  style={{ width: "200px", height: "40px" }}
                  placeholder={"Elegir.."}
                  onChange={(value) => setWine({ ...wine, type: value })}
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={[
                    { value: "Tinto", label: "Tinto" },
                    { value: "Blanco", label: "Blanco" },
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
                    onChange={(value) => setWine({ ...wine, grape: value })}
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={[
                      {
                        value: "Cabernet Sauvignon",
                        label: "Cabernet Sauvignon",
                      },
                      {
                        value: "Merlot",
                        label: "Merlot",
                      },
                      {
                        value: "Pinot Noir",
                        label: "Pinot Noir",
                      },
                      {
                        value: "Malbec",
                        label: "Malbec",
                      },
                      {
                        value: "Syrah/Shiraz",
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
                    onChange={(value) => setWine({ ...wine, grape: value })}
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={[
                      {
                        value: "Sauvignon Blanc",
                        label: "Sauvignon Blanc",
                      },
                      {
                        value: "Syrah",
                        label: "Syrah",
                      },
                      {
                        value: "Riesling",
                        label: "Riesling",
                      },
                      {
                        value: "Pinot Grigio",
                        label: "Pinot Grigio",
                      },
                      {
                        value: "Moscato",
                        label: "Moscato",
                      },
                      {
                        value: "Chardonnay",
                        label: "Chardonnay",
                      },
                    ]}
                  />
                </div>
              )}
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
            <div className="relative items-center text-white">
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
          <button className="hover:cursor-pointer p-2 rounded-lg bg-stone-800 text-white transition duration-500 ease-in-out hover:bg-opacity-80 text-center mt-auto">
            Agregar
          </button>
        </form>
      </div>
      <div className="bg-white top-ever absolute top-[30%] left-[40%] rounded-md">
        {status === "OK" ? (
          <Result
            status="success"
            title="Vino creado correctamente"
            subTitle={`Muy bien ${user?.name}, ¡uno más para la colección!`}
          />
        ) : (
          ""
        )}
      </div>
      <LayoutDefault />
    </div>
  );
};
