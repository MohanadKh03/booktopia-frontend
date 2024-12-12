import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);

  constructor() {
    this.loadUser();
  }

  private loadUser() {
    if (typeof localStorage !== 'undefined') {
      const userData = localStorage.getItem('user');
      this.userSubject.next(userData ? JSON.parse(userData) : null);
    } else {
      this.userSubject.next(null);
    }
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  setUser(user: User | null) {
    this.userSubject.next(user);
    if (typeof localStorage !== 'undefined') {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    }
  }
}
