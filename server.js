import express from 'express';
import 'dotenv/config'
import router from './routes/data.js';
import connectDB from './connections/mongodb.js';
import {dirname,join} from 'path';
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static(join(__dirname,"Public")));
connectDB();
app.use("/",router);
app.use('/login',(req,res)=>{
    res.sendFile(join(__dirname,"Public","/login.html"));
})
app.use('/register',(req,res)=>{
    res.sendFile(join(__dirname,"Public","/register.html"));
})


app.listen(port,()=>{
    console.log(`Server is running ${port}`);
})




