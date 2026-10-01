import React, { useRef, useState, useEffect } from "react";
import {
  verifyAuthenticator,
  verifySmsMfa,
  verifyEmailMfa,
} from "../../../api/registerApi";
import { useSelector } from "react-redux";
import { useRegistration } from "../../../context/RegistrationContext";

const MfaVerification = ({ onBack, method,onNext }) => {
  const inputRefs = useRef([]);
  const {loading,registererrormsg,setRegisterErrorMsg,setLoading}=useRegistration();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isError, setIsError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(28);

  const registrationData = useSelector(
    (state) => state.registration.registrationData
  );

  const email = registrationData?.email;

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    
    const digit = value.slice(-1);

    const newOtp = [...otp];
    newOtp[index] = digit;

    setOtp(newOtp);
    setIsError(false);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      console.log("yes")
      handleVerify(newOtp.join(""));

      
    }
  };

  const handleVerify = async (enteredOtp) => {
    
   
    
    // if (timeLeft <= 0) {
    //   setIsError(true);

    //   return;
    // }
    setLoading(true)

    try {
      setIsError(false);
      let response;
      console.log("inside try")
      if (method === "authenticator") {
        console.log("Authenticator",email,enteredOtp)
        response = await verifyAuthenticator(email, enteredOtp);
      } else if (method === "sms") {
        response = await verifySmsMfa(email, enteredOtp);
      } else if (method === "email") {
        response = await verifyEmailMfa(email, enteredOtp);
      } else {
        throw new Error("Invalid MFA method");
      }

      console.log("MFA verification success:", response);

      // Registration completed.
      // You can redirect here.
      onNext();
      alert("Registration completed successfully!");
    } catch (error) {
      console.error(error);
      setRegisterErrorMsg(error.message)
      setIsError(true);
    } finally {
      setLoading(false)
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((previousTime) => previousTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const getDescription = () => {
    if (method === "authenticator") {
      return (
        <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-xl font-bold">Enter the 6-digit code</h2>

        <p className="text-sm font-medium text-gray-500">
          Enter the code from your
          <br />
          authenticator app
        </p>
      </div>
      );
    }

    if (method === "sms") {
      return (
        <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-xl font-bold">Enter the 6-digit code</h2>

        <p className="text-sm font-medium text-gray-500">
          Enter the code from your
          <br />
          Phone Number
        </p>
      </div>
      );
    }

    return (
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-xl font-bold">Enter the 6-digit code</h2>

        <p className="text-sm font-medium text-gray-500">
          Enter the code from your
          <br />
          Email
        </p>
      </div>
    );
  };

  return (
    <>
    {loading && (
      <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-white font-semibold text-lg">
            Verifying...
          </p>
        </div>
      </div>
    )}
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="flex h-16 w-16 items-center justify-center rounded-full ">
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
      {getDescription()}

      {/* OTP */}
      <div className="my-3 flex gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`
              h-12 w-12 rounded-lg border-2
              text-center text-lg font-semibold
              outline-none transition-all duration-200
              ${
                isError
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-blue-500"
              }
            `}
          />
        ))}
      </div>

      {/* Error */}
      {isError && (
        <p className="-mt-2 text-sm font-semibold text-red-500">
          {registererrormsg}
        </p>
      )}

      {timeLeft > 0 ? (
        <div className="font-semibold text-gray-700">
          {" "}
          Code expires in{" "}
          <span className="font-bold text-[#354ED9]">
            {" "}
            {formatTime(timeLeft)}{" "}
          </span>{" "}
        </div>
      ) : (
        <div className="font-semibold text-red-500"> Code has expired </div>
      )}

      {/* Can't access */}
      <button
        type="button"
        className="font-bold text-[#354ED9] hover:underline"
      >
        Can't access your app?
      </button>
    </div>
    </>
  );
};

export default MfaVerification;
