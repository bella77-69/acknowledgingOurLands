import { Button } from "../../Components/UI";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-[60vh] bg-hero-gradient dark:bg-hero-gradient-dark bg-cover bg-center">
      <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>

      <div className="relative z-10  min-h-[60vh] w-full">
        <div className="flex justify-center flex-col items-center text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight mb-4 sm:mb-6 text-white">
            Acknowledging Our Lands
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 lg:mb-12 leading-relaxed max-w-3xl mx-auto px-2 xs:px-4">
            Acknowledging Our Lands is an app designed to help you identify the
            Indigenous lands you are on and create meaningful land
            acknowledgments. Land acknowledgments recognize the deep connection
            Indigenous Peoples have with their traditional territories. They are
            an act of respect and a step towards reconciliation.
          </p>
          <div className="mt-6">
            <Button
              as="a"
              onClick={() => navigate("/discover")}
              className="bg-accent hover:bg-accent-hover px-6 py-3 text-base sm:text-lg font-semibold shadow-lg border-2 border-white/20"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
