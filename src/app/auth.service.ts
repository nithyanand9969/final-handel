import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getTotalUsers() {
    throw new Error('Method not implemented.');
  }
  getTotalcorporateCount() {
    throw new Error('Method not implemented.');
  }
  getTotaltraderCount() {
    throw new Error('Method not implemented.');
  }
  getTotalintermediaryCount() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8080';
  private readonly JWT_TOKEN_KEY = 'jwtToken';
  private isAdmin: boolean = false;

  constructor(private http: HttpClient) {}

  loginUser(emailId: string, password: string): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/auth/login`, {
        emailId,
        password,
      })
      .pipe(
        tap((response: { token: string }) => {
          localStorage.setItem(this.JWT_TOKEN_KEY, response?.token);
        })
      );
  }

  logout(): Observable<any> {
    // Clear JWT token
    localStorage.removeItem(this.JWT_TOKEN_KEY);
  
    // Clear any other stored user-related data if needed
    // For example:
    // localStorage.removeItem('userDetails');
    // sessionStorage.clear(); // Clear session storage, if used
  
    // Make a logout request to the server, if necessary
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  clearTokens(): void {
    // Clear JWT token
    localStorage.removeItem(this.JWT_TOKEN_KEY);
  
    // If there are other stored user-related data, clear them too
    // For example:
    // localStorage.removeItem('userDetails');
    // sessionStorage.clear(); // Clear session storage, if used
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.JWT_TOKEN_KEY);
  }

  getUserDetails(): Observable<any> {
    const jwtToken = localStorage.getItem(this.JWT_TOKEN_KEY);

    if (!jwtToken) {
      throw new Error('No token available');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });

    return this.http
      .get(`${this.apiUrl}/home/adminUser`, { headers, withCredentials: true })
      .pipe(
        tap(
          (response) => console.log('User Details:', response),
          (error) => console.error('Error fetching user details:', error)
        )
      );
  }

  getTraderDetails(): Observable<any> {
    const jwtToken = localStorage.getItem(this.JWT_TOKEN_KEY);

    if (!jwtToken) {
      throw new Error('No token available');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });

    return this.http
      .get(`${this.apiUrl}/home/adminUser`, { headers, withCredentials: true })
      .pipe(
        tap(
          (response) => console.log('Trader Details:', response),
          (error) => console.error('Error fetching trader details:', error)
        )
      );
  }

  getIntermediatorDetails(): Observable<any> {
    const jwtToken = localStorage.getItem(this.JWT_TOKEN_KEY);

    if (!jwtToken) {
      throw new Error('No token available');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });

    return this.http
      .get(`${this.apiUrl}/home/adminUser`, { headers, withCredentials: true })
      .pipe(
        tap(
          (response) => console.log('Intermediator Details:', response),
          (error) =>
            console.error('Error fetching intermediator details:', error)
        )
      );
  }

  getTotalUsersCount(): Observable<number> {
    const jwtToken = localStorage.getItem(this.JWT_TOKEN_KEY);

    if (!jwtToken) {
      throw new Error('No token available');
    }

    const headers = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    return this.http.get<number>(`${this.apiUrl}/home/totalCount`, headers);
  }

  deleteCorporate(corporateId: number): Observable<any> {
    const jwtToken = localStorage.getItem(this.JWT_TOKEN_KEY);

    if (!jwtToken) {
      throw new Error('No token available');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });

    return this.http
      .delete<any>(`${this.apiUrl}/home/deleteCorporate/${corporateId}`, {
        headers,
      })
      .pipe(
        catchError((error) => {
          console.error('HTTP error occurred:', error);
          return throwError(error);
        })
      );
  }
  deleteTrader(traderId: number): Observable<any> {
    const jwtToken = localStorage.getItem(this.JWT_TOKEN_KEY);

    if (!jwtToken) {
      throw new Error('No token available');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });

    return this.http.delete<any>(
      `${this.apiUrl}/home/deleteTrader/${traderId}`,
      {
        headers,
      }
    );
  }

  deleteIntermediary(intermediaryId: number): Observable<any> {
    const jwtToken = localStorage.getItem(this.JWT_TOKEN_KEY);

    if (!jwtToken) {
      throw new Error('No token available');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });

    return this.http.delete<any>(
      `${this.apiUrl}/home/deleteIntermediary/${intermediaryId}`,
      { headers }
    );
  }

  getLoggedInUserName(): Observable<string> {
    const jwtToken = localStorage.getItem(this.JWT_TOKEN_KEY);
  
    if (!jwtToken) {
      throw new Error('No token available');
    }
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
  
    return this.http.get<any>(`${this.apiUrl}/user/name`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching user name:', error);
        return throwError(error);
      }),
      map((response: any) => response.name) // Assuming the user's name is retrieved as 'name' from the API
    );
  }

  checkAdminRole(): boolean {
    const jwtToken = localStorage.getItem(this.JWT_TOKEN_KEY);
    if (jwtToken) {
      const decodedToken = this.decodeToken(jwtToken);
      // Check if the decoded token contains admin role information
      this.isAdmin = decodedToken?.role === 'admin'; // Assuming 'role' field holds the user's role
      return this.isAdmin;
    }
    return false;
  }

  // Simulated method to decode JWT token (Replace this with your token decoding logic)
  private decodeToken(token: string): any {
    try {
      // For demonstration purposes, this function is a simulated decode. Replace it with your actual token decoding logic.
      const tokenPayload = token.split('.')[1];
      return JSON.parse(atob(tokenPayload));
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}