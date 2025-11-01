import React from "react";
import { LOGIN_VIEW } from "@modules/account/templates/login-template";
import RegistrationForm from "@modules/account/components/registration-form";

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const RegisterTemplate = ({ setCurrentView }: Props) => {
  return (
    <div
      className="flex max-w-xl flex-col items-center"
      data-testid="register-page"
    >
      <h1 className="text-xl-semi text-center text-ui-fg-base sm:text-left">
        Demande de création de compte
      </h1>
      <p className="mb-8 text-center text-ui-fg-subtle">
        Créez votre profil de membre et accédez à une expérience d'achat
        améliorée.
      </p>
      <RegistrationForm />
      <span className="text-small-regular mt-6 text-center text-ui-fg-base">
        Vous avez déjà un compte?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Se connecter
        </button>
      </span>
    </div>
  );
};

export default RegisterTemplate;
