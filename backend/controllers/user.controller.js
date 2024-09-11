import { UserModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const {fullname, email, phoneNum, password, role} = req.body;
        if(!fullname || !email || !phoneNum || !password || !role){
            return res.status(400).json({
                message: "Something is missing, check again!",
                success: false
            });
        };

        let user = await UserModel.findOne({email});
        if(user){
            return res.status(400).json({
                message: "Already user exists with this email",
                success: false
            });  
        }

        const hashedPass = await bcrypt.hash(password, 10);
        await UserModel.create ({
            fullname,
            email,
            phoneNum,
            password: hashedPass,
            role
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });

    } catch (error) {
        console.log(error);    
    }
}

export const login = async (req, res) => {
    try {
        const {email, password, role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message: "Something is missing, check again!",
                success: false
            });
        };

        let user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        //check role
        if(role != user.role){
            return res.status(400).json({
                message: "Account does not exist with current role.",
                success: false
            });
        }

        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_K, {expiresIn: '1d'});

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNum: user.phoneNum,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpOnly: true, sameSite: 'strict'}).json({
            message: `welcome back ${user.fullname}`,
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message: 'Logged out successfully',
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const update = async (req, res) => {
    try {
        const {fullname, email, phoneNum, bio, skills} = req.body;
        const file = req.file;

        let skillsArray;
        if(skills){
           skillsArray = skills.split(",");
        }
        const userId = req.id; //middlewire authentication

        let user = await UserModel.findById(userId);
        if(!user){
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }

        
        // updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNum) user.phoneNum = phoneNum
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNum: user.phoneNum,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully ",
            user,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}