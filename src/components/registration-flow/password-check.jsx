import React from "react";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { VscDash } from "react-icons/vsc";
import { useRegistration } from "../../context/RegistrationContext";

const PasswordCheck = () => {
  const { password } = useRegistration();
  
   const passwordRequirements =[
    {
      text : "At least 8 characters",
      isValid: password.length >=8,
    },
    {
      text : "1 uppercase letter",
      isValid: /[A-Z]/.test(password),
    },
    {
      text: "1 number",
      isValid: /\d/.test(password),
    },
    {
      text: "1 special character",
      isValid: /[^A-Za-z0-9]/.test(password),
    }
   ]
  

  return (
    <div className="md:mt-8 flex flex-col  md:gap-4">
      <div className="rounded-lg border-0 md:border-2 border-gray-150 px-2 md:px-6 py-2 md:py-6 md:shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
        <div className="mb-4 text-md text-gray-600 md:text-blak font-semibold md:font-bold">
          Password must contain:
        </div>
        <div className="flex flex-col gap-4">
          {passwordRequirements.map((requirement)=>{
            const hasPassword = password.length > 0;
            return(
              <div key={requirement.text} className=" flex items-center gap-2">

                {/* No password */}
                {!hasPassword &&(
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg bg-gray-100">
                    <VscDash className="size-4 text-gray-600"/>
                  </div>
                )}

                {hasPassword  && requirement.isValid &&(
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg bg-green-100">
                    <FaCheck className="size-3 text-green-600"/>
                  </div>
                )}

                {hasPassword  && !requirement.isValid &&(
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg bg-red-100">
                    <IoClose className="size-4 text-red-600"/>
                  </div>
                )}

                <div className="text-md font-medium text-gray-500">
                  {requirement.text}
                </div>

              </div>
            )
          })}
        </div>
        
      </div>

      <div className="flex gap-2 mx-3 md:mx-0 items-center ">
        <input
          type="checkbox"
          defaultChecked
          className=" cursor-pointer  h-5 w-5"
        />
        <div className="text-gray-700 mt-6 ">
          I agree to the{" "}
          <span className="text-blue-700">Terms & Conditions</span> and{" "}
          <span className="text-blue-700">Privacy policy</span>
        </div>
      </div>
    </div>
  );
};

export default PasswordCheck;
