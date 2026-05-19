/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import jwt, { JwtPayload } from "jsonwebtoken"
import { envVars } from "../../config/envVars";
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.createUser(req.body);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  }
);
const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user,"req.user")
    const result = await userService.getAllUser();
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  }
);
// const createUser = async (req:Request,res:Response,next:NextFunction)=>{
//     try {
//        const result = await userService.createUser(req.body)
//        res.status(201).json({
//         success:true,
//         message:"User created successfully",
//         data:result
//        })

//     } catch (error) {
//        next(error)
//     }
// }


const updateUser = catchAsync( async (req:Request,res:Response,next:NextFunction)=>{
       const userId = req.params.id
       const payload = req.body
       const token = req.headers.authorization
       console.log(token)
       const decodedToken = jwt.verify(token as string, envVars.ACCESS_TOKEN_SECRET as string) as JwtPayload


       const result = await userService.updateUser(userId as string,payload,decodedToken)
       sendResponse(res,{
        data:result,
        message:"User updated successfully",
        statusCode:201,
        success:true
       })
})
export const UserController = {
  createUser,
  getAllUsers,
  updateUser
};
