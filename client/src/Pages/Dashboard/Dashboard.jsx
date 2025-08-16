import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SavedList from "./SavedList";
import RecentActivity from "./RecentActivity";

export default function Dashboard() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUsername(user.name || user.email); // use name if available, otherwise email
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome Back{username ? `, ${username}` : ""}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your land acknowledgments
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Your Acknowledgments
              </h2>
              <Link
                to="/create"
                className="px-4 py-2 bg-customNav hover:bg-active text-white rounded-lg transition"
              >
                + Create New
              </Link>
            </div>
            {/* <SavedList /> */}
          </div>

          {/* <RecentActivity /> */}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* QuickResources or other components */}
        </div>
      </div>
    </div>
  );
}
