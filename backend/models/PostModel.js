import mongoose from "mongoose";

// const {foreignKeyUserId} = mongoose.Schema.Types.ObjectId;
const postSchema = new mongoose.Schema(
    {
        title:{
            required: true,
            type: String

        },
        content:{
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            // type: foreignKeyUserId
            ref: 'UserTb'
        }
    },
    {
        timestamps: true
    }
);

const PostTb = mongoose.model('postTb', postSchema);
export default PostTb;

