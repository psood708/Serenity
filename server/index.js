import express from "express"; 
import bodyParser from "body-parser"; //process the body
import mongoose from "mongoose";//backend
import cors from "cors"; //cross origin request
//bcrypt for password decryption
import dotenv from "dotenv";//environment variable
//gridfs for file upload
import multer from "multer";
import helmet from "helmet";//request safety
import morgan from "morgan";//login
//jsonwebtoken for login
import path from "path";
import { fileURLToPath } from "url";
import {register} from "./controllers/auth.js"
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { verifyToken } from "./middleware/auth.js";
import {createPost} from "./controllers/posts.js";


//=================================================================================

//STEP-1: make a server folder and put in the following command
//npm i -g nodemon
//STEP-2: now we need to install the required packages for the following project
// npm i express body-parser bcrypt cors dotenv gridfs-stream multer multer-gridfs-storage helmet morgan jsonwebtoken mongoose
//STEP-3: now we run this
//npm init -y
//STEP-4: we now make sure that we change the scripts and change it as module
//type:"module",
//STEP-5: creating index.js and putting all the imports here

//=================================================================================

//CONFIGURATIONS
 const __filename = fileURLToPath(import.meta.url); //this is used so we can use the file name
 const __dirname = path.dirname(__filename);
 dotenv.config();
 const app=express();
 app.use(express.json());
 app.use(helmet());
 app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
 app.use(morgan("common"));
 app.use(bodyParser.json({limit:"30mb",extended:true}));
 app.use(bodyParser.urlencoded({limit:"30mb",extended: true}));
 app.use(cors());
 app.use("/assets",express.static(path.join(__dirname,'public/assets')));//this is done so that we are keeping it locally the files are stored locally

 //FILE STORAGE this is how we save this using MULTER
 const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,"public/assets");
    },
    filename: function(req,file,cb){
        cb(null, file.originalname);
    }
 })
 const upload = multer({storage});


//AUTHORIZATIONN

//ROUTES WITH FILES
app.post("/auth/register",upload.single("picture"),register); //this will act as a middlewhere here (upload.single()) is a middlewhere , register is known as controller
app.post("/posts",verifyToken,upload.single("picture"),createPost);
//ROUTES
app.use("./auth",authRoutes);
app.use("./users",userRoutes);
app.use("./posts",postRoutes);
 //MONGOOSE SETUP
 const PORT = process.env.PORT || 6001
 mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
 }).then(()=>{
    app.listen(PORT,()=> console.log(`SERVER PORT: ${PORT}`));
 }).catch((error)=>console.log(`${error} did not connect!`))

 //we will make a mongodb and create a structure



 //USER ROUTES
 //we need these routes as we need to grab the users information and then we can grab them via their ID
 //then another route to add or remove friend
