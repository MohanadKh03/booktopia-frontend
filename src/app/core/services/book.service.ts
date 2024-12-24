import { Injectable, OnInit } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Book } from '../models/book.interface';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../shared/const';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private httpClient: HttpClient) {}

  getBooks() {
    return this.httpClient.get<any>(`${baseUrl}/book`);
  }

  getBook(id: string) {
    const url = `${baseUrl}/book/${id}`;
    return this.httpClient.get<any>(url);
  }

  subscribeToBookAlerts(email: string) {
    const url = `${baseUrl}/book/subscribe`;
    return this.httpClient.post<any>(url, { email: email });
  }

  unsubscribeToBookAlerts(email: string) {
    const url = `${baseUrl}/book/unsubscribe`;
    return this.httpClient.post<any>(url, { email: email });
  }

  addBook(book: Book) {
    return this.httpClient.post<any>(`${baseUrl}/book`, book);
  }

  addReview(userId: string, bookId: string, review: string) {
    const url = `${baseUrl}/order/review/${userId}/${bookId}`;
    return this.httpClient.post<any>(url, { review: review });
  }

  updateBook(book: Book) {
    const url = `${baseUrl}/book/${book._id}`;
    return this.httpClient.put<any>(url, book);
  }

  deleteBook(id: string) {
    const url = `${baseUrl}/book/${id}`;
    return this.httpClient.delete<any>(url);
  }
}
