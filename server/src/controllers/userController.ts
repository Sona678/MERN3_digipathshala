import { Request, Response } from "express";
import User from "../database/models/userModel";
import bcrypt from 'bcrypt'


class UserController{
    static async register(req:Request,res:Response){
        //incoming user data receive (user ko data linu)
        const {username,email,password} = req.body
        if(!username || !email || !password){
            res.status(400).json({
                message : "Please provide username,email,password"
            })
            return
        }
        // data --> users table ma insert garne 
        await User.create({ 
            username, 
            email, 
            password : bcrypt.hashSync(password,10), 
        })

        // await sequelize.query(`INSERT INTO users(id,username,email,password) VALUES (?,?,?,?)`, {
        //     replacements : ['b5a3f20d-6202-4159-abd9-0c33c6f70487', username,email,password], 
        // })

        res.status(201).json({
            message : "User registered successfully"
        })
    }
    static async login(req:Request, res:Response){
        const {email, password}=req.body
        if(!email||!password){
            res.status(400).json({
                message:"please provide email and password."
            })
            return
        }

        const [user]=await User.findAll({
            where:{
                email:email
            }
        })

        if(!user){
            res.status(404).json({
                message:"No user with that email exist."
            })
        }else{
            const isEqual=bcrypt.compareSync(password,user.password)
            if(!isEqual){
                res.status(400).json({
                    message:"Invalid password!!"
                })
            }else{
                res.status(200).json({
                    message:"login successful"
                })
            }
        }
    }
}


export default UserController