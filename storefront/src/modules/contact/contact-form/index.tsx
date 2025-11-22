"use client";

import React, { useActionState } from "react";
import Input from "@modules/common/components/input";
import TextArea from "@modules/common/components/textarea";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import { submitContactForm } from "@lib/data/contact";

const ContactForm = () => {
  // TODO submit contact form
  const [formState, formAction] = useActionState(submitContactForm, null);

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <Input
            label="Prénom"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label="Nom"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
        </div>
        <Input
          label="Email"
          name="email"
          required
          type="email"
          autoComplete="email"
          data-testid="email-input"
        />
        <Input
          label="Téléphone"
          name="phone"
          type="tel"
          autoComplete="tel"
          data-testid="phone-input"
        />
        <TextArea
          label="Message"
          name="message"
          required
          data-testid="message-input"
          rows={5}
        />
        <SubmitButton
          data-testid="contact-form-button"
          className="mt-6 h-10 w-full font-sans font-bold tracking-wide shadow-none"
        >
          Envoyer
        </SubmitButton>
      </div>
    </form>
  );
};

export default ContactForm;
