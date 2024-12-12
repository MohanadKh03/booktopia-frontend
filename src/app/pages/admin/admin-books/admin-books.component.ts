import { Component } from '@angular/core';
import { Book } from '../../../core/models/book.interface';

@Component({
  selector: 'app-admin-books',
  standalone: true,
  templateUrl: './admin-books.component.html',
})
export class AdminBooksComponent {
  books: Book[] = [
    {
      id: "1",
      title: 'Angular Development',
      author: 'John Doe',
      price: 49.99,
      categoryName: 'IT',
      stock: 10,
    },
    {
      id: "2",
      title: 'World History',
      author: 'Jane Smith',
      categoryName: 'History',
      price: 39.99,
      stock: 15,
    },
  ];
}
