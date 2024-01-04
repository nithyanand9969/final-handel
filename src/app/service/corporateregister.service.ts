import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class CorporateregisterService {

  constructor(private http: HttpClient) { }

  // corporateSignUp(registration: any) {

  //   return this.http.post<object>('http://localhost:8080/handel/handel', registration)

  // }


  // getcorporateuser() {

  //   return this.http.get<object>('getRegistrationList');
  // }


}


