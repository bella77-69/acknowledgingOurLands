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
      "Today, we gather on the ancestral lands of the  ",
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
      <div className="flex flex-wrap items-center justify-center">
        <h3 className="text-xl font-bold tracking-wide text-gray-100 my-7 dark:text-gray-300">
          Your Land Acknowledgment:
        </h3>
        <div className="mb-4">
          {indigenousLands && indigenousLands.length > 0 ? (
            <p className="mb-10 text-base font-medium text-gray-300 dark:text-gray-400 md:text-lg">
              {acknowledgmentVariations[currentAcknowledgmentIndex]}
              <span className="text-lg font-bold text-blue-300 dark:text-blue-200">
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
            <p className="mb-10 text-base font-medium text-gray-300 dark:text-gray-400 md:text-lg">
              Loading Indigenous Lands information...
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-center">
          <button
            onClick={changeAcknowledgment}
            className="inline-flex items-center justify-center w-full py-2 mb-4 font-medium leading-7 text-gray-100 bg-gray-400 border border-transparent rounded-md shadow-sm hover:text-gray-700 hover:bg-gray-500 px-4 md:w-auto md:mb-0 md:mr-4 dark:bg-gray-700 dark:hover:text-gray-500 dark:hover:bg-gray-600"
          >
            Change Acknowledgment
          </button>
          <button
            onClick={(e) => btnLearn(e)}
            className="inline-flex items-center justify-center w-full py-2 mb-4 font-medium leading-7 text-gray-100 border border-gray-300 rounded-md shadow-sm hover:text-gray-700 px-4 hover:bg-gray-100 hover:border-gray-700 md:w-auto md:mb-0 md:mr-4 dark:border-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-400 dark:hover:border-gray-400"
          >
            Learn More
          </button>
        </div>
      </div>
    );
  };
  
  export default Discover;
  