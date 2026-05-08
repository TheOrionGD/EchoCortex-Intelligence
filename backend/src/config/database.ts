import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export let isMongoConnected = false;

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/echo_db';
    console.log('[DB] Attempting MongoDB handshake...');
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('[DB] MongoDB Connected Successfully');
    isMongoConnected = true;
  } catch (error) {
    console.warn('[DB] MongoDB Connection Error (IP whitelist or Offline). Falling back to in-memory system storage...');
    isMongoConnected = false;
  }
};
