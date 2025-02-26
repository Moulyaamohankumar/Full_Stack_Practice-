const express = require('express');
const app = express();
require('dotenv').config({ path: './Configure/.env' });

const connectDB = require('./DataBase/db');
const Port = process.env.PORT || 3000; 

app.use(express.json()); 

app.listen(Port, async () => { 
    try {
        await connectDB(process.env.DB_URL);
        console.log(`Server is running on port ${Port}`);
    } catch (err) {
        console.error("Server is not running due to a DB connection error:", err);
    }
});
