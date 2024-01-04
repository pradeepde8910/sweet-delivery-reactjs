// sweet.model.js
import { model, Schema } from 'mongoose';

const SweetSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    origins: { type: [String], required: true },
    stars: { type: Number, default: 3 },
    imageUrl: { type: String, required: true },
    favourite: { type: Boolean, default: false },
    tags: { type: [String] },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const SweetModel = model('sweet', SweetSchema);