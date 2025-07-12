import { SignupFormData } from "@modules/account/components/company-registration-form/index";

export const signupSchema: Record<
  Exclude<keyof SignupFormData, "confirm_password">,
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
};
