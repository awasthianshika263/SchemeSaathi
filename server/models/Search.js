import mongoose from 'mongoose';

const searchSchema = new mongoose.Schema({
  age: Number,
  income: Number,
  gender: String,
  category: String,
  state: String,
  occupation: String,
  schemesFound: Number,
  schemeNames: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Search', searchSchema);