import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User",
        unique:true
    },
    token:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:3600
    }
})

const ForgotToken = mongoose.model("ForgotToken",tokenSchema);

export default ForgotToken;