import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.modal";
import bcrypt from "bcrypt"
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
export const userService = {
  createUser,
  getAllUser,
};
