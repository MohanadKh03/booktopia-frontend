import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { RegisterData } from './models/register.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, RegisterFormComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  onRegister(data: RegisterData) {
    console.log('Registration data:', data);
    // Implement registration logic
  }
}