import express, { json } from 'express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { getDBConnection, UserModel } from './db';
import { z } from 'zod';
import { authMiddleware } from './middleware';
dotenv.config();
const port = process.env.PORT;
// get the secret key
const secretKey = process.env.SECRET_KEY;
if (!secretKey) {
    throw new Error("SECRET_KEY is not available!");
}
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

app.post('/api/v1/signup', async (req, res) => {

    const { name, email, password } = (req.body);
    // console.log(name," ",email," ", password);
    try {
        // Hash the password before saving it to the DB
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({
            name, email, password: hashedPassword
        })
        // console.log(user);
        res.send("Hi there. You're successfully signed up.");
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Couldn't signup! Try Again! Internal Server error!"
        })
    }

})
app.post('/api/v1/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Check if user is registered or not
        const user = await UserModel.findOne({ email });
        if (!user) { // If user is not registered
            res.status(400).json({
                message: "User not registered!"
            });
            return;
        }


        // Generate token 
        const token = jwt.sign({ id: user._id }, secretKey);

        res.setHeader('Authorization', 'Bearer ' + token);

        res.status(200).json({
            message: "Login successful!",
            token
        });
    } catch (error: any) {
        res.status(500).json({
            message: "An error occurred",
            error: error.message
        });
        return;
    }
});

app.post('/api/v1/content',authMiddleware, (req:Request, res:Response) => {
    const {title,link,type,tag,userId} = req.body;
    console.log(userId)
    try {
        
    } catch (error) {
        
    }
    res.send("Added suc");
})

app.get('/api/v1/content', (req, res) => {

})
app.delete('/api/v1/content', (req, res) => {

})
app.get('/api/v1/share', (req, res) => {

})





app.listen(port, () => {
    getDBConnection();
    console.log(`Application is running on port ${port}!`);
})