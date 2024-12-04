import React from "react";

export default function Hero() {
  return (
    <div className="hero min-h-screen bg-hero-gradient bg-cover bg-center text-white">
      <div className="flex justify-center z-10 text-center">
        <div className="mx-auto max-w-4xl py-16 sm:py-24 lg:py-32">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl md:px-8 lg:px-10 xs:mb-2 lg:mb-6 font-semibold tracking-tight">
              Acknowledging Our Lands
            </h1>

            <p className="mb-6 max-w-xxl text-sm text-customWhite px-2 xs:px-4 md:px-8 sm:text-xl md:mb-10 lg:mb-12">
              Acknowledging Our Lands is an app designed to help you identify
              the Indigenous lands you are on and create meaningful land
              acknowledgments. Land acknowledgments recognize the deep
              connection Indigenous Peoples have with their traditional
              territories. They are an act of respect and a step towards
              reconciliation.
            </p>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="rounded-lg bg-customNav px-6 py-3 text-base font-semibold text-customWhite shadow-lg hover:bg-active focus:outline-noneS"
              >
                Get Started
              </a>
              <a
                href="#"
                className="text-base font-semibold text-customWhite hover:text-active"
              >
                Learn More <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
