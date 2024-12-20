import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.interface';
import { baseUrl } from '../../shared/const';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${baseUrl}/book/category`);
  }

  getCategory(id: string): Observable<Category> {
    const url = `${baseUrl}/book/category/${id}`;
    return this.http.get<Category>(url);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${baseUrl}/book/category`, category);
  }
  updateCategory(category: Category): Observable<Category> {
    const url = `${baseUrl}/book/category/${category._id}`;
    return this.http.put<Category>(url, category);
  }

  deleteCategory(id: string): Observable<void> {
    const url = `${baseUrl}/book/category/${id}`;
    return this.http.delete<void>(url);
  }
}
