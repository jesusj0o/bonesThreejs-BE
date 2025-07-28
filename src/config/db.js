const mongoose = require('mongoose'); 

const connectDB = async () => {
    try { 
        await mongoose.connect(process.env.MONGO_URI);
        console.log("🟢 Database conected Sucessfully ")
    } catch (err) { 
        console.log('Mongo conection server error: ', err.message);
        process.exit(1);
    }
}


module.exports = connectDB; 


