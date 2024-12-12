import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../../core/models/category.interface';
import { baseUrl } from '../../../shared/const';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class AdminCategoriesComponent implements OnInit {
  categories: Category[] = [];
  editingCategory: Category = { _id: '', name: '' }; // Tracks category being edited
  newCategoryName = ''; // Model for new category form
  isEditing = false; // Tracks if an edit form is open

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // Load all categories
  loadCategories(): void {
    this.http
      .get<Category[]>(`${baseUrl}/book/category`)
      .subscribe((response: any) => {
        if (response.data) this.categories = response.data;
      });
  }

  // Add a new category
  addCategory(): void {
    if (this.newCategoryName.trim()) {
      const newCategory = { name: this.newCategoryName };
      this.http
        .post<{ id: string }>(`${baseUrl}/book/category`, newCategory)
        .subscribe(() => {
          this.loadCategories(); // Refresh categories after adding
          this.newCategoryName = ''; // Clear form
        });
    }
  }

  // Edit a category
  startEditing(category: Category): void {
    this.editingCategory = { ...category }; // Create a copy for editing
    this.isEditing = true;
  }

  saveEdit(): void {
    if (this.editingCategory) {
      this.http
        .put<void>(`${baseUrl}/book/category/${this.editingCategory._id}`, {
          name: this.editingCategory.name,
        })
        .subscribe(() => {
          this.loadCategories(); // Refresh categories after editing
          this.cancelEdit();
        });
    }
  }

  cancelEdit(): void {
    this.editingCategory = { _id: '', name: '' };
    this.isEditing = false;
  }

  // Delete a category
  deleteCategory(id: string): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.http.delete<void>(`${baseUrl}/book/category/${id}`).subscribe(() => {
        this.loadCategories(); // Refresh categories after deletion
      });
    }
  }
}
