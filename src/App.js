import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegistrationFlowMain from "./components/registration-flow/registration-flow-main";
import { RegistrationProvider } from "./context/RegistrationContext";

import { LoginProvider } from "./context/LoginContext";
import Login from "./components/login-flow/login";

import { Toaster } from "react-hot-toast";



function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto max-w-[1920px] overflow-x-hidden px-0 py-0">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
        <Routes>
          {/* Login */}
          <Route
            path="/"
            element={
              <LoginProvider>
                <Login />
              </LoginProvider>
            }
          />

          {/* Registration */}
          <Route
            path="/register"
            element={
              <RegistrationProvider>
                <RegistrationFlowMain />
              </RegistrationProvider>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;