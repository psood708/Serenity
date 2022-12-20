//here we will be doign the user schema
import mongoose from "mongoose";


const UserSchema = new mongoose.Schema(

    {
        firstName:{
            type:String,
            require:true,
            min:5,
            max:50,
        },
        lastName:{
            type:String,
            require:true,
            min:5,
            max:50,
        },
        email:{
            type:String,
            require:true,
            min:5,
            max:50,
        },
        password:{
            type:String,
            require:true,
            min:7,
            max:50,
        },
        picturePath:{
            type:String,
            default:""
        },
        friends:{
            type: Array,
            default:[]
        },
        location:String,
        occupation:String,
        viewedProfile: Number,
        impressions:Number,
    },{timestamps:true}
);
const User = mongoose.model("User",UserSchema);
export default User;