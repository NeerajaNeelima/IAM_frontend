import React from "react";
import Form_Fields from "./form-fields";
import PasswordCheck from "./password-check";

export const Registrationform = ({ onNext }) => {
  return (
    <div className="">
      <div className="flex flex-col gap-1 justify-center items-center md:items-start ">
        <div className="font-bold text-2xl">Create your account</div>
        <div className="text-base font-medium text-gray-500">
          Let's get you started
        </div>
      </div>
      <div className="">
        {/* Form fileds */}
        <Form_Fields onNext={onNext}/>
      </div>
    </div>
  );
};
