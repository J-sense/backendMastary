import express from "express";
import { UserController } from "./user.controller";

import { userValidationSchema } from "./user.validations";
import { validateRequest } from "../../middlewares/validateRequests";
import { NextFunction, Request, Response } from "express";
import AppError from "../../errorHelpers/AppError";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken"
import { Role } from "../user/user.interface";
const router = express.Router();

const checkAuth =((req:Request,res:Response,next:NextFunction)=>{
   try {
     const accessToken = req.headers.authorization
    if(!accessToken){
        throw new AppError(StatusCodes.BAD_REQUEST,"No Token recvieved")
    }
    const isVerified = jwt.verify(accessToken, "secret")

    if(!isVerified){
        throw new AppError(StatusCodes.BAD_REQUEST,"You are not authorized")
    }
    if(((isVerified as JwtPayload).role) !== Role.ADMIN && Role.SUPER_ADMIN){
        throw new AppError(StatusCodes.BAD_REQUEST,"Only admin and super can view this route ")
    }
    console.log(isVerified)
    next()
   } catch (error) {
    next(error)
   }

})
router.post(
  "/create",
  validateRequest(userValidationSchema),
  UserController.createUser
);
router.get("/all",checkAuth, UserController.getAllUsers);
const userRoutes = router;
export default userRoutes;
