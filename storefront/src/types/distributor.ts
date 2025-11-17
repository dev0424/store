import { Location } from "@types/location";

export type Distributor = {
  id: string;
  company_name: string;
  email: string;
  phone: string;
  location: Location;
  distance?: number;
};
