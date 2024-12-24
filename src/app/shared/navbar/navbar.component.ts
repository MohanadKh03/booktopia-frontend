import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user: any;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.user = user;
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  logout() {
    this.authService.setUser(null);
    this.router.navigate(['/login']);
  }
}
