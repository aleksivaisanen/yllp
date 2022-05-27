import mongoose from "mongoose";

export interface IUrl {
  originalUrl: string;
  slug: string;
}

const schema = new mongoose.Schema<IUrl>(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

schema.pre("validate", function (next) {
  // Create a unique slug for shortened url
  this.slug = Math.random().toString(36).substring(2, 10);
  next();
});

const Url = mongoose.model("urls", schema);

export default Url;
