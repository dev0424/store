import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { RegistrationFormValues } from "@modules/account/components/registration-form";
import Section from "@modules/account/components/registration-form/components/section";
import Grid from "@modules/account/components/registration-form/components/grid";
import Input from "@modules/common/components/input";
import {
  optionalText,
  SIGN_UP_SCHEMA,
} from "@modules/account/components/registration-form/schema";
import Checkbox from "@modules/common/components/checkbox";
import NativeSelect from "@modules/common/components/native-select";

const AccountGroup = () => {
  const {
    register,
    formState: { errors },
    control,
    watch,
  } = useFormContext<RegistrationFormValues>();

  const isPurchasingGroupMember = watch(
    "account_group.is_purchasing_group_member",
  );

  const isAgencyOrGroup = watch("account_group.is_agency_or_branch");

  const isPlatformClient = watch("account_group.is_platform_client");

  return (
    <Section title="Informations complémentaires">
      <div className="flex flex-col gap-4">
        <Grid>
          <Controller
            name="account_group.is_centralized_billing"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={field.value}
                onChange={() => field.onChange(!field.value)}
                label="Facturation centralisée"
                id="account_group.is_centralized_billing"
              />
            )}
          />
          <NativeSelect
            {...register(
              "account_group.corporate_status",
              SIGN_UP_SCHEMA.account_group.corporate_status,
            )}
            name="account_group.corporate_status"
            errors={errors?.account_group?.corporate_status}
            placeholder="Statut"
            defaultValue={""}
          >
            <option key="subsidiary" value="subsidiary">
              Filiale
            </option>
            <option key="independent" value="independent">
              Indépendant
            </option>
          </NativeSelect>
        </Grid>
        <Controller
          name="account_group.is_purchasing_group_member"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <Checkbox
              {...field}
              checked={field.value}
              onChange={() => field.onChange(!field.value)}
              label="Adhérent à un groupement d'achat"
              id="account_group.is_purchasing_group_member"
            />
          )}
        />
        <Grid>
          <Input
            {...register(
              "account_group.purchasing_group_name",
              optionalText(isPurchasingGroupMember),
            )}
            label="Nom du groupement"
            name="account_group.purchasing_group_name"
            errors={errors?.account_group?.purchasing_group_name}
            required={isPurchasingGroupMember}
            disableNativeValidation={true}
            disabled={!isPurchasingGroupMember}
          />
          <Input
            {...register(
              "account_group.membership_number",
              optionalText(isPurchasingGroupMember),
            )}
            label="Numéro adhérent"
            name="account_group.membership_number"
            errors={errors?.account_group?.membership_number}
            required={isPurchasingGroupMember}
            disableNativeValidation={true}
            disabled={!isPurchasingGroupMember}
          />
        </Grid>
        <Grid>
          <Controller
            name="account_group.is_agency_or_branch"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={field.value}
                onChange={() => field.onChange(!field.value)}
                label="Agence ou succursale d'un groupe"
                id="account_group.is_agency_or_branch"
              />
            )}
          />
          <Input
            {...register(
              "account_group.parent_group_name",
              optionalText(isAgencyOrGroup),
            )}
            label="Nom du groupe"
            name="account_group.parent_group_name"
            errors={errors?.account_group?.parent_group_name}
            required={isAgencyOrGroup}
            disableNativeValidation={true}
            disabled={!isAgencyOrGroup}
          />
        </Grid>
        <Grid>
          <Controller
            name="account_group.is_platform_client"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={field.value}
                onChange={() => field.onChange(!field.value)}
                label="Client de plateforme(s)-Dépôt(s)"
                id="account_group.is_platform_client"
              />
            )}
          />
          <Input
            {...register(
              "account_group.platform_name",
              optionalText(isPlatformClient),
            )}
            label="Si oui, lesquels"
            name="account_group.platform_name"
            errors={errors?.account_group?.platform_name}
            required={isPlatformClient}
            disableNativeValidation={true}
            disabled={!isPlatformClient}
          />
        </Grid>
      </div>
    </Section>
  );
};

export default AccountGroup;
