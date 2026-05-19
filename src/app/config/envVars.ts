import dotenv from "dotenv";
dotenv.config();

export const envVars = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  NODE_ENV: process.env.NODE_ENV,
  ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET
};
