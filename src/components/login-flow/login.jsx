import React,{useEffect} from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoginForm from "./login-form";
import VerifyLogin from "./verify-login";
import LoginOtpVerify from "./login-otp-verify";
import { useLogin } from "../../context/LoginContext";
import Profile from "../profile/profile";
import { getCurrentUser } from "../../api/loginApi";
import ForgotPassword from "./forgetPassword";
import ResetPassword from "./reset-password";
import ResetPasswordOtp from "./reset-password-otp";

const Login = () => {
  const { nextStep, isLoginError,setUser,setNextStep } = useLogin();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getCurrentUser();
  
        if (response.authenticated) {
          setUser(response.user);
          setNextStep("profile");
        }
      } catch {
        setNextStep("login");
      }
    };
  
    checkAuth();
  }, []);

  const renderStep = () => {
    switch (nextStep) {
      case "login":
        return <LoginForm />;

      case "authentication":
        return <VerifyLogin />;

      case "otp-verify":
        return <LoginOtpVerify />;

      case "profile":
        return <Profile/>;

      case "forgotPassword":
        return <ForgotPassword/>;
      
      case "resetOtp":
        return <ResetPasswordOtp/>

      case "resetPassword":
        return <ResetPassword/>

      default:
        return <LoginForm />;
    }
  };

  return (
    <div className="min-h-screen px-6 md:px-0">

      
        {nextStep === 'login'&&(<div className="flex md:hidden  items-center justify-center py-6  ">
          <div className={`w-16 h-16 ${isLoginError ?'bg-red-100':'bg-blue-100'}  rounded-full md:hidden flex items-center justify-center`}>
            {isLoginError ?
              (<img
                src="/assets/error_security-removebg-preview.png"
                alt="SecureID"
                className="w-14 h-14 object-contain"
              />)
              :(
                
                  <img
                    src="/assets/security-removebg-preview.png"
                    alt="SecureID"
                    className="w-14 h-14 object-contain "
                  />

                
              ) 
            }
          </div>
        </div>)}
      
      <div className="min-h-[calc(10vh-104px)] md:min-h-screen mx-auto flex md:grid md:grid-cols-[30%_70%] ">
        <div className="hidden md:block relative bg-[linear-gradient(140deg,#5E93EF_60%,#4B5AD6_70%)] ">
          <div className="absolute inset-0 flex flex-col gap-4 justify-center items-center">

            <img
              src="/assets/white-security.png"
              alt="SecureID"
              className="w-20 h-20 object-contain"
            />

            <div className="text-white text-xl font-semibold">
              SecureID
            </div>

            <div className="text-white text-md font-normal max-w-32 text-center">
              Secure access to your account
            </div>

          </div>
        </div>
        
        <div className="relative min-h-full w-full mx-auto overflow-hidden px-0 md:px-6 lg:px-0  ">

          <AnimatePresence mode="wait">

            <motion.div
              key={nextStep}
              initial={{
                x: "100%",
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                x: "-100%",
                opacity: 0,
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
              className="w-full min-h-full"
            >
              {renderStep()}
            </motion.div>

          </AnimatePresence>

        </div>

      </div>
    </div>
  );
};

export default Login;