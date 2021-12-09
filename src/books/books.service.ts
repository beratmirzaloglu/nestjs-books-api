import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './book.model';

@Injectable()
export class BooksService {
  private books: Book[] = []; // ref type

  insertBook(
    name: string,
    author: string,
    category: string,
    numberOfPages: number,
  ): string {
    const id = new Date().getTime().toString();
    const newBook = new Book(id, name, author, category, numberOfPages);
    this.books.push(newBook);
    return id;
  }

  fetchAllBooks() {
    return [...this.books];
  }

  getSingleBook(id: string): Book {
    const [, book] = this.findBook(id);
    if (!book) {
      throw new NotFoundException(`Book ${id} not found`);
    }
    return { ...book };
  }

  findBook(id: string): [number, Book] {
    const bookIndex = this.books.findIndex((p) => p.id === id);
    const book = this.books[bookIndex];
    return [bookIndex, book];
  }

  updateSingleBook(
    id: string,
    name: string,
    author: string,
    category: string,
    numberOfPages: number,
  ) {
    const [index, book] = this.findBook(id);

    if (!book) {
      throw new NotFoundException(`Book ${id} not found`);
    }

    const updatedBook = { ...book };

    if (name) {
      updatedBook.name = name;
    }

    if (author) {
      updatedBook.author = author;
    }

    if (category) {
      updatedBook.category = category;
    }

    if (numberOfPages) {
      updatedBook.numberOfPages = numberOfPages;
    }

    this.books[index] = updatedBook;
  }

  removeBook(id: string) {
    const [index, book] = this.findBook(id);

    if (!book) {
      throw new NotFoundException(`Book ${id} not found`);
    }

    this.books.splice(index, 1);
  }
}
