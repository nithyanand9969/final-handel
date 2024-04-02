import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss']
})
export class UserdetailsComponent implements OnInit {
  selectedUser: any;
  corporateUsers: any[] = [];
  getUserDetails: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCorporateUsers();
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

  selectUser(user: any): void {
    this.selectedUser = user;
    this.router.navigate(['/userdetails', user.id]);
  }
}
