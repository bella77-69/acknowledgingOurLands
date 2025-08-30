export const PageContainer = ({ children, className = "" }) => {
  return (
    <section
      className="pt-16 pb-10 sm:pt-20 sm:pb-12 lg:pt-28 lg:pb-16 xl:pt-32 xl:pb-20 
                 bg-gradient-to-b from-customWhite to-gray-100 
                 dark:from-darkNav dark:to-gray-800 min-h-screen"
    >
      <div className="mx-auto px-4 sm:px-4 md:px-8 lg:px-10 max-w-7xl">
        {children}
      </div>
    </section>
  );
};
