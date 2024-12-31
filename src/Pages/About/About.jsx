import React from "react";
import land from "../../assets/Images/land-landscape.png";
import land1 from "../../assets/Images/land-landscape1.png";
import land2 from "../../assets/Images/land-landscape2.png";
import land3 from "../../assets/Images/land-landscape3.png";

const About = () => {
  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-gradient-to-b from-customWhite to-gray-100 dark:from-darkNav dark:to-gray-800">
      <div className="container mx-auto xs:px-3 px-2 md:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl tracking-tight font-extrabold text-active dark:text-customWhite sm:text-4xl">
            About Us
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300 sm:text-lg">
            Discover the significance of territory acknowledgment and our mission to promote reconciliation and understanding.
          </p>
        </div>

        {/* Content Section 1 */}
        <div className="relative flex flex-col lg:flex-row items-center lg:items-start mb-16">
          {/* Text Content */}
          <div className="lg:w-1/2 lg:pr-8">
            <div className="bg-customWhite dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <p className="text-gray-700 dark:text-gray-200 mb-4">
              <span className="font-black text-xl text-active dark:text-customWhite">
                  Territory acknowledgment is{" "}
                </span>
                crucial to respecting Indigenous presence and land rights,
                highlighting the ongoing impacts of colonialism. It fosters
                reconciliation and promotes a deeper understanding of Indigenous history and culture.
              </p>
              <p className="text-gray-700 dark:text-gray-200">
                Our app emphasizes meaningful actions, urging settlers to reflect on privileges shaped by historical colonial injustices. Recognize these privileges stem from Indigenous dispossession and marginalization.
              </p>
            </div>
          </div>

          {/* Images */}
          <div className="relative lg:w-1/2 mt-10 lg:mt-0">
            <div className="absolute -top-8 -left-4 lg:-top-16 lg:-left-8 w-40 h-40 lg:w-60 lg:h-60 bg-customNav opacity-20 rounded-full"></div>
            <div className="relative grid grid-cols-2 gap-4">
              <img
                className="rounded-lg object-cover shadow-lg transform hover:scale-105 transition duration-300"
                src={land}
                alt="Beautiful landscape of Indigenous land"
              />
              <img
                className="rounded-lg object-cover shadow-lg transform hover:scale-105 transition duration-300"
                src={land1}
                alt="Another view of Indigenous land"
              />
            </div>
          </div>
        </div>

        {/* Content Section 2 */}
        <div className="relative flex flex-col lg:flex-row-reverse items-center lg:items-start">
          {/* Text Content */}
          <div className="lg:w-1/2 lg:pl-8">
            <div className="bg-customWhite dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <p className=" text-gray-700 dark:text-gray-200 mb-4">
              <span className="font-black text-xl text-active dark:text-customWhite">
                  With Acknowledging Our Lands,{" "}
                </span>
                we aim to promote understanding and empathy. Our app helps you identify your location and provides information on the Indigenous territories you are on.
              </p>
              <p className="text-gray-700 dark:text-gray-200">
                Join us in supporting reconciliation efforts and creating a society that acknowledges and honors Indigenous rights and sovereignty.
              </p>
            </div>
          </div>

          {/* Images */}
          <div className="relative lg:w-1/2 mt-10 lg:mt-0">
            <div className="absolute -top-8 -right-4 lg:-top-16 lg:-right-8 w-40 h-40 lg:w-60 lg:h-60 bg-customNav opacity-20 rounded-full"></div>
            <div className="relative grid grid-cols-2 gap-4">
              <img
                className="rounded-lg object-cover shadow-lg transform hover:scale-105 transition duration-300"
                src={land2}
                alt="Cultural Indigenous landscape"
              />
              <img
                className="rounded-lg object-cover shadow-lg transform hover:scale-105 transition duration-300"
                src={land3}
                alt="Stunning view of Indigenous heritage site"
              />
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-10">
          <a
            href="/learn-more"
            className="inline-flex items-center justify-center gap-x-2 px-6 py-3 text-sm font-bold text-customWhite 
            bg-customNav rounded-lg hover:bg-buttonHover
            shadow-lg transform hover:scale-105 transition duration-300"
          >
            Learn More
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
