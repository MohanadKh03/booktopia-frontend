import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { OrderService } from '../../../core/services/order.service';
import { CommonModule } from '@angular/common';
import { Order } from '../../../core/models/order.interface';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-history.component.html',
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  user: any;

  constructor(
    private userService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
    });
    this.orderService.getOrder(this.user.id).subscribe((response: any) => {
      if (response.data) {
        this.orders = response.data;
        console.log(response.data);
      }
    });
  }
}
