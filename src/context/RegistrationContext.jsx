import React, { createContext, useContext, useState } from 'react';

const RegistrationContext = createContext(null);

export const RegistrationProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [country, setCountry] = useState("IN");
  const [isLoadingQRCode,setIsLoadingQRCode]=useState(false)
  const [registererrormsg,setRegisterErrorMsg]=useState('')
  // Authenticator setup data
  const [qrCode, setQrCode] = useState("");
  const [setupKey, setSetupKey] = useState("");

  return (
    <RegistrationContext.Provider
      value={{
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
        isLoadingQRCode,
        setIsLoadingQRCode,
        qrCode,
        setQrCode,

        setupKey,
        setSetupKey,

        setRegisterErrorMsg,
        registererrormsg
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);

  if (!context) {
    throw new Error(
      'useRegistration must be used inside RegistrationProvider'
    );
  }

  return context;
};