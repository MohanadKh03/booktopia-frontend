import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { DashboardService } from '../../../core/services/dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [RouterModule, CommonModule],
})
export class AdminDashboardComponent implements OnInit {
  totals: any;
  topSellingBooks: any = [];
  topCategories: any;
  totalCount: number = 0;
  totalPrice: number = 0;
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    // Fetch totals
    this.dashboardService.getTotals().subscribe((response: any) => {
      this.totals = response.data;
    });

    // Fetch top-selling books
    this.dashboardService.getTopSellingBooks().subscribe((response: any) => {
      this.topSellingBooks = response.data;
      this.calculateTotalPrice();
    });

    // Fetch top categories
    this.dashboardService.getTopCategories().subscribe((response: any) => {
      this.topCategories = response.data;
      this.totalCount = this.topCategories.reduce(
        (acc: any, item: any) => acc + item.count,
        0
      );
    });
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.topSellingBooks.reduce((acc: number, book: any) => {
      return acc + book.price * book.sold;
    }, 0);
  }
}
