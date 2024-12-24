import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BookService } from '../../../../core/services/book.service';
import { response } from 'express';
import { error } from 'console';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-newsletter-section',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './newsletter-section.component.html',
  styleUrls: ['./newsletter-section.component.css'],
})
export class NewsletterSectionComponent implements OnInit {
  user: any;
  email: string = 'abc@mail.com';

  constructor(
    private bookService: BookService,
    private userService: AuthService
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      if (user) {
        console.log('HERE: ', user);
        this.user = user;
      }
    });
  }

  toggleSubscription() {
    if (this.user && this.user.isSubscribed) {
      this.unsubscribe();
    } else if (this.user && !this.user.isSubscribed) {
      this.subscribe();
    } else {
      alert('Please login to subscribe');
    }
  }

  subscribe() {
    if (this.user) {
      this.bookService.subscribeToBookAlerts(this.user?.email).subscribe(
        (response: any) => {
          const updatedUser = {
            ...this.user,
            isSubscribed: true,
          };
          this.userService.setUser(updatedUser);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  unsubscribe() {
    if (this.user) {
      this.bookService.unsubscribeToBookAlerts(this.user?.email).subscribe(
        (response: any) => {
          console.log('HERE UNSUB!', response);
          const updatedUser = {
            ...this.user,
            isSubscribed: false,
          };
          this.userService.setUser(updatedUser);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
