import jwt from 'jsonwebtoken';
import { JWT_Secret } from '../config/config.js';

export const authenticate =  async(req,res,next) =>{
    // kow token-ka ayaa lala baxaa
    const token = req.cookies.token; // token-kan waxa uu caddena user-ka login ma yahay?
    
    // console.log("token-ka waa kanaa: ", token);

    // haddii uusan jiran token:
    if (!token) {
        return res.status(403).send({ status: false, message: "Access Denied, No token Provided.., please login first" });
    }
        
    

    // haddi uu yahay login oo uu token-ka false yahay

    try{

        const decoded = jwt.verify(token, JWT_Secret);

        // haddii uu true noqdo

        req.user = decoded;// user-ka Id giisa ayaa heleena

        next();

    }catch(e){
        console.log("Jwt Cerification Error", e);
        return res.status(403).send({ status: false, message: "Invalid token." });
    }
}

