/* eslint-disable @typescript-eslint/no-explicit-any */
import  bcrypt  from 'bcrypt';

import { User } from "../modules/user/user.modal";


export const createSuperAdmin = async ()=>{
    try {
        const isSuperAdminExist = await User.findOne({email:"superAdmin@gmail.com"})
        if(isSuperAdminExist){
            console.log("email is not exist ")
            return
        }


        const superAdminPassword = "superAdmin@gmail.com"
        const hashPassword = await bcrypt.hash(superAdminPassword, 10)
        const authProvider  = {
            provider:"credential",
            providerId:superAdminPassword
        }
        const createSuperAdmin = await User.create({
      email:"superAdmin@gmail.com",
      password:hashPassword,
      name:"Super Admin",
      auths:[authProvider] as any
        })
     console.log(createSuperAdmin)
    } catch (error) {
        console.log(error)
    }
}