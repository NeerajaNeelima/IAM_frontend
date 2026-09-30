import {
    RecaptchaVerifier,
    signInWithPhoneNumber,
  } from "firebase/auth";
  
  import { auth } from "../firebase/firebaseConfig";
  
  /**
   * Create Firebase reCAPTCHA verifier
   */
  export const setupRecaptcha = () => {
    if (window.recaptchaVerifier) {
      return window.recaptchaVerifier;
    }
  
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
  
        callback: () => {
          console.log("reCAPTCHA solved");
        },
  
        "expired-callback": () => {
          console.log("reCAPTCHA expired");
        },
      }
    );
  
    return window.recaptchaVerifier;
  };
  
  /**
   * Send OTP
   */
  export const sendFirebasePhoneOtp = async (
    phoneNumber
  ) => {
    const appVerifier = setupRecaptcha();
  
    const confirmationResult =
      await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
  
    // Store Firebase's verification session
    window.confirmationResult =
      confirmationResult;
  
    return confirmationResult;
  };
  
  /**
   * Verify OTP
   */
  export const verifyFirebasePhoneOtp = async (
    otp
  ) => {
    if (!window.confirmationResult) {
      throw new Error(
        "OTP session expired. Please request a new OTP."
      );
    }
  
    const result =
      await window.confirmationResult.confirm(
        otp
      );
  
    return result.user;
  };