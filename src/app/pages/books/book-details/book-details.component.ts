import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { BookService } from '../../../core/services/book.service';
import { CartService } from '../../../core/services/cart.service';
import { filter, Observable } from 'rxjs';
import { Book } from '../../../core/models/book.interface';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './book-details.component.html',
})
export class BookDetailsComponent {
  book$: Observable<Book>;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private cartService: CartService
  ) {
    this.book$ = this.bookService
      .getBookById(String(this.route.snapshot.paramMap.get('id')))
      .pipe(filter((book): book is Book => book !== undefined));
  }

  addToCart(book: any): void {
    this.cartService.addToCart({
      id: book.id,
      title: book.title,
      price: book.price,
      quantity: 1,
    });
  }
}
