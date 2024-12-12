import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-card',
  standalone: true,
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent {
  @Input() icon = '';
  @Input() name = '';
  @Input() bookCount = 0;
}