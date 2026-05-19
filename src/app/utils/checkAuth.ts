import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken"

import AppError from "../errorHelpers/AppError";
import { envVars } from "../config/envVars";
export const checkAuth=(...authRoles:string[])=> ((req:Request,res:Response,next:NextFunction)=>{
   try {
     const accessToken = req.headers.authorization
    if(!accessToken){
        throw new AppError(StatusCodes.BAD_REQUEST,"No Token recvieved")
    }
    const isVerified = jwt.verify(accessToken, envVars.ACCESS_TOKEN_SECRET as string) as JwtPayload
   
    if(!isVerified){
        throw new AppError(StatusCodes.BAD_REQUEST,"You are not authorized")
    }
    if(!authRoles.includes(isVerified?.role)){
      throw new AppError(StatusCodes.BAD_REQUEST,"Only dedicated role can access this ")
    }
    req.user= isVerified
    next()
   } catch (error) {
    next(error)
   }

})