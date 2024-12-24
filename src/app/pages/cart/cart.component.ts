import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Book } from '../../core/models/book.interface';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.interface';
import { Router, RouterModule } from '@angular/router';
import { toASCII } from 'punycode';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
interface CartItem {
  Book: Book;
  quantity: number;
}
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule, CommonModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  total: number = 0;
  user: User | undefined;
  copoun: string = "";
  coupons: { key: string; value: number }[] = [
    { key: 'MESSI', value: 1 },
    { key: 'MOHANAD', value: 0.7 },
    { key: 'MO\'MEN', value: 0.5 }
];

  constructor(
    private cartService: CartService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.getUser().subscribe((user) => {
      if (user) {
        this.user = user;
        this.cartService.getCart(user.id).subscribe((response: any) => {
          if (response.data) {
            this.total = response.data.totalPrice;
            this.items = response.data.items;
          }
        });
      }
    });
  }

  updateCart(book: Book, quantity: number): void {
    if (!this.user) {
      alert('Please login to update the cart');
      return;
    }

    this.cartService
      .updateCart({
        userId: this.user.id,
        bookId: book._id,
        quantity: quantity, // Use the updated quantity
      })
      .subscribe(
        (response: any) => {},
        (error) => {
          console.error('Failed to update cart:', error);
          alert('Failed to update cart');
        }
      );
  }

  onQuantityChange(item: CartItem, newQuantity: string): void {
    const quantity = Math.max(1, parseInt(newQuantity, 10));
    item.quantity = quantity;

    this.updateCart(item.Book, quantity);
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = this.items.reduce(
      (sum, item) => sum + item.Book.price * item.quantity,
      0
    );
  }

  removeItem(book: Book): void {
    if (!this.user) {
      alert('Please login to remove items from cart');
      return;
    }

    this.cartService.removeFromCart(this.user.id, book._id).subscribe(
      (response: any) => {
        if (response.data) {
          // Remove the item from the local items array
          this.items = this.items.filter((item) => item.Book._id !== book._id);

          // Recalculate total after removal
          this.calculateTotal();
        }
      },
      (error) => {
        console.error('Failed to remove item:', error);
        alert('Failed to remove item');
      }
    );
  }

  checkoutCart(): void {
    if (!this.user) {
      alert('Please login to checkout');
      return;
    }
    if (this.items.length === 0) {
      alert('Cart is empty');
      return;
    }
    if (confirm('Confirm your order ?')) {
      this.cartService.checkout(this.user.id,this.copoun).subscribe(
        (response: any) => {
          if (response.data) {
            this.items = [];
            this.total = 0;
          }
          this.router.navigate(['/orders']);
        },
        (error) => {
          console.error('Failed to checkout:', error);
          alert('Failed to checkout');
        }
      );
    }
  }

  applyCoupon(coupon: string): void {
    const foundCoupon = this.coupons.find(element => element.key === coupon);
  
    if (foundCoupon) {
      this.total = this.total - (this.total * (foundCoupon.value));
      alert(`Coupon applied! You saved ${foundCoupon.value*100}%`);
    } else {
      alert("No Coupons Found. Please try again.");
    }
  }
  
  
}
