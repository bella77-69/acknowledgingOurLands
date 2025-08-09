import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/Images/hero.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // More specific error messages based on status code
        if (response.status === 401) {
          throw new Error(data.error || "Invalid email or password");
        } else if (response.status === 500) {
          throw new Error("Server error. Please try again later.");
        } else {
          throw new Error(data.error || "Login failed. Please try again.");
        }
      }

      // Store token and user data
      localStorage.setItem("token", data.token);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "An unexpected error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-gradient-to-b from-customWhite to-gray-100 dark:from-darkNav dark:to-gray-800">
      <div className="container mx-auto xs:px-3 px-2 md:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl tracking-tight font-extrabold text-active dark:text-customWhite sm:text-4xl">
            Login
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300 sm:text-lg">
            Access your account and explore the tools to deepen your
            understanding of Indigenous lands and cultures.
          </p>
        </div>

        {/* Login Form Section */}
        <div className="relative flex flex-col lg:flex-row items-center lg:items-start mb-16">
          {/* Text and Form Content */}
          <div className="lg:w-1/2 lg:pr-8">
            <div className="bg-customWhite dark:bg-gray-900 p-6 rounded-lg shadow-md">
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    email
                  </label>
                  <input
                    id="email"
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-customNav focus:border-customNav dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    required
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-customNav focus:border-customNav dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    required
                    autoComplete="current-password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full px-6 py-3 text-sm font-bold text-customWhite bg-customNav rounded-lg hover:bg-buttonHover shadow-lg transform transition duration-300 ${
                    isLoading
                      ? "opacity-75 cursor-not-allowed"
                      : "hover:scale-105"
                  }`}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>
              </form>
            </div>
          </div>

          {/* Background Image */}
          <div className="relative lg:w-1/2 mt-10 lg:mt-0">
            <div className="absolute -top-8 -left-4 lg:-top-16 lg:-left-8 w-40 h-40 lg:w-60 lg:h-60 bg-customNav opacity-20 rounded-full"></div>
            <img
              className="rounded-lg object-cover shadow-lg transform hover:scale-105 transition duration-300"
              src={backgroundImage}
              alt="Abstract Indigenous design background"
            />
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-10">
          <a
            href="/register"
            className="inline-flex items-center justify-center gap-x-2 px-6 py-3 text-sm font-bold text-customWhite bg-customNav rounded-lg hover:bg-buttonHover shadow-lg transform hover:scale-105 transition duration-300"
          >
            Create an Account
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Login;
