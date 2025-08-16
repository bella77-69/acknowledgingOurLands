import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import SavedList from "./SavedList";
import RecentActivity from "./RecentActivity";

export default function Dashboard() {
  const { user } = useAuth();

  // Get the user's display name
  const getDisplayName = () => {
    if (!user) return null;

    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    return user.first_name || user.email.split("@")[0];
  };

  // Check if profile is complete
  const isProfileComplete = user?.first_name && user?.last_name;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome Back{getDisplayName() ? `, ${getDisplayName()}` : ""}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {user
            ? "Manage your land acknowledgments"
            : "Loading your dashboard..."}
        </p>

        {/* Profile completion reminder */}
        {user && !isProfileComplete && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <p className="text-blue-800 dark:text-blue-100">
              Complete your profile!{" "}
              <Link to="/profile" className="font-semibold underline">
                Add your full name
              </Link>
            </p>
          </div>
        )}
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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
              Your Profile
            </h3>
            {user && (
              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <p>
                  <span className="font-medium">Name:</span> {getDisplayName()}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                {user.phone && (
                  <p>
                    <span className="font-medium">Phone:</span> {user.phone}
                  </p>
                )}
                <Link
                  to="/profile"
                  className="inline-block mt-3 text-sm text-customNav hover:underline"
                >
                  Edit Profile
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
