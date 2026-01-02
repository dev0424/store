export type CustomerProfile = {
  vat_number: string;
  siret_number: string;
  ape_code: string;
  activity: string;
  billing_cycle: string;
  payment_method: string;
  invoice_email: string;
  revenue_previous_year?: number;
  employee_count?: number;
};
