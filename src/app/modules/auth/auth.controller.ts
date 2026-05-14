import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
const loginController = catchAsync(async (req:Request,res:Response,next:NextFunction)=>{
    const result = await authService.loginUser(req.body)
    sendResponse(res,{
        statusCode:StatusCodes.CREATED,
        success:true,
        message:"User Logged in successfull",
        data:result
    })
})


export const authController ={
    loginController
}