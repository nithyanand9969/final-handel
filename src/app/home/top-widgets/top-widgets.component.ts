import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import {
  faLocation,
  faShop,
  faBoxes,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-widgets',
  templateUrl: './top-widgets.component.html',
  styleUrls: ['./top-widgets.component.scss']
})
export class TopWidgetsComponent implements OnInit {
  totalUsers: number = 0;
  faLocation = faLocation;
  faShop = faShop;
  faBoxes = faBoxes;
  faMoneyBill = faMoneyBill;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchTotalUsersCount();
  }

  fetchTotalUsersCount(): void {
    // Call your service method to fetch the total number of users
    this.authService.getTotalUsersCount().subscribe(
      (totalUsers: number) => {
        this.totalUsers = totalUsers; // Assign the fetched count to totalUsers
      },
      (error: any) => {
        console.error('Error fetching total users count:', error);
      }
    );
  } 
}
