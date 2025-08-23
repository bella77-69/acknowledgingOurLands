import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (token && savedUser) {
          const parsedUser = JSON.parse(savedUser);

          // Optional: Verify token validity with backend
          // const isValid = await verifyToken(token);
          // if (!isValid) throw new Error("Invalid token");

          setUser(parsedUser);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        logout(); // Clear invalid auth data
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (userData, token) => {
    try {
      // Handle both string (email) and object user data
      const user =
        typeof userData === "string" ? { email: userData } : userData;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setIsLoggedIn(true);
      // console.log("Login successful", { user, token });
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
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
