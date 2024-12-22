import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../core/services/cart.service'; // Import CartService
import { AuthService } from '../../../../core/services/auth.service'; // Import AuthService
import { Book } from '../../../../core/models/book.interface';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent {
  @Input({ required: true }) book!: Book;
  user: any;

  constructor(
    private cartService: CartService, // Inject CartService
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    // Get the user when the component is initialized
    this.authService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  addToCart(): void {
    if (!this.user) {
      alert('Please login to add to cart');
      return;
    }

    this.cartService
      .updateCart({
        userId: this.user.id,
        bookId: this.book._id,
        quantity: 1, // Add with quantity 1
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
