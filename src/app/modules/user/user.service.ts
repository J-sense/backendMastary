import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.modal";
import bcrypt from "bcrypt"
import { JwtPayload } from "jsonwebtoken";
const createUser = async (payload: Partial<IUser>) => {
  if (!payload.email) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Email is required");
  }
  const { email,password, ...rest } = payload;
  const isEmaiExist = await User.findOne({ email });
  if (isEmaiExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Email already exists");
  }
  const authProvider: IAuthProvider = {
    provider: "credential",
    providerId: email as string,
  };
  const hashPassword = await bcrypt.hash(password as string, 10)

  const result = await User.create({ email,password:hashPassword, auths: [authProvider], ...rest });
  return result;
};
const getAllUser = async () => {
  const result = await User.find();
  return result;
};




const updateUser =async (userId:string,payload:Partial<IUser>,decodedToken:JwtPayload)=>{
  console.log(userId,payload,decodedToken)
  const isUserIdIsExist =await User.findById(userId)
  if(!isUserIdIsExist){
 throw new AppError(StatusCodes.BAD_REQUEST,"User is not exist")
  }
   if(payload.role){
       if(decodedToken.role == Role.USER || decodedToken.role == Role.GUIDE){
        throw new AppError(StatusCodes.BAD_REQUEST,"You are not authorized")
       }
   }
  if(payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN){
      throw new AppError(StatusCodes.BAD_REQUEST,"You are not authorized")
  }
  if(payload.isActive || payload.isDeleted || payload.isVerified){
    if(decodedToken.role == Role.USER || decodedToken.role ==Role.GUIDE){
      throw new AppError(StatusCodes.BAD_REQUEST,"You are not authorized")
    }
  }
  if(payload.password){
    payload.password =await  bcrypt.hash(payload.password,8 )
  }
  const result = await User.findByIdAndUpdate(userId,payload,{new:true})
  return result
}
export const userService = {
  createUser,
  updateUser,
  getAllUser,
};
