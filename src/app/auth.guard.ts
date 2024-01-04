import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // User is authenticated, allow access to the route
    } else {
      // Redirect unauthenticated users to the login page
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
      return false; // Prevent access to the protected route
    }
  }
}
