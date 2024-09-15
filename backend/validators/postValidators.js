import Joi from "joi";




export const validatePosts = async(req,res,next) =>{

    const schema = Joi.object({
        content: Joi.string().min(10).max(100).required(),
        title: Joi.string().min(10).required()
    });

    const {error} = schema.validate(req.body);

    if(error){
        console.log("Error In Creating Post..", error.details);
        res.status(400).send(error.details[0].message)
    }

    next();
}


