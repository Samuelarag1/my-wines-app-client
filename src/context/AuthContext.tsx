// src/context/AuthContext.tsx
import { createContext, useState, useContext, ReactNode } from "react";
import { IMUser } from "../models/IMUser";
import IMAuthContext from "../models/auth/AuthContext";

const AuthContext = createContext<IMAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IMUser | null>(null);

  const login = (userData: IMUser) => {
    setUser(userData);
  };

  const logout = () => {
    setUser({
      name: null,
      age: null,
      email: null,
      image: undefined,
      password: null,
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
