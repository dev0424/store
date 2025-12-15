import { useFormContext } from "react-hook-form";
import Input from "@modules/common/components/input";
import Section from "@modules/account/components/registration-form/components/section";
import Grid from "@modules/account/components/registration-form/components/grid";
import {
  REQUIRED_FIELD_MESSAGE,
  SIGN_UP_SCHEMA,
} from "@modules/account/components/registration-form/schema";

const ClientInfoSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const password = watch("password");

  return (
    <Section title="Informations client">
      <Grid>
        <Input
          {...register("first_name", SIGN_UP_SCHEMA.first_name)}
          label="Prénom"
          name="first_name"
          autoComplete="given-name"
          data-testid="first-name-input"
          errors={errors?.first_name}
          required={true}
          disableNativeValidation={true}
        />
        <Input
          {...register("last_name", SIGN_UP_SCHEMA.last_name)}
          label="Nom"
          name="last_name"
          autoComplete="family-name"
          data-testid="last-name-input"
          errors={errors?.last_name}
          required={true}
          disableNativeValidation={true}
        />
        <Input
          {...register("email", SIGN_UP_SCHEMA.email)}
          label="Email"
          name="email"
          autoComplete="email"
          data-testid="email-input"
          errors={errors?.email}
          required={true}
          disableNativeValidation={true}
        />
        <Input
          {...register("phone", SIGN_UP_SCHEMA.phone)}
          label="Téléphone"
          name="phone"
          type="tel"
          autoComplete="tel"
          data-testid="phone-input"
          errors={errors?.phone}
          required={true}
          disableNativeValidation={true}
        />
        <Input
          {...register("password", SIGN_UP_SCHEMA.password)}
          label="Mot de passe"
          name="password"
          type="password"
          autoComplete="new-password"
          data-testid="password-input"
          errors={errors?.password}
          required={true}
          disableNativeValidation={true}
        />
        <Input
          {...register("confirm_password", {
            required: REQUIRED_FIELD_MESSAGE,
            validate: (value) =>
              value === password || "Les mots de passe ne correspondent pas",
          })}
          label="Confirmez le mot de passe"
          name="confirm_password"
          type="password"
          autoComplete="new-password"
          data-testid="confirm-password-input"
          errors={errors?.confirm_password}
          required={true}
          disableNativeValidation={true}
        />
      </Grid>
    </Section>
  );
};

export default ClientInfoSection;
