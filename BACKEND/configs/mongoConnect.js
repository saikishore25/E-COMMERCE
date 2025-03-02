import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

const mongoConnect = async () => {
  
    try {
        
        mongoose.connection.on('connected', () => {
            
            console.log('MongoDB connected successfully');
        });

        mongoose.connection.on('error', (error) => {
            
            console.error('MongoDB connection error:', error);
        });

        mongoose.connection.on('disconnected', () => {
            
            console.log('MongoDB connection disconnected');
        });
        
        await mongoose.connect(MONGO_URI)
        

    } 
    
    catch(error){

        console.error('MongoDB failed to connect:', error);
    }
};

export default mongoConnect;
