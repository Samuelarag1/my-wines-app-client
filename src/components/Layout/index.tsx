import LateralBar from "../LateralBar";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const LayoutDefault = () => {
  const location = useLocation();
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="bg-stone-700 w-screen h-screen">
      <div className="relative w-full h-5/6">
        <div>
          <div>
            <div>
              <img
                src={user?.image}
                className="icon bg-black p-1"
                alt={user?.name}
              />
            </div>
          </div>
        </div>
        <div>
          {location.pathname === "/login" ||
          location.pathname === "/register" ? (
            ""
          ) : (
            <LateralBar />
          )}
        </div>
      </div>
    </div>
  );
};
