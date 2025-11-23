import React from "react";
import ResetPasswordForm from "../../../../modules/account/components/reset-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Créer un nouveau mot de passe",
  description: "Veuillez saisir un nouveau mot de passe pour votre compte.",
};

function ResetPasswordPage() {
  return (
    <div className="content-container flex min-h-[48vh] w-full justify-center py-8 sm:py-16">
      <ResetPasswordForm />
    </div>
  );
}

export default ResetPasswordPage;
