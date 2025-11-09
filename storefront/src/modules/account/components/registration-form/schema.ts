import { RegistrationFormValues } from "@modules/account/components/registration-form/index";

export const signupSchema: Record<
  Exclude<keyof RegistrationFormValues, "confirm_password">,
  any
> = {
  first_name: {
    required: "This field is required",
  },
  last_name: {
    required: "This field is required",
  },
  email: {
    required: "This field is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
  },
  phone: {
    required: "This field is required",
    pattern: {
      value: /^[+]?[\d\s\-()]{7,20}$/,
      message: "Please enter a valid phone number",
    },
  },
  metadata: {
    tax_number: {
      required: "This field is required",
      pattern: {
        value: /^[0-3]\d{12}$/,
        message: "Tax number must be 13 digits and start with 0-3",
      },
    },
  },
  company_name: {
    required: "This field is required",
  },
  password: {
    required: "This field is required",
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
      message:
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
    },
  },
  bank_account: {
    bank_name: {
      required: "This field is required",
    },
    bank_code: {
      required: "This field is required",
    },
    branch_code: {
      required: "This field is required",
    },
    city: {
      required: "This field is required",
    },
    address: {
      required: "This field is required",
    },
    account_number: {
      required: "This field is required",
    },
    account_holder: {
      required: "This field is required",
    },
    iban: {
      required: "This field is required",
    },
    bic: {
      required: "This field is required",
    },
    rib_key: {
      required: "This field is required",
    },
  },
  billing_address: {
    address_1: {
      required: "This field is required",
    },
    address_2: {
      required: false,
    },
    postal_code: {
      required: "This field is required",
    },
    city: {
      required: "This field is required",
    },
    country_code: {
      required: "This field is required",
    },
    province: {
      required: false,
    },
  },
  customer_profile: {
    vat_number: {
      required: "This field is required",
    },
    siret_number: {
      required: "This field is required",
    },
    ape_code: {
      required: "This field is required",
    },
    activity: {
      required: "This field is required",
    },
    billing_cycle: {
      required: "This field is required",
    },
    payment_method: {
      required: "This field is required",
    },
    invoice_email: {
      required: "This field is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter a valid email address",
      },
    },
  },
};
