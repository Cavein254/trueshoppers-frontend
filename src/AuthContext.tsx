import React, { createContext, useState, useEffect } from "react";
import {
  saveTokens,
  clearTokens,
  getAccessToken,
  getRefreshToken,
  fetchWithAuth,
} from "./components/utils/auth"; // <-- the file with your helper functions

const url = import.meta.env.VITE_SERVER_URL;

type AuthContextType = {
  isLoggedIn: boolean;
  userEmail: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userEmail: null,
  login: async () => false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
    const access = getAccessToken();
    const refresh = getRefreshToken();
    const storedEmail = localStorage.getItem("shoppers-email");

    if (storedEmail) {
      setUserEmail(storedEmail);
    }

    if (access && refresh) {
      setIsLoggedIn(true);

      try {
        const res: any = await fetchWithAuth(url + "/api/v1/auth/me");
        if (res.success) {
          setUserEmail(res.payload.email);
          localStorage.setItem("shoppers-email", res.payload.email);
        } else {
          logout();
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        logout();
      }
    }
  };

  initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(url + "/api/v1/auth/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) return false;

      const data = await response.json();
      saveTokens(data.access, data.refresh);
      setIsLoggedIn(true);
      setUserEmail(email);
      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail(null);
    clearTokens();
    localStorage.removeItem("shoppers-email");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};