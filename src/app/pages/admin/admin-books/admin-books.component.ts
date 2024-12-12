import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-books',
  standalone: true,
  templateUrl: './admin-books.component.html',
})
export class AdminBooksComponent {
  books = [
    {
      id: 1,
      title: 'Angular Development',
      author: 'John Doe',
      price: 49.99,
      stock: 10,
    },
    {
      id: 2,
      title: 'World History',
      author: 'Jane Smith',
      price: 39.99,
      stock: 15,
    },
  ];
}
