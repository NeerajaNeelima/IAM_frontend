import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiShield,
  FiCheckCircle,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import { useLogin } from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/loginApi";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, setUser,setNextStep } = useLogin();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const navigate = useNavigate();
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }
  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      setLogoutError("");
      await logoutUser();
      toast.success("Logout sccuessfully")
      setUser(null);
      setNextStep('login')
      navigate("/");
      
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to logout. Please try again."
      );
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <>
    {logoutLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-950/90 backdrop-blur-sm">

          <div className="flex flex-col items-center">

           
            <div className="relative flex h-24 w-24 items-center justify-center">

             
              <div className="absolute inset-0 animate-spin rounded-full border-4 border-gray-700 border-t-indigo-500" />

              
              <div className="absolute h-16 w-16 animate-ping rounded-full bg-indigo-500/10" />

              
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500/15">
                <FiShield
                  size={28}
                  className="animate-pulse text-indigo-400"
                />
              </div>

            </div>

            
            <div className="mt-6 text-center">

              <p className="text-lg font-semibold text-white">
                Logging out
                <span className="inline-flex w-6 text-left">
                  <span className="animate-bounce">
                    .
                  </span>

                  <span className="animate-bounce [animation-delay:150ms]">
                    .
                  </span>

                  <span className="animate-bounce [animation-delay:300ms]">
                    .
                  </span>
                </span>
              </p>

              <p className="mt-2 text-sm text-gray-400">
                Securing your session
              </p>

            </div>

            
            <div className="mt-5 flex gap-1.5">

              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-400" />

              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-400 [animation-delay:200ms]" />

              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-400 [animation-delay:400ms]" />

            </div>

          </div>

        </div>
      )}
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">SecureID</h1>
            <p className="text-sm text-gray-500">Identity & Security</p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            <FiLogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-medium text-indigo-600">Welcome back</p>

          <h2 className="mt-1 text-3xl font-bold text-gray-900">
            {user.fullName}
          </h2>

          <p className="mt-2 text-gray-500">
            Manage your account and security settings.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-3xl font-bold text-indigo-600">
                {user.fullName?.charAt(0)?.toUpperCase()}
              </div>

              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {user.fullName}
              </h3>

              <p className="mt-1 text-sm text-gray-500">{user.email}</p>

              <div className="mt-5 flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                <FiCheckCircle size={16} />
                Account Verified
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-5">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Account Information
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Your personal account details
                </p>
              </div>

              <button
                type="button"
                className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                <FiSettings size={16} />
                Settings
              </button>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {/* Full Name */}
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-gray-100 p-3">
                  <FiUser className="text-gray-600" />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Full Name
                  </p>

                  <p className="mt-1 font-medium text-gray-900">
                    {user.fullName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-gray-100 p-3">
                  <FiMail className="text-gray-600" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Email Address
                  </p>

                  <p className="mt-1 truncate font-medium text-gray-900">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-gray-100 p-3">
                  <FiPhone className="text-gray-600" />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Mobile Number
                  </p>

                  <p className="mt-1 font-medium text-gray-900">
                    {user.countryCode} {user.mobileNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-gray-100 p-3">
                  <FiShield className="text-gray-600" />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    MFA Method
                  </p>

                  <p className="mt-1 font-medium capitalize text-gray-900">
                    {user.mfaMethod || "Not configured"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-indigo-100 p-3">
              <FiShield className="text-indigo-600" size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">Security Status</h3>

              <p className="text-sm text-gray-500">
                Your account security information
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div>
                <p className="font-medium text-gray-900">
                  Multi-Factor Authentication
                </p>

                <p className="text-sm text-gray-500">
                  {user.mfaMethod
                    ? `Using ${user.mfaMethod}`
                    : "Not configured"}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  user.mfaMethod
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {user.mfaMethod ? "Enabled" : "Disabled"}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div>
                <p className="font-medium text-gray-900">Authenticator</p>

                <p className="text-sm text-gray-500">
                  Authenticator app status
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  user.authenticatorEnabled
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {user.authenticatorEnabled ? "Enabled" : "Not Used"}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
    </>
  );
};

export default Profile;
