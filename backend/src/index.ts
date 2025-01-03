import express, { json } from 'express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { ContentModel, getDBConnection, LinkModel, TagModel, UserModel } from './db';
import { z } from 'zod';
import { authMiddleware } from './middleware';
import { random } from '../util/random';
dotenv.config();
const port = process.env.PORT;
// get the secret key
const secretKey = process.env.SECRET_KEY;
if (!secretKey) {
    throw new Error("SECRET_KEY is not available!");
}

interface AppError extends Error {
    status?: number;
    isOperational?: boolean;
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

// Route for added content
app.post('/api/v1/content', authMiddleware, async (req: Request, res: Response) => {
    const { title, link, type, tags, userId } = req.body;
    console.log(title)
    try {
        await ContentModel.create({ title, link, type, userId });
        res.json({
            message: "Content added successfully!"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server error"
        })
        console.error(error);
    }

})

// Route for fetching content
app.get('/api/v1/content', authMiddleware, async (req, res) => {
    const { userId } = req.body;
    try {
        const content = await ContentModel.find({ userId })
            .populate('userId', 'name email')
        res.json({
            content
        })
    } catch (error) {
        res.json({
            error
        })
    }
})
// Route to delete content
app.delete('/api/v1/content/:id', async (req, res) => {
    try {
        const contentId = req.params.id;
        const deletedContent = await ContentModel.findByIdAndDelete(contentId);
        if (!deletedContent) {
            const error: AppError = new Error("No such content available!");
            error.status = 404;
            throw error;
        }

        res.status(200).json({ message: "Content deleted successfully!" });
    } catch (error) {
        const err = error as AppError; // Type assertion
        res.status(err.status || 500).json({ error: err.message || "An unexpected error occurred." });
    }
});

// Route to create sharable link
app.post('/api/v1/brain/share',authMiddleware, async (req: Request, res: Response) => {
    const { share, userId } = req.body;

    // Validate input
    if (!userId) {
        res.status(400).json({
            message: "User ID is required.",
        });
        return;
    }

    try {
        if (share) {
            // Check if a link already exists for the user
            let link = await LinkModel.findOne({ userId });

            if (link) {
                // If a link already exists, return it
                res.json({
                    message: "Link already exists.",
                    hash: link.hash,
                });
                return;
            }

            // If no link exists, create a new one
            const hash = random(15); // Generate a random 15-character string
            link = await LinkModel.create({ hash, userId });

            res.json({
                message: "New link generated successfully.",
                hash: link.hash,
            });
        } else {
            // If share is false, delete the link
            const deletedLink = await LinkModel.findOneAndDelete({ userId });

            if (deletedLink) {
                 res.json({
                    message: "Link deleted successfully.",
                });
                return;
            }

            res.status(404).json({
                message: "No link found to delete.",
            });
        }
    } catch (error) {
        console.error("Error while processing link:", error);
        res.status(500).json({
            message: "An error occurred while processing your request.",
        });
    }
});

app.get('/api/v1/brain/:shareLink', async (req: Request, res: Response) => {
    const {shareLink} = req.params;
    // console.log(shareLink);
    try {
        const link = await LinkModel.findOne({hash:shareLink});
        // console.log(link);
        if(!link){
            res.json({
                message:"Not valid link!"
            })
            return;
        }
        const content = await ContentModel.find({
            userId:link.userId
        }).populate('userId','name');
        res.json({
            message:"",
            content
        })
    } catch (error) {
        console.error("Error while processing link:", error);
        res.status(500).json({
            message: "An error occurred while processing your request.",
        });
    }
})





app.listen(port, () => {
    getDBConnection();
    console.log(`Application is running on port ${port}!`);
})