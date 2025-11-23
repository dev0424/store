export const PASSWORD_SCHEMA = {
  required: "Ce champ est obligatoire",
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
    message:
      "Le mot de passe doit comporter au moins 8 caractères et inclure des majuscules, des minuscules, des chiffres et des caractères spéciaux.",
  },
};

export const getSignupSchema = (billingSameAsShipping: boolean) => {
  return {
    first_name: {
      required: "Ce champ est obligatoire",
    },
    last_name: {
      required: "Ce champ est obligatoire",
    },
    email: {
      required: "Ce champ est obligatoire",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "S'il vous plaît, mettez une adresse email valide",
      },
    },
    phone: {
      required: "Ce champ est obligatoire",
      pattern: {
        value: /^[+]?[\d\s\-()]{7,20}$/,
        message: "Veuillez saisir un numéro de téléphone valide",
      },
    },
    company_name: {
      required: "Ce champ est obligatoire",
    },
    password: PASSWORD_SCHEMA,
    bank_account: {
      bank_name: {
        required: "Ce champ est obligatoire",
      },
      bank_code: {
        required: "Ce champ est obligatoire",
      },
      branch_code: {
        required: "Ce champ est obligatoire",
      },
      city: {
        required: "Ce champ est obligatoire",
      },
      address: {
        required: "Ce champ est obligatoire",
      },
      account_number: {
        required: "Ce champ est obligatoire",
      },
      account_holder: {
        required: "Ce champ est obligatoire",
      },
      iban: {
        required: "Ce champ est obligatoire",
      },
      bic: {
        required: "Ce champ est obligatoire",
      },
      rib_key: {
        required: "Ce champ est obligatoire",
      },
    },
    addresses: [
      {
        address_1: {
          required: "Ce champ est obligatoire",
        },
        address_2: {
          required: false,
        },
        postal_code: {
          required: "Ce champ est obligatoire",
        },
        city: {
          required: "Ce champ est obligatoire",
        },
        country_code: {
          required: "Ce champ est obligatoire",
        },
        province: {
          required: false,
        },
      },
      // Only validate second address if billing is different
      billingSameAsShipping
        ? {}
        : {
            address_1: {
              required: "Ce champ est obligatoire",
            },
            address_2: {
              required: false,
            },
            postal_code: {
              required: "Ce champ est obligatoire",
            },
            city: {
              required: "Ce champ est obligatoire",
            },
            country_code: {
              required: "Ce champ est obligatoire",
            },
            province: {
              required: false,
            },
          },
    ],
    customer_profile: {
      vat_number: {
        required: "Ce champ est obligatoire",
      },
      siret_number: {
        required: "Ce champ est obligatoire",
      },
      ape_code: {
        required: "Ce champ est obligatoire",
      },
      activity: {
        required: "Ce champ est obligatoire",
      },
      billing_cycle: {
        required: "Ce champ est obligatoire",
      },
      payment_method: {
        required: "Ce champ est obligatoire",
      },
      invoice_email: {
        required: "Ce champ est obligatoire",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "S'il vous plaît, mettez une adresse email valide",
        },
      },
    },
  };
};
