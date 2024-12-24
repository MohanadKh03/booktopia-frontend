import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from './components/book-card/book-card.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { BookService } from '../../core/services/book.service';
import { CartService } from '../../core/services/cart.service';
import { Book } from '../../core/models/book.interface';
import { NewsletterSectionComponent } from './components/newsletter-section/newsletter-section.component';
import { Category } from '../../core/models/category.interface';
import { CategoryService } from '../../core/services/category.service';
import { FormsModule } from '@angular/forms';
import {
  PriceHighToLowSortingStrategy,
  PriceLowToHighSortingStrategy,
  ReviewSortingStrategy,
  SortingStrategy,
} from './sort.strategy';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BookCardComponent,
    SearchFilterComponent,
    NewsletterSectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  books: Book[] = [];
  shownBooks: Book[] = [];
  categories: Category[] = [];

  constructor(
    private bookService: BookService,
    private categoryService: CategoryService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((response: any) => {
      if (response.data) this.books = response.data;
      this.shownBooks = [...this.books];
    });
    this.categoryService.getCategories().subscribe((response: any) => {
      if (response.data) this.categories = response.data;
    });
  }

  handleSearch(term: string): void {
    this.shownBooks = this.books.filter(
      (book: Book) =>
        book.title.toLowerCase().includes(term.toLowerCase()) ||
        book.author.toLowerCase().includes(term.toLowerCase())
    );
  }

  handleCategoryChange(category: string): void {
    if (category === undefined || category === '') {
      this.shownBooks = [...this.books];
      return;
    }

    this.shownBooks = this.books.filter(
      (book: Book) => book.category._id === category
    );
  }

  handleReviewSort(): void {
    this.shownBooks = new ReviewSortingStrategy().sort([...this.shownBooks]);
  }

  sortBooks(option: string): void {
    let sortingStrategy: SortingStrategy;
    switch (option) {
      case 'priceLowToHigh':
        sortingStrategy = new PriceLowToHighSortingStrategy();
        break;
      case 'priceHighToLow':
        sortingStrategy = new PriceHighToLowSortingStrategy();
        break;
      case 'reviews':
        sortingStrategy = new ReviewSortingStrategy();
        break;
      default:
        return;
    }
    this.shownBooks = sortingStrategy.sort([...this.shownBooks]);
  }

  addToCart(book: Book): void {
    let userId = (localStorage.getItem('user') as any).id;

    this.cartService.updateCart({
      userId: userId,
      bookId: book._id,
      quantity: 1,
    });
  }
}
