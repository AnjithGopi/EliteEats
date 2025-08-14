

export interface LoginData {
  email: string;
  password: string;
  location?: {
    latitude?: number;
    longitude?: number;
  };
}