// src/context/AuthContext.tsx
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { IMUser } from "../models/IMUser";
import IMAuthContext from "../models/auth/AuthContext";
import axios from "axios";

const AuthContext = createContext<IMAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IMUser | undefined>(undefined);
  const [userPic, setUserPic] = useState("");
  const getImage = async () => {
    const image = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}${user.image}`
    );
    setUserPic(image?.config?.url);
  };

  useEffect(() => {
    getImage();
  }, []);

  const login = (userData: IMUser) => {
    setUser(userData);
    if (userPic) {
      setUser({
        ...userData,
        ["image"]: userPic,
      });
    }
  };

  const logout = () => {
    setUser({
      name: "",
      age: "",
      email: "",
      image: "",
      password: "",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): IMAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
