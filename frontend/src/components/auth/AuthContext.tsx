// src/context/AuthContext.tsx or similar

import { createContext, useEffect, useState, ReactNode } from "react";
import Cookies from "js-cookie";
// 👇 Define context shape
interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

// 👇 Provide default empty values for safety
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const login = (newToken: string) => {
    Cookies.set("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    Cookies.remove("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
