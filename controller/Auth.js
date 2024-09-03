
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Profile = require("../models/additionalDetails");

exports.signUp = async (req,res) => {
    try {
        const {firstName,lastName, email, password, confirmPassword, role} = req.body;
        if(!firstName || !lastName || !email || !password || !confirmPassword || !role) {
            return res.status(400).json({
                success: false,
                message : "All field are required"
            })
        }

        if(password !== confirmPassword){
            return res.status(500).json({
                success : false,
                message :"Confirm password is not same as password"
            })
        }

        const existingUser = await User.findOne({email});

        if(existingUser)
        {
            return res.status(500).json({
                success:false,
                message : "Already registered, Try to Login"
            })
        }

        const hashPassword = await bcrypt.hash(password,10);

        const profileData = new Profile({
            gender : null,
            city : null,
            dob : null,
            state: null,
            country : null
        })

        await profileData.save();

        const newUser = new User({
            firstName,
            lastName,
            email,
            role,
            password : hashPassword
        })

        await newUser.save();

        return res.status(200).json({
            succes: true,
            message : "Registered Successfully",
            user : newUser
        })
        
    } catch (error) {
        return res.status(400).json({
            message : false,
            message : "Error : Sign Up failed",
            error :error.message
        })
    }
}


exports.login = async (req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(500).json({
                success:false,
                message : "All field are required"
            })
        }

        const existingUser = await User.findOne({email});
        if(!existingUser) {
            return res.status(400).json({
                success: false,
                message : "You haven't registered yet."
            })
        }

        await User.findByIdAndUpdate(existingUser._id, {
            lastLogin : Date.now()
        })

        if(bcrypt.compare(password, existingUser.password))
            {
                const payload = {
                    id : existingUser._id,
                    email : email,
                    role : existingUser.role
                }

                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn : "24h"
                } )

                existingUser.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            };

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                existingUser,
                message: 'logged in'
            });
            }

            else {
                return res.status(400).json({
                    success: false,
                    message : "password is incorrect"
                })
            }
    } catch (error) {
        console.log("Error in login", error);
        return res.status(400).json({
            success: false,
            message: "Login failure",
            error: error.message
        });
    }
}