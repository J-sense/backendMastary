/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
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
export const UserController = {
  createUser,
  getAllUsers,
};
