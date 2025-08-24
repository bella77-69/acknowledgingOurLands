export const PageContainer = ({ children, className = "" }) => {
  return (
    <section className="py-4 sm:py-6 lg:py-8 xl:py-10 bg-gradient-to-b from-customWhite to-gray-100 dark:from-darkNav dark:to-gray-800 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-10 max-w-7xl">
        {children}
      </div>
    </section>
  );
};

// export const PageContainer = ({ children, className = "" }) => {
//   return (
//     <section
//       className={`relative overflow-hidden py-2 sm:py-4 lg:py-16 bg-gradient-to-b from-customWhite to-gray-100 dark:from-darkNav dark:to-gray-800 min-h-screen ${className}`}
//     >
//       {/* Decorative Blobs */}
//       <div className="absolute -top-8 -right-4 lg:-top-16 lg:-right-8 w-40 h-40 lg:w-60 lg:h-60 bg-customNav opacity-20 rounded-full backdrop-blur-sm"></div>
//       <div className="absolute top-1/3 -left-10 w-32 h-32 lg:w-48 lg:h-48 bg-customNav opacity-10 rounded-full backdrop-blur-sm"></div>
//       <div className="absolute bottom-10 right-1/4 w-24 h-24 lg:w-40 lg:h-40 bg-customNav opacity-15 rounded-full backdrop-blur-sm"></div>

//       {/* Content */}
//       <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
//         {children}
//       </div>
//     </section>
//   );
// };
