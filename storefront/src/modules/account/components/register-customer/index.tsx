"use client"

import { useFormState } from "react-dom"

import Input from "@modules/common/components/input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

const RegisterCustomer = () => {
  const [message, formAction] = useFormState(signup, null)

  return (
    <form className="w-full flex flex-col" action={formAction}>
      <div className="flex flex-col w-full gap-y-2">
        <Input
          label="First name"
          name="first_name"
          required
          autoComplete="given-name"
          data-testid="first-name-input"
        />
        <Input
          label="Last name"
          name="last_name"
          required
          autoComplete="family-name"
          data-testid="last-name-input"
        />
        <Input
          label="Email"
          name="email"
          required
          type="email"
          autoComplete="email"
          data-testid="email-input"
        />
        <Input
          label="Phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          data-testid="phone-input"
        />
        <Input
          label="Password"
          name="password"
          required
          type="password"
          autoComplete="new-password"
          data-testid="password-input"
        />
      </div>
      <ErrorMessage error={message} data-testid="register-error" />
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        By creating an account, you agree to the store&apos;s{" "}
        <LocalizedClientLink
          href="/content/privacy-policy"
          className="underline"
        >
          Privacy Policy
        </LocalizedClientLink>{" "}
        and{" "}
        <LocalizedClientLink href="/content/terms-of-use" className="underline">
          Terms of Use
        </LocalizedClientLink>
        .
      </span>
      <SubmitButton className="w-full mt-6" data-testid="register-button">
        Join
      </SubmitButton>
    </form>
  )
}

export default RegisterCustomer
