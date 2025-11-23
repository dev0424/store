import React from "react";
import { Metadata } from "next";
import RequestPasswordResetForm from "@modules/account/components/request-password-reset-form";

export const metadata: Metadata = {
  title: "Réinitialisez votre mot de passe",
  description:
    "Réinitialisez votre mot de passe pour accéder de nouveau à votre compte.",
};

function RequestPasswordResetPage() {
  return (
    <div className="content-container flex min-h-[48vh] w-full justify-center py-8 sm:py-16">
      <RequestPasswordResetForm />
    </div>
  );
}

export default RequestPasswordResetPage;
