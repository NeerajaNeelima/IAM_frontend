import React from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = () => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google Login Success:", tokenResponse);

      // Send tokenResponse.access_token to your backend
      // Your backend should verify the Google token
      // and create/login the user.
    },

    onError: () => {
      console.log("Google Login Failed");
    },
  });

  return (
    <button
      type="button"
      onClick={() => login()}
      className="
        w-full
        h-12
        rounded-lg
        border-2
        border-gray-200
        bg-white
        shadow-[0_4px_8px_rgba(0,0,0,0.08)]
        flex
        items-center
        justify-center
        gap-3
        cursor-pointer
        transition-all
        duration-200
        hover:bg-gray-50
        hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)]
        active:scale-[0.99]
      "
    >
      <FcGoogle className="size-5" />

      <span className="text-gray-700 text-sm font-semibold">
        Continue with Google
      </span>
    </button>
  );
};

export default GoogleLoginButton;