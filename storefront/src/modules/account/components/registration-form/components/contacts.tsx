import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import Input from "@modules/common/components/input";
import Section from "@modules/account/components/registration-form/components/section";
import { RegistrationFormValues } from "@modules/account/components/registration-form";
import { SIGN_UP_SCHEMA } from "@modules/account/components/registration-form/schema";
import { Button, IconButton } from "@medusajs/ui";
import { XMark } from "@medusajs/icons";
import NativeSelect from "@modules/common/components/native-select";

const ContactsSection = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<RegistrationFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts",
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
                `contacts.${index}.role`,
                SIGN_UP_SCHEMA.contacts.role,
              )}
              name={`contacts.${index}.role`}
              errors={errors?.contacts?.[index]?.role}
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
                `contacts.${index}.title`,
                SIGN_UP_SCHEMA.contacts.title,
              )}
              label="Civilité"
              errors={errors?.contacts?.[index]?.title}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                `contacts.${index}.first_name`,
                SIGN_UP_SCHEMA.contacts.first_name,
              )}
              label="Nom"
              errors={errors?.contacts?.[index]?.first_name}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                `contacts.${index}.last_name`,
                SIGN_UP_SCHEMA.contacts.last_name,
              )}
              label="Prénom"
              errors={errors?.contacts?.[index]?.last_name}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                `contacts.${index}.phone`,
                SIGN_UP_SCHEMA.contacts.phone,
              )}
              label="Téléphone"
              errors={errors?.contacts?.[index]?.phone}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              type="email"
              {...register(
                `contacts.${index}.email`,
                SIGN_UP_SCHEMA.contacts.email,
              )}
              label="Email"
              errors={errors?.contacts?.[index]?.email}
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

export default ContactsSection;
