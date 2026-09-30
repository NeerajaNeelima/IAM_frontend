import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Registrationform } from "./registration-form";
import VerifyEmailCode from "./verify-email-code";
import VerifyMobileCode from "./verify-mobile-code";
import MultiFactorAuth from "./multi-factor-auth/multi-factor-auth";
import SuccessAccountCreated from "./success-account-created";
import { FaArrowLeft } from "react-icons/fa6";
import { CgCopyright } from "react-icons/cg";


const RegistrationFlowMain = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const steps = [1, 2, 3, 4, 5];

  const changeStep = (step) => {
    if (step < 1 || step > steps.length) return;

    setDirection(step > currentStep ? 1 : -1);
    setIsTransitioning(true);
    setCurrentStep(step);
    setIsTransitioning(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Registrationform onNext={() => changeStep(2)}/>;

      case 2:
        return <VerifyEmailCode onNext={() => changeStep(3)}/>;

      case 3:
        return <VerifyMobileCode onNext={() => changeStep(4)}/>;

      case 4:
        return <MultiFactorAuth onNext={() => changeStep(5)}/>;

      case 5:
        return <SuccessAccountCreated />;

      default:
        return <Registrationform onNext={() => changeStep(2)}/>;
    }
  };

  return (
    <div>
      <section className="hidden md:flex gap-2 items-center m-2">
        <img
          src="/assets/security-removebg-preview.png"
          alt="Secruity lock img"
          className="w-10 h-14 mix-blend-multiply"
        />
        <div className=" font-bold text-xl">SecureID</div>
      </section>

      <section className="mx-auto hidden md:flex w-full max-w-2xl items-center px-6">
        {steps.map((step, index) => {
          const isActive = step === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step}>
              {/* Step Circle */}

              <button
                type="button"
                onClick={() => setCurrentStep(step)}
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-base font-bold transition-all duration-300
                  ${
                    isActive
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-300 bg-white text-gray-500"
                  }`}
              >
                {step}
              </button>

              {/* Connecting Line */}

              {!isLast && <div className=" h-[2px] flex-1 bg-gray-200"></div>}
            </React.Fragment>
          );
        })}
      </section>
      <button
        type="button"
        onClick={() => changeStep(currentStep + 1)}
        className="text-gray-600 transition hover:text-gray-900 m-4"
      >
        <FaArrowLeft className="size-5 block md:hidden" />
      </button>

      <section className=" max-w-7xl  mx-auto px-4 md:px-10 pt-2 md:pt-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={{
              enter: (direction) => ({
                x: direction > 0 ? "100%" : "-100%",
                opacity: 0,
              }),

              center: {
                x: 0,
                opacity: 1,
              },

              exit: (direction) => ({
                x: direction > 0 ? "-100%" : "100%",
                opacity: 0,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
        {/* Loading Overlay */}
        {isTransitioning && (
          <div className="flex  items-center justify-center">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600" />

              <span className="text-sm font-medium text-blue-500">
                Loading...
              </span>
            </div>
          </div>
        )}
      </section>
      <div className="md:flex hidden justify-center items-center mt-4 text-[13px] text-gray-400 font-medium">
        <CgCopyright className="size-4 mt-[2px]" /> 2026 SecureID. All rights
        reserved.
      </div>
    </div>
  );
};

export default RegistrationFlowMain;
