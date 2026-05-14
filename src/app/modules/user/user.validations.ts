import { z } from "zod";

import { IsActive, Role } from "./user.interface";
const authProviderValidationSchema = z.object({
  provider: z.string({
    error: "Provider is required",
  }),
  providerId: z.string({
    error: "Provider ID is required",
  }),
});

export const userValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
  phone: z.string().optional(),
  picture: z.string().url("Invalid picture URL").optional(),
  address: z.string().optional(),
  isDeleted: z.boolean().default(false),
  isActive: z.nativeEnum(IsActive).default(IsActive.ACTIVE),
  isVerified: z.boolean().default(false),
  role: z.nativeEnum(Role).default(Role.USER),
  auths: z.array(authProviderValidationSchema).optional(),
});

export type UserValidation = z.infer<typeof userValidationSchema>;
