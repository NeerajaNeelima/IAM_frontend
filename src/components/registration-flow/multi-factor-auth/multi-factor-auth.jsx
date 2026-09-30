import React, { useState } from "react";
import { MdSecurity, MdOutlineTextsms } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import { FaArrowLeft } from "react-icons/fa6";
import AuthenticatorSetup from "./authentication-setup";
import MfaVerification from "./mfa-verification";
import { initiateEmailMfa, initiateSmsMfa } from "../../../api/registerApi";
import { useSelector } from "react-redux";

const MultiFactorAuth = ({onNext}) => {
  const [selectedMethod, setSelectedMethod] = useState("authenticator");
  const [currentSection, setCurrentSection] = useState("selection");
  const [isError, setIsError] = useState(false);

  const registrationData = useSelector(
    (state) => state.registration.registrationData
  );

  const email = registrationData?.email;

  const authenticationMethods = [
    {
      id: "authenticator",
      title: "Authenticator App",
      description: "(Google Authenticator / Authy)",
    },
    {
      id: "sms",
      title: "SMS Authentication",
      description: "Receive codes on your mobile",
    },
    {
      id: "email",
      title: "Email Authentication",
      description: "Receive codes on your email",
    },
  ];

  const handleContinue = async () => {
    if (selectedMethod === "authenticator") {
      setCurrentSection("authenticator");
    } else {
      if (selectedMethod === "sms") {
        await initiateSmsMfa(email);
      } else if (selectedMethod === "email") {
        await initiateEmailMfa(email);
      }
      setCurrentSection("verification");
    }
  };

  const handleBack = () => {
    if (currentSection === "authenticator") {
      setCurrentSection("selection");
    } else if (currentSection === "verification") {
      setCurrentSection("authenticator");
    }
  };

  // --------------------------------
  // AUTHENTICATOR SETUP
  // --------------------------------
  if (currentSection === "authenticator") {
    return (
      <AuthenticatorSetup
        onBack={handleBack}
        onContinue={() => setCurrentSection("verification")}
      />
    );
  }

  // --------------------------------
  // MFA VERIFICATION
  // --------------------------------
  if (currentSection === "verification") {
    return <MfaVerification onBack={handleBack} method={selectedMethod} onNext={onNext}/>;
  }

  // --------------------------------
  // MFA METHOD SELECTION
  // --------------------------------
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      {/* Icon */}
      <div className="flex h-16 w-16 my-8 md:my-0 items-center justify-center rounded-full ">
        {isError ? (
          <img
            src="/assets/authentication_error.png"
            alt="SecureID"
            className="w-12 h-12 object-contain"
          />
        ) : (
          <img
            src="/assets/authentication.png"
            alt="SecureID"
            className="w-12 h-12 object-contain "
          />
        )}
      </div>

      {/* Heading */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-xl font-bold">Set up Multi-Factor Auth</h2>

        <p className="max-w-md text-sm font-medium text-gray-700">
          Add an extra layer of security
          <br />
          to protect your account.
        </p>
      </div>

      {/* Authentication Methods */}
      <div className="w-full max-w-md space-y-3">
        {authenticationMethods.map((method) => {
          const isSelected = selectedMethod === method.id;

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => setSelectedMethod(method.id)}
              className={`
                flex w-full items-center justify-between
                rounded-lg border-2 px-4 py-3
                text-left transition-all duration-200
                ${
                  isSelected
                    ? "border-blue-400 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }
              `}
            >
              <div className="flex items-center gap-3">
                {/* Method Icon */}
                <div
                  className={`
                    flex h-7 w-7 items-center justify-center
                    rounded-md border
                    ${
                      isSelected
                        ? "border-blue-600 text-blue-600"
                        : "border-0 text-gray-400"
                    }
                  `}
                >
                  {method.id === "authenticator" && (
                    <MdSecurity className="size-5" />
                  )}
                  {method.id === "sms" && (
                    <MdOutlineTextsms className="size-5" />
                  )}
                  {method.id === "email" && <TfiEmail className="size-5" />}
                </div>

                <div>
                  <div className="text-sm font-bold text-gray-800">
                    {method.title}
                  </div>

                  <div className="text-xs text-gray-500">
                    {method.description}
                  </div>
                </div>
              </div>

              <div
                className={`
                  flex h-5 w-5 items-center justify-center
                  rounded-full border-2
                  ${isSelected ? "border-blue-600" : "border-gray-400"}
                `}
              >
                {isSelected && (
                  <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleContinue}
        className="w-full max-w-md rounded-lg bg-blue-700 py-3 font-semibold text-white transition hover:bg-blue-800"
      >
        Continue
      </button>
    </div>
  );
};

export default MultiFactorAuth;
