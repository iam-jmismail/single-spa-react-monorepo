import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  handleLogout: (isAdmin?: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type ProviderProps = {
  children: React.ReactNode;
  isAdmin?: boolean | undefined;
};

export const AuthProvider = ({ children, isAdmin = false }: ProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = (isAdmin: boolean = false) => {
    localStorage.removeItem("auth_token");
    if (isAdmin) {
      window.location.href = "/admin";
    } else {
      localStorage.removeItem("cart_items");
      window.location.href = "/app";
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
