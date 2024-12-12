import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  login(email: string, password: string): Observable<User> {
    // Implement actual login logic here
    const mockUser: User = {
      id: 1,
      name: 'John Doe',
      email,
      role: 'customer'
    };
    this.currentUserSubject.next(mockUser);
    return of(mockUser);
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }
}