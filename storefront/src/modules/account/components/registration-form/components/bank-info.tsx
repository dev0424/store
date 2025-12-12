import { useFormContext } from "react-hook-form";
import Input from "@modules/common/components/input";
import Section from "@modules/account/components/registration-form/components/section";
import Grid from "@modules/account/components/registration-form/components/grid";
import { SIGN_UP_SCHEMA } from "@modules/account/components/registration-form/schema";
import { RegistrationFormValues } from "@modules/account/components/registration-form";

const BankInfoSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegistrationFormValues>();

  return (
    <Section title="Informations bancaires">
      <Grid>
        <Input
          {...register(
            "bank_account.bank_name",
            SIGN_UP_SCHEMA.bank_account.bank_name,
          )}
          label="Nom de la banque"
          name="bank_account.bank_name"
          errors={errors?.bank_account?.bank_name}
          required={true}
          disableNativeValidation={true}
        />
        <Input
          {...register(
            "bank_account.bank_code",
            SIGN_UP_SCHEMA.bank_account.bank_code,
          )}
          label="Code banque"
          name="bank_account.bank_code"
          errors={errors?.bank_account?.bank_code}
          required={true}
          disableNativeValidation={true}
        />
        <Input
          {...register(
            "bank_account.branch_code",
            SIGN_UP_SCHEMA.bank_account.branch_code,
          )}
          label="Code guichet"
          name="bank_account.branch_code"
          errors={errors?.bank_account?.branch_code}
          required={true}
          disableNativeValidation={true}
        />
        <Input
          {...register("bank_account.city", SIGN_UP_SCHEMA.bank_account.city)}
          label="Ville de la banque"
          name="bank_account.city"
          errors={errors?.bank_account?.city}
          required={true}
          disableNativeValidation={true}
        />
        <Input
          {...register(
            "bank_account.address",
            SIGN_UP_SCHEMA.bank_account.address,
          )}
          label="Domiciliation"
          name="bank_account.address"
          errors={errors?.bank_account?.address}
          required={true}
          disableNativeValidation={true}
        />
        <Input
          {...register(
            "bank_account.account_number",
            SIGN_UP_SCHEMA.bank_account.account_holder,
          )}
          label="N° du compte"
          name="bank_account.account_number"
          errors={errors?.bank_account?.account_number}
          required={true}
          disableNativeValidation={true}
        />
        <Input
          {...register(
            "bank_account.account_holder",
            SIGN_UP_SCHEMA.bank_account.account_holder,
          )}
          label="Titulaire du compte"
          name="bank_account.account_holder"
          errors={errors?.bank_account?.account_holder}
          required={true}
          disableNativeValidation={true}
        />
        <Input
          {...register("bank_account.iban", SIGN_UP_SCHEMA.bank_account.iban)}
          label="IBAN"
          name="bank_account.iban"
          errors={errors?.bank_account?.iban}
          required={true}
          disableNativeValidation={true}
        />
        <Input
          {...register("bank_account.bic", SIGN_UP_SCHEMA.bank_account.bic)}
          label="BIC"
          name="bank_account.bic"
          errors={errors?.bank_account?.bic}
          required={true}
          disableNativeValidation={true}
        />
        <Input
          {...register(
            "bank_account.rib_key",
            SIGN_UP_SCHEMA.bank_account.rib_key,
          )}
          label="Clé RIB"
          name="bank_account.rib_key"
          errors={errors?.bank_account?.rib_key}
          required={true}
          disableNativeValidation={true}
        />
      </Grid>
    </Section>
  );
};

export default BankInfoSection;
