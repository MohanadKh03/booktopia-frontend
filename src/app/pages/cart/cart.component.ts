import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Book } from '../../core/models/book.interface';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.interface';
interface CartItem {
  Book: Book;
  quantity: number;
}
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  total: number = 0;
  user: User | undefined;
  constructor(private cartService: CartService, private auth: AuthService) {}

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
        (response: any) => {
        },
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
  
    this.cartService
      .removeFromCart(this.user.id, book._id)
      .subscribe(
        (response: any) => {
          if (response.data) {
            // Remove the item from the local items array
            this.items = this.items.filter(item => item.Book._id !== book._id);
            
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
  
}
