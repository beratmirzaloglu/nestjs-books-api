import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Book } from './book.model';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  insertBook(
    @Body('name') name: string,
    @Body('author') author: string,
    @Body('category') category: string,
    @Body('numberOfPages') numberOfPages: number,
  ): { id: string } {
    const id = this.booksService.insertBook(
      name,
      author,
      category,
      numberOfPages,
    );

    return { id: id };
  }

  @Get()
  fetchAllBooks(): { books: Book[] } {
    const books = this.booksService.fetchAllBooks();
    return { books: books };
  }

  @Get(':id')
  getSingleBook(@Param('id') id: string) {
    return this.booksService.getSingleBook(id);
  }

  @Patch(':id')
  updateBook(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('author') author: string,
    @Body('category') category: string,
    @Body('numberOfPages') numberOfPages: number,
  ) {
    this.booksService.updateSingleBook(
      id,
      name,
      author,
      category,
      numberOfPages,
    );
    return null;
  }

  @Delete(':id')
  removeBook(@Param('id') id: string) {
    this.booksService.removeBook(id);
    return null;
  }
}
