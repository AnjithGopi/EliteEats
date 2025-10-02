

import { Document } from "mongodb";

export interface IVendor extends Document {
  restaurentId: string;
  name: string;
  displayPicture?: string;
  address?: string;
  pincode?: number;
  email: string;
  password: string;
  phone?: string;
  description?: string;
  cuisineType?: string;
  isActive: boolean;
  adminVerified: boolean;
  createdAt: Date;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
}