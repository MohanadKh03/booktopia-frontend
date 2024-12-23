import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../../../core/models/book.interface';
import { Category } from '../../../core/models/category.interface';
import { baseUrl } from '../../../shared/const'; // Adjust path as necessary
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class AdminBooksComponent implements OnInit {
  toggleForm: boolean = false;
  books: Book[] = [];
  categories: Category[] = [];
  currentBook: Book = {
    _id: '',
    title: '',
    author: '',
    price: 0,
    category: {
      _id: '',
      name: '',
    },
    stock: 0,
  }; // Used for both adding and editing books
  isEditing = false; // Tracks if an edit form is open

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadBooks();
  }

  // Load all books
  loadBooks(): void {
    this.http.get<Book[]>(`${baseUrl}/book`).subscribe((response: any) => {
      if (response.data) this.books = response.data;
    });
  }

  // Load all categories
  loadCategories(): void {
    this.http
      .get<Category[]>(`${baseUrl}/book/category`)
      .subscribe((response: any) => {
        if (response.data) this.categories = response.data;
      });
  }

  // Add a new book
  addBook(): void {
    // Ensure title and author are not empty or just whitespace
    if (this.currentBook.title.trim() && this.currentBook.author.trim()) {
      // Prepare the request body with category ID only
      const bookToAdd = {
        title: this.currentBook.title,
        author: this.currentBook.author,
        price: this.currentBook.price,
        category: this.currentBook.category._id, // Send only the category ID
        stock: this.currentBook.stock,
      };

      // Make the POST request to add the book
      this.http
        .post<{ id: string }>(`${baseUrl}/book`, bookToAdd)
        .subscribe(() => {
          this.loadBooks(); // Refresh books after adding
          this.cancelEdit(); // Clear form after adding
        });
    }
  }

  // Edit a book
  startEditing(book: Book): void {
    this.currentBook = { ...book }; // Create a copy for editing
    this.isEditing = true;
    this.toggleForm = true;
  }

  // Save edited book
  saveEdit(): void {
    if (this.currentBook) {
      // Prepare the request body with category ID only
      const bookToUpdate = {
        title: this.currentBook.title,
        author: this.currentBook.author,
        price: this.currentBook.price,
        category: this.currentBook.category._id, // Send only the category ID
        stock: this.currentBook.stock,
      };

      this.http
        .put<void>(`${baseUrl}/book/${this.currentBook._id}`, bookToUpdate)
        .subscribe(() => {
          this.loadBooks(); // Refresh the books list after editing
          this.cancelEdit(); // Clear form after saving
        });
    }
  }

  // Cancel edit mode
  cancelEdit(): void {
    this.currentBook = {
      _id: '',
      title: '',
      author: '',
      price: 0,
      category: {
        _id: '',
        name: '',
      },
      stock: 0,
    };
    this.isEditing = false;
    this.toggleForm = false;
  }

  // Delete a book
  deleteBook(id: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.http.delete<void>(`${baseUrl}/book/${id}`).subscribe(() => {
        this.loadBooks(); // Refresh books after deletion
      });
    }
  }

  // Opens the modal to add a new book
  openAddBookModal(): void {
    this.cancelEdit(); // Reset form for adding a new book
    this.isEditing = false;
    this.toggleForm = true;
  }
}
