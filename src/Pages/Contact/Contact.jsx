import React from "react";

function Contact() {
  return (
    <section className="py-12 bg-customWhite dark:bg-darkNav sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-active dark:text-customWhite">
            Get in Touch
          </h1>
          <p className="mt-4 text-base sm:text-lg text-textGreyDark dark:text-textGrey">
            We value your feedback and are here to help with any questions or
            suggestions you have about the Acknowledging Our Lands app.
          </p>
        </div>
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 items-start gap-6 sm:gap-12 lg:gap-16 p-4 mx-auto max-w-4xl py-12">
          <div>
            <h1 className="text-active dark:text-customWhite text-3xl font-extrabold">
              Contact Us
            </h1>
            <p className="text-sm text-textGreyDark dark:text-textGrey mt-4">
              Your thoughts matter to us. Reach out with any questions, ideas,
              or feedback about the Acknowledging Our Lands app. We're here to
              listen and support you.
            </p>

            <div className="mt-12">
              <h2 className="text-active dark:text-customWhite text-base font-bold">
                Email
              </h2>
              <ul className="mt-4">
                <li className="flex items-center">
                  <div className="bg-customNav h-6 w-6 rounded-full flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      fill="#FFFCF7"
                      viewBox="0 0 479.058 479.058"
                    >
                      <path d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z" />
                    </svg>
                  </div>
                  <a
                    href="mailto:acknowledgingourlands@gmail.com"
                    className="text-textGreyDark dark:text-textGrey text-sm ml-4"
                  >
                    <small className="block">Mail</small>
                    <strong>acknowledginglands@gmail.com</strong>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <form className="space-y-4 mx-auto max-w-xl">
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded-md py-3 px-4 bg-gray-100 text-textGreyDark dark:text-textGrey border-gray-300 dark:border-gray-600 focus:bg-transparent"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-md py-3 px-4 bg-gray-100 text-textGreyDark dark:text-textGrey border-gray-300 dark:border-gray-600 focus:bg-transparent"
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full rounded-md py-3 px-4 bg-gray-100 text-textGreyDark dark:text-textGrey border-gray-300 dark:border-gray-600 focus:bg-transparent"
            />
            <textarea
              placeholder="Message"
              rows="6"
              className="w-full rounded-md px-4 bg-gray-100 text-textGreyDark dark:text-textGrey pt-3 border-gray-300 dark:border-gray-600 focus:bg-transparent"
            ></textarea>
            <button
              type="button"
              className="text-white bg-customNav hover:bg-buttonHover transition-all duration-300 tracking-wide rounded-md text-sm px-4 py-3 w-full mt-6"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
