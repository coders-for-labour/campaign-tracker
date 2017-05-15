export interface LocationImage {
  url: string;
  credit?: string;
  creditLink?: string;
}

export interface Location {
  address: string;
  description?: string;
  date: string;
  images: LocationImage[];
  lat: number;
  lng: number; 
}
