
import { User } from "@/backend/model/user/user"
import { create, findOne } from "@/backend/dal/dal"
import bcrypt from 'bcryptjs'
import { generateToken } from "@/backend/lib/helper/helper"

interface interfaceUser {
    name: string;
    userName: string;
    password: string;
    userType: "admin" | "user";
}

interface interfaceLogin {
    userName: string;
    password: string
}

interface interfaceUserResponse {
    _id: string;
    name: string;
    userName: string;
    userType: "admin" | "user";
  }

export const createuser = async (userData:interfaceUser)=> {

    const existinguser = await findOne (User,{userName:userData.userName})
    if(existinguser){
        throw new Error("User already exist")
    }
    
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);

    const newuser = await create(User,userData)
    return newuser

}

export const login = async (user:interfaceLogin) => {
    const existinguser = await findOne(User, { userName: user.userName });
    if (!existinguser) {
        throw new Error("User does not exist");
    }
    const isPasswordMatch = await bcrypt.compare(user.password, existinguser.password);
    if (!isPasswordMatch) {
        throw new Error("Invalid password");
    }
   const token = await generateToken(existinguser as interfaceUserResponse)
   const userResponse = {
    id: existinguser._id,
    name: existinguser.name,
    userName: existinguser.userName,
    userType: existinguser.userType,
    token,
  };

  return userResponse;
};