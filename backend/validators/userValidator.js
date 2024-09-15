import Joi from "joi";

export const validateUserRegistration = (req,res,next)=>{


    const schema = Joi.object({
        username: Joi.string().min(3).max(15).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required()
    });

    const {error} = schema.validate(req.body);

    if(error){
        console.log("error details: ", error.details);
        return res.status(400).send(error.details[0].message);
    }

    next();

}

export const validateLogin = async(req,res,next) => {
    const schema = Joi.object({
        username: Joi.string().min(4).max(15).required(),
        password: Joi.string().min(6).max(20).required()
    });

    const {error} = schema.validate(req.body);

    if(error){
        console.log("Error at login..", error.details[0]);
        res.status(400).send(error.details[0].message);
    }

    next();

}


