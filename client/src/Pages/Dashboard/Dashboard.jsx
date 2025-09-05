import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { formatDate } from "../../Utils/dateHelper";
import SavedList from "./SavedList";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const { user, logout, isLoading } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    totalAcknowledgments: 0,
    publicAcknowledgments: 0,
    privateAcknowledgments: 0,
    lastActivityDate: null,
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoadingStats(true);
      try {
        const token = localStorage.getItem("token");
        if (!token || !user) return;

        const response = await axios.get(`${API_URL}/api/acknowledgments/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const acknowledgments = response.data?.acknowledgments || [];

        const totalAcknowledgments = acknowledgments.length;
        const publicAcknowledgments = acknowledgments.filter(
          (a) => a.is_public
        ).length;
        const privateAcknowledgments =
          totalAcknowledgments - publicAcknowledgments;

        const lastActivityDate =
          acknowledgments.length > 0
            ? new Date(
                Math.max(...acknowledgments.map((a) => new Date(a.created_at)))
              )
            : null;

        setStats({
          totalAcknowledgments,
          publicAcknowledgments,
          privateAcknowledgments,
          lastActivityDate,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to load statistics. Logging out...");
        logout();
      } finally {
        setIsLoadingStats(false);
      }
    };

    fetchStats();
  }, [user, refreshKey, logout]);

  const getDisplayName = () => {
    if (!user) return null;
    return user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.firstName || user.email.split("@")[0];
  };

  const handleAcknowledgmentsUpdate = () => setRefreshKey((prev) => prev + 1);

  if (isLoading) return <div>Loading dashboard...</div>;

  return (
    <section className="py-10 sm:py-16 lg:py-20 min-h-screen bg-gradient-to-b from-customWhite to-gray-100 dark:from-darkNav dark:to-gray-800">
      <div className="container mx-auto px-4 md:px-12">
        {error && (
          <div className="fixed top-4 right-4 z-50 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg">
            <p>{error}</p>
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
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-orange-50 dark:bg-orange-900 p-3 rounded-lg">
                    <p className="text-sm text-orange-800 dark:text-orange-200 mb-1">
                      Last Activity
                    </p>
                    <p className="text-lg font-bold text-orange-900 dark:text-orange-100">
                      {formatDate(stats.lastActivityDate)}
                    </p>
                  </div>

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
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900 p-3 rounded-lg">
                    <p className="text-sm text-purple-800 dark:text-purple-200 mb-1">
                      Private
                    </p>
                    <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                      {stats.privateAcknowledgments}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
