import UserTb from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { JWT_Secret } from "../config/config.js";

export const regiter_user = async(req,res)=>{


    try{
        const {username, email, password} = req.body;

        const userExists = await UserTb.findOne({username});

        if(userExists){
            return res.status(400).send({status:false, message: "User Already Exists.."});

        }

        // Hashed password waaye

        const hashedPass = await bcrypt.hash(password, 10)

        const user = new UserTb({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: hashedPass
        });

        await user.save();

        res.status(200).send({status: true, message: {username: user.username, email: user.email}})



    }catch(e){
        console.log(e);
        res.status(500).send({status:false, message: "Unkown Error at User registration..."})
    }

}

export const login = async (req,res) =>{


    try{

        // user-ka xogtiisa in la helo waaye kow
        const{username, password} = req.body;

        // checking from database

        const isUserExists = await UserTb.findOne({username: username.toLowerCase()});
        
        if(!isUserExists){
            return res.status(400).send({status: false, message: "Invalid Username or Password..."})
        }

        const validPassword = await bcrypt.compare(password, isUserExists.password);

        // Haddii uusan jirin...
        if(!validPassword){
            return res.status(400).send({status: false, message: "Invalid Username or Password..."})

        }

        // JWT: waxa uu generate gareenaa Astaan User-ka u gaar ah
        // NB: Messhan xog muhiim ah sida password cml ama email cml malagu qoro.
        const token = jwt.sign({ _id: isUserExists._id }, JWT_Secret);

        // user-ka sida loogu diraayo
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // set to true if using HTTPS
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            // maxAge: 2 * 1000
        });



        

        isUserExists.password = undefined;

        res.status(200).send(isUserExists);



    }catch(e){
        console.log("error ayaa jiro", e);
    }

}

export const getUserProfile = async(req, res) => {
    try{
        const user = await UserTb.findById(req.user._id);

        user.password = undefined;

        res.status(200).send(user);

    }catch(e){
        console.log("Error at get user profile", e)
        res.status(404).send("Unkown Error",e);
    }
}


export const Logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.send("Logout Successful!");

    } catch (e) {
        console.log("Error at logout", e);
        res.status(400).send("Unknown Error");
    }
}






// export const hi = async (req,res) =>{
//     res.send("hi user mosab gaafow")
// }