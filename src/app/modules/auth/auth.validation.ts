import z from "zod";

export const loginSchema =z.object({
    email:z.email("Email is required"),
    password:z.string("Password is required")
})

