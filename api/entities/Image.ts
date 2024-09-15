import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
    trim: true
  },
  originalName: {
    type: String,
    required: true,
    trim: true
  },
  path: {
    type: String,
    required: true,
    trim: true
  },
  size: {
    type: Number,
    required: true
  },
  altText: {
    type: String,
    trim: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
});

imageSchema.index({ uploader: 1, uploadedAt: -1 });
imageSchema.index({ tags: 1 });

imageSchema.pre('save', function(next) {
  this.lastModified = new Date();
  next();
});

const Image = mongoose.model('Zdjęcia', imageSchema);

export default Image;
