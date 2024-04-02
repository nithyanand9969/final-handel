import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  corporateUsers: any[] = [];
  selectedUser: any;
  totalUsers = 0;
  getUserDetails: any;
  getTraderDetails: any;
  getIntermediator: any; // Corrected variable name

  constructor(private authService: AuthService,private router:Router) {}

  ngOnInit(): void {
    this.fetchCorporateUsers();
    this.fetchTraderDetails();
    this.fetchIntermediatorDetails();
  }
 
  fetchCorporateUsers(): void {
    this.authService.getUserDetails().subscribe(
      (res: any) => {
        this.getUserDetails = res;
        console.log('Corporate users:', res);
      },
      (error) => {
        console.error('Error fetching corporate users:', error);
      }
    );
  }
  
  fetchTraderDetails(): void {
    this.authService.getTraderDetails().subscribe(
      (res: any) => {
        this.getTraderDetails = res;
        console.log('Trader details:', res);
      },
      (error) => {
        console.error('Error fetching trader details:', error);
      }
    );
  }
  
  fetchIntermediatorDetails(): void { 
    this.authService.getIntermediatorDetails().subscribe(
      (res: any) => {
        this.getIntermediator = res;
        console.log('Intermediator details:', res);
      },
      (error) => {
        console.error('Error fetching intermediator details:', error);
      }
    );
  }
  
  
  selectUser(user: any): void {
    this.selectedUser = user;
 
    if (this.selectedUser) {
      console.log('Selected user ID:', this.selectedUser.id);
      this.router.navigate(['/userdetails', this.selectedUser.id]);
    }
  }


}
