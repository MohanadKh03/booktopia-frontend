import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../models/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[] = [
    {
      id: 1,
      title: 'Angular Development',
      author: 'John Doe',
      price: 49.99,
      coverImage: 'https://via.placeholder.com/150',
      category: 'IT',
      description: 'Learn Angular development from scratch',
      stock: 10
    },
    {
      id: 2,
      title: 'World History',
      author: 'Jane Smith',
      price: 39.99,
      coverImage: 'https://via.placeholder.com/150',
      category: 'History',
      description: 'A comprehensive guide to world history',
      stock: 15
    }
  ];

  getBooks(): Observable<Book[]> {
    return of(this.books);
  }

  getBookById(id: number): Observable<Book | undefined> {
    return of(this.books.find(book => book.id === id));
  }
}