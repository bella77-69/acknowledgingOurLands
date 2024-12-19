import React, { useState } from "react";
import learn from "../../assets/Images/learn.png";
import './LearnMore.css';

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
    <section className="bg-customWhite dark:bg-darkNav p-2 md:p-6">
      <div className="py-8 px-4 mx-auto max-w-screen-xl">
        <h2 className="text-2xl tracking-tight font-extrabold text-active dark:text-customWhite mb-6 text-center">
          Learn More
        </h2>

        <div className="gap-16 items-center py-8 lg:grid lg:grid-cols-2 lg:py-16">
          <div className="font-light text-customNav sm:text-lg dark:text-customNavDark">
            <h3 className="mb-4 text-xl tracking-tight font-bold text-active dark:text-customWhite">
              Frequently Asked Questions
            </h3>
            {questions.map((question, index) => (
              <div
                key={index}
                className="border-b border-gray-300 dark:border-gray-600 mb-4 pb-4"
              >
                <h4
                  className="text-base font-medium text-active dark:text-customWhite cursor-pointer hover:underline"
                  onClick={() => toggleAnswer(index)}
                >
                  {question}
                </h4>
                {isOpen === index && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {answers[index]}
                  </p>
                )}
              </div>
            ))}

            <h3 className="mb-4 text-xl tracking-tight font-bold text-active dark:text-customWhite">
              More ways you can learn
            </h3>
            <div className="learn-links">
  <a
    className="underline text-orangeHover hover:text-orange-800"
    href="https://ehprnh2mwo3.exactdn.com/wp-content/uploads/2021/01/Calls_to_Action_English2.pdf"
    target="_blank"
    rel="noopener noreferrer"
  >
    Truth and Reconciliation Commission's Calls to Action
  </a>
</div>
<div className="learn-links">
  <a
    className="underline text-orangeHover hover:text-orange-800"
    href="https://www.justice.gc.ca/eng/declaration/un_declaration_EN1.pdf"
    target="_blank"
    rel="noopener noreferrer"
  >
    United Nations Declaration on the Rights of Indigenous Peoples
  </a>
</div>

          </div>

          <div className="grid grid-cols-1 gap-4 mt-8">
            <img
              className="w-full rounded-lg"
              src={learn}
              alt="Placeholder for land acknowledgment visuals"
            />
          </div>
        </div>

        <div className="text-center p-4">
          <a
            className="inline-flex justify-center items-center gap-x-2 text-center bg-customNav text-textWhite hover:bg-hover hover:text-textcustomWhite sm:text-sm md:text-base
                      rounded-md px-3 py-2 text-sm font-medium hover:shadow-xl border border-transparent focus:outline-none transition md:px-6"
            href="/about"
          >
            Learn About Us
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
      </div>
    </section>
  );
};

export default LearnMore;
