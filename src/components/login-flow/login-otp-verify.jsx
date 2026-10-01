import React,{useState,useEffect,useRef} from 'react'
import { useLogin } from '../../context/LoginContext'
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineTextsms } from "react-icons/md";
import { TfiLock } from "react-icons/tfi";
import { CgCopyright } from "react-icons/cg";

const LoginOtpVerify = () => {

    const {

        selectedMethod,
        handleVerify,
        loginLoading,
        errormsg,
        user,
        setErrorMsg

    } = useLogin();

  
  
    const inputRefs = useRef([]);
  
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [isError, setIsError] = useState(false);
  
    const [expiryTime, setExpiryTime] = useState(155); // 02:45 minutes
    const [resendTime, setResendTime] = useState(25); // 25 seconds
  
    const handleChange = (value, index) => {
      if (!/^\d*$/.test(value)) return;
      setErrorMsg('')
      const digit = value.slice(-1);
  
      const newOtp = [...otp];
      newOtp[index] = digit;
  
      setOtp(newOtp);
      setIsError(false);
  
      // Auto move to next box
      if (digit && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
  
      // Validate when all digits are entered
      if (newOtp.every((digit) => digit !== "")) {
       handleVerify(selectedMethod,newOtp.join(""))
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
      setIsError(false);
  
      // Focus the last entered box
      const lastIndex = Math.min(pastedValue.length - 1, 5);
      inputRefs.current[lastIndex]?.focus();
  
      // Validate complete code
      // if (pastedValue.length === 6) {
      //   setIsError(pastedValue !== code);
      // }
    };
  
    const handleKeyDown = (e, index) => {
      // Backspace
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
  
      // Left arrow
      if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
  
      // Right arrow
      if (e.key === "ArrowRight" && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    };
  
    // -------------------------
    // EXPIRY COUNTDOWN
    // -------------------------
    useEffect(() => {
      if (expiryTime <= 0) return;
  
      const timer = setInterval(() => {
        setExpiryTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
  
            // Start resend countdown after expiry
            setResendTime(25);
  
            return 0;
          }
  
          return prev - 1;
        });
      }, 1000);
  
      return () => clearInterval(timer);
    }, [expiryTime]);
  
    // -------------------------
    // RESEND COUNTDOWN
    // -------------------------
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
  
    // -------------------------
    // FORMAT TIME
    // -------------------------
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
  
      return `${String(minutes).padStart(2, "0")}:${String(
        remainingSeconds
      ).padStart(2, "0")}`;
    };
  
    // -------------------------
    // RESEND CODE
    // -------------------------
    const handleResend = () => {
      setOtp(Array(6).fill(""));
      setIsError(false);
  
      // Restart timers
      setExpiryTime(120);
      setResendTime(25);
  
      // Focus first OTP box
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 0);
  
      // API call for resend can go here
      console.log("Verification code resent");
    };

    const getVerificationTarget = () => {
      if (selectedMethod === "Email") {
        return user?.email || "";
      }
    
      if (selectedMethod === "SMS") {
        return `${user?.countryCode || ""} ${user?.mobileNumber || ""}`;
      }
    
      return "your authenticator app";
    };
  
    return (
      <>
      {loginLoading && (
      <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-white font-semibold text-lg">
            Verifying...
          </p>
        </div>
      </div>
    )}
      <div className="flex flex-col justify-center min-h-[calc(100vh)] md:min-h-screen max-w-xl mx-auto items-center gap-4 relative ">
        <div
          className={`md:w-20 md:h-20 w-16 h-16 my-8 rounded-full ${
            isError
              ? "bg-red-100"
              : selectedMethod === "Email"
              ? "bg-blue-100"
              : selectedMethod === "SMS"
              ? "bg-green-100"
              : "bg-gray-200"
          } flex justify-center items-center`}
        >
            {selectedMethod === "Authenticator" && (
                <TfiLock className={`${isError ? "text-red-500" : "text-gray-700"} md:size-11 size-8 object-contain`} />
                )}
                {selectedMethod === "SMS" && (
                    <MdOutlineTextsms className={`${isError ? "text-red-500" : "text-green-500"} md:size-11 size-8 object-contain`}/>
                )}
                {selectedMethod === "Email" && <HiOutlineMail className={`${isError ? "text-red-500" : "text-blue-700"} md:size-11 size-8 object-contain`} />
            }
          
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="font-bold text-lg">{selectedMethod} Verification</div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-gray-700  font-semibold">
              We have sent a 6-digit code to
            </div>
            <div className="font-bold ">{getVerificationTarget()}</div>
          </div>
        </div>
  
        {/* OTP Boxes */}
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
              className={`
                h-11 w-11 rounded-lg border-2 px-4 text-center text-lg font-semibold
                outline-none transition-all duration-200
                
  
                ${
                  isError
                    ? "border-red-500 focus:border-red-500 focus:shadow-red-500 "
                    : "border-gray-200 focus:border-blue-500 focus:shadow-[2px_0_3px_3px_rgba(59,130,246,0.15)]"
                }
              `}
            />
          ))}
        </div>
  
        {/* Incorrect Code */}
        {errormsg  && (
          <div className="-mt-3 text-sm font-semibold bg-red-100 py-4 rounded px-10 text-red-500 leading-6  text-center">
            {errormsg}
          </div>
        )}
  
        {/* code Expiry */}
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
  
        {/* Resend code */}
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
              className="font-semibold rounded  w-1/2 bg-blue-600 text-white py-3  "
            >
              Resend New Code
            </button>
          )}
        </div>
  
        <div className="text-[#354ED9]  font-medium place-items-end mt-8 ">
          Didn't receive code?
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-2 md:flex hidden items-center justify-center whitespace-nowrap text-[13px] text-gray-400 font-medium">
            <CgCopyright className="size-4 mr-1" />
            2026 SecureID. All rights reserved.
        </div>
      </div>
      </>
    );
};

export default LoginOtpVerify