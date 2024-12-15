import React, { useState } from "react";

const Discover = ({ indigenousLands = [] }) => {
  const [currentAcknowledgmentIndex, setCurrentAcknowledgmentIndex] =
    useState(0);

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
   
      <div className=" text-active dark:text-customWhite">
        {indigenousLands && indigenousLands.length > 0 ? (
          <p>
            {acknowledgmentVariations[currentAcknowledgmentIndex]}
            <span>
              {indigenousLands.map((land, index) => (
                <React.Fragment key={land.properties.Name + index}>
                  {index > 0 && ", "}
                  {land.properties.Name}

                  {/* <div>
                 {land.properties.description}

                 </div> */}
                </React.Fragment>
              ))}
            </span>
            {` First Nations.`}
          </p>
        ) : (
          <p>Loading Indigenous Lands information...</p>
        )}
    
 
      <div className="text-active dark:text-customWhite flex flex-col">
          <button
            className="mt-2 rounded-lg bg-customNav px-6 py-3 text-base font-semibold text-customWhite shadow-lg hover:bg-active focus:outline-none transition"
            onClick={changeAcknowledgment}
          >
            Change Acknowledgment
          </button>
          <button
            className="mt-2 rounded-lg bg-customNav px-6 py-3 text-base font-semibold text-customWhite shadow-lg hover:bg-active focus:outline-none transition"
            onClick={(e) => btnLearn(e)}
          >
            Learn More
          </button>
        </div>
    </div>
  );
};

export default Discover;
