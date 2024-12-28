import React from "react";
import land from "../../assets/Images/land-landscape.png";
import land1 from "../../assets/Images/land-landscape1.png";
import land2 from "../../assets/Images/land-landscape2.png";
import land3 from "../../assets/Images/land-landscape3.png";

const About = () => {
  return (
    <section className="py-10 bg-customWhite dark:bg-darkNav sm:py-16 lg:py-20">
    <div className="container mx-auto xs:px-2 px-2 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-2xl tracking-tight font-extrabold text-active dark:text-customWhite sm:text-4xl">
            About Us
          </h1>
        </div>

        {/* Content Section 1 */}
        <div className="grid gap-16 items-center py-8 mx-auto max-w-screen-xl lg:grid-cols-2 lg:py-16">
          <div className="font-light text-customNav sm:text-lg dark:text-customNavDark">
            <p className="mb-4">
              <span className="font-black text-xl text-active dark:text-customWhite">
                Territory acknowledgment is{" "}
              </span>
              crucial to respecting Indigenous presence and land rights,
              highlighting the ongoing impacts of colonialism. It's vital during
              events to express solidarity, fostering reconciliation and promoting
              a deeper understanding of Indigenous history and culture.
            </p>
            <p>
              However, we understand the significance of going beyond mere token
              gestures. Our app emphasizes meaningful actions, urging settlers to
              reflect on privileges shaped by historical colonial injustices.
              Recognize that these privileges result from Indigenous dispossession
              and marginalization.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img className="w-full rounded-lg object-cover" src={land} alt="Beautiful landscape of Indigenous land" />
            <img className="mt-4 w-full lg:mt-10 rounded-lg object-cover" src={land1} alt="Another view of Indigenous land" />
          </div>
        </div>

        {/* Content Section 2 */}
        <div className="grid gap-16 items-center py-8 mx-auto max-w-screen-xl lg:grid-cols-2 lg:py-16">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <p className="mb-4">
              <span className="tracking-tight font-extrabold text-xl text-active dark:text-customWhite">
                With Acknowledging Our Lands,{" "}
              </span>
              we aim to promote understanding and empathy. By helping you identify
              your location and providing information on the Indigenous territories
              you are on, our app encourages a deeper connection to the land and
              its history. We believe that this awareness can lead to more informed
              and respectful territory acknowledgments.
            </p>
            <p>
              Let's take a step forward in supporting reconciliation efforts and
              working towards a society that acknowledges and honors Indigenous
              rights and sovereignty. Download our app today and join us in making
              a positive impact through meaningful territory acknowledgments.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img className="w-full rounded-lg object-cover" src={land2} alt="Cultural Indigenous landscape" />
            <img className="mt-4 w-full lg:mt-10 rounded-lg object-cover" src={land3} alt="Stunning view of Indigenous heritage site" />
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-4">
          <a
            href="/learn-more"
            className="inline-flex items-center justify-center gap-x-2 px-6 py-2 text-sm font-bold text-customWhite bg-customNav rounded-lg hover:bg-buttonHover transition ease-in-out duration-300"
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
