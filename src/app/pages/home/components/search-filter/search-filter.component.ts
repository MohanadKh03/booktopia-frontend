import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../../core/models/category.interface';
import { CategoryService } from '../../../../core/services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-filter.component.html',
})
export class SearchFilterComponent implements OnInit {
  searchTerm = '';
  searchType = '';
  selectedCategoryId: string = '';
  categories: Category[] = [];

  @Output() onSearch = new EventEmitter<string>();
  @Output() onCategoryChange = new EventEmitter<string>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.onCategoryChange.emit('');
    this.categoryService.getCategories().subscribe((response: any) => {
      if (response.data) {
        this.categories = response.data;
      }
    });
  }
  onSearchButton(): void {
    this.onSearch.emit(this.searchTerm);
  }
}
