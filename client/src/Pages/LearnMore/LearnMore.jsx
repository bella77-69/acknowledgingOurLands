import React, { useState } from "react";
import learn from "../../assets/Images/learn.png";

const LearnMore = () => {
  const [isOpen, setIsOpen] = useState(null);

  const toggleAnswer = (index) => {
    setIsOpen(isOpen === index ? null : index);
  };

  const questions = [
    "Understanding Land Acknowledgements",
    "Why is it important?",
    "How do I do a Land Acknowledgement?",
  ];

  const answers = [
    "A land acknowledgment is a statement that recognizes the traditional territories of Indigenous peoples and their relationship with the land. It’s a way to honor their history, culture, and ongoing presence. More than just words, it reflects a commitment to respect, reconciliation, and shared stewardship of the land. By learning about and practicing land acknowledgments, we acknowledge the past, recognize current realities, and commit to meaningful actions that support Indigenous communities.",
    "Land acknowledgments recognize the traditional territories of Indigenous peoples and honor their enduring connection to the land. They raise awareness of histories and treaties that are often overlooked, fostering respect and understanding. By acknowledging the land, we take a step toward reconciliation, showing commitment to learning from and supporting Indigenous communities. These statements remind us of our shared responsibility to care for the land and contribute to ongoing efforts for justice and equity.",
    "In a land acknowledgment, the term 'unceded' refers to land that has not been legally transferred or signed away by Indigenous peoples to colonial or settler governments.",
  ];

  return (
    <section className="py-10 bg-customWhite dark:bg-darkNav sm:py-16 lg:py-20">
    <div className="container mx-auto xs:px-2 px-2 md:px-12">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-2xl tracking-tight font-extrabold text-active dark:text-customWhite sm:text-4xl">
          Learn More
        </h1>
        <p className="mt-4 text-textGreyDark dark:text-textGrey">
          This page detects your current location and displays the coordinates. Additionally, the land acknowledgment section below helps you identify the traditional lands you are on, fostering awareness and respect.
        </p>
      </div>
  
      <div className="gap-16 items-center py-8 lg:grid lg:grid-cols-2 lg:py-8">
        <div className="p-2 font-light text-customNav sm:text-lg dark:text-customNavDark">
          <h3 className="mb-4 text-xl tracking-tight font-extrabold text-active dark:text-customWhite">
            Frequently Asked Questions
          </h3>
          {questions.map((question, index) => (
            <div
              key={index}
              className="border-b border-activeLight dark:border-activeLighter mb-4 pb-4"
            >
              <h4
                className="text-base font-medium text-textGreyDark dark:text-textGrey cursor-pointer hover:underline"
                onClick={() => toggleAnswer(index)}
              >
                {question}
              </h4>
              {isOpen === index && (
                <p className="mt-2 text-sm text-textGreyDark dark:text-textGrey">
                  {answers[index]}
                </p>
              )}
            </div>
          ))}
  
          <h3 className="mb-4 text-lg tracking-tight font-extrabold text-active dark:text-customWhite">
            More ways you can learn
          </h3>
          <div className="learn-links">
            <a
              className="pointer text-textGreyDark hover:text-orangeHover dark:text-textGrey dark:hover:text-orangeHover"
              href="https://ehprnh2mwo3.exactdn.com/wp-content/uploads/2021/01/Calls_to_Action_English2.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Truth and Reconciliation Commission's Calls to Action
            </a>
          </div>
          <div className="learn-links mt-2">
            <a
              className="pointer text-activeLight hover:text-orangeHover dark:text-customWhiteDarker dark:hover:text-orangeHover"
              href="https://www.justice.gc.ca/eng/declaration/un_declaration_EN1.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              United Nations Declaration on the Rights of Indigenous Peoples
            </a>
          </div>
        </div>
  
        <div className="grid grid-cols-1 gap-4 mt-8 lg:mt-0">
          <img
            className="w-full rounded-lg"
            src={learn}
            alt="Placeholder for land acknowledgment visuals"
          />
        </div>
      </div>
  
      <div className="text-center p-4">
        <a
          className="inline-flex justify-center items-center gap-x-2 text-center bg-customNav text-customWhite font-bold sm:text-sm md:text-base rounded-lg px-6 py-2 text-sm hover:bg-buttonHover hover:text-customWhite transition ease-in-out duration-300 md:px-6"
          href="/contact"
        >
          Contact Us
          <svg
            className="flex-shrink-0 w-6 h-6 sm:w-4 sm:h-4"
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
    </div>
  </section>
  
  );
};

export default LearnMore;
