import { UserProfile } from '../types';

/**
 * 🍃 LIVE MONGODB API CLIENT
 * Connects directly to the backend Express server which models
 * the live MongoDB 'users' collection via Mongoose.
 */

export interface MongoUserSchema {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class MongoDBClient {
  /**
   * Proxies login requests to the backend Mongoose findOne() query
   */
  async findUserByEmailAndAuth(email: string, pass: string): Promise<MongoUserSchema> {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Authentication failed: Server error');
    }

    return {
      _id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      role: data.user.role,
      avatar: data.user.avatar
    };
  }

  /**
   * Proxies registration requests to the backend Mongoose insertOne()
   */
  async createUser(name: string, email: string, pass: string): Promise<MongoUserSchema> {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password: pass })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Registration failed: Server error');
    }

    return {
      _id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      role: data.user.role,
      avatar: data.user.avatar
    };
  }

  async updateAvatar(email: string, avatar: string): Promise<{ success: boolean; avatar: string }> {
    const response = await fetch(`${API_URL}/api/auth/avatar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, avatar })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to update avatar: Server error');
    }

    return data;
  }
}

export const mongoDB = new MongoDBClient();
export default mongoDB;
