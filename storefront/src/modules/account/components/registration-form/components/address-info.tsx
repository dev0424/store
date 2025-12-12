import { useFormContext } from "react-hook-form";
import Input from "@modules/common/components/input";
import CountrySelect from "@modules/checkout/components/country-select";
import Section from "@modules/account/components/registration-form/components/section";
import Grid from "@modules/account/components/registration-form/components/grid";
import { SIGN_UP_SCHEMA } from "@modules/account/components/registration-form/schema";
import { RegistrationFormValues } from "@modules/account/components/registration-form";
import { StoreRegion } from "@medusajs/types";

type Props = {
  region: StoreRegion | null | undefined;
};

const AddressSection = ({ region }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegistrationFormValues>();

  return (
    <Section title="Adresse">
      <Grid>
        <Input
          {...register("company_name", SIGN_UP_SCHEMA.company_name)}
          label="Raison sociale"
          name="company_name"
          errors={errors?.company_name}
          required={true}
          disableNativeValidation={true}
        />
        <Input
          {...register("address.address_1", SIGN_UP_SCHEMA.address.address_1)}
          label="N° et Nom de rue"
          name="address.address_1"
          errors={errors?.address?.address_1}
          required={true}
          disableNativeValidation={true}
        />
        <Input
          {...register("address.address_2", SIGN_UP_SCHEMA.address.address_2)}
          label="Adresse 2"
          name="address.address_2"
          errors={errors?.address?.address_2}
          required={false}
          disableNativeValidation={true}
        />
        <Input
          {...register(
            "address.postal_code",
            SIGN_UP_SCHEMA.address.postal_code,
          )}
          label="Code postal"
          name="address.postal_code"
          errors={errors?.address?.postal_code}
          required={true}
          disableNativeValidation={true}
        />
        <Input
          {...register("address.city", SIGN_UP_SCHEMA.address.city)}
          label="Ville"
          name="address.city"
          errors={errors?.address?.city}
          required={true}
          disableNativeValidation={true}
        />
        <CountrySelect
          {...register(
            "address.country_code",
            SIGN_UP_SCHEMA.address.country_code,
          )}
          name="address.country_code"
          region={region}
          errors={errors?.address?.country_code}
          autoComplete="country"
          defaultValue={""}
          data-testid="country-select"
        />
        <Input
          {...register("address.province", SIGN_UP_SCHEMA.address.province)}
          label="Province"
          name="address.province"
          errors={errors?.address?.province}
          required={false}
          disableNativeValidation={true}
        />
      </Grid>
    </Section>
  );
};

export default AddressSection;
