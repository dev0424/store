"use client";

import { useState } from "react";

import Login from "@modules/account/components/login";
import RegisterTemplate from "@modules/account/templates/register-template";

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in");

  return (
    <div className="flex w-full justify-center">
      {currentView === "sign-in" ? (
        <Login setCurrentView={setCurrentView} />
      ) : (
        <RegisterTemplate setCurrentView={setCurrentView} />
      )}
    </div>
  );
};

export default LoginTemplate;
