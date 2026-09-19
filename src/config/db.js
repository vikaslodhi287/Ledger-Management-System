const mongoose = require("mongoose");


async function connectDB(){
        await mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Database is connected successfully");
        })
        .catch(err => {
            console.log("Error connecting to DB", err);
            process.exit(1);
        })
}

module.exports = connectDB;