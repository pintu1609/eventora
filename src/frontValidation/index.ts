import { z } from 'zod';

const initialRegistration = {
  name: '',
  email: '',
  image: '',
  phone: '',

  // recepit: '',
  
 
};

const initialAdminLogin = {
    userName: '',
    password: '',
}

 const guestSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").max(30, "Name must be at most 30 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .length(10, "Phone number must be exactly 10 digits")
      .regex(/^[0-9]+$/, "Phone number must contain only digits"),
    image: z.string(),
    // status: z.string().nonempty("Status is required"),
    // hasEntered: z.boolean(),
    // // recepit: z.string(),
  });

  const adminLoginSchema = z.object({
    userName: z.string().nonempty("Username is required").min(3, "Username must be at least 3 characters").max(30, "Username must be at most 30 characters"),
    password: z.string().min(8, "Password must be at least 8 characters").max(30, "Password must be at most 30 characters"),
  });

  export { guestSchema, initialRegistration, adminLoginSchema, initialAdminLogin };