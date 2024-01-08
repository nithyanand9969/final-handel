import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface ApiResponse {
  text?: string;
}

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent {
  forget: any = { emailId: '' };
  errorMessage: string = '';
  showSuccessMessage: string | undefined;
  isLoading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) {}

  forgetPassword(): void {
    this.isLoading = true;
    this.spinner.show();

    const email = this.forget.emailId;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<ApiResponse>('http://localhost:8080/auth/forgotPassword', { email }, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
          } else {
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${JSON.stringify(error.error)}`
            );
            this.errorMessage = (error.error as ApiResponse)?.text || 'Something bad happened; please try again later.';
          }
          return throwError(this.errorMessage);
        })
      )
      .subscribe(() => {
        this.showSuccessMessage = 'If your email exists in the database, you will receive a reset password link shortly.';

        setTimeout(() => {
          this.isLoading = false;
          this.spinner.hide();
          this.router.navigate(['login']);
        }, 3000); 
      });
  }
}
