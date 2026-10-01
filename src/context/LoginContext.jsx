import React, { createContext, useContext, useState } from 'react';
import { login,sendOTP,verifyOTP } from '../api/loginApi';
import toast from "react-hot-toast";

const LoginContext = createContext(null);

export const LoginProvider = ({ children }) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedMethod, setSelectedMethod] = useState("Email");
  const [nextStep,setNextStep]=useState('login');
  const [isLoginError, setIsLoginError]=useState(false);
  const [errormsg,setErrorMsg]=useState('')
  const [loginLoading,setLoginLoding]=useState(false);


  const handleClick = async(step)=>{
    try{
      setLoginLoding(true)
      await login(email,password)
      await setNextStep(step)
      
    }catch(error){
      toast.error(error.message);
    }finally{
      setLoginLoding(false)
    }
  }

  const handleContinue = async(step,selectedMethod)=>{
    try{
      setLoginLoding(true)
    await sendOTP(selectedMethod);
    await setNextStep(step);}
    catch(error){
      toast.error(error.message);
    }finally{
      setLoginLoding(false)
    }
  }

  const handleVerify = async(selectedMethod,otp)=>{
    try{
      setLoginLoding(true)
    await verifyOTP(selectedMethod,otp)}
    catch(error){
      setErrorMsg(error.message)
    }finally{
      setLoginLoding(false)
    }
  }


  
  return (
    <LoginContext.Provider
      value={{
        
        email,
        setEmail,
        password,
        setPassword,
        selectedMethod,
        setSelectedMethod,
        nextStep,
        setNextStep,
        handleClick,
        isLoginError,
        handleContinue,
        handleVerify,
        errormsg,
        loginLoading
        
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(LoginContext);

  if (!context) {
    throw new Error(
      'useLogin must be used inside LoginProvider'
    );
  }

  return context;
};