import express from 'express';
import mongoose  from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv';
import  authuser from './Router/UserRouter.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json());


app.use('/api/1',authuser);


main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb+srv://vicky:test123@cluster0.epdrsry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
  console.log('mongoose connected')
}

app.listen(process.env.PORT,()=>{
    console.log(`server connected to ${process.env.PORT}`);
})