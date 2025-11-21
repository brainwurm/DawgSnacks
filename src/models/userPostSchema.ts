import mongoose from 'mongoose';

const userPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  numComments: {
    type: Number,
    default: 0,
  },
  instructions: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  servings: String,
  calories: Number,
  sugar: Number,
  cholesterol: Number,
  carbs: Number,
  fat: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.UserPost || mongoose.model('UserPost', userPostSchema);
