import mongoose from "mongoose";

const schema = new mongoose.Schema({ 
  originalUrl: String, 
  created: Date, 
  slug: {
    type: String,
    unique: true  
  }
});

export const Url = mongoose.model('urls', schema);
