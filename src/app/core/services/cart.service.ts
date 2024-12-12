import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }

  addToCart(item: CartItem): void {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find((i) => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
      this.cartItems.next([...currentItems]);
    } else {
      this.cartItems.next([...currentItems, item]);
    }
  }

  removeFromCart(itemId: string): void {
    const currentItems = this.cartItems.value;
    this.cartItems.next(currentItems.filter((item) => item.id !== itemId));
  }

  updateQuantity(itemId: string, quantity: number): void {
    const currentItems = this.cartItems.value;
    const item = currentItems.find((i) => i.id === itemId);
    if (item) {
      item.quantity = quantity;
      this.cartItems.next([...currentItems]);
    }
  }
}
