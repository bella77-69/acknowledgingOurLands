export default function RecentActivity() {
  const recentItems = [
    { id: 1, name: "Duwamish Territory", type: "location", date: "Today" },
    // More items...
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Recent Activity
      </h2>
      <ul className="space-y-3">
        {recentItems.map((item) => (
          <li key={item.id} className="flex items-center space-x-3">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
              <MapPinIcon className="h-5 w-5 text-gray-500 dark:text-gray-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Viewed {item.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {item.date}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
