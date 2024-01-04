import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedInUserName: string = '';
  isLoggedIn: boolean = false; // Variable to track user authentication status
  isAdmin: boolean = false; // Variable to track if the logged-in user is an admin
  
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();
    console.log('IsLoggedIn:', this.isLoggedIn);
  
    const isLoginPage = this.router.url === '/login';
  
    if (this.isLoggedIn && !isLoginPage) {
      // ... other code remains unchanged
      this.isAdmin = this.authService.checkAdminRole();
      console.log('IsAdmin:', this.isAdmin);
    }
  }
  

  getFirstLetter(): string {
    if (this.loggedInUserName) {
      return this.loggedInUserName.charAt(0).toUpperCase();
    }
    return '';
  }
}
