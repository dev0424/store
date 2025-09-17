import { HttpTypes } from "@medusajs/types";

export type ProductDocument = {
  id: string;
  type: string;
  name?: string;
  url: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type ProductWithDocument = HttpTypes.StoreProduct & {
  product_document?: ProductDocument[];
};
