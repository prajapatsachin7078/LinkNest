import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const contentTypes = ['image', 'video', 'article', 'audio']; // Extend as needed
const DB_URI = process.env.MONGO_URI;

if (!DB_URI) {
    throw new Error("MONGO_URI is not defined in the environment variables");
}
export const getDBConnection = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error while connecting with DB:", error);
    }
};

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
}, { timestamps: true })

const contentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    type: { type: String, enum: contentTypes, required: true },
    tags: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Tag'
        }
    ],
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

const tagSchema = new mongoose.Schema({
    title: {
        type: String, required: true, unique: true
    }
}, { timestamps: true })

const linkSchema = new mongoose.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const LinkModel = mongoose.model("Link", linkSchema);

export const TagModel = mongoose.model("Tag", tagSchema);

export const ContentModel = mongoose.model("Content", contentSchema);

export const UserModel = mongoose.model("User", userSchema);