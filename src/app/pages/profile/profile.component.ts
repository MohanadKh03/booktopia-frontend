import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../shared/const';
import { ApiResponse } from '../../shared/api.response';
import { User } from '../../core/models/user.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class ProfileComponent implements OnInit {
  name: string = '';
  email: string = '';
  phone: string = '';
  private existingUser: any;

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.existingUser = user;
        this.name = user.username;
        this.email = user.email;
        this.phone = user.phone || '';
      }
    });
  }

  onSubmit() {
    this.http
      .put(`${baseUrl}/user/${this.existingUser.id}`, {
        name: this.name,
        phone: this.phone,
      })
      .subscribe((response: Object | null) => {
        const apiResponse = response as ApiResponse<User>;
        if (apiResponse && apiResponse.statusCode === 200) {
          const updatedUser = {
            ...this.existingUser,
            username: this.name,
            phone: this.phone,
          };
          this.authService.setUser(updatedUser);
          alert('Profile updated successfully!');
        } else {
          console.error('Update failed');
        }
      });
  }

  resetForm() {
    this.name = this.existingUser.username;
    this.phone = this.existingUser.phone || '';
  }
}
