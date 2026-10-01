import React,{useState} from 'react'
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineTextsms } from "react-icons/md";
import { TfiLock } from "react-icons/tfi";
import { useLogin } from '../../context/LoginContext';
import { CgCopyright } from "react-icons/cg";

const VerifyLogin = () => {
    const {
        selectedMethod,
        setSelectedMethod,
        handleContinue,
        loginLoading,
        
    }=useLogin();
    

    const authenticationMethods = [
        {
            id: "Email",
            title: "Email OTP",
            description: "Receive codes on your email",
        },
        {
            id: "SMS",
            title: "SMS OTP",
            description: "Receive codes on your mobile",
        },
        {
            id: "Authenticator",
            title: "Authenticator App",
            description: "Use code from authenticator app",
        },
          
    ];

    
  return (
    
    
    <div className='w-full max-w-xl mx-auto relative '>
        <div className='min-h-[calc(80vh-30px)] md:min-h-screen mx-auto  flex flex-col justify-center items-center gap-4'>
            <div className={`w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center`}>
            
              <img
                src="/assets/security-removebg-preview.png"
                alt="SecureID"
                className="w-14 h-14 object-contain"
              />
              </div>
            <div className='w-full text-center flex flex-col justify-center items-center gap-4'>
                <div className='text-2xl font-bold'>Verify your identity</div>
                <div className='text-sm text-gray-500 font-medium'>Choose a method to continue</div>
            </div>

            {/* Authentication Methods */}
            <div className="w-full max-w-md mt-4 space-y-6">
                {authenticationMethods.map((method) => {
                    const isSelected = selectedMethod === method.id;
                    
                    return (
                    <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedMethod(method.id)}
                        className={`
                        flex w-full items-center justify-between
                        rounded-lg border-2 px-4 py-6 
                        text-left transition-all duration-200
                        ${
                            isSelected
                            ? "border-blue-600 shadow-[0_0_4px_rgba(59,130,246,0.5)]"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }
                        `}
                    >
                        <div className="flex items-center gap-3">
                        {/* Method Icon */}
                        <div
                            className={`
                            flex h-10 w-10 items-center justify-center
                             rounded-full
                            ${
                                method.id === "Email"
                                ? "bg-blue-100"
                                : method.id === "SMS"
                                ? " bg-green-100"
                                : "bg-gray-200 "
                            }
                            `}
                        >
                            {method.id === "Authenticator" && (
                            <TfiLock className="size-6 text-gray-700" />
                            )}
                            {method.id === "SMS" && (
                                <MdOutlineTextsms className='size-6 text-green-500'/>
                            )}
                            {method.id === "Email" && <HiOutlineMail className="size-6 text-blue-700" />}
                        </div>
        
                        <div>
                            <div className="text-sm font-bold text-gray-800">
                            {method.title}
                            </div>
        
                            <div className="text-xs font-medium mt-2 text-gray-500">
                            {method.description}
                            </div>
                        </div>
                        </div>
        
                        <div
                        className={`
                            flex h-5 w-5 items-center justify-center
                            rounded-full 
                            ${isSelected ? "border-blue-600 border-[7px]" : "border-gray-400 border-[3px]"}
                        `}
                        >
                        {isSelected && (
                            <div className="h-1 w-1 rounded-full bg-white" />
                        )}
                        </div>
                    </button>
                    );
                })}
            </div>
        
            <button
            type="button"
            disabled={loginLoading}
            onClick={() => handleContinue('otp-verify',selectedMethod)}
            className="w-full max-w-md rounded-lg bg-blue-700 py-3 mt-8 font-semibold text-white transition hover:bg-blue-800"
            >
               {loginLoading ? (
            <div className="flex justify-center items-center gap-2">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            </div>
          ) : (
            "Continue"
          )}
            </button>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-2 md:flex hidden items-center justify-center whitespace-nowrap text-[13px] text-gray-400 font-medium">
            <CgCopyright className="size-4 mr-1" />
            2026 SecureID. All rights reserved.
        </div>
    </div>
    
  )
}

export default VerifyLogin