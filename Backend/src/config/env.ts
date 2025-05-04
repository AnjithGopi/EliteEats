// src/config/env.ts
export interface EnvVariables {
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
}

export const env: EnvVariables = {
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
};

// Validate on startup
if (!env.JWT_ACCESS_SECRET || !env.JWT_REFRESH_SECRET) {
  throw new Error("Missing JWT secrets in environment variables");
}
