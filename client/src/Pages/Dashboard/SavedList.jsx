import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SavedList({ onUpdate, onError }) {
  const [acknowledgments, setAcknowledgments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(null);

  useEffect(() => {
    const fetchAcknowledgments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/acknowledgments/my",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = Array.isArray(response.data?.acknowledgments)
          ? response.data.acknowledgments
          : [];

        setAcknowledgments(data);
      } catch (err) {
        const errorMsg =
          err.response?.data?.message || "Failed to load acknowledgments";
        onError(errorMsg);
        setAcknowledgments([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAcknowledgments();
  }, [onError]);

  const handleDelete = async (id) => {
    if (
      !window.confirm("Are you sure you want to delete this acknowledgment?")
    ) {
      return;
    }

    try {
      setIsDeleting(id);
      await axios.delete(`http://localhost:5000/api/acknowledgments/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAcknowledgments((prev) => prev.filter((ack) => ack.id !== id));
      onUpdate();
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to delete acknowledgment";
      onError(errorMsg);
    } finally {
      setIsDeleting(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="border-b border-gray-200 dark:border-gray-700 pb-4 animate-pulse"
          >
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (acknowledgments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium">No acknowledgments yet</h3>
        <p className="mt-1 text-sm">
          Get started by creating a new acknowledgment
        </p>
        <div className="mt-6">
          <Link
            to="/discover"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-customNav hover:bg-active"
          >
            + New Acknowledgment
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {acknowledgments.map((ack) => (
        <div
          key={ack.id}
          className="border-b border-gray-200 dark:border-gray-700 pb-4 group"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-lg text-gray-900 dark:text-white truncate">
                {ack.title}
              </h3>
              {ack.territory && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                  <svg
                    className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {ack.territory}
                </p>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Created: {new Date(ack.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => navigator.clipboard.writeText(ack.content)}
                className="text-sm px-3 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Copy to clipboard"
              >
                Copy
              </button>
              <button
                onClick={() => handleDelete(ack.id)}
                disabled={isDeleting === ack.id}
                className="text-sm px-3 py-1 bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-300 rounded hover:bg-red-100 dark:hover:bg-red-800 transition-colors disabled:opacity-50"
              >
                {isDeleting === ack.id ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-1 h-3 w-3 inline"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
          <div className="mt-3 text-gray-700 dark:text-gray-300">
            {ack.content.length > 150
              ? `${ack.content.substring(0, 150)}...`
              : ack.content}
          </div>
          {ack.traditional_keepers && (
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              <strong>Traditional Keepers:</strong> {ack.traditional_keepers}
            </div>
          )}
          <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
            {ack.is_public ? "Public" : "Private"}
          </div>
        </div>
      ))}
    </div>
  );
}
