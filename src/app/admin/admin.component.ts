import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  loggedInUserName: string = ''; // Variable to store the logged-in user's name

  constructor(private router: Router) {}

  isDashboardRouteActive(): boolean {
    return this.router.url === '/admin';
  }

  // Fetch user details after successful login and display the user's name in the welcome area
}
