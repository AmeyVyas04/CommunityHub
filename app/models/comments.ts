import mongoose, { Schema, Document } from 'mongoose';

interface IComments extends Document {
  fullName: string;
  comment: string;
  communityName: string;
  createdAt: Date;
}

const commentSchema = new Schema<IComments>({
  fullName: { type: String, required: true },
  comment: { type: String, required: true }, // ✅ removed unique: true
  communityName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.models.Comment || mongoose.model<IComments>('Comment', commentSchema);

export default Comment;
