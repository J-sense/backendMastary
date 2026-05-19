import jwt, { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/envVars";
import AppError from "../errorHelpers/AppError";
import { StatusCodes } from "http-status-codes";

export const verifyToken = (token: string): JwtPayload => {
  try {
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "No token provided");
    }

    const decoded = jwt.verify(
      token,
      envVars.ACCESS_TOKEN_SECRET as string
    ) as JwtPayload;

    return decoded;
  } catch (error) {
    console.log(error)
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid or expired token");
  }
};