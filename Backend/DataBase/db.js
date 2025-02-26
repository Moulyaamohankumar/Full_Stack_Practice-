const mongoose = require('mongoose')
const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log('DataBase is connected');
    }catch(err){
    console.log('Database is not connected');
    }
}
module.exports = connectDB;