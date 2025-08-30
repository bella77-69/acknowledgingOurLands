import { useState } from "react";
import { PageContainer } from "../../Components/Layouts";
import learn from "../../assets/Images/learn.png";

const LearnMore = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "Understanding Land Acknowledgements",
      a: "A land acknowledgment is a statement that recognizes the traditional territories of Indigenous peoples and their relationship with the land. It’s a way to honor their history, culture, and ongoing presence. More than just words, it reflects a commitment to respect, reconciliation, and shared stewardship of the land.",
    },
    {
      q: "Why is it important?",
      a: "Land acknowledgments recognize the traditional territories of Indigenous peoples and honor their enduring connection to the land. They raise awareness of histories and treaties that are often overlooked, fostering respect and understanding.",
    },
    {
      q: "How do I do a Land Acknowledgement?",
      a: "In a land acknowledgment, the term 'unceded' refers to land that has not been legally transferred or signed away by Indigenous peoples to colonial or settler governments.",
    },
  ];

  return (
    <PageContainer>
      {/* Header */}

      <div className="text-center mb-12 lg:mb-16 px-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Learn More
        </h1>

        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          This page detects your current location and displays the coordinates.
          Additionally, the land acknowledgment section below helps you identify
          the traditional lands you are on, fostering awareness and respect.
        </p>
        <div className="relative group">
          <div className="absolute xs:-top-16 -top-1 -right-12 lg:-top-24 lg:-translate-x-32 lg:translate-y-4 w-40 h-40 lg:w-60 lg:h-60 bg-customNav opacity-5 rounded-full backdrop-blur-sm"></div>
        </div>
        <div className="xs:hidden lg:block absolute -bottom-4 lg:bottom-20 -left-2 w-24 h-24 bg-customNav opacity-5 rounded-full backdrop-blur-sm"></div>
      </div>

      <div className="gap-12 items-start lg:grid lg:grid-cols-2 lg:gap-16">
        <div className="p-2 font-light text-customNav sm:text-lg dark:text-customNavDark">
          <h3 className="mb-6 text-xl font-extrabold text-active dark:text-customWhite">
            Frequently Asked Questions
          </h3>

          <div className="space-y-4">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="border-b border-activeLight dark:border-activeLighter pb-4"
              >
                <button
                  className="w-full text-left text-base font-medium text-textGreyDark dark:text-textGrey flex justify-between items-center"
                  onClick={() => toggleAnswer(index)}
                >
                  {item.q}
                  <span className="ml-2">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                {openIndex === index && (
                  <p className="mt-2  text-textGreyDark dark:text-textGrey leading-relaxed">
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>

          <h3 className="mt-10 mb-4 text-lg font-extrabold text-active dark:text-customWhite">
            More ways you can learn
          </h3>

          <ul className="space-y-3">
            <li>
              <a
                href="https://ehprnh2mwo3.exactdn.com/wp-content/uploads/2021/01/Calls_to_Action_English2.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-textGreyDark hover:text-orangeHover dark:text-textGrey dark:hover:text-orangeHover"
              >
                Truth and Reconciliation Commission&apos;s Calls to Action
              </a>
            </li>
            <li className="relative">
              <div className="absolute xs:top-0  xs:-right-24 md:-left-12 -top-8 -left-24 w-32 h-32 lg:w-48 lg:h-48 bg-customNav opacity-5 rounded-full backdrop-blur-sm"></div>
              <a
                href="https://www.justice.gc.ca/eng/declaration/un_declaration_EN1.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-activeLight hover:text-orangeHover dark:text-customWhiteDarker dark:hover:text-orangeHover"
              >
                United Nations Declaration on the Rights of Indigenous Peoples
              </a>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-8 lg:mt-0">
          <img
            className="w-full"
            src={learn}
            alt="Learning resources illustration"
          />
        </div>
      </div>

      <div className="text-center mt-16">
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm sm:text-base font-semibold rounded-lg bg-customNav text-customWhite hover:bg-buttonHover transition-transform duration-300 hover:scale-105"
        >
          Contact Us
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M9 18l6-6-6-6"></path>
          </svg>
        </a>
        <p className="mt-4 text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
          Join us in learning and reconciliation
        </p>
      </div>
    </PageContainer>
  );
};

export default LearnMore;
