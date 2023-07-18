import mongoose from "mongoose";

mongoose.set('strictQuery', false);  

const connectionToDB = async () => {
    try {
        const { connection } = await mongoose.connect("mongodb+srv://satyam:9696121204@cluster0.retzwz1.mongodb.net/login_app");
    
        if (connection) {
            console.log(`Connected to MongoDB:${connection.host}`);
        }     
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connectionToDB;