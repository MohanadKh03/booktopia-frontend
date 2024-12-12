import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../models/book.interface';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private books: Book[] = [
    {
      id: '1',
      title: 'Angular Development',
      author: 'John Doe',
      price: 49.99,
      coverImage: 'https://via.placeholder.com/150',
      categoryName: 'IT',
      stock: 10,
    },
    {
      id: '2',
      title: 'World History',
      author: 'Jane Smith',
      price: 39.99,
      coverImage: 'https://via.placeholder.com/150',
      categoryName: 'History',
      stock: 15,
    },
  ];

  getBooks(): Observable<Book[]> {
    return of(this.books);
  }

  getBookById(id: string): Observable<Book | undefined> {
    return of(this.books.find((book) => book.id === id));
  }
}
