import UserModel from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })
console.log( process.env.MONGODB_URI);

mongoose.connect( process.env.MONGODB_URI,{ useNewUrlParser: true });


async function setupApp() {

    try {
        const salt = await bcryptjs.genSalt(10)
        const pass ="urval12345"
        const hashPassword = await bcryptjs.hash(pass, salt)

        const payload = {
            name: "urval",
            email: "urval@gmail.com",
            role: "ADMIN",
            verify_email: true,
            password: hashPassword
        }
        await UserModel(payload).save()
        

        console.log('👍 Admin created : Done!');

    }
    catch (e) {
        console.log('\n🚫 Error! The Error info is below'+ e);
    }


}

setupApp();