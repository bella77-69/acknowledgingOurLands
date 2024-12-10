import React, { useState } from "react";

const Discover = ({ indigenousLands = [] }) => {
  const [currentAcknowledgmentIndex, setCurrentAcknowledgmentIndex] = useState(0);

  const btnLearn = (e) => {
    e.preventDefault();
    window.location.href = "/learn-more";
  };

  const acknowledgmentVariations = [
    "I am honored to be a guest on the traditional and unceded territories of the ",
    "I acknowledge that I am on the traditional and unceded territories of the ",
    "Today, we gather on the ancestral lands of the ",
    "We are grateful to gather on the traditional and unceded territories of the ",
    "We are gathered on the traditional and unceded territories of the ",
    "We are meeting on the traditional and unceded territories of the ",
    "We respectfully acknowledge and extend our gratitude for their stewardship of this land since time immemorial.",
  ];

  const changeAcknowledgment = () => {
    setCurrentAcknowledgmentIndex((prevIndex) =>
      prevIndex === acknowledgmentVariations.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex flex-col items-center px-4 py-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold tracking-wide text-gray-800 dark:text-gray-200 mb-6">
        Your Land Acknowledgment
      </h3>

      <div className="mb-6">
        {indigenousLands && indigenousLands.length > 0 ? (
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            {acknowledgmentVariations[currentAcknowledgmentIndex]}
            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              {indigenousLands.map((land, index) => (
                <React.Fragment key={land.properties.Name + index}>
                  {index > 0 && ", "}
                  {land.properties.Name}
                </React.Fragment>
              ))}
            </span>
            {` First Nations.`}
          </p>
        ) : (
          <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
            Loading Indigenous Lands information...
          </p>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full">
        <button
          onClick={changeAcknowledgment}
          className="w-full md:w-auto px-6 py-2 text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg shadow-md dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          Change Acknowledgment
        </button>
        <button
          onClick={(e) => btnLearn(e)}
          className="w-full md:w-auto px-6 py-2 text-lg font-semibold text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg shadow-md dark:text-indigo-400 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Discover;
