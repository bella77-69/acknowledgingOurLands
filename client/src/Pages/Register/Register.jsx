import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "../../Components/Layouts";
import { Card, Button } from "../../Components/UI";
import { AuthContext } from "../../Context/AuthContext";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");

      login(data.user, data.token);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer className="relative py-10 sm:py-16 lg:py-20">
      <div className="absolute -bottom-4 left-0 sm:left-32 lg:left-72 lg:bottom-16 w-32 h-32 bg-customNav opacity-5 rounded-full backdrop-blur-sm"></div>
      <div className="absolute -top-38 -left-16 lg:left-40 w-60 h-60 bg-customNav opacity-5 rounded-full backdrop-blur-sm"></div>

      <div className="text-center mb-12 px-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Create an Account
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Already have an account?{" "}
          <div className="flex justify-center">
            <Button
              as="a"
              href="/login"
              variant="link"
              className="text-customNav hover:underline "
            >
              Sign in
            </Button>
          </div>
        </p>
      </div>

      <div className="flex justify-center">
        <Card className="w-full max-w-md p-8 relative z-10">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  First Name
                </label>
                <input
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-customNav focus:border-customNav dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
                <div className="absolute -top-8 -right-4 md:-right-28 lg:top-6 lg:-right-52 w-40 h-40 lg:w-60 lg:h-60 bg-customNav opacity-5 rounded-full backdrop-blur-sm"></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Last Name
                </label>
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-customNav focus:border-customNav dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-customNav focus:border-customNav dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Password (min 6 characters)"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-customNav focus:border-customNav dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-customNav focus:border-customNav dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>

            <Button
              type="submit"
              className={`w-full ${
                loading ? "opacity-75 cursor-not-allowed" : "hover:scale-105"
              }`}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>
        </Card>
      </div>
    </PageContainer>
  );
}
