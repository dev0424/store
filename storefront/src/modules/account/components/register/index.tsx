"use client"

import { useFormState } from "react-dom"

import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"
import { Tab } from "@headlessui/react"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(signup, null)

  return (
    <div
      className="max-w-sm flex flex-col items-center gap-4"
      data-testid="register-page"
    >
      <h1 className="text-large-semi uppercase">Become a store member</h1>
      <p className="text-center text-base-regular text-ui-fg-base">
        Create your store member profile, and get access to an enhanced shopping
        experience.
      </p>
      <Tab.Group>
        <Tab.List className="w-full flex space-x-1 rounded-md bg-black/20 p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-md py-2 text-sm font-medium leading-5 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white text-black shadow"
                  : "text-white hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            Customer
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-md py-2 text-sm font-medium leading-5 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white text-black shadow"
                  : "text-white hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            Company
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
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
                <LocalizedClientLink
                  href="/content/terms-of-use"
                  className="underline"
                >
                  Terms of Use
                </LocalizedClientLink>
                .
              </span>
              <SubmitButton
                className="w-full mt-6"
                data-testid="register-button"
              >
                Join
              </SubmitButton>
            </form>
          </Tab.Panel>

          <Tab.Panel>
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
                  required
                  type="tel"
                  autoComplete="tel"
                  data-testid="phone-input"
                />
                <Input
                  label="Tax number"
                  name="tax_number"
                  required
                  type="text"
                />
                <Input
                  label="Company name"
                  name="company_name"
                  required
                  type="text"
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
                <LocalizedClientLink
                  href="/content/terms-of-use"
                  className="underline"
                >
                  Terms of Use
                </LocalizedClientLink>
                .
              </span>
              <SubmitButton
                className="w-full mt-6"
                data-testid="register-button"
              >
                Join
              </SubmitButton>
            </form>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Already a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Sign in
        </button>
      </span>
    </div>
  )
}

export default Register
