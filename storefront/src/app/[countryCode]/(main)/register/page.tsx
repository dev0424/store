"use client";

import React from "react";
import Register from "@modules/account/templates/register-template";

const RegistrationPage = () => {
  return (
    <div className="content-container flex min-h-[48vh] justify-center py-8 sm:py-16">
      <Register />
    </div>
  );
};

export default RegistrationPage;
