import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../models/book.interface';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private books: Book[] = [
    {
      _id: '1',
      title: 'Angular Development',
      author: 'John Doe',
      price: 49.99,
      coverImage: 'https://via.placeholder.com/150',
      category: {
        _id: '1',
        name: 'IT',
      },
      stock: 10,
    },
    {
      _id: '2',
      title: 'World History',
      author: 'Jane Smith',
      price: 39.99,
      coverImage: 'https://via.placeholder.com/150',
      category: {
        _id: '2',
        name: 'History',
      },
      stock: 15,
    },
  ];

  getBooks(): Observable<Book[]> {
    return of(this.books);
  }

  getBookById(id: string): Observable<Book | undefined> {
    return of(this.books.find((book) => book._id === id));
  }
}
