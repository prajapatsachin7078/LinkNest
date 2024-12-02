import express, { json } from 'express';
import jwt from  'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { getDBConnection, UserModel } from './db';
import {z} from 'zod';
dotenv.config();
const port = process.env.PORT;
// zod validation schema to validate signup credentials
const userSignUpSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
            message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        }),
});

// creating instance of the express app
const app = express();

app.use(json());

// routes for authentication(login/signup)

app.post('/api/v1/signup',async(req,res)=>{
    
    const {name,email,password} = (req.body);
    console.log(name," ",email," ", password);
    try {
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await UserModel.create({
            name,email,password:hashedPassword
        })
        console.log(user);
        res.send("Hi there it's a successful req-res cycle..");
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Couldn't signup! Try Again! Internal Server error!"
        })
    }
   
})
app.post('/api/v1/login',(req,res)=>{
    res.json({
        msg:"Hi there.."
    })
    
})
app.post('/api/v1/content',(req,res)=>{
    
})

app.get('/api/v1/content',(req,res)=>{
    
})
app.delete('/api/v1/content',(req,res)=>{

})
app.get('/api/v1/share',(req,res)=>{

})





app.listen(port,()=>{
    getDBConnection();
    console.log(`Application is running on port ${port}!`);
})