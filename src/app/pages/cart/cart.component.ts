import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Book } from '../../core/models/book.interface';
import { BookService } from '../../core/services/book.service';

interface CartItem {
  bookId: string;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems: CartItem[] = [];
  books: Book[] = [];

  constructor(
    private cartService: CartService,
    private bookService: BookService
  ) {}

  // calculateTotal(): number {
  //   return this.cartItems.reduce(
  //     (total, item) => total + item.price * item.quantity,
  //     0
  //   );
  // }

  // ngOnInit(): void {
  //   let user = JSON.parse(localStorage.getItem('user') as any);
  //   let userId = user ? user.id : null;

  //   this.cartService.getCart(userId).subscribe(
  //     (response: any) => {
  //       if (response.data) {
  //         this.cartItems = response.data;
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  //   this.bookService.getBooks().subscribe((response: any) => {
  //     if (response.data) {
  //       this.books = response.data;
  //     }
  //   });
  // }
}
