import mongoose from 'mongoose';

const ebookSchema = new mongoose.Schema({
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
  image_link: {
    type: String,
    required: true,
  },
  amazon_link: {
    type: String,
    required: false,
  },
}, { timestamps: true });

export default mongoose.model('EBook', ebookSchema);

