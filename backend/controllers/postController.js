import PostTb from "../models/PostModel.js";


export const createPost = async(req,res)=>{

    try{
        // const {username, email, password} = req.body;
        const newPost =  new PostTb({...req.body, author: req.user._id})
        await newPost.save();
        res.status(200).send({status: true, message: newPost});


    }catch(e){
        console.log("Error at creating post", e);
        res.status(400).send({status: "error", message: "Unexpected Error.."})
    }

}

// READ SPECIFIC POST by id FROM DATABASE

export const getPostById = async(req,res) =>{
    try
    {
        const postId = req.params.id; // parameter-ada la socda url ka waaye sida Id-ga lo baasayo cml postRoute

        const post = await PostTb.findById(postId).populate("author", ["username", "email", "-_id"])
        // const post = await PostTb.findById(postId).populate("author", ["username", "email", "-_id"])


        if(!post){  // hadi las oo waayo
            return res.status(400).send({
                status: false,
                message: "Unknown Post Not Found "
            });
        }

        return res.status(200).send({
            status: true,
            message: post
        });


    }catch(e){
        console.log("Error getting post", e);
        return res.status(400).send({
            status: false,
            message: "Something went wrong"
        });
    }
}


// READ ALL POSTS 

export const getPosts = async(req,res) =>{
    try{
        const posts = await PostTb.find().populate("author", "-password").sort({
            createdAt: -1
        })
        return res.status(200).send(posts);

    }catch(e){
        console.log("Error at getting Posts", e);
        // return res.stat
    }
}

// UPDATE SPECIFIC POST
export const updatePost = async (req,res) =>{
    try{

        const {title, content} = req.body;

        const post = await PostTb.findById(req.params.id);

        if(!post) {
        return  res.status(400).send({status: false, message: "No Post Found"});
       
        }

        // Get Current User who is logged in 
        const currentUser = req.user._id;

        if(currentUser.toString() != post.author.toString()){
            return res.status(403).send({status: false, message: "posts must have updated by the original Author"})

        }

        // Update Post
        await PostTb.findOneAndUpdate({ _id: req.params.id}, {title, content}, {new: true});
           
        res.status(200).send("Updated Successfully.")



    }catch(e){
        console.log("error at Updating post", e);
        res.status(400).send({status: false, message: "There is error on updating Post.."})
    }
}

//DELETE SPECIFIC POST

export const deletePost = async(req,res) =>{


    try{

        const post = await PostTb.findById(req.params.id);
        if(!post){
            return res.status(404).send({status: false, message: "Not Found that Id, please try again..."})
        }

        // Current User
        const currentUser = req.user._id;
        if(currentUser.toString() != post.author.toString()){
            return res.status(404).send({status: false, message: "Post must have deleted by the Original Author.."});


        }

        // await post.remove();

        await PostTb.findByIdAndDelete(req.params.id);

        res.status(200).send("Deleted Successfully.")

    }catch(e){
        console.log("Error at deleting Post",e);
        res.status(400).send({status: false, message: "There is error in deleting Post."})
    }
}








export const hipost = async(req,res) =>{
    res.send("Hi mosab..");
}


