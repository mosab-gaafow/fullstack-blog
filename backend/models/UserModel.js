import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            required: true,
            type: String
        }
    },
    {   
        timestamps: true
    }

);

// database ka uu tagaa waxa uuna sameenaya table
const UserTb = mongoose.model('UserTb', userSchema);

export default UserTb;

