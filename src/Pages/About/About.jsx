import React from "react";
import land from "../../assets/Images/land-landscape.png";
import land1 from "../../assets/Images/land-landscape1.png";
import land2 from "../../assets/Images/land-landscape2.png";
import land3 from "../../assets/Images/land-landscape3.png";

const About = () => {
  return (
    <section className="bg-customWhite dark:bg-darkNav p-2 md:p-6">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-customNav sm:text-lg dark:text-customNavDark">
          <h2 className="mb-4 text-2xl tracking-tight font-extrabold text-active dark:text-customWhite">
            About Us
          </h2>
          <p className="mb-4">
            <span className="font-black sm:text-lg text-xl text-active dark:text-customWhite">
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

        <div className="grid grid-cols-2 gap-4 mt-8">
          <img
            className="w-full rounded-lg"
            src={land}
            alt="Landscape of land"
          />
          <img
            className="mt-4 w-full lg:mt-10 rounded-lg aboutImg2"
            src={land1}
            alt="Landscape of land"
          />
        </div>
      </div>

      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <p className="mb-4">
            <span className="tracking-tight font-extrabold  sm:text-lg text-xl text-active dark:text-customWhite">
              With Acknowledging Our Lands,{" "}
            </span>
            we aim to promote understanding and empathy. By helping you identify
            your location and providing information on the Indigenous
            territories you are on, our app encourages a deeper connection to
            the land and its history. We believe that this awareness can lead to
            more informed and respectful territory acknowledgments.
          </p>
          <p>
            Let's take a step forward in supporting reconciliation efforts and
            working towards a society that acknowledges and honors Indigenous
            rights and sovereignty. Download our app today and join us in making
            a positive impact through meaningful territory acknowledgments.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <img
            className="w-full rounded-lg"
            src={land2}
            alt="Landscape of land"
          />
          <img
            className="mt-4 w-full lg:mt-10 rounded-lg"
            src={land3}
            alt="Landscape of land"
          />
        </div>
      </div>

      <div className="text-center p-4">
        <a
          className="inline-flex justify-center items-center gap-x-2 text-center bg-customNav text-textWhite hover:bg-hover  hover:text-active sm:text-sm md:text-base
                    rounded-md px-3 py-2 text-sm font-medium hover:shadow-xl border border-transparent focus:outline-none transition md:px-6"
          href="/learn-more"
        >
          Learn More
          <svg
            className="flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default About;
