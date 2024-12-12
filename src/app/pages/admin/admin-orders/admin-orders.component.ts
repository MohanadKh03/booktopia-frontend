import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-orders.component.html',
})
export class AdminOrdersComponent {
  orders = [
    {
      id: 1,
      customer: 'John Doe',
      date: '2024-03-15',
      total: 89.98,
      status: 'pending',
    },
    {
      id: 2,
      customer: 'Jane Smith',
      date: '2024-03-14',
      total: 49.99,
      status: 'confirmed',
    },
  ];
}
