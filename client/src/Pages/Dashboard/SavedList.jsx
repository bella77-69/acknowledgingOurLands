export default function SavedList() {
  // Example data - replace with real API calls
  const acknowledgments = [
    {
      id: 1,
      title: "University Event",
      location: "Coast Salish Territory",
      lastEdited: "2 days ago",
    },
    // More items...
  ];

  if (acknowledgments.length === 0) {
    return (
      <div className="text-center py-12">
        <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
          No acknowledgments yet
        </h3>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Get started by creating your first land acknowledgment.
        </p>
        <div className="mt-6">
          <Link
            to="/create"
            className="inline-flex items-center px-4 py-2 bg-customNav hover:bg-active text-white rounded-lg"
          >
            + New Acknowledgment
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {acknowledgments.map((item) => (
        <Link
          to={`/acknowledgment/${item.id}`}
          key={item.id}
          className="block py-4 hover:bg-gray-50 dark:hover:bg-gray-700 px-2 rounded transition"
        >
          <h3 className="font-medium text-gray-900 dark:text-white">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {item.location} • {item.lastEdited}
          </p>
        </Link>
      ))}
    </div>
  );
}
