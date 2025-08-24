import { Card } from "../UI";

export const Section = ({ title, paragraphs, images, reverse = false }) => {
  return (
    <div
      className={`flex flex-col ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      } 
        items-center gap-6 sm:gap-8 lg:gap-12 mb-10 sm:mb-14 lg:mb-18`}
    >
      {/* Text Content */}
      <div className="w-full lg:w-1/2">
        <Card className="h-full border-0 shadow-sm sm:shadow-md hover:shadow-md transition-shadow duration-300">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-customNav dark:text-customNavLight mb-3 sm:mb-4">
              {title}
            </h2>
            {paragraphs.map((text, idx) => (
              <p
                key={idx}
                className="text-gray-700 dark:text-gray-200 mb-4 last:mb-0 text-sm sm:text-base leading-relaxed"
              >
                {text}
              </p>
            ))}
          </div>
        </Card>
      </div>

      {/* Image Grid */}
      <div className="w-full lg:w-1/2">
        <div className="relative grid grid-cols-2 gap-4">
          {images.map((src, idx) => (
            <div
              key={idx}
              className={`relative group ${idx === 1 ? "mt-6" : ""}`}
            >
              <img
                src={src}
                alt=""
                className="rounded-xl object-cover w-full h-48 shadow-md group-hover:shadow-lg transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
