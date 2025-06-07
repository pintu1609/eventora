
import { User } from "@/backend/model/user/user"
import { create, findOne } from "@/backend/dal/dal"
import bcrypt from 'bcryptjs'
import { generateToken } from "@/backend/lib/helper/helper"
export const createuser = async (user:any)=> {

    const existinguser = await findOne (User,{userName:user.userName})
    if(existinguser){
        throw new Error("User already exist")
    }
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const newuser = await create(User,user)
    return newuser

}

export const login = async (user:any) => {
    const existinguser = await findOne(User, { userName: user.userName });
    if (!existinguser) {
        throw new Error("User does not exist");
    }
    const isPasswordMatch = await bcrypt.compare(user.password, existinguser.password);
    if (!isPasswordMatch) {
        throw new Error("Invalid password");
    }
   const token = await generateToken(existinguser)
   existinguser.token = token
    return existinguser;
};