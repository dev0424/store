import React from "react";
import RegistrationForm from "@modules/account/components/registration-form";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

const RegisterTemplate = () => {
  return (
    <div
      className="flex w-full max-w-xl flex-col items-center justify-center"
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
        <LocalizedClientLink href="/account">
          <button className="underline">Se connecter</button>
        </LocalizedClientLink>
      </span>
    </div>
  );
};

export default RegisterTemplate;
