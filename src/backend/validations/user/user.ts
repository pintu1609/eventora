import { z } from 'zod';

export const userSchema = z.object({
    name: z.string().min(3).max(30).nonempty("name is required"),
    userName: z.string().min(3).max(30).nonempty("userName is required"),
    password: z.string().min(8).max(30).nonempty("password is required"),
    userType: z.enum(["admin", "user", "seller", "operator"]),
});


export const loginSchema = z.object({
  userName: z.string().min(3).max(30).nonempty("userName is required"),
    password: z.string().min(8).max(30).nonempty("password is required"),
})

export type LoginInput = z.infer<typeof loginSchema>;
export type CreateUserInput = z.infer<typeof userSchema>;

