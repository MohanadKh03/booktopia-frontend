import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    let isAdmin = false;
    this.authService.getUser().subscribe((user) => {
      if (user && user.role === 'admin') {
        isAdmin = true;
      }
    });
    if (isAdmin) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
