import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-filter.component.html',
})
export class SearchFilterComponent {
  searchTerm = '';
  selectedCategory = '';

  @Output() onSearch = new EventEmitter<string>();
  @Output() onCategoryChange = new EventEmitter<string>();
}
