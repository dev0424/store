export type Distributor = {
  id: number;
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address: {
    postal_code: string;
    city: string;
    address: string;
  };
  phone: string;
  email: string;
  distance?: number;
};
