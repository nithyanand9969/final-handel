import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkcallService } from '../service/networkcall.service';

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

  constructor(private router: Router, private networkService: NetworkcallService) { }

  resetPassword() {
    if (this.newPassword === this.confirmPassword) {
      this.networkService.setPassword(this.user.email, this.newPassword, this.confirmPassword)
        .subscribe(response => {
          // Handle response as needed
          console.log(response);
          this.passwordResetSuccess = true;
          // Other actions after password reset success
        }, error => {
          // Handle error
          console.error(error);
          // Other actions on error
        });
    } else {
      console.log('Passwords do not match');
      // Handle passwords not matching
    }
  }

}