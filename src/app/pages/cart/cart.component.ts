import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  cartItems = [
    {
      id: 1,
      title: 'Angular Development',
      price: 49.99,
      quantity: 1,
    },
    {
      id: 2,
      title: 'World History',
      price: 39.99,
      quantity: 2,
    },
  ];

  calculateTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
