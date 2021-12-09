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
  async insertBook(
    @Body('name') name: string,
    @Body('author') author: string,
    @Body('category') category: string,
    @Body('numberOfPages') numberOfPages: number,
  ): Promise<{ id: string }> {
    const id = await this.booksService.insertBook(
      name,
      author,
      category,
      numberOfPages,
    );

    return { id: id };
  }

  @Get()
  async fetchAllBooks() {
    const books = await this.booksService.fetchAllBooks();
    return { books: books };
  }

  @Get(':id')
  getSingleBook(@Param('id') id: string) {
    return this.booksService.getSingleBook(id);
  }

  @Patch(':id')
  async updateBook(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('author') author: string,
    @Body('category') category: string,
    @Body('numberOfPages') numberOfPages: number,
  ) {
    await this.booksService.updateSingleBook(
      id,
      name,
      author,
      category,
      numberOfPages,
    );
    return null;
  }

  @Delete(':id')
  async removeBook(@Param('id') id: string) {
    await this.booksService.removeBook(id);

    return null;
  }
}
