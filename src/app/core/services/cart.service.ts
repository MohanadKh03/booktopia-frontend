import { Injectable } from '@angular/core';
import { UpdateCartItem } from '../models/cart-item.interface';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../shared/const';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {}

  getCart(id: string) {
    const url = `${baseUrl}/cart/${id}`;
    return this.httpClient.get<any>(url);
  }

  updateCart(cartItem: UpdateCartItem) {
    const url = `${baseUrl}/cart/update/${cartItem.userId}/${cartItem.bookId}`;
    return this.httpClient.put<any>(url, { quantity: cartItem.quantity });
  }

  removeFromCart(userId: string, bookId: string) {
    const url = `${baseUrl}/cart/remove/${userId}/${bookId}`;
    return this.httpClient.put<any>(url, {});
  }

  checkout(userId: string) {
    const url = `${baseUrl}/cart/checkout/${userId}`;
    return this.httpClient.put<any>(url, {});
  }
}
