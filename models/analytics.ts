import mongoose from "mongoose";

const schema = new mongoose.Schema({ 
  slug: String, 
  visitDate: Date,
  type: String, 
});

const Analytics = mongoose.model('analytics', schema);

export default Analytics;
