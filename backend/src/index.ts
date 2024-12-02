import express, { json } from 'express';
import jwt from  'jsonwebtoken';
import dotenv from 'dotenv';
import { getDBConnection } from './db';
dotenv.config();
const port = process.env.PORT;


// creating instance of the express app
const app = express();

app.use(json());

// routes for authentication(login/signup)

app.post('/api/v1/signup',(req,res)=>{
    console.log(req.body);
    res.send("Hi there it's a successful req-res cycle..");
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
app.get('/api/v1/share',(req,res)=>{

})





app.listen(port,()=>{
    getDBConnection();
    console.log(`Application is running on port ${port}!`);
})