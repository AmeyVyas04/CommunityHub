import mongoose, { Schema, model, models } from 'mongoose';

const JoinRequestSchema = new Schema({
  communityName: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  eligibility: {
    type: String,
    enum: ['yes', 'no'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const JoinRequest = models.JoinRequest || model('JoinRequest', JoinRequestSchema);

export default JoinRequest;
