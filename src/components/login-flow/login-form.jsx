import React, {useState} from 'react'
import { MdPersonOutline } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { useLogin } from '../../context/LoginContext';
import GoogleLoginButton from './GoogleButton';
import { CgCopyright } from "react-icons/cg";

const LoginForm = () => {

    const [visible, setVisible] = useState(false);
    
    const {
        email,
        setEmail,
        password,
        setPassword,
        handleClick,
        loginLoading,
        rememberMe,
        setRememberMe,
        setNextStep
    } = useLogin();

  return (
    <div className=' w-full max-w-xl mx-auto relative '>
        <div className='min-h-[calc(10vh-104px)] mx-auto md:min-h-screen flex flex-col justify-center items-center gap-4'>
            <div className='w-full text-center flex flex-col justify-center items-center gap-4'>
                <div className='text-2xl font-bold'>Welcome back!</div>
                <div className='text-sm text-gray-500 font-medium'>Login to your account</div>
            </div>
            <form className='mt-4 flex flex-col gap-4 w-full'
            onSubmit={(e) => {
                e.preventDefault();
                handleClick("authentication");
              }}
            >
                <div
                    className="h-12  rounded-lg border-2 shadow-[0_2px_6px_rgba(0,0,0,0.08)]  border-gray-200 px-4 outline-none flex gap-4 justify-start items-center group transition-all duration-200
                    focus-within:border-blue-500
                        focus-within:shadow-[2px_0_3px_3px_rgba(59,130,246,0.15)]"
                >
                    <MdPersonOutline className='text-gray-400 size-6'/>
                    <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email or Username"
                    className=" border-0 focus:border-0 bg-transparent outline-none w-full"
                    />
                </div>

                <div
                    className="h-12  rounded-lg border-2 shadow-[0_2px_6px_rgba(0,0,0,0.08)]  border-gray-200 px-4 outline-none flex gap-4 justify-start items-center group transition-all duration-200
                    focus-within:border-blue-500
                        focus-within:shadow-[2px_0_3px_3px_rgba(59,130,246,0.15)]"
                >
                    <MdOutlinePassword className='text-gray-400 size-6'/>
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

                <div className='mt-2 flex justify-between items-center w-full'>
                    <div className='flex gap-3 items-center'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                               
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="
                                peer
                                appearance-none
                                h-5 w-5
                                rounded
                                border-2 border-blue-600
                                shadow-[0_0_6px_rgba(59,130,246,0.5)]
                                checked:bg-blue-600
                                checked:border-blue-600
                                cursor-pointer
                                "
                            />

                            <span
                                className="
                                pointer-events-none
                                absolute
                                left-[6px]
                                top-[1px]
                                hidden
                                h-[14px] w-2
                                rotate-45
                                border-b-[3px]
                                border-r-[3px]
                                border-white
                                peer-checked:block
                                "
                            />
                        </label>
                        <div className='text-gray-400 font-medium text-sm'>Remember me</div>
                    </div>
                    <div onClick={() => setNextStep("forgotPassword")} className='text-blue-600 text-sm font-medium'>Forgot password?</div>
                </div>

                <button
                disabled={loginLoading}
                // onClick={() => handleClick('authentication')}
                className='rounded-lg bg-blue-700 text-white text-md font-semibold flex justify-center items-center cursor-pointer h-12 mt-5 md:mt-10'
                >
                    {loginLoading ? (
            <div className="flex justify-center items-center gap-2">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            </div>
          ) : (
            "Login"
          )}
                </button>
            </form>
            <div className='flex flex-col gap-6 md:gap-10 w-full items-center'>
                <div className='flex items-center md:mt-2 gap-2 w-full'>
                    <div className='h-[2px] flex-1 bg-gray-200'></div>
                    <div className='text-gray-300 text-sm font-medium'>or</div>
                    <div className='h-[2px] flex-1 bg-gray-200'></div>
                </div>

                <GoogleLoginButton/>

                <div className='text-gray-500 text-md font-medium'>
                    New here? <a href='/register'  className='text-blue-600 text-md font-medium cursor-pointer hover:underline underline-offset-4'>Create an account</a>
                </div>
            </div>
        </div>
        
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-2 md:flex hidden items-center justify-center whitespace-nowrap text-[13px] text-gray-400 font-medium">
            <CgCopyright className="size-4 mr-1" />
            2026 SecureID. All rights reserved.
        </div>
    </div>
  )
}

export default LoginForm