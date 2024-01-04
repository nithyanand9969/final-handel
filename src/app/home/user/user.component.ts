import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchCorporateUsers();
    this.fetchTraderDetails();
    this.fetchIntermediatorDetails(); // Corrected method name
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
  
  fetchIntermediatorDetails(): void { // Corrected method name
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
    // Perform actions on user selection if needed
  }
}
