import React, { useEffect, useRef, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { CgCopyright } from "react-icons/cg";
import { useLogin } from "../../context/LoginContext";

const ResetPasswordOtp = () => {
  const {
    forgotEmail,
    handleVerifyResetOtp,
    forgotPasswordLoading,
    forgotPasswordError,
    handleForgotPassword,
    setNextStep,
  } = useLogin();

  const inputRefs = useRef([]);

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [expiryTime, setExpiryTime] = useState(300);
  const [resendTime, setResendTime] = useState(25);

  useEffect(() => {
    if (expiryTime <= 0) return;

    const timer = setInterval(() => {
      setExpiryTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryTime]);

  useEffect(() => {
    if (resendTime <= 0) return;

    const timer = setInterval(() => {
      setResendTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const digit = value.slice(-1);

    const newOtp = [...otp];
    newOtp[index] = digit;

    setOtp(newOtp);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      handleVerifyResetOtp(newOtp.join(""));
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedValue = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedValue) return;

    const newOtp = Array(6).fill("");

    pastedValue.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    const lastIndex = Math.min(pastedValue.length - 1, 5);

    inputRefs.current[lastIndex]?.focus();

    if (pastedValue.length === 6) {
      handleVerifyResetOtp(pastedValue);
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

  const handleResend = async () => {
    setOtp(Array(6).fill(""));
    setExpiryTime(300);
    setResendTime(25);

    await handleForgotPassword();

    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 0);
  };

  return (
    <>
      {forgotPasswordLoading && (
        <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />

            <p className="text-white font-semibold text-lg">Verifying...</p>
          </div>
        </div>
      )}

      <div className="flex flex-col justify-center min-h-[calc(100vh)] md:min-h-screen max-w-xl mx-auto items-center gap-4 relative">
        <div className="md:w-20 md:h-20 w-16 h-16 my-8 rounded-full bg-blue-100 flex justify-center items-center">
          <MdOutlineMail className="text-blue-700 md:size-11 size-8" />
        </div>

        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="font-bold text-lg">Verify Reset Code</div>

          <div className="flex flex-col items-center justify-center">
            <div className="text-gray-700 font-semibold text-center">
              We have sent a 6-digit code to
            </div>

            <div className="font-bold">{forgotEmail}</div>
          </div>
        </div>

        <div className="my-4 flex gap-3">
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
              onPaste={handlePaste}
              onKeyDown={(e) => handleKeyDown(e, index)}
              disabled={forgotPasswordLoading}
              className="
                h-11 w-11 rounded-lg border-2
                px-4 text-center text-lg
                font-semibold outline-none
                transition-all duration-200
                border-gray-200
                focus:border-blue-500
                focus:shadow-[2px_0_3px_3px_rgba(59,130,246,0.15)]
                disabled:bg-gray-100
              "
            />
          ))}
        </div>

        {forgotPasswordError && (
          <div className="text-sm font-semibold bg-red-100 py-4 rounded px-10 text-red-500 leading-6 text-center">
            {forgotPasswordError}
          </div>
        )}

        <div className="font-semibold text-gray-700 mt-4">
          {expiryTime > 0 ? (
            <>
              Code expires in{" "}
              <span className="text-xl font-bold text-[#354ED9]">
                {formatTime(expiryTime)}
              </span>
            </>
          ) : (
            <span className="text-red-500">This code has expired</span>
          )}
        </div>

        <div className="font-medium text-[#354ED9] flex justify-center items-center mt-4 w-full">
          {resendTime > 0 ? (
            <>
              Resend code{" "}
              <span className="text-xl font-bold">
                ({formatTime(resendTime)})
              </span>
            </>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={forgotPasswordLoading}
              className="
                font-semibold rounded
                w-1/2 bg-blue-600
                text-white py-3
                disabled:opacity-60
              "
            >
              Resend New Code
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setNextStep("forgotPassword")}
          className="text-blue-600 font-medium mt-4 hover:underline"
        >
          Change email
        </button>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-2 md:flex hidden items-center justify-center whitespace-nowrap text-[13px] text-gray-400 font-medium">
          <CgCopyright className="size-4 mr-1" />
          2026 SecureID. All rights reserved.
        </div>
      </div>
    </>
  );
};

export default ResetPasswordOtp;
