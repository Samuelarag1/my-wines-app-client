// src/context/AuthContext.tsx
import { createContext, useState, useContext, ReactNode } from "react";
import { IMUser } from "../models/IMUser";
import IMAuthContext from "../models/auth/AuthContext";

const AuthContext = createContext<IMAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IMUser | undefined>(undefined);

  const login = (userData: IMUser) => {
    setUser(userData);
  };

  const logout = () => {
    setUser({
      name: undefined,
      age: undefined,
      email: undefined,
      image: undefined,
      password: undefined,
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
