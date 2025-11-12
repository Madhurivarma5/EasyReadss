import mongoose from 'mongoose';

const audiobookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  narrator: {
    type: String,
    required: false,
  },
  image_link: {
    type: String,
    required: true,
  },
  amazon_link: {
    type: String,
    required: false,
  },
}, { timestamps: true });

export default mongoose.model('Audiobook', audiobookSchema);

