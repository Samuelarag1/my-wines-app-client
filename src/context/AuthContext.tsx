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

  const getImage = async (imagePath: string): Promise<string | undefined> => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}${imagePath}`
      );
      return response?.config?.url;
    } catch (error) {
      console.error("Error fetching image:", error);
      return undefined;
    }
  };

  const login = async (userData: IMUser) => {
    if (userData.image) {
      const imageUrl = await getImage(userData.image);
      setUser({
        ...userData,
        image: imageUrl || userData.image, // Use the fetched image URL or fallback to the provided image path
      });
    } else {
      setUser(userData);
    }
  };

  const logout = () => {
    setUser(undefined);
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
