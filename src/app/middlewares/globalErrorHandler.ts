/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/envVars";
import AppError from "../errorHelpers/AppError";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong catch by global error handler";
  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error instanceof Error) {
    statusCode = 500;
    message = error.message;
  }
  if (error) {
    res.status(statusCode).json({
      success: false,
      message: `${error.message || message}`,
      error,
      stack: envVars.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
export default globalErrorHandler;
