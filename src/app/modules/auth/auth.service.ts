import  bcrypt  from 'bcrypt';
import { StatusCodes } from "http-status-codes"
import AppError from "../../errorHelpers/AppError"
import { User } from "../user/user.modal"
import jwt  from 'jsonwebtoken'
const loginUser=async(payload:{
    email:string,password:string
})=>{
  const isEmailExist = await User.findOne({email:payload.email})
  if(!isEmailExist){
    throw new AppError(StatusCodes.BAD_REQUEST,"Email is not registered")
  }
  const isPasswordMatch =await bcrypt.compare(payload.password, isEmailExist.password as string)
  if(!isPasswordMatch){
    throw new AppError(StatusCodes.BAD_REQUEST,"Password incorrect")
  }
  const jwtPayload = {
      userId:isEmailExist._id,
    email:isEmailExist.email,
    role:isEmailExist.role,
  }
  const accessToken = await jwt.sign(jwtPayload,"secret",{expiresIn:"1d"})
  return {
    accessToken:accessToken

  }
}

export const authService = {
    loginUser
}