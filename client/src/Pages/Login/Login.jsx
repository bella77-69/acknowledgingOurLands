import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "../../Components/Layouts";
import { Card, Button } from "../../Components/UI";
import { AuthContext } from "../../Context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { isLoggedIn, login } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      login(data.user, data.token);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer className="relative py-10 sm:py-16 lg:py-20">
      <div className="absolute -top-38 -left-16 lg:left-40 w-60 h-60 bg-customNav opacity-5 rounded-full backdrop-blur-sm"></div>
      <div className="absolute -bottom-4 left-0 sm:left-32 lg:left-72 lg:bottom-16 w-32 h-32 bg-customNav opacity-5 rounded-full backdrop-blur-sm"></div>

      <div className="text-center mb-12 px-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Login
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Access your account and explore Indigenous lands and cultures.
        </p>
      </div>

      <div className="flex justify-center">
        <Card className="w-full max-w-md p-8 relative z-10">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-customNav focus:border-customNav dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-customNav focus:border-customNav dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
              <div className="absolute -top-8 -right-4 md:-right-28 lg:top-6 lg:-right-52 w-40 h-40 lg:w-60 lg:h-60 bg-customNav opacity-5 rounded-full backdrop-blur-sm"></div>
            </div>

            <Button
              type="submit"
              className={`w-full ${
                loading ? "opacity-75 cursor-not-allowed" : "hover:scale-105"
              }`}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
            Don't have an account?{" "}
            <div className="flex justify-center">
              <Button
                as="a"
                onClick={() => navigate("/register")}
                variant="link"
                className="text-customNav hover:underline"
              >
                Create Account
              </Button>
            </div>
          </p>
        </Card>
      </div>
    </PageContainer>
  );
}
