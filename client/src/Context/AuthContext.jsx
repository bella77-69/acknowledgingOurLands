import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoading(false);
          return;
        }

        // Verify token with server
        const response = await axios.get(`${API_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data?.user) {
          setUser(response.data.user);
          setIsLoggedIn(true);
          // Save fresh user info to localStorage
          localStorage.setItem("user", JSON.stringify(response.data.user));
        } else {
          logout();
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        logout(); // remove invalid token
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (userData, token) => {
    try {
      const userObj =
        typeof userData === "string" ? { email: userData } : userData;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userObj));
      setUser(userObj);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
