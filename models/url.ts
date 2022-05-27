import mongoose from "mongoose";

const schema = new mongoose.Schema({ 
  originalUrl: String, 
  created: Date, 
  slug: {
    type: String,
    unique: true  
  }
});

const Url = mongoose.model('urls', schema);

export default Url;