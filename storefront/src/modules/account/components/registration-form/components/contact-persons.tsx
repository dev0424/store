import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import Input from "@modules/common/components/input";
import Section from "@modules/account/components/registration-form/components/section";
import { RegistrationFormValues } from "@modules/account/components/registration-form";
import { SIGN_UP_SCHEMA } from "@modules/account/components/registration-form/schema";
import { Button, IconButton } from "@medusajs/ui";
import { XMark } from "@medusajs/icons";
import NativeSelect from "@modules/common/components/native-select";

const ContactPersonsSection = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<RegistrationFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contact_persons",
  });

  const onClickAdd = () =>
    append({
      role: "",
      title: "",
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
    });

  const onClickRemove = (index: number) => remove(index);

  return (
    <Section
      title="Contacts"
      slot={
        <Button
          type="button"
          size="small"
          variant="secondary"
          onClick={onClickAdd}
        >
          Ajouter un contact
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-[repeat(6,1fr)_auto] items-center gap-4"
          >
            <NativeSelect
              {...register(
                `contact_persons.${index}.role`,
                SIGN_UP_SCHEMA.contact_persons.role,
              )}
              name={`contact_persons.${index}.role`}
              errors={errors?.contact_persons?.[index]?.role}
              placeholder="Fonction"
              defaultValue={""}
            >
              <option key="director" value="director">
                Dirigeant
              </option>
              <option key="accounting" value="accounting">
                Comptabilité
              </option>
              <option key="customer_service" value="customer_service">
                SAV
              </option>
              <option key="trade" value="trade">
                Commerce
              </option>
              <option key="purchases" value="purchases">
                Achats
              </option>
              <option key="other" value="other">
                Autre
              </option>
            </NativeSelect>
            <Input
              {...register(
                `contact_persons.${index}.title`,
                SIGN_UP_SCHEMA.contact_persons.title,
              )}
              label="Civilité"
              errors={errors?.contact_persons?.[index]?.title}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                `contact_persons.${index}.first_name`,
                SIGN_UP_SCHEMA.contact_persons.first_name,
              )}
              label="Nom"
              errors={errors?.contact_persons?.[index]?.first_name}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                `contact_persons.${index}.last_name`,
                SIGN_UP_SCHEMA.contact_persons.last_name,
              )}
              label="Prénom"
              errors={errors?.contact_persons?.[index]?.last_name}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                `contact_persons.${index}.phone`,
                SIGN_UP_SCHEMA.contact_persons.phone,
              )}
              label="Téléphone"
              errors={errors?.contact_persons?.[index]?.phone}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              type="email"
              {...register(
                `contact_persons.${index}.email`,
                SIGN_UP_SCHEMA.contact_persons.email,
              )}
              label="Email"
              errors={errors?.contact_persons?.[index]?.email}
              required={true}
              disableNativeValidation={true}
            />
            <IconButton
              onClick={() => onClickRemove(index)}
              className="text-red-500 hover:text-red-700"
            >
              <XMark />
            </IconButton>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default ContactPersonsSection;
