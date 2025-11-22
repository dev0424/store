import { Button, Heading } from "@medusajs/ui";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

const SignInPrompt = () => {
  return (
    <div className="flex items-center justify-between bg-white">
      <div>
        <Heading level="h2" className="txt-xlarge">
          Vous avez déjà un compte?
        </Heading>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button
            variant="secondary"
            className="h-10"
            data-testid="sign-in-button"
          >
            Se connecter
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  );
};

export default SignInPrompt;
