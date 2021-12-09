import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  numberOfPages: { type: Number, required: true },
});

export class Book {
  constructor(
    public id: string,
    public name: string,
    public author: string,
    public category: string,
    public numberOfPages: number,
  ) {}
}
