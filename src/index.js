const dotenv = require('dotenv');
const express = require("express"); 
const cors = require('cors');
const connectDB = require('./config/db');


dotenv.config();
const app = express(); 
const port = process.env.PORT  || 3001;

//Db connection
connectDB();

app.use(cors());
app.use(express.json()); 

app.listen(port, () => {
    console.log(`Server Running http://localhost:${port}`);
})