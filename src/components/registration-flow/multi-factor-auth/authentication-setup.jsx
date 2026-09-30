import React, { useEffect, useState } from "react";
import { useRegistration } from "../../../context/RegistrationContext";
import { InitiateAuthentication } from "../../../api/registerApi";

const AuthenticatorSetup = ({ onBack, onContinue }) => {
  const {
    email,
    qrCode,
    setQrCode,
    setupKey,
    setSetupKey,
    isLoadingQRCode,
    setIsLoadingQRCode,
  } = useRegistration();

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showSetupKey, setShowSetupKey] = useState(false);

  useEffect(() => {
    const initializeAuthenticator = async () => {
      try {
        setIsLoadingQRCode(true);
        setIsError(false);
        setErrorMessage("");
        
        if (!email) {
          throw new Error("Email is required");
        }

        const data = await InitiateAuthentication(email);

        console.log("Authenticator setup response:", data);

        setQrCode(data.qrCode);
        setSetupKey(data.setupKey);

      } catch (error) {
        console.error("Authenticator setup error:", error);

        setIsError(true);
        setErrorMessage(
          error.message || "Failed to generate QR code"
        );
      } finally {
        setIsLoadingQRCode(false);
      }
    };

    
    if (!qrCode) {
      initializeAuthenticator();
    }
  }, [
    email,
    qrCode,
    setQrCode,
    setSetupKey,
    setIsLoadingQRCode,
  ]);

  return (
    <div className="flex flex-col items-center justify-center gap-5">

      {/* Heading */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-xl font-bold">
          Scan QR Code
        </h2>

        <p className="text-sm font-medium text-gray-500">
          Open your authenticator app and
          <br />
          scan this QR code
        </p>
      </div>

      {/* QR Code */}
      <div className="flex h-48 w-48 items-center justify-center rounded-lg border border-gray-200 bg-white p-3 shadow-sm">

        {isLoadingQRCode ? (
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#354ED9]" />

            <span className="text-xs text-gray-500">
              Loading...
            </span>
          </div>
        ) : isError ? (
          <div className="px-3 text-center">
            <p className="text-sm font-semibold text-red-500">
              {errorMessage}
            </p>
          </div>
        ) : qrCode ? (
          <img
            src={qrCode}
            alt="Authenticator QR Code"
            className="h-full w-full object-contain"
          />
        ) : (
          <p className="text-sm text-gray-500">
            QR code unavailable
          </p>
        )}

      </div>

      {/* Setup Key */}
      <button
        type="button"
        onClick={() => setShowSetupKey(!showSetupKey)}
        className="font-semibold text-[#354ED9] hover:underline"
      >
        {showSetupKey
          ? "Hide setup key"
          : "Can't scan? Enter setup key"}
      </button>

      {/* Setup Key Display */}
      {showSetupKey && setupKey && (
        <div className="w-48 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-center">
          <p className="mb-1 text-xs text-gray-500">
            Setup Key
          </p>

          <p className="break-all font-mono text-sm font-semibold text-gray-800">
            {setupKey}
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex w-full items-center justify-center gap-10">

        <button
          type="button"
          onClick={onBack}
          className="mt-2 w-44 rounded-lg border-2 border-gray-700 py-3 font-semibold transition hover:border-blue-700 hover:bg-[#354ED9] hover:text-white"
        >
          Back
        </button>

        <button
          type="button"
          onClick={onContinue}
          disabled={isLoadingQRCode || !qrCode}
          className="mt-2 w-44 rounded-lg border-2 border-[#354ED9] bg-[#354ED9] py-3 font-semibold text-white transition hover:border-blue-700 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue
        </button>

      </div>
    </div>
  );
};

export default AuthenticatorSetup;