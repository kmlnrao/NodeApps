const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



// Desc : Register user
// route : POST api/users/register
// Access : Public

const registerUser = asyncHandler(async(req,res)=>{
    // res.json ({ "message" : "Register User" });

     const {username,email,password} = req.body;
    
        if (!username || !email || !password){
            res.status(400);
            throw new Error("All Fields are Mandatory...");
        }

        const userAvailable =await  User.findOne({email});

        if (userAvailable){
            res.status(400);
            throw new Error("User Already Registered!");
        }

        //Hash Password
        const hashPassword = await bcrypt.hash(password,10);
        console.log("Hash password" ,hashPassword);

        const user = await User.create({
            username,
            email,
            password : hashPassword
        });

        console.log(`User Created ${user}`);

        if (user){
            res.status(201).json( { _id: user.id, email: user.email} );
        }else{
            res.status(400);
            throw new Error("User Data is not Valid!");
        }

        res.status(200).json( {message : "User Register"});

});


// Desc : Login user
// route : POST api/users/login
// Access : Public

const loginUser = asyncHandler(async(req,res)=>{

    const {email,password}= req.body;

    if (!email || !password){

        res.status(400);
        throw new Error("All Fields are Mandatory.");
    }
    const user = await User.findOne({email});

    // compare password with hashed password.
    if (user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({

            user : {
                username:user.username,
                email: user.email,
                id : user.id,
            },
        },process.env.ACCESS_TOKEN_SECRET,
        { "expiresIn": "20m" }
        );      
        res.status(200).json({accessToken});

    }else{
        res.status(401)
        throw new Error("email or password is not valid")
    }
     
});


// Desc : Current user
// route : GET api/users/register
// Access : Private

const currentUser = asyncHandler(async(req,res)=>{
   // res.json( {"message": "Current User"});
   res.json(req.user);

});


// route : POST api/users/login

module.exports = {registerUser,loginUser,currentUser}