import React from "react";
import { IoCheckmark } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

const SuccessAccountCreated = () => {
  const completedSteps = ["Email verified", "Mobile verified", "MFA enabled"];

  return (
    <section className="mx-auto flex max-w-lg items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500">
          <IoCheckmark className="size-10 text-white" />
        </div>

        <div className="text-xl font-bold">Account Created!</div>

        <div className="w-2/3 text-center text-md font-medium leading-6 text-gray-500">
          Account has been created successfully and MFA is enabled.
        </div>

        <div className="w-1/2 space-y-3">
          {completedSteps.map((step, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100">
                <FaCheck className="size-4 text-green-700" />
              </div>

              <span className="text-sm font-medium  text-gray-700">{step}</span>
            </div>
          ))}
        </div>

        <a href='/'className="w-full mt-14 rounded-lg flex justify-center items-center bg-blue-700 py-3 font-semibold text-white transition hover:bg-blue-800">
          Continue to Login
        </a>
      </div>
    </section>
  );
};

export default SuccessAccountCreated;
