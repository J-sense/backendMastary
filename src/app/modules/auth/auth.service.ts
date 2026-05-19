import { User } from "../user/user.modal"
import AppError from "../../errorHelpers/AppError"
import { StatusCodes } from "http-status-codes"
import bcrypt from "bcrypt"
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/envVars"
const loginUser = async (payload: {
  email: string,
  password: string
}) => {
  const isUserExist = await User.findOne({email:payload.email})
  console.log(isUserExist)
  if(!isUserExist){
    throw new AppError(StatusCodes.BAD_REQUEST,"User not exist")
  }
  const isPasswordMatch = bcrypt.compare(payload.password as string, isUserExist.password as string)
  if(!isPasswordMatch){
       throw new AppError(StatusCodes.BAD_REQUEST,"Password does not match")
  }
  const jwtPayload = {
    userId:isUserExist._id,
    email:isUserExist.email,
    role:isUserExist.role,
    name:isUserExist.name
  }
  const {password, ...rest}= isUserExist.toObject()
  const accessToken = jwt.sign(jwtPayload as JwtPayload, envVars.ACCESS_TOKEN_SECRET as string,{
 expiresIn: "1d",
  })
  const refreshtoken = jwt.sign(jwtPayload as JwtPayload, envVars.ACCESS_TOKEN_SECRET as string,{
 expiresIn: "1d",
  })
  return {
    accessToken:accessToken,
    refreshtoken:refreshtoken,
    user:rest
  }
}

export const authService = {
  loginUser
}