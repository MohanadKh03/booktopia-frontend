import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-newsletter-section',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './newsletter-section.component.html',
  styleUrls: ['./newsletter-section.component.css']
})
export class NewsletterSectionComponent {
  newsletterForm: FormGroup;
  subscribed = false;

  constructor(private fb: FormBuilder) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.newsletterForm.valid) {
      // Implement subscription logic
      this.subscribed = true;
      setTimeout(() => this.subscribed = false, 3000);
    }
  }
}