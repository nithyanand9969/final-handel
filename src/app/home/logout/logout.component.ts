import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.logout();
  }

  logout() {
    this.authService.logout().subscribe(
      () => {
        // Clear tokens and any other stored user data
        this.authService.clearTokens(); // Implement clearTokens() in your AuthService to clear tokens
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Logout failed:', error);
        // Handle logout failure, if needed
      }
    );
  }
}
