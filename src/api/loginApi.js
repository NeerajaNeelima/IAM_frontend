
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const login = async (email,password) => {
  const response = await fetch(`${API_BASE_URL}/signin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email,password}),
    credentials: "include"
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to send email OTP");
  }

  return data;
};

export const sendOTP = async (selectedMethod) => {
    
    const response = await fetch(
        `${API_BASE_URL}/signin/login-otp`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
               selectedMethod
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to send email OTP"
        );
    } 

    return data;
};

export const verifyOTP = async (selectedMethod,otp,rememberMe) => {
    
    const response = await fetch(
        `${API_BASE_URL}/signin/verify-otp`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
               selectedMethod,otp,rememberMe
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to send email OTP"
        );
    } 

    return data;
};

export const getCurrentUser = async () => {
    
    const response = await fetch(
        `${API_BASE_URL}/signin/auth-user`,
        {
            method: "GET",
            credentials: "include",
            
        }
    );

    const data = await response.json();
    return data;
};