import { Card, Button } from "../../Components/UI";
import { PageContainer } from "../../Components/Layouts";

function Contact() {
  return (
    <PageContainer className="py-12 min-h-[70vh] bg-customWhite dark:bg-darkNav">
      <div className="absolute top-32 -left-16 lg:left-28 w-40 h-40 bg-customNav opacity-5 rounded-full backdrop-blur-sm"></div>
      <div className="absolute bottom-30 right-0 w-48 h-48 bg-customNav opacity-5 rounded-full backdrop-blur-sm"></div>
      <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Get in Touch
        </h1>

        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          We value your feedback and are here to help with any questions or
          suggestions you have about the Acknowledging Our Lands app.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
        <Card className="p-6 sm:p-8 lg:p-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white  mb-3 sm:mb-4">
            Contact Us
          </h2>
          <p className="text-gray-700 dark:text-gray-200 mb-4 text-sm sm:text-base leading-relaxed">
            Your thoughts matter to us. Reach out with any questions, ideas, or
            feedback about the Acknowledging Our Lands app. We're here to listen
            and support you.
          </p>

          <div className="mt-10">
            <h3 className="text-lg font-semibold text-active dark:text-customWhite mb-4">
              Email
            </h3>
            <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg transition-all">
              <div className="bg-customNav h-12 w-12 rounded-full flex items-center justify-center shrink-0 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="#FFFCF7"
                  viewBox="0 0 479.058 479.058"
                  className="flex-shrink-0"
                >
                  <path d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base leading-relaxed">
                  Mail
                </p>
                <a
                  href="mailto:acknowledgingourlands@gmail.com"
                  className="text-active dark:text-blue-300 font-semibold hover:underline transition-colors"
                >
                  acknowledginglands@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Response Time
            </h3>
            <p className="text-gray-700 dark:text-gray-200 text-sm">
              We typically respond to all inquiries within 24-48 hours. Thank
              you for your patience.
            </p>
          </div>
        </Card>

        <Card className="p-6 sm:p-8 lg:p-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Send a Message
          </h2>

          <form className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200  mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                className="w-full rounded-lg py-3 px-4 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-textGreyDark dark:text-textGrey placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-customNav/30 focus:border-customNav transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-textGreyDark dark:text-textGrey mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full rounded-lg py-3 px-4 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-textGreyDark dark:text-textGrey placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-customNav/30 focus:border-customNav transition-all"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-textGreyDark dark:text-textGrey mb-2"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                required
                className="w-full rounded-lg py-3 px-4 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-textGreyDark dark:text-textGrey placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-customNav/30 focus:border-customNav transition-all"
                placeholder="What is this regarding?"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-textGreyDark dark:text-textGrey mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows="5"
                className="w-full rounded-lg px-4 py-3 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-textGreyDark dark:text-textGrey placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-customNav/30 focus:border-customNav transition-all resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <Button
              type="submit"
              className="w-full bg-customNav hover:bg-buttonHover text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
            >
              Send Message
            </Button>
          </form>
        </Card>
      </div>
    </PageContainer>
  );
}

export default Contact;
