// app/models/Community.ts
import mongoose, { Schema, Document } from 'mongoose';

interface ICommunity extends Document {
  fullName: string;
  email: string;
  phone: number;
  communityName: string;
  category: string;
  description: string;
  eligibility: string;
  rules: string;
  privacy: string;
  tags: string[];
  createdAt: Date;
}

const communitySchema = new Schema<ICommunity>({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, },
  communityName: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  eligibility: { type: String, required: true },
  rules: { type: String, required: true },
  privacy: { type: String, required: true },
  tags: { type: [String], },
  createdAt: { type: Date, default: Date.now },
});

const Community =
  mongoose.models.Community || mongoose.model<ICommunity>('Community', communitySchema);

export default Community;
