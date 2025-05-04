// src/config/env.ts
export interface EnvVariables {
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  REDIS_URL:string;
}

export const env: EnvVariables = {
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
  REDIS_URL :process.env.REDIS_URL as string,
};

// Validate on startup
if (!env.JWT_ACCESS_SECRET || !env.JWT_REFRESH_SECRET ||!env.REDIS_URL) {
  throw new Error("Missing JWT secrets in environment variables");
}
