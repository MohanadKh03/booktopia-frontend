import { Injectable } from '@angular/core';
import { baseUrl, OrderStatus } from '../../shared/const';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  getOrders(): any {
    return this.httpClient.get(`${baseUrl}/order/customers`);
  }

  getOrder(id: string): any {
    return this.httpClient.get(`${baseUrl}/order/${id}`);
  }

  updateOrderStatus(orderId: string, orderStatus: string): any {
    return this.httpClient.put(`${baseUrl}/order/status/${orderId}`, {
      status: orderStatus,
    });
  }
}
