import { Card, Button } from "../../Components/UI";
import { PageContainer } from "../../Components/Layouts";
import { useNavigate } from "react-router-dom";
import land from "../../assets/Images/land-landscape.png";
import land1 from "../../assets/Images/land-landscape1.png";
import land2 from "../../assets/Images/land-landscape2.png";
import land3 from "../../assets/Images/land-landscape3.png";

const About = () => {
  const navigate = useNavigate();

  return (
    <PageContainer className="py-6 sm:py-8 lg:py-12">
      <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          About Us
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Discover the significance of territory acknowledgment and our mission
          to promote reconciliation and understanding.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 mb-10 sm:mb-14 lg:mb-18">
        <div className="w-full lg:w-1/2 px-4 sm:px-0">
          <Card className="h-full border-0">
            <div className="relative">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white  mb-3 sm:mb-4">
                Territory acknowledgment is
              </h2>
              <p className="text-gray-700 dark:text-gray-200 mb-4 text-sm sm:text-base leading-relaxed">
                crucial to respecting Indigenous presence and land rights,
                highlighting the ongoing impacts of colonialism. It fosters
                reconciliation and promotes a deeper understanding of Indigenous
                history and culture.
              </p>

              <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base leading-relaxed">
                Our app emphasizes meaningful actions, urging settlers to
                reflect on privileges shaped by historical colonial injustices.
                Recognize these privileges stem from Indigenous dispossession
                and marginalization.
              </p>
            </div>
          </Card>
        </div>

        <div className="w-full lg:w-1/2 px-4 lg:px-0">
          <div className="relative">
            <div className="lg:block absolute -bottom-4 -left-4 w-24 h-24 bg-customNav opacity-5 rounded-full backdrop-blur-sm"></div>

            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 relative">
              <div className="relative group">
                <img
                  className="rounded-xl object-cover w-full h-48 sm:h-56 lg:h-48 shadow-md group-hover:shadow-lg transition-all duration-300"
                  src={land}
                  alt="Beautiful landscape of Indigenous land"
                />
              </div>
              <div className="relative group mt-4 sm:mt-0">
                <img
                  className="rounded-xl object-cover w-full h-48 sm:h-56 lg:h-48 shadow-md group-hover:shadow-lg transition-all duration-300"
                  src={land1}
                  alt="Another view of Indigenous land"
                />
                <div className="absolute -top-8 -right-4 lg:-top-16 lg:-right-8 w-40 h-40 lg:w-60 lg:h-60 bg-customNav opacity-5 rounded-full backdrop-blur-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row-reverse items-center gap-6 sm:gap-8 lg:gap-12 mb-10 sm:mb-14 lg:mb-18">
        <div className="w-full lg:w-1/2 px-4 sm:px-0">
          <Card className="h-full border-0">
            <div className="relative">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                With Acknowledging Our Lands
              </h2>

              <p className="text-gray-700 dark:text-gray-200 mb-4 text-sm sm:text-base leading-relaxed">
                we aim to promote understanding and empathy. Our app helps you
                identify your location and provides information on the
                Indigenous territories you are on.
              </p>
              <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base leading-relaxed">
                Join us in supporting reconciliation efforts and creating a
                society that acknowledges and honors Indigenous rights and
                sovereignty.
              </p>
            </div>
          </Card>
        </div>

        <div className="w-full lg:w-1/2 px-4 lg:px-0">
          <div className="relative">
            <div className="lg:block absolute -bottom-4 -right-4 w-24 h-24 bg-customNav opacity-5 rounded-full backdrop-blur-sm"></div>

            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 relative">
              <div className="relative group">
                <div className="absolute -top-8 -left-4 lg:-top-16 lg:-left-8 w-40 h-40 lg:w-60 lg:h-60 bg-customNav opacity-5 rounded-full backdrop-blur-sm"></div>
                <img
                  className="rounded-xl object-cover w-full h-48 sm:h-56 lg:h-48 shadow-md group-hover:shadow-lg transition-all duration-300"
                  src={land2}
                  alt="Cultural Indigenous landscape"
                />
              </div>
              <div className="relative group mt-4 sm:mt-0">
                <img
                  className="rounded-xl object-cover w-full h-48 sm:h-56 lg:h-48 shadow-md group-hover:shadow-lg transition-all duration-300"
                  src={land3}
                  alt="Stunning view of Indigenous heritage site"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center px-4">
        <Button
          onClick={() => navigate("/learn-more")}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm sm:text-base font-semibold rounded-lg hover:scale-105 transition-transform duration-300"
        >
          Learn More
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
        </Button>
        <p className="text-gray-500 dark:text-gray-400 mt-4 text-xs sm:text-sm">
          Join our community supporting reconciliation
        </p>
      </div>
    </PageContainer>
  );
};

export default About;
