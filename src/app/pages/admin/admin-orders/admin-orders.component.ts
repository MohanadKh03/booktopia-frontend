import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../core/services/order.service';
import { OrderStatus } from '../../../shared/const';
import { Order } from '../../../core/models/order.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-orders.component.html',
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((response: any) => {
      if (response.data) {
        this.orders = response.data;
      }
    });
  }

  updateOrderStatus(orderId: string, orderStatus: string) {
    // Implement the updateOrderStatus method
    this.orderService.updateOrderStatus(orderId, orderStatus).subscribe(
      (response: any) => {
        alert('Order status updated successfully');
      },
      (error: any) => {
        console.error('Failed to update order status:', error);
        alert('Failed to update order status');
      }
    );
  }
}
