/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Home } from "./components/Home";
import { NewWine } from "./components/NewWine";
import { AllWines } from "./components/AllWines";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/swiper-bundle.css";

export const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  const reviews = [
    {
      name: "Carlos",
      wine: "Luigi Bosca",
      image: "/luigi 1.jpg",
      description:
        "Probé el Malbec y fue una experiencia sublime. Tiene un sabor complejo, con notas de frutos rojos y un toque de roble que se siente en cada sorbo. Perfecto para una noche especial con amigos.",
    },
    {
      name: "José",
      wine: "Cordero con piel de lobo",
      image: "/cordero.png",
      description:
        "Me sorprendió gratamente. Su intensidad y profundidad en el sabor, con matices de especias y un final persistente, lo hacen ideal para acompañar un buen asado. Una joya para los amantes del buen vino.",
    },
    {
      name: "Miguel",
      wine: "Ruttini",
      image: "/ruttini.jpg",
      description:
        "Nunca decepciona. Este vino tiene una elegancia y equilibrio excepcionales, con aromas de ciruela y vainilla que se mezclan armoniosamente. Perfecto para una cena sofisticada.",
    },
    {
      name: "Carla",
      wine: "Luigi Bosca",
      image: "/luigi 2.png",
      description:
        "El Luigi Bosca Syrah es simplemente encantador. Su frescura y notas de frutas tropicales lo hacen muy agradable al paladar. Es el vino ideal para disfrutar en una tarde soleada con buena compañía.",
    },
  ];

  return (
    <AuthProvider>
      {location.pathname === "/" && (
        <div className="flex flex-col h-screen w-screen">
          <nav className="h-32 bg-stone-700 flex items-center">
            <h1 className="text-white ml-20 text-3xl w-full">
              Mi colección de vinos
            </h1>
            <div className="flex justify-end m-auto h-full items-center w-full">
              <a
                onClick={() => navigate("/login")}
                className="hover:cursor-pointer p-2 rounded-md text-xl bg-stone-800 text-white m-2 transition duration-500 ease-in-out hover:bg-opacity-80 text-center hover:bg-zinc-200 hover:text-black"
              >
                Ingresar
              </a>
              <a
                onClick={() => navigate("/register")}
                className="hover:cursor-pointer p-2 rounded-md text-xl bg-zinc-200 text-black m-2 transition duration-500 ease-in-out hover:bg-opacity-80 text-center hover:bg-stone-800 hover:text-white"
              >
                Crear Cuenta
              </a>
            </div>
          </nav>
          <div className="imgInicio"></div>
          <div className="relative ">
            <div className="absolute flex inset-0 items-center justify-center">
              <Swiper
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={true}
                slidesPerView={3}
              >
                {reviews.map((vinos, index) => (
                  <SwiperSlide key={index} className="w-full">
                    <div className="mb-[750px] bg-stone-800 h-[600px] w-[500px]  rounded-sm shadow-xl border-[5px] border-black border-solid flex flex-col items-center m-auto hover:cursor-pointer">
                      <div className="flex flex-col items-center m-2 overflow-auto">
                        <h4 className="text-white text-3xl  font-bold">
                          {vinos.name}
                        </h4>
                        <img
                          height={300}
                          width={300}
                          src={vinos.image}
                          alt={vinos.wine}
                          className=" border-2 border-black m-2"
                        />
                        <p className="text-xl text-white font-semibold mt-auto">
                          {vinos.wine}
                        </p>
                        <p className="text-white text-center text-lg">
                          {vinos.description}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <footer className="bg-stone-700 opacity-80 bottom-0 absolute w-full text-center p-2">
            <p className="text-white text-lg">
              © 2024 Samuel Aragon. All rights reserved
            </p>
          </footer>
        </div>
      )}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/newWine" element={<NewWine />} />
        <Route path="/AllWines" element={<AllWines />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
