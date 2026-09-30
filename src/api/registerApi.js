const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const sendEmailOtp = async (registrationData) => {
  const response = await fetch(`${API_BASE_URL}/register/send-email-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registrationData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to send email OTP");
  }

  return data;
};

export const verifyEmailOtp = async (email, otp) => {
  const response = await fetch(`${API_BASE_URL}/register/verify-email-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      otp,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to verify email OTP");
  }

  return data;
};

export const sendMobileOtp = async (email) => {
  const response = await fetch(`${API_BASE_URL}/register/send-mobile-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to send mobile OTP");
  }

  return data;
};

export const verifyMobileOtp = async (email, otp) => {
  const response = await fetch(`${API_BASE_URL}/register/verify-mobile-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      otp,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to verify mobile OTP");
  }

  return data;
};

// =====================================================
// AUTHENTICATOR SETUP
// =====================================================

export const InitiateAuthentication = async (email) => {
  const response = await fetch(`${API_BASE_URL}/authenticator/setup`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to setup authenticator");
  }

  return data;
};

// =====================================================
// AUTHENTICATOR VERIFY
// =====================================================

export const verifyAuthenticator = async (email, otp) => {
  const response = await fetch(`${API_BASE_URL}/authenticator/verify`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email,
      otp,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Invalid authenticator code");
  }

  return data;
};

// =====================================================
// SMS MFA SETUP
// =====================================================

export const initiateSmsMfa = async (email) => {
  const response = await fetch(`${API_BASE_URL}/mfa/sms/setup`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to send SMS MFA code");
  }

  return data;
};

// =====================================================
// SMS MFA VERIFY
// =====================================================

export const verifySmsMfa = async (email, otp) => {
  const response = await fetch(`${API_BASE_URL}/mfa/sms/verify`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email,
      otp,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Invalid SMS MFA code");
  }

  return data;
};

// =====================================================
// EMAIL MFA SETUP
// =====================================================

export const initiateEmailMfa = async (email) => {
  const response = await fetch(`${API_BASE_URL}/mfa/email/setup`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to send email MFA code");
  }

  return data;
};

// =====================================================
// EMAIL MFA VERIFY
// =====================================================

export const verifyEmailMfa = async (email, otp) => {
  const response = await fetch(`${API_BASE_URL}/mfa/email/verify`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email,
      otp,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Invalid email MFA code");
  }

  return data;
};
