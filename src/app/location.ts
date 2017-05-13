export interface LocationImage {
  url: string;
  credit?: string;
  creditLink?: string;
}

export interface Location {
  name: string;
  address: string;
  date: string;
  images: LocationImage[];
  lat: number;
  lng: number; 
}
