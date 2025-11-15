export const CUSTOMER_PROFILE_RULES = {
    vat_number: {
        required: 'This field is required',
    },
    siret_number: {
        required: 'This field is required',
    },
    ape_code: {
        required: 'This field is required',
    },
    activity: {
        required: 'This field is required',
    },
    billing_cycle: {
        required: 'This field is required',
    },
    payment_method: {
        required: 'This field is required',
    },
    invoice_email: {
        required: 'This field is required',
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address',
        },
    },
};
