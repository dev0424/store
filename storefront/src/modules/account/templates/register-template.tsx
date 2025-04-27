import React from "react"
import { Tab } from "@headlessui/react"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import RegisterCustomer from "@modules/account/components/register-customer"
import RegisterCompany from "@modules/account/components/register-company"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const RegisterTemplate = ({ setCurrentView }: Props) => {
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
            <RegisterCustomer />
          </Tab.Panel>
          <Tab.Panel>
            <RegisterCompany />
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

export default RegisterTemplate
