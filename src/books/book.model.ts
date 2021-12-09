import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  numberOfPages: { type: Number, required: true },
});

export interface Book extends mongoose.Document {
  id: string;
  name: string;
  author: string;
  category: string;
  numberOfPages: number;
}
