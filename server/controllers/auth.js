import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
//here we will do for REGISTER USER

export const register = async(req,res)=>{

    try{
        //here we are destructuring this from the req body
       const{
        firstName,
        lastName,
        email,
        password,
        picturePath,
        friends,
        location,
        occupation
       }=req.body;


       /*This section will create an encrypted password*/
       const salt = await bcrypt.genSalt(); //this salt is to encrypt our password
       const passwordHash = await bcrypt.hash(password,salt);
       //this will create a password hash for this particular password
       const newUser = new User({
        firstName,
        lastName,
        email,
        password:passwordHash,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile:Math.floor(Math.random()*3000),
        impressions:Math.floor(Math.random()*3000)
       });

       const savedUser = await newUser.save();
       res.status(201),json(savedUser);
       //STEPS FOR AUTHENTICATION
       //1)User will provide the password
       //2)This password then will be encrypted by bcrypt 
       //3>We will salt it again and then decrypt the encrypted password
       //4)If all of it matches we will provide the user with JWT and hence it can proceed ahead
    }catch(err){
        res.status(500).json({error: err.message });
    }

}


//LOGGING IN
//This is making it a secure authentication
export const login = async (req,res)=>{

    try{
      const {email,password}=req.body;
      const user = await User.findOne({email:email});
      if(!user) return res.status(400).json({msg:"User does not exist."});

      const isMatch = await bcrypt.compare(password,user.password);
      if(!isMatch) return res.status(400).json({msg:"User does not exist."});

      const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
      delete user.password;
      res.status(200).json({token,user});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}