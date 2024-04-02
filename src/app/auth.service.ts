import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  [x: string]: any;
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
  isFirstLogin(response: { firstLogin: boolean }): boolean {
    return response?.firstLogin === true;
  }
  private apiUrl = 'http://localhost:8090';
  private readonly JWT_TOKEN_KEY = 'jwtToken';
  private isAdmin: boolean = false;

  constructor(private http: HttpClient) {}
  
  loginUser(emailId: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { emailId, password }).pipe(
      tap((response: { token: string,entityName:string, firstLogin: boolean, loginCount: string }) => {
       console.log(response,'nithyanand');
        localStorage.setItem(this.JWT_TOKEN_KEY, response?.token);
        localStorage.setItem('entityName', response?.entityName);
      })
    );
  }



  private getDetails(url: string): Observable<any> {
    const jwtToken = localStorage.getItem(this.JWT_TOKEN_KEY);

    if (!jwtToken) {
      return throwError(new Error('No token available'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });

    return this.http.get(url, { headers, withCredentials: true }).pipe(
      tap(
        (response) => console.log('Details:', response),
        (error) => console.error('Error fetching details:', error)
      ),
      catchError((error) => {
        console.error('HTTP error occurred:', error);
        return throwError(error);
      })
    );
  }

  fetchAndStoreEntityName(): void {
    const jwtToken = localStorage.getItem(this.JWT_TOKEN_KEY);

    if (!jwtToken) {
      throw new Error('No token available');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });

    this.http
      .get<any>(`${this.apiUrl}/user/entityName`, { headers })
      .subscribe(
        (response: any) => {
          localStorage.setItem('entityName', response?.entityName); 
        },
        (error) => {
          console.error('Error fetching entity name:', error);
        }
      );
  }

  logout(): Observable<any> {
    // Clear JWT token
    localStorage.removeItem(this.JWT_TOKEN_KEY);

    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  clearTokens(): void {
    // Clear JWT token
    localStorage.removeItem(this.JWT_TOKEN_KEY);
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

  pauseCorporate(corporateId: number): Observable<any> {
    const jwtToken = localStorage.getItem(this.JWT_TOKEN_KEY);
 
    if (!jwtToken) {
      throw new Error('No token available');
    }
 
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
     
    });
    const deleteUrl = `${this.apiUrl}/home/deleteCorporate/${corporateId}`;
    return this.http.post<any>(deleteUrl, {}, { headers: headers } );
  }


  deleteTrader(traderId: number): Observable<any> {
    const jwtToken = localStorage.getItem(this.JWT_TOKEN_KEY);

    if (!jwtToken) {
      throw new Error('No token available');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });

    const deleteUrl = `${this.apiUrl}/home/deleteTrader/${traderId}`;

    return this.http.delete<any>(deleteUrl, { headers }).pipe(
      catchError((error: any) => {
        console.error('Error deleting trader:', error);
      
        return throwError('Deletion failed');
      })
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
      map((response: any) => response.name) 
    );
  }

  checkAdminRole(): boolean {
    const jwtToken = localStorage.getItem(this.JWT_TOKEN_KEY);
    if (jwtToken) {
      const decodedToken = this.decodeToken(jwtToken);
    
      this.isAdmin = decodedToken?.role === 'admin'; 
      return this.isAdmin;
    }
    return false;
  }

  
  private decodeToken(token: string): any {
    try {
      
      const tokenPayload = token.split('.')[1];
      return JSON.parse(atob(tokenPayload));
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  updateCorporate(entity: any): Observable<any> {
    const jwtToken = localStorage.getItem(this.JWT_TOKEN_KEY);

    if (!jwtToken) {
      throw new Error('No token available');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });

    
    const updateUrl = `${this.apiUrl}/corporate/${entity.corporateId}/update`;

    return this.http.put<any>(updateUrl, entity, { headers }).pipe(
      catchError((error) => {
        console.error('Error updating corporate entity:', error);
        return throwError('Failed to update corporate entity');
      })  
    );
  }

}
