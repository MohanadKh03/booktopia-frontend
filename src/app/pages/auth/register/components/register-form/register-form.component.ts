import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterData } from '../../models/register.model';
import { PasswordValidators } from '../../validators/password.validators';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { baseUrl } from '../../../../../shared/const';
import { Router } from '@angular/router';
import { ApiResponse } from '../../../../../shared/api.response';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  @Output() formSubmit = new EventEmitter<RegisterData>();
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      },
      {
        validators: PasswordValidators.passwordMatch,
      }
    );
  }
  onSubmit() {
    if (this.registerForm.valid) {
      const { confirmPassword, ...registerData } = this.registerForm.value;
      this.formSubmit.emit(registerData);
      this.http
        .post(`${baseUrl}/user/register`, registerData)
        .pipe(
          catchError((error) => {
            console.error('Registration error', error);
            return of(null);
          })
        )
        .subscribe((response: Object | null) => {
          const apiResponse = response as ApiResponse<null>;
          if (apiResponse && apiResponse.statusCode === 201) {
            this.router.navigate(['/login']);
          } else {
            console.error('Registration failed');
          }
        });
    }
  }
}
