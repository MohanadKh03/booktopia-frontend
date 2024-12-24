import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../shared/const';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getTotals(): Observable<any> {
    return this.http.get<any>(`${baseUrl}/dashboard/totals`);
  }

  getTopSellingBooks(): Observable<any> {
    return this.http.get<any>(`${baseUrl}/dashboard/top-selling-books`);
  }

  getTopCategories(): Observable<any> {
    return this.http.get<any>(`${baseUrl}/dashboard/top-categories`);
  }
}
