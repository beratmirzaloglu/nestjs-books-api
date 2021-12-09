import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './book.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}

  async insertBook(
    name: string,
    author: string,
    category: string,
    numberOfPages: number,
  ): Promise<string> {
    const id = new Date().getTime().toString();

    const newBook = new this.bookModel({
      name: name,
      author: author,
      category: category,
      numberOfPages: numberOfPages,
    });
    const doc = await newBook.save();
    return doc.id;
  }

  async fetchAllBooks() {
    const books = await this.bookModel.find().exec();
    const response = books.map((book) => ({
      id: book.id,
      name: book.name,
      author: book.author,
      category: book.category,
      numberOfPages: book.numberOfPages,
    }));
    return response;
  }

  async getSingleBook(id: string) {
    const book = await this.findBook(id);
    return {
      id: book.id,
      author: book.author,
      name: book.name,
      category: book.category,
      numberOfPages: book.numberOfPages,
    };
  }

  async updateSingleBook(
    id: string,
    name: string,
    author: string,
    category: string,
    numberOfPages: number,
  ) {
    const book = await this.findBook(id);

    if (name) {
      book.name = name;
    }

    if (author) {
      book.author = author;
    }

    if (category) {
      book.category = category;
    }

    if (numberOfPages) {
      book.numberOfPages = numberOfPages;
    }

    book.save();
  }

  async removeBook(id: string) {
    const result = await this.bookModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Book ${id} not found`);
    }
  }

  private async findBook(id: string): Promise<Book> {
    let book;

    try {
      book = await this.bookModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(`Book ${id} not found`);
    }

    if (!book) {
      throw new NotFoundException(`Book ${id} not found`);
    }
    return book;
  }
}
