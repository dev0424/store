export const REQUIRED_FIELD_MESSAGE = "Ce champ est obligatoire";

export const PASSWORD_SCHEMA = {
  required: REQUIRED_FIELD_MESSAGE,
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
    message:
      "Le mot de passe doit comporter au moins 8 caractères et inclure des majuscules, des minuscules, des chiffres et des caractères spéciaux.",
  },
};

export const EMAIL_SCHEMA = {
  required: REQUIRED_FIELD_MESSAGE,
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "S'il vous plaît, mettez une adresse email valide",
  },
};

export const SIGN_UP_SCHEMA = {
  first_name: {
    required: REQUIRED_FIELD_MESSAGE,
  },
  last_name: {
    required: REQUIRED_FIELD_MESSAGE,
  },
  email: EMAIL_SCHEMA,
  phone: {
    required: REQUIRED_FIELD_MESSAGE,
    pattern: {
      value: /^[+]?[\d\s\-()]{7,20}$/,
      message: "Veuillez saisir un numéro de téléphone valide",
    },
  },
  company_name: {
    required: REQUIRED_FIELD_MESSAGE,
  },
  password: PASSWORD_SCHEMA,
  bank_account: {
    bank_name: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    bank_code: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    branch_code: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    city: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    address: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    account_number: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    account_holder: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    iban: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    bic: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    rib_key: {
      required: REQUIRED_FIELD_MESSAGE,
    },
  },
  address: {
    address_1: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    address_2: {
      required: false,
    },
    postal_code: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    city: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    country_code: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    province: {
      required: false,
    },
  },
  customer_profile: {
    vat_number: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    siret_number: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    ape_code: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    activity: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    billing_cycle: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    payment_method: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    invoice_email: EMAIL_SCHEMA,
    revenue_previous_year: {
      required: false,
      valueAsNumber: true,
    },
    employee_count: {
      required: false,
      valueAsNumber: true,
    },
  },
  account_group: {
    is_centralized_billing: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    corporate_status: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    is_purchasing_group_member: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    membership_number: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    is_agency_or_branch: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    parent_group_name: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    is_platform_client: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    platform_name: {
      required: REQUIRED_FIELD_MESSAGE,
    },
  },
  contact_persons: {
    role: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    title: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    first_name: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    last_name: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    phone: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    email: EMAIL_SCHEMA,
  },
  files: {
    rib: {
      required: REQUIRED_FIELD_MESSAGE,
    },
    kbis: {
      required: REQUIRED_FIELD_MESSAGE,
    },
  },
};

export const optionalText = (isRequired?: boolean) => ({
  required: isRequired ? REQUIRED_FIELD_MESSAGE : false,
  setValueAs: (v: string) => (v === "" ? null : v),
});
