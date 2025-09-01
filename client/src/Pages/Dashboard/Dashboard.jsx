import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import SavedList from "./SavedList";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    totalAcknowledgments: 0,
    lastActivityDate: null,
    publicAcknowledgments: 0,
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(`${API_URL}/api/acknowledgments/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const acknowledgments = response.data?.acknowledgments || [];

        const totalAcknowledgments = acknowledgments.length;
        const publicAcknowledgments = acknowledgments.filter(
          (ack) => ack.is_public
        ).length;

        const lastActivityDate =
          acknowledgments.length > 0
            ? new Date(
                Math.max(
                  ...acknowledgments.map((ack) => new Date(ack.created_at))
                )
              )
            : null;

        setStats({
          totalAcknowledgments,
          publicAcknowledgments,
          lastActivityDate,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to load statistics");
      } finally {
        setIsLoadingStats(false);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user, refreshKey]);

  const getDisplayName = () => {
    if (!user) return null;
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.firstName || user.email.split("@")[0];
  };

  const isProfileComplete = user?.firstName && user?.lastName;

  const handleAcknowledgmentsUpdate = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setTimeout(() => setError(""), 5000);
  };

  const formatDate = (date) => {
    if (!date) return "Never";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatRelativeTime = (date) => {
    if (!date) return "Never";

    const now = new Date();
    const diffTime = Math.abs(now - new Date(date));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;

    return formatDate(date);
  };

  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-gradient-to-b from-customWhite to-gray-100 dark:from-darkNav dark:to-gray-800 min-h-screen">
      <div className="container mx-auto xs:px-3 px-2 md:px-12">
        {error && (
          <div className="fixed top-4 right-4 z-50">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg">
              <p>{error}</p>
            </div>
          </div>
        )}

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome Back{getDisplayName() ? `, ${getDisplayName()}` : ""}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {user
              ? "Manage your land acknowledgments"
              : "Loading your dashboard..."}
          </p>

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
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Your Acknowledgments
                </h2>
                <Link
                  to="/discover"
                  className="px-4 py-2 bg-customNav hover:bg-active text-white rounded-lg transition"
                >
                  + Create New
                </Link>
              </div>
              <SavedList
                key={refreshKey}
                onUpdate={handleAcknowledgmentsUpdate}
                onError={handleError}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
                Your Profile
              </h3>

              {user ? (
                <div className="space-y-2 text-gray-600 dark:text-gray-300">
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {getDisplayName()}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                  <p>
                    <span className="font-medium">Role:</span> {user.role}
                  </p>
                  <Link
                    to="/profile"
                    className="inline-block mt-3 text-sm text-customNav hover:underline"
                  >
                    Edit Profile
                  </Link>
                </div>
              ) : (
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
                Quick Stats
              </h3>
              {isLoadingStats ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="animate-pulse bg-gray-200 dark:bg-gray-700 p-3 rounded-lg h-20"></div>
                  <div className="animate-pulse bg-gray-200 dark:bg-gray-700 p-3 rounded-lg h-20"></div>
                  <div className="animate-pulse bg-gray-200 dark:bg-gray-700 p-3 rounded-lg h-20"></div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200 mb-1">
                      Total
                    </p>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      {stats.totalAcknowledgments}
                    </p>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      Acknowledgments
                    </p>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900 p-3 rounded-lg">
                    <p className="text-sm text-green-800 dark:text-green-200 mb-1">
                      Public
                    </p>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                      {stats.publicAcknowledgments}
                    </p>
                    <p className="text-xs text-green-700 dark:text-green-300">
                      {stats.publicPercentage}% shared
                    </p>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900 p-3 rounded-lg">
                    <p className="text-sm text-purple-800 dark:text-purple-200 mb-1">
                      Private
                    </p>
                    <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                      {stats.privateAcknowledgments}
                    </p>
                    <p className="text-xs text-purple-700 dark:text-purple-300">
                      Personal
                    </p>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-900 p-3 rounded-lg">
                    <p className="text-sm text-orange-800 dark:text-orange-200 mb-1">
                      Last Activity
                    </p>
                    <p className="text-lg font-bold text-orange-900 dark:text-orange-100">
                      {formatRelativeTime(stats.lastActivityDate)}
                    </p>
                    {stats.lastActivityDate && (
                      <p className="text-xs text-orange-700 dark:text-orange-300">
                        {formatDate(stats.lastActivityDate)}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Link
                  to="/discover"
                  className="block w-full text-left px-4 py-2 bg-customNav text-white rounded-lg hover:bg-active transition"
                >
                  Create New Acknowledgment
                </Link>
                <Link
                  to="/profile"
                  className="block w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
