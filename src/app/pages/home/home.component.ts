import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BookCardComponent } from './components/book-card/book-card.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { BookService } from '../../core/services/book.service';
import { CartService } from '../../core/services/cart.service';
import { Book } from '../../core/models/book.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, BookCardComponent, SearchFilterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books$;
  categories = [
    { id: 1, name: 'Fiction', icon: 'fas fa-book', bookCount: 150 },
    { id: 2, name: 'Technology', icon: 'fas fa-laptop-code', bookCount: 85 },
    { id: 3, name: 'Business', icon: 'fas fa-chart-line', bookCount: 120 },
    { id: 4, name: 'Arts', icon: 'fas fa-palette', bookCount: 95 }
  ];

  constructor(
    private bookService: BookService,
    private cartService: CartService
  ) {
    this.books$ = this.bookService.getBooks();
  }

  ngOnInit(): void {}

  handleSearch(term: string): void {
    // Implement search logic
  }

  handleCategoryChange(category: string): void {
    // Implement category filter logic
  }

  addToCart(book: Book): void {
    this.cartService.addToCart({
      id: book.id,
      title: book.title,
      price: book.price,
      quantity: 1
    });
  }
}