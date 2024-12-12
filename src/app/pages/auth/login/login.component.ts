import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { baseUrl } from '../../../shared/const';
import { ApiResponse } from '../../../shared/api.response';
import { User } from '../../../core/models/user.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.http
        .post(`${baseUrl}/user/login`, { email, password })
        .pipe(
          catchError((error) => {
            console.error('Login error', error);
            return of(null);
          })
        )
        .subscribe((response: Object | null) => {
          console.log(response);

          const apiResponse = response as ApiResponse<User>;
          console.log(apiResponse);
          if (apiResponse && apiResponse.statusCode === 200) {
            this.authService.setUser(apiResponse.data as User);
            this.router.navigate(['/']);
          } else {
            console.error('Login failed');
          }
        });
    }
  }
}
