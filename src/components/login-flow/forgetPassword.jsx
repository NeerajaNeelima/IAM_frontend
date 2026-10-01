import React from "react";
import { MdOutlineMail } from "react-icons/md";
import { CgCopyright } from "react-icons/cg";
import { useLogin } from "../../context/LoginContext";

const ForgotPassword = () => {
  const {
    forgotEmail,
    setForgotEmail,
    handleForgotPassword,
    forgotPasswordLoading,
    forgotPasswordError,
    setNextStep,
  } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleForgotPassword();
  };

  return (
    <div className="w-full max-w-xl mx-auto relative">
      <div className="min-h-[calc(10vh-104px)] mx-auto md:min-h-screen flex flex-col justify-center items-center gap-5">
        <div className="w-full text-center flex flex-col justify-center items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <MdOutlineMail className="size-9 text-blue-700" />
          </div>

          <div className="text-2xl font-bold">Forgot Password?</div>

          <div className="text-sm text-gray-500 font-medium max-w-sm">
            Enter your registered email address and we'll send you a
            verification code to reset your password.
          </div>
        </div>

        <form
          className="mt-4 flex flex-col gap-4 w-full"
          onSubmit={handleSubmit}
        >
          <div
            className="
              h-12 rounded-lg border-2
              shadow-[0_2px_6px_rgba(0,0,0,0.08)]
              border-gray-200 px-4
              outline-none flex gap-4
              justify-start items-center
              transition-all duration-200
              focus-within:border-blue-500
              focus-within:shadow-[2px_0_3px_3px_rgba(59,130,246,0.15)]
            "
          >
            <MdOutlineMail className="text-gray-400 size-6" />

            <input
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="Email address"
              className="border-0 focus:border-0 bg-transparent outline-none w-full"
              required
            />
          </div>

          {forgotPasswordError && (
            <div className="text-sm font-semibold bg-red-100 py-3 px-4 rounded-lg text-red-500 text-center">
              {forgotPasswordError}
            </div>
          )}

          <button
            type="submit"
            disabled={forgotPasswordLoading}
            className="
              rounded-lg bg-blue-700 text-white
              text-md font-semibold
              flex justify-center items-center
              cursor-pointer h-12 mt-5
              disabled:opacity-70
              disabled:cursor-not-allowed
            "
          >
            {forgotPasswordLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              "Send Verification Code"
            )}
          </button>
        </form>

        {/* Back to Login */}
        <button
          type="button"
          onClick={() => setNextStep("login")}
          className="text-blue-600 text-sm font-semibold hover:underline underline-offset-4"
        >
          Back to Login
        </button>
      </div>

      {/* Copyright */}
      <div
        className="
          absolute bottom-0 left-1/2
          -translate-x-1/2 mb-2
          md:flex hidden items-center
          justify-center whitespace-nowrap
          text-[13px] text-gray-400 font-medium
        "
      >
        <CgCopyright className="size-4 mr-1" />
        2026 SecureID. All rights reserved.
      </div>
    </div>
  );
};

export default ForgotPassword;
