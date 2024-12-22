import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BookService } from '../../../core/services/book.service';
import { CartService } from '../../../core/services/cart.service';
import { filter, Observable } from 'rxjs';
import { Book } from '../../../core/models/book.interface';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.interface';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [AsyncPipe, CommonModule, FormsModule, RouterModule],
  templateUrl: './book-details.component.html',
})
export class BookDetailsComponent implements OnInit {
  book?: Book;
  quantity: number = 0;
  user: User | undefined;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private cartService: CartService,
    private router: Router,
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    this.bookService
      .getBook(String(this.route.snapshot.paramMap.get('id')))
      .subscribe((response: any) => {
        if (response.data) {
          this.book = response.data;
        }
      });

    this.auth.getUser().subscribe((user) => {
      this.user = user ?? undefined;
    });
  }

  addToCart(book: any): void {
    if (!this.user) {
      alert('Please login to add to cart');
      return;
    }

    this.cartService
      .updateCart({
        userId: this.user.id,
        bookId: book._id,
        quantity: this.quantity,
      })
      .subscribe(
        (response: any) => {
          if (response.data) {
            alert('Added to cart');
          }
        },
        (error) => {
          console.error('Failed to add to cart:', error);
          alert('already in cart');
        }
      );
  }
}
