import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  communityName: string;
  fullName: string;
  comment: string;
  createdAt: Date;
}

const CommentSchema = new Schema<IComment>({
  communityName: { type: String, required: true },
  fullName: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema);
