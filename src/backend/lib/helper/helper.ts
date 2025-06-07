import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET; // Fallback for development
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY_DAY || "2d"; // Default to 2 days

interface UserPayload {
  _id: string;
  userName: string;
  userType?: string;
}

export const generateToken = (user: UserPayload): string => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const token = jwt.sign(
    {
      id: user._id,
      userName: user.userName,
      userType: user.userType,
    },
    JWT_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
      
    }
  );

  return token;
};
