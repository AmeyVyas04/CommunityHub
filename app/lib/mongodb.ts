// app/lib/mongodb.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connectMongo = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!);
    console.log('MongoDB connected');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Stop the process if connection fails
  }
};

export default connectMongo;
