import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.css']
})
export class HeroBannerComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() primaryButtonText = '';
  @Input() secondaryButtonText = '';
  @Input() imageUrl = '';
}