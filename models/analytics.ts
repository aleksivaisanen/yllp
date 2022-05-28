import mongoose from "mongoose";

export interface IAnalytics {
  slug: string;
  visitDate: Date;
  type: string;
}

const schema = new mongoose.Schema<IAnalytics>(
  {
    slug: {
      type: String,
      required: true,
    },
    visitDate: Date,
    type: String,
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
      },
    },
  }
);

schema.pre("validate", function (next) {
  // Mark the visit date timestamp
  this.visitDate = new Date();
  next();
});

export default mongoose?.models?.analytics ||
  mongoose.model("analytics", schema);
