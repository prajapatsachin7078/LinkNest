import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
// get the secret key
const secretKey = process.env.SECRET_KEY;
if (!secretKey) {
    throw new Error("SECRET_KEY is not available!");
}

// Giving custom payload to jwt
interface CustomJWTPayload {
    id: string
}
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const authorization = req.headers.authorization;
    // console.log(authorization);
    try {
        if (!authorization) {
            throw new Error("Not logged in! Log in first");
        }
        const isAuthenticated = jwt.verify(authorization, secretKey) as CustomJWTPayload;
        if (!isAuthenticated) {
            res.status(401).json({
                message: "You're not authenticated! Log in first."
            })
            return;
        }
        req.body.userId = isAuthenticated.id;
        next();
    } catch (error) {
        res.json({
            error
        });
    }
}