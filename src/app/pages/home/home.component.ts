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
})
export class HomeComponent implements OnInit {
  books$;

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
      quantity: 1,
    });
  }
}
