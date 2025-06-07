import z from "zod";
import { id } from "zod/v4/locales";

export const guestSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(30, "Name must be at most 30 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only digits"),
  // doc: z.string().nonempty("Document is required"),
  status: z.string().nonempty("Status is required"),
  qrToken: z.string(),
  hasEntered: z.boolean(),
  image: z.string().nonempty("Image is required"),
});


export const guestStatusValidationSchema = z.object({
  id: z.string(),
  status: z.string().nonempty("Status is required"),
})

export type Guest = z.infer<typeof guestSchema>;
export type GuestStatusValidation = z.infer<typeof guestStatusValidationSchema>;