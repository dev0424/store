import { login } from "@lib/data/customer";
import ErrorMessage from "@modules/checkout/components/error-message";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import Input from "@modules/common/components/input";
import { useActionState } from "react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

const Login = () => {
  const [message, formAction] = useActionState(login, null);

  return (
    <div
      className="flex w-full max-w-sm flex-col items-center"
      data-testid="login-page"
    >
      <h1 className="text-xl-semi text-center text-ui-fg-base sm:text-left">
        Accès client
      </h1>
      <p className="mb-8 text-ui-fg-subtle">
        Connectez-vous à votre compte RSPI.
      </p>
      <form className="w-full" action={formAction}>
        <div className="flex w-full flex-col gap-y-2">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Veuillez saisir une adresse e-mail valide."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Mot de passe"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="login-error-message" />
        <SubmitButton
          data-testid="sign-in-button"
          className="mt-6 w-full font-sans font-bold tracking-wide"
        >
          Se connecter
        </SubmitButton>
      </form>
      <span className="text-small-regular mt-6 text-center text-ui-fg-base">
        Je ne suis pas encore un client RSPI{" "}
        <LocalizedClientLink href="/register">
          <button className="underline" data-testid="register-button">
            Demande de création de compte
          </button>
        </LocalizedClientLink>
        .
      </span>
    </div>
  );
};

export default Login;
