import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  emailId: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false; // Added loading flag

  constructor(private router: Router, private authService: AuthService) { }

  login() {
    this.loading = true; // Set loading to true while the login request is ongoing

    this.authService.loginUser(this.emailId, this.password)
      .subscribe(
        (response: any) => {
          localStorage.setItem('jwtToken', response.jwtToken);
          localStorage.setItem('userName', response.userName); // Save the user's name

          const userEmail = this.emailId.toLowerCase();
          const domain = userEmail.split('@')[1];

          if (domain === 'handel.co.in') {
            this.router.navigate(['/admin']); // Redirect to admin dashboard
          } else {
            // Check if it's the first login and the password is specific
            if (this.authService.isFirstLogin(response) && this.password === 'Mumbai@2024') {
              // Redirect to reset password page
              this.router.navigate(['/reset-password']);
            } else {
              this.router.navigate(['/users']); // Redirect to user dashboard
            }
          }

          this.loading = false; // Set loading to false after successful login
        },
        (error: HttpErrorResponse) => {
          this.loading = false; // Set loading to false on login error
          if (error.status === 401) {
            this.errorMessage = 'Invalid email or password. Please try again.';
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
          console.error('Login failed:', error);
        }
      );
  }

  clearErrorMessage() {
    this.errorMessage = ''; 
  }
}
