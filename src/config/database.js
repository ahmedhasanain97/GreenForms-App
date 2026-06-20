import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`, {
            dbName: DB_NAME 
        });
        console.log(`\n MongoDB connected !!!
            ${connectionInstance.connection.host}`);
        console.log(` Active Database: ${connectionInstance.connection.name}`);
        mongoose.connection.once('open', async () => {
                    // سيقوم بمسح أي Indexes قديمة مسببة للمشاكل وإعادة بنائها طبقاً للـ Schema الحالية
                    await mongoose.model('User').cleanIndexes(); 
                    console.log('Database Indexes synced successfully');
                });
    } catch (error) {
        console.log("MongoDB connection failed",error)
        process.exit(1)
    }
}
export default connectDB;