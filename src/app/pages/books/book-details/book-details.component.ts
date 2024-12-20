import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BookService } from '../../../core/services/book.service';
import { CartService } from '../../../core/services/cart.service';
import { filter, Observable } from 'rxjs';
import { Book } from '../../../core/models/book.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [AsyncPipe, CommonModule, FormsModule, RouterModule],
  templateUrl: './book-details.component.html',
})
export class BookDetailsComponent implements OnInit {
  book?: Book;
  quantity: number = 0;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private cartService: CartService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.bookService
      .getBook(String(this.route.snapshot.paramMap.get('id')))
      .subscribe((response: any) => {
        if (response.data) {
          this.book = response.data;
        }
      });
  }

  addToCart(book: any): void {
    let user = JSON.parse(localStorage.getItem('user') as any);
    let userId = user ? user.id : null;

    this.cartService.updateCart({
      userId: userId,
      bookId: book._id,
      quantity: this.quantity,
    });
    this.router.navigate(['/cart']);
  }
}
