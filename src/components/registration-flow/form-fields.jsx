import React, { useState, useRef, useEffect } from "react";
import { useRegistration } from "../../context/RegistrationContext";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";
import PasswordCheck from "./password-check";
import { sendEmailOtp } from "../../api/registerApi";

import countryNames from "react-phone-number-input/locale/en.json";
import { FaChevronDown } from "react-icons/fa6";

import toast from "react-hot-toast";

import { useDispatch } from "react-redux";
import { setRegistrationData } from "../../redux/registrationSlice";

const Form_Fields = ({ onNext }) => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    mobileNumber,
    setMobileNumber,
    country,
    setCountry,
  } = useRegistration();

  const [visible, setVisible] = useState(false);
  const [countryDropdown, setCountryDropdown] = useState(false);
  const countryDropdownRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const isPasswordValid =
  password.length >= 8 && // length
  /\d/.test(password) && // 1 number
  /[A-Z]/.test(password) && // 1 upper case letter
  /[^A-Za-z0-9]/.test(password); // 1 special character

  const selectedCountryCode = `+${getCountryCallingCode(country)}`;

  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setCountryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  

const handleSubmit = async () => {
  const registerData = {
    fullName: name,
    email: email,
    countryCode: selectedCountryCode,
    mobileNumber: mobileNumber,
    password: password,
  };

  try {
    setIsLoading(true);

    dispatch(setRegistrationData(registerData));

    const response = await sendEmailOtp(registerData);

    toast.success(response.message);

    onNext();
  } catch (error) {
    toast.error(error.message || "Failed to send email OTP");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="grid md:grid-cols-[55%_40%] xl:grid-cols-[65%_30%] lg:grid-cols-[60%_35%] mx-auto  w-full  gap-10 mb-2 md:mb-0">
      {/* Form fileds */}
      <form className="mt-4 flex flex-col gap-4"  onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}>
        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Full Name
          </label>

          <div
            className="h-11 rounded-lg border-2 shadow-[0_2px_6px_rgba(0,0,0,0.08)]  border-gray-200 px-4 outline-none flex justify-start items-center group transition-all duration-200
              focus-within:border-blue-500
                focus-within:shadow-[2px_0_3px_3px_rgba(59,130,246,0.15)]"
          >
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className=" border-0 focus:border-0 bg-transparent outline-none w-full"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <div
            className="h-11 rounded-lg border-2 shadow-[0_2px_6px_rgba(0,0,0,0.08)] border-gray-200 px-4 outline-none flex justify-start items-center group transition-all duration-200
              focus-within:border-blue-500
                focus-within:shadow-[2px_0_3px_3px_rgba(59,130,246,0.15)]"
          >
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className=" border-0 focus:border-0 bg-transparent outline-none w-full"
            />
          </div>
        </div>

        {/* Mobile Number */}

        <div className="flex flex-col gap-2">
          <label
            htmlFor="mobile-number"
            className="text-sm font-medium text-gray-700"
          >
            Mobile Number
          </label>

          <div className="flex gap-2 items-center w-full">
            {/* Country Code */}
            <div className="relative w-24" ref={countryDropdownRef}>
              <button
                type="button"
                onClick={() => setCountryDropdown(!countryDropdown)}
                className="h-11 w-full rounded-lg border-2 shadow-[0_2px_6px_rgba(0,0,0,0.08)] border-gray-200 flex items-center justify-between bg-white px-3 text-left outline-none focus:border-blue-500"
              >
                {selectedCountryCode}

                <FaChevronDown
                  className={`${
                    countryDropdown ? "rotate-180" : "rotate-0"
                  }  size-3 text-gray-400 transition-transform duration-300 ease-in-out`}
                />
              </button>

              {/* Country code list dropdown */}
              <div
                className={`
                    absolute z-50 mt-1 w-64 overflow-hidden rounded-lg border bg-white shadow-lg
                    origin-top
                    transition-all duration-300 ease-in-out
                    ${
                      countryDropdown
                        ? "max-h-60 opacity-100 translate-y-0"
                        : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
                    }
                  `}
              >
                <div className="max-h-60 overflow-y-auto">
                  {getCountries().map((countryCode) => (
                    <button
                      type="button"
                      key={countryCode}
                      onClick={() => {
                        setCountry(countryCode);
                        setCountryDropdown(false);
                      }}
                      className="flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-100"
                    >
                      <span>{countryNames[countryCode]}</span>

                      <span className="text-gray-600">
                        +{getCountryCallingCode(countryCode)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Phone Number */}
            <div
              className="h-11 rounded-lg border-2 shadow-[0_2px_6px_rgba(0,0,0,0.08)] border-gray-200 px-4 outline-none flex justify-start items-center group transition-all duration-200
              focus-within:border-blue-500 w-full
                focus-within:shadow-[2px_0_3px_3px_rgba(59,130,246,0.15)]"
            >
              <input
                id="mobile-number"
                type="number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="99999 99999"
                className=" border-0 focus:border-0 bg-transparent outline-none w-full"
              />
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div
            className="h-11 rounded-lg border-2 shadow-[0_2px_6px_rgba(0,0,0,0.08)] border-gray-200 px-4 outline-none flex justify-start items-center group transition-all duration-200
              focus-within:border-blue-500
                focus-within:shadow-[2px_0_3px_3px_rgba(59,130,246,0.15)]"
          >
            <div className="flex justify-between w-full items-center">
              <input
                id="password"
                type={`${visible ? "text" : "password"}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className=" border-0 focus:border-0 bg-transparent outline-none w-full"
              />
              {visible ? (
                <LuEye
                  className="size-6 cursor-pointer text-gray-400"
                  onClick={() => setVisible(!visible)}
                />
              ) : (
                <LuEyeOff
                  className="size-6 cursor-pointer text-gray-400"
                  onClick={() => setVisible(!visible)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Password Check small devices */}
        <div className="w-full md:hidden block">
          <PasswordCheck />
        </div>

        <button
          type="submit"
          disabled={isLoading || !isPasswordValid}
          className={`h-12 rounded-lg ${!isPasswordValid ?'bg-blue-300 cursor-not-allowed':'bg-blue-600 cursor-pointer'} font-semibold text-white transition hover:bg-blue-700`}
        >
         {isLoading ? (
            <div className="flex justify-center items-center gap-2">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            </div>
          ) : (
            "Create Account"
          )}
        </button>

        <div className="text-gray-600 text-sm text-center font-medium ">
          Already have an account ?{" "}
          <a href="/" className="text-blue-600 font-bold cursor-pointer  hover:underline underline-offset-4">Login</a>
        </div>
      </form>

      {/* Password Check Large devices */}
      <div className="md:block hidden">
        <PasswordCheck />
      </div>
    </div>
  );
};

export default Form_Fields;
