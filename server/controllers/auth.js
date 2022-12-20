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

       const salt = await bcrypt.genSalt(); //this salt is to encrypt our password
       const passwordHash = await bcrypt.hash(password,salt);
       //this will create a password hash for this particular password
       const newUser = new User({

       })
       //STEPS FOR AUTHENTICATION
       //1)User will provide the password
       //2)This password then will be encrypted by bcrypt 
       //3>We will salt it again and then decrypt the encrypted password
       //4)If all of it matches we will provide the user with JWT and hence it can proceed ahead
    }catch(err){

    }

}