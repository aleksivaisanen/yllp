import mongoose from "mongoose";

interface IAnalytics {
  slug: string;
  visitDate: Date;
  type: string;
}

const schema = new mongoose.Schema<IAnalytics>({ 
  slug: String, 
  visitDate: Date,
  type: String, 
}, { timestamps: true });

const Analytics = mongoose.model('analytics', schema);

export default Analytics;
