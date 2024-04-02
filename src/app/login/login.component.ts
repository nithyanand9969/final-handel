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
togglePasswordVisibility() {
  this.passwordVisible = !this.passwordVisible;
}

  emailId: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;
passwordVisible: any;

 
  constructor(private router: Router, private authService: AuthService) { }
  
  login() {
    this.loading = true;
  
    this.authService.loginUser(this.emailId, this.password)
      .subscribe(
        (response: any) => {
          localStorage.setItem('jwtToken', response.jwtToken);
          localStorage.setItem('userName', response.userName);
  
          const userEmail = this.emailId.toLowerCase();
          const domain = userEmail.split('@')[1];
  
          if (domain === 'handel.co.in') {
            this.router.navigate(['/admin']);
          } else {
            // Check if it's the first login and the password is specific
            if (this.authService.isFirstLogin(response) && this.password === 'Mumbai@2024') {
              // Redirect to reset password page
              this.router.navigate(['/reset-password']);
            } else {
              this.router.navigate(['/users']);
            }
          }
  
          this.loading = false;
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
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


 

