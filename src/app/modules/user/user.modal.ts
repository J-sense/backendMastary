import { model, Schema } from "mongoose";
import { IsActive, IUser, Role } from "./user.interface";
export interface IAuthProvider {
  provider: string; // "Google", "Credential"
  providerId: string;
}

const authProviderSchema = new Schema<IAuthProvider>({
  provider: {
    type: String,
    enum: ["credential", "google"],
    required: true,
  },
  providerId: {
    type: String,
    required: true,
  },
});
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
    },
    picture: {
      type: String,
    },
    address: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: String,
      enum: Object.values(IsActive),
      default: IsActive.ACTIVE,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
    auths: [authProviderSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model<IUser>("User", userSchema);
