export const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 ${className}`}
    >
      {children}
    </div>
  );
};
