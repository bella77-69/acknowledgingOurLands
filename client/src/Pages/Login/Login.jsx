// import { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { PageContainer } from "../../Components/Layouts";
// import { Card, Button } from "../../Components/UI";
// import backgroundImage from "../../assets/Images/hero.png";
// import { AuthContext } from "../../Context/AuthContext";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const { isLoggedIn, login } = useContext(AuthContext);

//   useEffect(() => {
//     if (isLoggedIn) {
//       navigate("/dashboard", { replace: true });
//     }
//   }, [isLoggedIn, navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) throw new Error(data.message || "Login failed");
//       if (!data.token) throw new Error("Token missing in response");

//       login(data.user, data.token);
//       navigate("/dashboard", { replace: true });
//     } catch (err) {
//       setError(err.message || "Login failed. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <PageContainer className="relative py-10 sm:py-16 lg:py-20">
//       {/* Decorative Circles */}
//       {/* <div className="absolute -top-16 -left-16 w-60 h-60 bg-customNav opacity-5 rounded-full backdrop-blur-sm"></div> */}
//       {/* <div className="absolute top-0 right-0 w-48 h-48 bg-customNav opacity-5 rounded-full backdrop-blur-sm"></div> */}
//       <div className="absolute bottom-2 left-18 w-32 h-32 bg-customNav opacity-5 rounded-full backdrop-blur-sm"></div>

//       {/* Header */}
//       <div className="text-center mb-12 px-4">
//         <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
//           Login
//         </h1>
//         <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
//           Access your account and explore Indigenous lands and cultures.
//         </p>
//       </div>

//       {/* Main Grid */}
//       <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
//         {/* Form Card */}
//         <div className="lg:w-1/2">
//           <Card className="p-6 relative z-10">
//             {error && (
//               <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//                 {error}
//               </div>
//             )}

//             <form className="space-y-6" onSubmit={handleLogin}>
//               <div>
//                 <label
//                   className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//                   htmlFor="email"
//                 >
//                   Email
//                 </label>
//                 <input
//                   id="email"
//                   type="email"
//                   placeholder="Email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-customNav focus:border-customNav dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//                   required
//                   autoComplete="email"
//                 />
//               </div>

//               <div>
//                 <label
//                   className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//                   htmlFor="password"
//                 >
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   type="password"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-customNav focus:border-customNav dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//                   required
//                   autoComplete="current-password"
//                 />
//               </div>

//               <Button
//                 type="submit"
//                 disabled={isLoading}
//                 className={`w-full ${
//                   isLoading
//                     ? "opacity-75 cursor-not-allowed"
//                     : "hover:scale-105"
//                 }`}
//               >
//                 {isLoading ? "Signing In..." : "Sign In"}
//               </Button>
//             </form>
//           </Card>
//         </div>

//         {/* Image */}
//         <div className="lg:w-1/2 relative">
//           <div className="absolute -top-8 -left-4 lg:-top-16 lg:-left-8 w-40 h-40 bg-customNav opacity-5 rounded-full"></div>
//           <img
//             src={backgroundImage}
//             alt="Abstract Indigenous design background"
//             className="rounded-lg object-cover shadow-lg transform hover:scale-105 transition duration-300"
//           />
//         </div>
//       </div>

//       {/* Register CTA */}
//       <div className="text-center mt-12">
//         <Button
//           as="a"
//           href="/register"
//           className="inline-flex items-center justify-center gap-x-2 px-6 py-3 text-sm font-bold rounded-lg hover:scale-105 transition-transform duration-300"
//         >
//           Create an Account
//         </Button>
//       </div>
//     </PageContainer>
//   );
// }

// export default Login;
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "../../Components/Layouts";
import { Card, Button } from "../../Components/UI";
import { AuthContext } from "../../Context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { isLoggedIn, login } = useContext(AuthContext);

  // Redirect if already logged in
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
      const response = await fetch("http://localhost:5000/api/auth/login", {
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
      {/* Decorative Circles */}
      <div className="absolute -top-38 -left-16 lg:left-40 w-60 h-60 bg-customNav opacity-5 rounded-full backdrop-blur-sm"></div>

      <div className="absolute -bottom-4 left-0 sm:left-32 lg:left-72 lg:bottom-16 w-32 h-32 bg-customNav opacity-5 rounded-full backdrop-blur-sm"></div>

      {/* Header */}
      <div className="text-center mb-12 px-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Login
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Access your account and explore Indigenous lands and cultures.
        </p>
      </div>

      {/* Form Card */}
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
              {/* <div className="lg:block absolute -top-32 -right-28 w-32 h-32 bg-customNav opacity-5 rounded-full backdrop-blur-sm"></div> */}
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
                href="/register"
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
