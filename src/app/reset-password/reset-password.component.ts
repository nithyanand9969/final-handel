import { Component } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent{
  user: any;
  newPassword: string = '';
  confirmPassword: string = '';
  passwordResetSuccess: boolean = false;
  errorMessage: string = '';
  loading: boolean = false; // Added loading flag for password reset

  constructor() {}

  resetPassword() {
    this.loading = true; // Set loading to true while the password reset request is ongoing

    // Here, you would implement the logic to reset the password.
    // This is a basic example; you might need to integrate with your backend or authentication service.
    if (this.newPassword === this.confirmPassword) {
      // Simulate a password reset process (replace this with your actual logic)
      setTimeout(() => {
        this.passwordResetSuccess = true; // Simulated success
        this.loading = false; // Set loading to false after successful password reset
      }, 2000); // Simulating a 2-second delay, replace this with your actual API call
    } else {
      // Passwords don't match, handle this scenario (show an error, for instance)
      console.log('Passwords do not match');
      this.loading = false; // Set loading to false if password reset fails
    }
  }
}