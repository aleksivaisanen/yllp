import mongoose from "mongoose";

const schema = new mongoose.Schema({ 
  slug: String, 
  visitDate: Date,
  type: String, 
});

export const Analytics = mongoose.model('analytics', schema);
