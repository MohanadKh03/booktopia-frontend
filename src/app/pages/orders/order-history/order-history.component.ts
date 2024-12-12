import { Component } from '@angular/core';

@Component({
  selector: 'app-order-history',
  standalone: true,
  templateUrl: './order-history.component.html',
})
export class OrderHistoryComponent {
  orders = [
    {
      id: 1,
      date: '2024-03-15',
      total: 89.98,
      status: 'Delivered',
      statusColor: 'success',
    },
    {
      id: 2,
      date: '2024-03-14',
      total: 49.99,
      status: 'Processing',
      statusColor: 'warning',
    },
  ];
}
