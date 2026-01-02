import { useFormContext } from "react-hook-form";
import Input from "@modules/common/components/input";
import NativeSelect from "@modules/common/components/native-select";
import Section from "@modules/account/components/registration-form/components/section";
import Grid from "@modules/account/components/registration-form/components/grid";
import { SIGN_UP_SCHEMA } from "@modules/account/components/registration-form/schema";
import { Activity } from "@types/activity";
import { CustomPaymentMethod } from "@types/custom-payment-method";
import { BillingCycle } from "@types/billing-cycle";
import { RegistrationFormValues } from "@modules/account/components/registration-form";

type Props = {
  activities: Activity[] | undefined;
  paymentMethods: CustomPaymentMethod[] | undefined;
  billingCycles: BillingCycle[] | undefined;
};

const AdministrativeSection = ({
  activities,
  paymentMethods,
  billingCycles,
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegistrationFormValues>();

  return (
    <Section title="Administratif">
      <Grid>
        <Input
          {...register(
            "customer_profile.vat_number",
            SIGN_UP_SCHEMA.customer_profile.vat_number,
          )}
          label="N° TVA Intracommunautaire"
          name="customer_profile.vat_number"
          errors={errors?.customer_profile?.vat_number}
          required={true}
          disableNativeValidation={true}
        />
        <Input
          {...register(
            "customer_profile.siret_number",
            SIGN_UP_SCHEMA.customer_profile.siret_number,
          )}
          label="SIRET"
          name="customer_profile.siret_number"
          errors={errors?.customer_profile?.siret_number}
          required={true}
          disableNativeValidation={true}
        />
        <Input
          {...register(
            "customer_profile.ape_code",
            SIGN_UP_SCHEMA.customer_profile.ape_code,
          )}
          label="Code APE"
          name="customer_profile.ape_code"
          errors={errors?.customer_profile?.ape_code}
          required={true}
          disableNativeValidation={true}
        />
        <Input
          {...register(
            "customer_profile.invoice_email",
            SIGN_UP_SCHEMA.customer_profile.invoice_email,
          )}
          label="Adresse e-mail de facturation"
          name="customer_profile.invoice_email"
          errors={errors?.customer_profile?.invoice_email}
          required={true}
          disableNativeValidation={true}
        />
        <Input
          type="number"
          {...register(
            "customer_profile.revenue_previous_year",
            SIGN_UP_SCHEMA.customer_profile.revenue_previous_year,
          )}
          label="Chiffre d’affaires N-1"
          name="customer_profile.revenue_previous_year"
          errors={errors?.customer_profile?.revenue_previous_year}
          required={false}
          disableNativeValidation={true}
        />
        <Input
          type="number"
          {...register(
            "customer_profile.employee_count",
            SIGN_UP_SCHEMA.customer_profile.employee_count,
          )}
          label="NB de salariés"
          name="customer_profile.employee_count"
          errors={errors?.customer_profile?.employee_count}
          required={false}
          disableNativeValidation={true}
        />
        <NativeSelect
          {...register(
            "customer_profile.activity",
            SIGN_UP_SCHEMA.customer_profile.activity,
          )}
          name="customer_profile.activity"
          errors={errors?.customer_profile?.activity}
          placeholder="Activité"
          defaultValue={""}
        >
          {activities?.map((activity) => (
            <option key={activity.id} value={activity.name}>
              {activity.name}
            </option>
          ))}
        </NativeSelect>
        <NativeSelect
          {...register(
            "customer_profile.billing_cycle",
            SIGN_UP_SCHEMA.customer_profile.billing_cycle,
          )}
          name="customer_profile.billing_cycle"
          errors={errors?.customer_profile?.billing_cycle}
          placeholder="Facturation"
          defaultValue={""}
        >
          {billingCycles?.map((billingCycle) => (
            <option key={billingCycle.id} value={billingCycle.name}>
              {billingCycle.name}
            </option>
          ))}
        </NativeSelect>
        <NativeSelect
          {...register(
            "customer_profile.payment_method",
            SIGN_UP_SCHEMA.customer_profile.payment_method,
          )}
          name="customer_profile.payment_method"
          errors={errors?.customer_profile?.payment_method}
          placeholder="Mode de Règlement"
          defaultValue={""}
        >
          {paymentMethods?.map((paymentMethod) => (
            <option key={paymentMethod.id} value={paymentMethod.name}>
              {paymentMethod.name}
            </option>
          ))}
        </NativeSelect>
      </Grid>
    </Section>
  );
};

export default AdministrativeSection;
