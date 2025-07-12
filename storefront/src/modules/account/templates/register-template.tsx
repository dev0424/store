import React from "react";
import { LOGIN_VIEW } from "@modules/account/templates/login-template";
import CompanyRegistrationForm from "@modules/account/components/company-registration-form";

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const RegisterTemplate = ({ setCurrentView }: Props) => {
  return (
    <div
      className="flex max-w-sm flex-col items-center gap-4"
      data-testid="register-page"
    >
      <h1 className="text-large-semi uppercase">Become a store member</h1>
      <p className="text-base-regular text-center text-ui-fg-base">
        Create your store member profile, and get access to an enhanced shopping
        experience.
      </p>
      <CompanyRegistrationForm />
      <span className="text-small-regular mt-6 text-center text-ui-fg-base">
        Already a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Sign in
        </button>
      </span>
    </div>
  );
};

export default RegisterTemplate;
